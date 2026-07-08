"use client";

import Link from "next/link";
import {
  Award,
  BookMarked,
  Clock,
  Flame,
  ListTodo,
  Target,
  TrendingUp,
} from "lucide-react";
import { getAllBtpMcqs, getAllBtpQuestions } from "@/lib/btp-content";
import { percent } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  computeStreak,
  countCompletedThisWeek,
  countCompletedToday,
  useBtpStudyStore,
} from "@/store/use-btp-study-store";

export function BtpDashboard() {
  const completed = useBtpStudyStore((s) => s.completed);
  const bookmarks = useBtpStudyStore((s) => s.bookmarks);
  const confidence = useBtpStudyStore((s) => s.confidence);
  const mcqResults = useBtpStudyStore((s) => s.mcqResults);
  const activityDates = useBtpStudyStore((s) => s.activityDates);
  const dailyGoal = useBtpStudyStore((s) => s.dailyGoal);
  const weeklyGoal = useBtpStudyStore((s) => s.weeklyGoal);

  const allQuestions = getAllBtpQuestions();
  const allMcqs = getAllBtpMcqs();
  const authoredCount = allQuestions.length;
  const completedIds = Object.keys(completed);
  const completedCount = completedIds.length;

  const learningProgressPct = percent(completedCount, authoredCount);

  const streak = computeStreak(activityDates);
  const todayDone = countCompletedToday(completed);
  const weekDone = countCompletedThisWeek(completed);

  // Topics where every authored question has been completed.
  const topicsByKey = new Map<string, { sectionSlug: string; topic: string; total: number; done: number }>();
  for (const q of allQuestions) {
    const key = `${q.sectionSlug}::${q.topic}`;
    const entry = topicsByKey.get(key) ?? { sectionSlug: q.sectionSlug, topic: q.topic, total: 0, done: 0 };
    entry.total += 1;
    if (q.id in completed) entry.done += 1;
    topicsByKey.set(key, entry);
  }
  const allTopics = Array.from(topicsByKey.values());
  const completedTopics = allTopics.filter((t) => t.total > 0 && t.done === t.total).length;

  // Weak areas: topics with at least one completed question rated "low" confidence.
  const weakTopics = Array.from(
    new Set(
      allQuestions.filter((q) => confidence[q.id] === "low").map((q) => q.topic),
    ),
  );

  const revisionPending = completedIds.filter((id) => confidence[id] === "low").length;

  const studyMinutes = allQuestions.reduce((sum, q) => (q.id in completed ? sum + q.estimatedMinutes : sum), 0);

  const mcqAttempts = Object.values(mcqResults).reduce((s, r) => s + r.attempts, 0);
  const mcqCorrect = Object.values(mcqResults).reduce((s, r) => s + r.correct, 0);
  const mcqAccuracy = mcqAttempts > 0 ? percent(mcqCorrect, mcqAttempts) : 0;

  // Interview readiness blends coverage of the FULL curriculum with MCQ accuracy.
  const fullCoveragePct = percent(completedCount, Math.max(authoredCount, 1));
  const interviewReadiness = Math.round(fullCoveragePct * 0.7 + mcqAccuracy * 0.3);

  const tiles = [
    { label: "Learning Progress", value: `${learningProgressPct}%`, Icon: TrendingUp },
    { label: "Current Streak", value: `${streak}d`, Icon: Flame },
    { label: "Completed Topics", value: `${completedTopics}/${allTopics.length}`, Icon: Award },
    { label: "Questions Solved", value: `${completedCount}/${authoredCount}`, Icon: ListTodo },
    { label: "Revision Pending", value: revisionPending, Icon: ListTodo, href: "/btp/revision" },
    { label: "Bookmarks", value: bookmarks.length, Icon: BookMarked, href: "/btp/revision" },
    { label: "Interview Readiness", value: `${interviewReadiness}%`, Icon: Target },
    { label: "Study Time", value: `${studyMinutes}m`, Icon: Clock },
  ];

  return (
    <div className="animate-fade-up mb-10">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold tracking-tight text-foreground">Your Dashboard</h2>
        {allMcqs.length > 0 && mcqAttempts > 0 && (
          <span className="text-[11px] text-muted">MCQ accuracy: {mcqAccuracy}%</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {tiles.map(({ label, value, Icon, href }) => {
          const tile = (
            <Card className="hover-lift flex h-full flex-col items-center gap-1 p-3 text-center sm:p-4">
              <Icon size={16} className="text-accent" />
              <span className="text-lg font-semibold text-foreground sm:text-xl">{value}</span>
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.06em] text-muted">{label}</span>
            </Card>
          );
          return href ? (
            <Link key={label} href={href}>
              {tile}
            </Link>
          ) : (
            <div key={label}>{tile}</div>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <Card className="p-3.5">
          <div className="mb-1.5 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-foreground">Daily Goal</span>
            <span className="text-muted">{todayDone} / {dailyGoal} questions</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="bg-gradient-accent h-full rounded-full transition-all duration-300"
              style={{ width: `${percent(todayDone, dailyGoal)}%` }}
            />
          </div>
        </Card>
        <Card className="p-3.5">
          <div className="mb-1.5 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-foreground">Weekly Goal</span>
            <span className="text-muted">{weekDone} / {weeklyGoal} questions</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="bg-gradient-accent h-full rounded-full transition-all duration-300"
              style={{ width: `${percent(weekDone, weeklyGoal)}%` }}
            />
          </div>
        </Card>
      </div>

      {weakTopics.length > 0 && (
        <Card className="mt-2.5 p-3.5">
          <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-faint">Weak Areas</h3>
          <div className="flex flex-wrap gap-1.5">
            {weakTopics.map((topic) => {
              const q = allQuestions.find((qq) => qq.topic === topic);
              return (
                <Link
                  key={topic}
                  href={q ? `/btp/${q.sectionSlug}` : "/btp"}
                  className="rounded-full border border-error/25 bg-error-soft px-2.5 py-1 text-[10px] font-medium text-error hover:border-error/40"
                >
                  {topic}
                </Link>
              );
            })}
          </div>
        </Card>
      )}

      {authoredCount === 0 && (
        <p className="mt-3 text-center text-[11px] text-muted">
          Complete a question anywhere in the app to start tracking your progress here.
        </p>
      )}
    </div>
  );
}
