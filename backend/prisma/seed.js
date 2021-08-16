const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const todoData = [
  {
    name: "Work on Feature A",
    description: "Some description",
    tasks: {
      create: [
        {
          description: "Task A of FA",
        },
      ],
    },
  },
  {
    name: "Listen to the & album",
    description: "Some description",
    tasks: {
      create: [
        {
          description: "Paint the Town!",
        },
        {
          description: "WOW",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding...`);
  for (const t of todoData) {
    const todo = await prisma.todo.create({ data: t });
    console.log(`Created todo with id: ${todo.id}`);
  }
  console.log(`Seeding complete.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
