"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bot,
  ChevronRight,
  Clock,
  GraduationCap,
  Mic,
  MicOff,
  RotateCcw,
  Send,
  Trophy,
  Volume2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import type { BtpQuestion, BtpSection } from "@/lib/btp-content";
import { getBtpMcqs, getBtpQuestions } from "@/lib/btp-content";
import { percent } from "@/lib/utils";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { McqQuiz } from "@/components/btp/mcq-quiz";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { BrandLogo } from "@/components/layout/brand-logo";

type Message = {
  role: "interviewer" | "candidate";
  body: string;
};

type InterviewItem = {
  id: string;
  prompt: string;
  topic: string;
  kind: "Main" | "Follow-up" | "Trap" | "Scenario";
};

type SpeechRecognitionConstructor = new () => SpeechRecognition;
type SpeechRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};
type SpeechRecognitionEvent = {
  results: { [index: number]: { [index: number]: { transcript: string } }; length: number };
};

const modes = ["Full Section", "Topic Drill", "Rapid Fire", "Stress Interview"] as const;

function getSpeechRecognition() {
  if (typeof window === "undefined") return undefined;
  const speechWindow = window as Window &
    typeof globalThis & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
}

function makeFullQueue(questions: BtpQuestion[]): InterviewItem[] {
  return questions.flatMap((question) => [
    { id: `${question.id}-main`, prompt: question.prompt, topic: question.topic, kind: "Main" as const },
    ...question.followupQuestions.map((followup, index) => ({
      id: `${question.id}-fu-${index}`,
      prompt: followup,
      topic: question.topic,
      kind: index % 3 === 0 ? ("Scenario" as const) : index % 3 === 1 ? ("Follow-up" as const) : ("Trap" as const),
    })),
  ]);
}

function makeTopicQueue(question: BtpQuestion): InterviewItem[] {
  return [
    { id: `${question.id}-main`, prompt: question.prompt, topic: question.topic, kind: "Main" },
    ...question.followupQuestions.map((followup, index) => ({
      id: `${question.id}-topic-fu-${index}`,
      prompt: followup,
      topic: question.topic,
      kind: index % 3 === 0 ? ("Scenario" as const) : index % 3 === 1 ? ("Follow-up" as const) : ("Trap" as const),
    })),
  ];
}

function offlineEvaluate(answer: string, item: InterviewItem) {
  const checks = [
    /definition|means|is used|what is/i,
    /example|project|client|real/i,
    /architecture|diagram|flow|component|service/i,
    /security|xsuaa|auth|role|scope|token/i,
    /error|issue|debug|troubleshoot|fix|log/i,
  ];
  const hits = checks.filter((regex) => regex.test(answer)).length;
  const lengthScore = Math.min(35, Math.floor(answer.trim().length / 10));
  const kindBonus = item.kind === "Main" ? 8 : 4;
  return Math.min(100, Math.max(25, lengthScore + hits * 12 + kindBonus));
}

function getMissingAreas(messages: Message[]) {
  const joined = messages
    .filter((message) => message.role === "candidate")
    .map((message) => message.body)
    .join(" ");
  return [
    !/definition|means|is used|what is/i.test(joined) && "clear definition upfront",
    !/example|project|client|real/i.test(joined) && "a real project example",
    !/architecture|diagram|flow|component|service/i.test(joined) && "architecture/flow depth",
    !/security|xsuaa|auth|role|scope|token/i.test(joined) && "security angle where relevant",
    !/error|issue|debug|troubleshoot|fix|log/i.test(joined) && "troubleshooting/production angle",
  ].filter(Boolean) as string[];
}

