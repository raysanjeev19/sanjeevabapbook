import { allQuestions, chapters, requiredAnswerSections } from "@/lib/content";

describe("SAP interview content bank", () => {
  it("generates a broad chapter-wise question bank", () => {
    expect(chapters.length).toBeGreaterThanOrEqual(14);
    expect(allQuestions.length).toBeGreaterThanOrEqual(325);
  });

  it("includes every required answer section for every question", () => {
    for (const question of allQuestions) {
      expect(question.prompt).toBeTruthy();
      expect(Object.keys(question.answers).length).toBeGreaterThanOrEqual(requiredAnswerSections.length - 1);
      expect(question.answers.followupQuestions.length).toBeGreaterThan(0);
      expect(question.answers.advancedFollowupQuestions.length).toBeGreaterThan(0);
      expect(question.answers.hinglishMasterExplanation.length).toBeGreaterThan(120);
      expect(question.answers.interviewMeKyaBolnaHai).toContain("Interview Me Aap Aise Bol Sakte Ho");
      expect(question.answers.followupAnswerBank.length).toBeGreaterThanOrEqual(4);
      expect(question.followups.length).toBeGreaterThanOrEqual(8);
    }
  });

  it("covers advanced S/4HANA support topics", () => {
    const prompts = allQuestions.map((question) => question.prompt).join(" ");
    for (const topic of ["RAP", "AMDP", "CDS", "OData", "ST05", "SAT", "IDoc", "SOAMANAGER", "SICF", "SEGW"]) {
      expect(prompts).toContain(topic);
    }
  });
});
