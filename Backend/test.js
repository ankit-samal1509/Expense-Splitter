import { prisma } from './src/config/db.js';

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
}

main();