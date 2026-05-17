export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type AnswerKey =
  | "simpleAnswer"
  | "detailedAnswer"
  | "hinglishExplanation"
  | "realInterviewExplanation"
  | "fresherExplanation"
  | "twoYearsExperiencedAnswer"
  | "s4hanaPerspective"
  | "realtimeProjectScenario"
  | "productionSupportScenario"
  | "debuggingScenario"
  | "performanceConsiderations"
  | "bestPractices"
  | "commonMistakes"
  | "hrStyleExplanation"
  | "technicalDeepDive"
  | "codeExamples"
  | "outputExamples"
  | "realSapTableExamples"
  | "realClientRequirementExample"
  | "realtimeTicketExample"
  | "interviewTips"
  | "interviewerExpectations"
  | "whatNotToSay"
  | "commonRejectionReasons"
  | "s4hanaMigrationImpact"
  | "hanaOptimizationConcepts"
  | "relatedCdsConcepts"
  | "relatedOdataConcepts"
  | "relatedEnhancementConcepts"
  | "relatedPerformanceTuningConcepts"
  | "relatedAuthorizationConcepts"
  | "relatedDebuggingConcepts"
  | "relatedTransportConcepts"
  | "relatedSupportIssueExamples"
  | "relatedProductionIssueFixes";

export type QuestionAnswer = Record<AnswerKey, string> & {
  trapQuestions: string[];
  crossQuestions: string[];
  followupQuestions: string[];
  advancedFollowupQuestions: string[];
  easyUnderstanding: string;
  hinglishMasterExplanation: string;
  interviewMeKyaBolnaHai: string;
  interviewerKyaSochtaHai: string;
  realtimeProjectExplanation: string;
  twoYearsExperienceQuestions: string;
  s4hanaHanaCdsOdataConnection: string;
  codeWalkthrough: string;
  debuggingSection: string;
  supportProjectSection: string;
  implementationProjectSection: string;
  memoryTricks: string;
  aiMentorPrompt: string;
  followupAnswerBank: FollowupAnswer[];
};

export type Followup = {
  id: string;
  prompt: string;
  category: string;
  difficulty: Difficulty;
};

export type FollowupAnswer = {
  question: string;
  hinglishExplanation: string;
  interviewAnswer: string;
  realtimeExplanation: string;
  mistakes: string;
  codeExample: string;
};

export type Question = {
  id: string;
  slug: string;
  chapterSlug: string;
  prompt: string;
  difficulty: Difficulty;
  experienceLevel: "Foundation" | "Project" | "Support" | "Implementation" | "Advanced";
  companyBadges: string[];
  tags: string[];
  answers: QuestionAnswer;
  followups: Followup[];
};

export type Chapter = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  difficulty: Difficulty;
  questions: Question[];
};