function getStudyPlan(missingAreas: string[], section: BtpSection) {
  if (!missingAreas.length) {
    return [
      `Answers strong hain. Ab ${section.title} ke weak-looking topics ko Learn tab me revise karo.`,
      "Har answer me one real project line aur one troubleshooting line maintain rakho.",
      "Practice tab ke MCQs me 90%+ target karo before moving next section.",
    ];
  }
  return [
    `Pehle ${section.title} ka Learn tab revise karo, phir Practice tab ke MCQs try karo.`,
    ...missingAreas.map((area) => `Focus: ${area}. Iske liye is section ke real project examples aur diagrams padho.`),
    "Next attempt me Definition + Example + Architecture + Troubleshooting format use karo.",
  ];
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function BtpAiInterviewer({ section }: { section: BtpSection }) {
  const questions = getBtpQuestions(section.slug);
  const mcqs = getBtpMcqs(section.slug);
  const [mode, setMode] = useState<(typeof modes)[number]>("Full Section");
  const [selectedQuestionId, setSelectedQuestionId] = useState(questions[0]?.id ?? "");
  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId) ?? questions[0];
  const queue = useMemo(
    () => (mode === "Topic Drill" && selectedQuestion ? makeTopicQueue(selectedQuestion) : makeFullQueue(questions)),
    [questions, mode, selectedQuestion],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "interviewer",
      body: `Interview start. Main ${section.title} ke saare important questions aur follow-ups puchunga. Pehla question: ${queue[0]?.prompt ?? ""}`,
    },
  ]);
  const [finalReport, setFinalReport] = useState<{ score: number; weakTopics: string[]; studyPlan: string[] } | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const currentItem = queue[currentIndex] ?? queue[0];
  const progress = percent(Math.min(currentIndex, queue.length), queue.length);
  const averageScore = scores.length ? Math.round(scores.reduce((sum, item) => sum + item, 0) / scores.length) : 0;

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, [running]);

  function resetInterview(nextMode = mode, questionForTopic = selectedQuestion) {
    const nextQueue = nextMode === "Topic Drill" && questionForTopic ? makeTopicQueue(questionForTopic) : makeFullQueue(questions);
    setCurrentIndex(0);
    setScores([]);
    setFinalReport(null);
    setAnswer("");
    setElapsed(0);
    setRunning(true);
    setMessages([
      {
        role: "interviewer",
        body: `${nextMode} start. Question 1 of ${nextQueue.length}: ${nextQueue[0]?.prompt ?? ""}`,
      },
    ]);
  }

  function speak(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.92;
    window.speechSynthesis.speak(utterance);
  }

  function toggleVoice() {
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setAnswer((current) => `${current}\n\nVoice input is not supported in this browser. Please type your answer.`);
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      const transcript = Array.from({ length: event.results.length }, (_, index) => event.results[index][0].transcript)
        .join(" ")
        .trim();
      setAnswer(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  }

  function finishInterview(nextMessages: Message[], nextScores: number[]) {
    const score = Math.round(nextScores.reduce((sum, item) => sum + item, 0) / Math.max(1, nextScores.length));
    const weakTopics = getMissingAreas(nextMessages);
    setRunning(false);
    setFinalReport({ score, weakTopics, studyPlan: getStudyPlan(weakTopics, section) });
    setMessages([
      ...nextMessages,
      {
        role: "interviewer",
        body: `Interview complete. Final score ${score}/100 in ${formatTime(elapsed)}. Neeche report me kya padhna hai aur weak areas milenge.`,
      },
    ]);
  }

  async function submit() {
    if (!answer.trim() || !currentItem) return;
    setIsScoring(true);
    let itemScore = offlineEvaluate(answer, currentItem);
    let feedbackLine =
      itemScore >= 80 ? "Good. Answer me structure aa raha hai." : "Improve: definition ke baad real example, architecture, aur troubleshooting angle add karo.";

    try {
      const res = await fetch("/api/btp-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionSlug: section.slug, mode, questionPrompt: currentItem.prompt, answer }),
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.confidenceScore === "number") itemScore = data.confidenceScore;
        if (typeof data.feedback === "string") feedbackLine = data.feedback;
      }
    } catch {
      // Network/API failure — silently keep the offline heuristic score computed above.
    }
    setIsScoring(false);

    const nextScores = [...scores, itemScore];
    const candidateMessage: Message = { role: "candidate", body: answer };
    const nextIndex = currentIndex + 1;
    const nextItem = queue[nextIndex];
    const nextMessages: Message[] = [
      ...messages,
      candidateMessage,
      {
        role: "interviewer",
        body: nextItem
          ? `Marks ${itemScore}/100. ${feedbackLine} Next ${nextItem.kind}: ${nextItem.prompt}`
          : `Marks ${itemScore}/100. ${feedbackLine} Queue complete ho gaya.`,
      },
    ];

    setScores(nextScores);
    setAnswer("");
    if (!nextItem) {
      finishInterview(nextMessages, nextScores);
      return;
    }
    setCurrentIndex(nextIndex);
    setMessages(nextMessages);
    speak(nextItem.prompt);
    setTimeout(() => chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" }), 100);
  }

  if (questions.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="max-w-sm p-6 text-center">
          <p className="text-sm text-muted">No authored questions yet for {section.title}.</p>
          <Link href="/btp/interview" className="mt-3 inline-block text-xs font-semibold text-accent">
            &larr; Pick another section
          </Link>
        </Card>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-background px-4 py-5 sm:px-6 lg:px-8"
      style={{ "--accent": section.color, "--accent-glow": `${section.color}33` } as React.CSSProperties}
    >
      <div className="mx-auto max-w-6xl">
        {/* Top nav */}
        <nav className="mb-6 flex items-center justify-between gap-2 rounded-xl border border-border bg-surface px-4 py-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-1.5 text-sm">
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <BrandLogo size={26} />
            </Link>
            <ChevronRight size={11} className="shrink-0 text-faint" />
            <Link href="/btp/interview" className="hidden shrink-0 text-muted transition-colors hover:text-foreground sm:inline">
              BTP Interview
            </Link>
            <ChevronRight size={11} className="hidden shrink-0 text-faint sm:inline" />
            <span className="min-w-0 flex-1 truncate font-semibold text-foreground">{section.title}</span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Badge variant={difficultyVariant(section.difficulty)}>{mode}</Badge>
            <ThemeToggle />
          </div>
        </nav>

        {/* Header */}
        <section className="relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-7">
          <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: section.color }} />
          <h1 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">{section.title} Mock Interview</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Full section interview covers all questions + follow-ups. Topic drill goes deep on one question. Voice or type your
            answers — scored live.
          </p>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-3">
            <Card className="p-4">
              <h2 className="text-sm font-semibold text-foreground">Interview Mode</h2>
              <div className="mt-3 grid grid-cols-1 gap-1.5">
                {modes.map((item) => (
                  <Button
                    key={item}
                    variant={mode === item ? "default" : "secondary"}
                    className="h-9 justify-start text-xs"
                    onClick={() => {
                      setMode(item);
                      resetInterview(item);
                    }}
                  >
                    <Zap size={13} /> {item}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h2 className="text-sm font-semibold text-foreground">Topic Drill</h2>
              <select
                className="mt-2 w-full rounded-lg border border-border p-2.5 text-xs text-foreground outline-none"
                value={selectedQuestionId}
                onChange={(event) => {
                  const nextQuestion = questions.find((q) => q.id === event.target.value) ?? questions[0];
                  setSelectedQuestionId(event.target.value);
                  setMode("Topic Drill");
                  resetInterview("Topic Drill", nextQuestion);
                }}
              >
                {questions.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.prompt}
                  </option>
                ))}
              </select>
            </Card>

            <Card className="p-4">
              <h2 className="text-sm font-semibold text-foreground">Progress</h2>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full transition-[width]"
                  style={{ width: `${progress}%`, backgroundColor: section.color }}
                />
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-lg border border-border bg-surface-2 p-2">
                  <div className="text-[10px] text-muted">Asked</div>
                  <div className="font-bold text-foreground">{Math.min(currentIndex, queue.length)}/{queue.length}</div>
                </div>
                <div className="rounded-lg border border-border bg-surface-2 p-2">
                  <div className="text-[10px] text-muted">Avg Score</div>
                  <div className="font-bold text-foreground">{finalReport?.score ?? averageScore}/100</div>
                </div>
                <div className="rounded-lg border border-border bg-surface-2 p-2">
                  <div className="flex items-center gap-1 text-[10px] text-muted">
                    <Clock size={10} /> Time
                  </div>
                  <div className="font-bold text-foreground">{formatTime(elapsed)}</div>
                </div>
              </div>
            </Card>

            {finalReport && (
              <Card className="p-4" accent={finalReport.score >= 70 ? "#0e7c72" : section.color}>
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-accent" />
                  <h2 className="text-sm font-semibold text-foreground">Final Report</h2>
                </div>
                <div className="mt-3 text-4xl font-bold" style={{ color: section.color }}>
                  {finalReport.score}
                </div>
                <div className="mt-4 space-y-3 text-xs leading-5 text-muted">
                  <div>
                    <div className="font-semibold text-foreground">Weak Areas</div>
                    <ul className="mt-1.5 list-inside list-disc">
                      {finalReport.weakTopics.length === 0 ? <li>None — strong across the board.</li> : null}
                      {finalReport.weakTopics.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Ab Kya Padhna Hai</div>
                    <ul className="mt-1.5 list-inside list-disc">
                      {finalReport.studyPlan.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </aside>

          {/* Main chat + quiz */}
          <div className="space-y-4">
            <Card className="flex min-h-[500px] flex-col overflow-hidden sm:min-h-[580px]">
              {/* Chat header */}
              <div className="flex items-center justify-between gap-2 border-b border-border p-3 sm:p-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${section.color}1f`, color: section.color }}
                  >
                    <Bot size={18} />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">Senior SAP BTP Interviewer</h2>
                    <p className="text-[11px] text-muted">{mode} · {queue.length} questions</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <Button variant="secondary" size="icon" className="h-8 w-8" aria-label="Reset" onClick={() => resetInterview()}>
                    <RotateCcw size={14} />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                    aria-label="Speak"
                    onClick={() => speak(currentItem?.prompt ?? messages.at(-1)?.body ?? "")}
                  >
                    <Volume2 size={14} />
                  </Button>
                </div>
              </div>

              {/* Chat messages */}
              <div ref={chatRef} className="flex-1 space-y-2.5 overflow-y-auto p-3 sm:p-4">
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={message.role === "candidate" ? "ml-auto max-w-[88%]" : "mr-auto max-w-[88%]"}>
                    <div
                      className={
                        message.role === "candidate"
                          ? "rounded-xl rounded-br-sm p-3 text-sm leading-6 text-[#14110e]"
                          : "rounded-xl rounded-bl-sm border border-border bg-surface-2 p-3 text-sm leading-6 text-foreground"
                      }
                      style={message.role === "candidate" ? { backgroundColor: section.color } : undefined}
                    >
                      {message.body}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-border p-3 sm:p-4">
                <div className="mb-2 rounded-lg border border-border bg-surface-2 p-2 text-[11px] leading-4 text-muted">
                  Formula: Definition + example + architecture/flow + security/troubleshooting angle
                </div>
                <div className="flex gap-2">
                  <textarea
                    className="min-h-16 flex-1 resize-none rounded-lg border border-border p-2.5 text-sm text-foreground outline-none"
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                    placeholder="Type or speak your answer..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        submit();
                      }
                    }}
                  />
                  <div className="grid grid-cols-1 gap-1.5">
                    <Button
                      aria-label={isListening ? "Stop" : "Speak"}
                      variant={isListening ? "danger" : "secondary"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={toggleVoice}
                    >
                      {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                    </Button>
                    <Button aria-label="Send" size="icon" className="h-8 w-8" disabled={isScoring} onClick={submit}>
                      <Send size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quiz */}
            {mcqs.length > 0 && (
              <Card className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <GraduationCap size={16} style={{ color: section.color }} />
                  <h2 className="text-sm font-semibold text-foreground">Smart Quiz</h2>
                </div>
                <McqQuiz mcqs={mcqs} />
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
