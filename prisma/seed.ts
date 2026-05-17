import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { chapters } from "../src/lib/content";

const prisma = new PrismaClient({
  adapter: new PrismaPg(process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/abap_mentor_os"),
});

async function main() {
  await prisma.aiInterviewLog.deleteMany();
  await prisma.revisionItem.deleteMany();
  await prisma.score.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.note.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.followup.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.chapter.deleteMany();

  for (const chapter of chapters) {
    const createdChapter = await prisma.chapter.create({
      data: {
        id: chapter.id,
        slug: chapter.slug,
        title: chapter.title,
        description: chapter.description,
        icon: chapter.icon,
        order: chapter.order,
        difficulty: chapter.difficulty,
      },
    });

    for (const question of chapter.questions) {
      await prisma.question.create({
        data: {
          id: question.id,
          slug: question.slug,
          chapterId: createdChapter.id,
          prompt: question.prompt,
          difficulty: question.difficulty,
          experienceLevel: question.experienceLevel,
          companyBadges: question.companyBadges,
          tags: question.tags,
          answers: { create: question.answers },
          followups: {
            create: question.followups.map((followup) => ({
              prompt: followup.prompt,
              category: followup.category,
              difficulty: followup.difficulty,
            })),
          },
        },
      });
    }
  }

  await prisma.user.upsert({
    where: { email: "demo@abapmentor.local" },
    update: {},
    create: { email: "demo@abapmentor.local", name: "Demo Learner" },
  });

  console.log(`Seeded ${chapters.length} chapters and ${chapters.flatMap((chapter) => chapter.questions).length} questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
