import { Prisma, PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";

const prisma = new PrismaClient();

const NUMBER_OF_PLAYERS = 10;

const players: Prisma.PlayerCreateInput[] = Array.from({
  length: NUMBER_OF_PLAYERS,
}).map((_, i) => ({
  email: faker.internet.email(),
  name: faker.name.firstName(),
  balance: 10000,
  joined_at: Date(),
}));

async function main() {
  await prisma.$transaction(
    players.map((player) =>
      prisma.player.create({
        data: player,
      })
    )
  );
}

main().finally(async () => {
  await prisma.$disconnect();
});
