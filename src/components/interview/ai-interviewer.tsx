"use client";

import { useMemo, useRef, useState } from "react";
import {
  Bot,
  ChevronRight,
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
import type { Chapter, Question } from "@/lib/types";
import { percent } from "@/lib/utils";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

const modes = ["Full Chapter", "Topic Drill", "Rapid Fire", "Stress Interview"] as const;

function getSpeechRecognition() {
  if (typeof window === "undefined") return undefined;
  const speechWindow = window as Window &
    typeof globalThis & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
}

function makeFullQueue(chapter: Chapter): InterviewItem[] {
  return chapter.questions.flatMap((question) => [
    { id: `${question.id}-main`, prompt: question.prompt, topic: question.prompt, kind: "Main" as const },
    ...question.answers.followupAnswerBank.map((followup, index) => ({
      id: `${question.id}-fu-${index}`,
      prompt: followup.question,
      topic: question.prompt,
      kind: index % 3 === 0 ? ("Scenario" as const) : index % 3 === 1 ? ("Follow-up" as const) : ("Trap" as const),
    })),
  ]);
}

function makeTopicQueue(question: Question): InterviewItem[] {
  return [
    { id: `${question.id}-main`, prompt: question.prompt, topic: question.prompt, kind: "Main" },
    ...question.answers.followupAnswerBank.map((followup, index) => ({
      id: `${question.id}-topic-fu-${index}`,
      prompt: followup.question,
      topic: question.prompt,
      kind: index % 3 === 0 ? ("Scenario" as const) : index % 3 === 1 ? ("Follow-up" as const) : ("Trap" as const),
    })),
  ];
}

function evaluateAnswer(answer: string, item: InterviewItem) {
  const checks = [
    /definition|means|matlab|used|use/i,
    /example|project|requirement|client|real/i,
    /debug|breakpoint|st22|sm37|issue/i,
    /performance|st05|sat|trace|slow/i,
    /support|production|transport|authorization|su53/i,
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
    !/definition|means|matlab|used|use/i.test(joined) && "basic definition clearly bolna",
    !/example|project|requirement|client|real/i.test(joined) && "real project example add karna",
    !/debug|breakpoint|st22|sm37|issue/i.test(joined) && "debugging flow revise karna",
    !/performance|st05|sat|trace|slow/i.test(joined) && "ST05/SAT performance angle padhna",
    !/support|production|transport|authorization|su53/i.test(joined) && "support, authorization, transport angle add karna",
  ].filter(Boolean) as string[];
}

function getStudyPlan(missingAreas: string[], chapter: Chapter) {
  if (!missingAreas.length) {
    return [
      "Answers strong hain. Ab chapter ke weak-looking questions ko voice me 2 baar revise karo.",
      "Har answer me one real project line aur one support/debug line maintain rakho.",
      "Quiz me 90%+ target karo before moving next chapter.",
    ];
  }

  return [
    `Pehle ${chapter.title} ke Easy Understanding aur Interview Me Kya Bolna Hai tabs revise karo.`,
    ...missingAreas.map((area) => `Focus: ${area}. Iske liye Debugging/Support/Project Practical Q&A tab padhna.`),
    "Next attempt me D-P-D-S format use karo: Definition, Project, Debugging, Support.",
  ];
}

function quizOptions(question: Question) {
  const correct = question.answers.interviewMeKyaBolnaHai.split("\n").find((line) => line.trim().length > 25) ?? question.prompt;
  return [
    correct.replace(/^"+|"+$/g, "").slice(0, 170),
    "Only definition bol dena enough hai; project/debugging mention karne ki need nahi hoti.",
    "Is topic ka SAP ABAP interview se direct relation nahi hota.",
    "Bas transaction code ya syntax yaad karna hai, real example important nahi hota.",
  ];
}

export function AiInterviewer({ chapter }: { chapter: Chapter }) {
  const [mode, setMode] = useState<(typeof modes)[number]>("Full Chapter");
  const [selectedQuestionId, setSelectedQuestionId] = useState(chapter.questions[0]?.id ?? "");
  const selectedQuestion = chapter.questions.find((question) => question.id === selectedQuestionId) ?? chapter.questions[0];
  const queue = useMemo(
    () => (mode === "Topic Drill" && selectedQuestion ? makeTopicQueue(selectedQuestion) : makeFullQueue(chapter)),
    [chapter, mode, selectedQuestion],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "interviewer",
      body: `Chapter interview start. Main ${chapter.title} ke saare important questions aur follow-ups puchunga. Pehla question: ${queue[0]?.prompt ?? ""}`,
    },
  ]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [finalReport, setFinalReport] = useState<{ score: number; weakTopics: string[]; studyPlan: string[] } | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const currentItem = queue[currentIndex] ?? queue[0];
  const progress = percent(Math.min(currentIndex, queue.length), queue.length);
  const averageScore = scores.length ? Math.round(scores.reduce((sum, item) => sum + item, 0) / scores.length) : 0;
  const quizQuestion = chapter.questions[quizIndex % chapter.questions.length];

  function resetInterview(nextMode = mode, questionForTopic = selectedQuestion) {
    const nextQueue = nextMode === "Topic Drill" && questionForTopic ? makeTopicQueue(questionForTopic) : makeFullQueue(chapter);
    setCurrentIndex(0);
    setScores([]);
    setFinalReport(null);
    setAnswer("");
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
    setFinalReport({ score, weakTopics, studyPlan: getStudyPlan(weakTopics, chapter) });
    setMessages([
      ...nextMessages,
      {
        role: "interviewer",
        body: `Interview complete. Final score ${score}/100. Neeche report me kya padhna hai aur weak areas milenge.`,
      },
    ]);
  }

  function submit() {
    if (!answer.trim() || !currentItem) return;
    const itemScore = evaluateAnswer(answer, currentItem);
    const nextScores = [...scores, itemScore];
    const candidateMessage: Message = { role: "candidate", body: answer };
    const nextIndex = currentIndex + 1;
    const nextItem = queue[nextIndex];
    const feedbackLine =
      itemScore >= 80
        ? "Good. Answer me structure aa raha hai."
        : "Improve: definition ke baad real project, debugging, support aur performance line add karo.";
    const nextMessages: Message[] = [
      ...messages,
      candidateMessage,
      {
        role: "interviewer",
        body: nextItem
          ? `Marks ${itemScore}/100. ${feedbackLine} Next ${nextItem.kind}: ${nextItem.prompt}`
          : `Marks ${itemScore}/100. Chapter queue complete ho gaya.`,
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

  function answerQuiz(optionIndex: number) {
    if (optionIndex === 0) setQuizScore((score) => score + 1);
    setQuizIndex((index) => index + 1);
  }

  return (
    <main
      className="min-h-screen bg-background px-4 py-5 sm:px-6 lg:px-8"
      style={{ "--accent": chapter.color, "--accent-glow": `${chapter.color}33` } as React.CSSProperties}
    >
      <div className="mx-auto max-w-6xl">
        {/* Top nav */}
        <nav className="mb-6 flex items-center justify-between gap-2 rounded-xl border border-border bg-surface px-4 py-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-1.5 text-sm">
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <BrandLogo size={26} />
            </Link>
            <ChevronRight size={11} className="shrink-0 text-faint" />
            <Link href="/interview" className="hidden shrink-0 text-muted transition-colors hover:text-foreground sm:inline">
              Interview
            </Link>
            <ChevronRight size={11} className="hidden shrink-0 text-faint sm:inline" />
            <span className="min-w-0 flex-1 truncate font-semibold text-foreground">
              {chapter.title}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Badge variant={difficultyVariant(chapter.difficulty)}>{mode}</Badge>
            <ThemeToggle />
          </div>
        </nav>

        {/* Header */}
        <section className="relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-7">
          <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: chapter.color }} />
          <h1 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">{chapter.title} Interview</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Full chapter interview covers all questions + follow-ups. Topic drill goes deep on one topic.
            Voice or type your answers.
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
                  const nextQuestion = chapter.questions.find((question) => question.id === event.target.value) ?? chapter.questions[0];
                  setSelectedQuestionId(event.target.value);
                  setMode("Topic Drill");
                  resetInterview("Topic Drill", nextQuestion);
                }}
              >
                {chapter.questions.map((question) => (
                  <option key={question.id} value={question.id}>
                    {question.prompt}
                  </option>
                ))}
              </select>
            </Card>

            <Card className="p-4">
              <h2 className="text-sm font-semibold text-foreground">Progress</h2>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full transition-[width]"
                  style={{ width: `${progress}%`, backgroundColor: chapter.color }}
                />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-border bg-surface-2 p-2">
                  <div className="text-[10px] text-muted">Asked</div>
                  <div className="font-bold text-foreground">{Math.min(currentIndex, queue.length)}/{queue.length}</div>
                </div>
                <div className="rounded-lg border border-border bg-surface-2 p-2">
                  <div className="text-[10px] text-muted">Avg Score</div>
                  <div className="font-bold text-foreground">{finalReport?.score ?? averageScore}/100</div>
                </div>
              </div>
            </Card>

            {finalReport && (
              <Card className="p-4" accent={finalReport.score >= 70 ? "#0e7c72" : chapter.color}>
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-accent" />
                  <h2 className="text-sm font-semibold text-foreground">Final Report</h2>
                </div>
                <div className="mt-3 text-4xl font-bold" style={{ color: chapter.color }}>
                  {finalReport.score}
                </div>
                <div className="mt-4 space-y-3 text-xs leading-5 text-muted">
                  <div>
                    <div className="font-semibold text-foreground">Weak Areas</div>
                    <ul className="mt-1.5 list-inside list-disc">
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
                    style={{ backgroundColor: `${chapter.color}1f`, color: chapter.color }}
                  >
                    <Bot size={18} />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">Senior SAP Interviewer</h2>
                    <p className="text-[11px] text-muted">{mode} · {queue.length} questions</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <Button variant="secondary" size="icon" className="h-8 w-8" aria-label="Reset" onClick={() => resetInterview()}>
                    <RotateCcw size={14} />
                  </Button>
                  <Button variant="secondary" size="icon" className="h-8 w-8" aria-label="Speak" onClick={() => speak(currentItem?.prompt ?? messages.at(-1)?.body ?? "")}>
                    <Volume2 size={14} />
                  </Button>
                </div>
              </div>

              {/* Chat messages */}
              <div ref={chatRef} className="flex-1 space-y-2.5 overflow-y-auto p-3 sm:p-4">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={message.role === "candidate" ? "ml-auto max-w-[88%]" : "mr-auto max-w-[88%]"}
                  >
                    <div
                      className={
                        message.role === "candidate"
                          ? "rounded-xl rounded-br-sm p-3 text-sm leading-6 text-[#14110e]"
                          : "rounded-xl rounded-bl-sm border border-border bg-surface-2 p-3 text-sm leading-6 text-foreground"
                      }
                      style={message.role === "candidate" ? { backgroundColor: chapter.color } : undefined}
                    >
                      {message.body}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-border p-3 sm:p-4">
                <div className="mb-2 rounded-lg border border-border bg-surface-2 p-2 text-[11px] leading-4 text-muted">
                  Formula: Definition + example + project + debugging/support + performance
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
                    <Button aria-label="Send" size="icon" className="h-8 w-8" onClick={submit}>
                      <Send size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quiz */}
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} style={{ color: chapter.color }} />
                <h2 className="text-sm font-semibold text-foreground">Smart Quiz</h2>
                <span className="ml-auto text-xs text-muted">Score: {quizScore}/{quizIndex}</span>
              </div>
              <div className="mt-3 rounded-lg border border-border bg-surface-2 p-3">
                <Badge variant={difficultyVariant(quizQuestion.difficulty)} className="text-[10px]">
                  Quiz {quizIndex + 1}
                </Badge>
                <h3 className="mt-2 text-sm font-semibold text-foreground">{quizQuestion.prompt}</h3>
                <div className="mt-3 grid grid-cols-1 gap-1.5">
                  {quizOptions(quizQuestion).map((option, index) => (
                    <Button
                      key={option}
                      variant="secondary"
                      className="h-auto justify-between p-2.5 text-left text-xs"
                      onClick={() => answerQuiz(index)}
                    >
                      <span className="line-clamp-2">{option}</span>
                      <ChevronRight size={13} className="shrink-0" />
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
