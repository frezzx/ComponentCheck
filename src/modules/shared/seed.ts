import { AppDataSource } from "../../database/data-source";
import { seedUsers } from "../users/seed/seed.user";

async function runSeed() {
  await AppDataSource.initialize();
  console.log('📦 Database connected');

  await seedUsers(AppDataSource);

  await AppDataSource.destroy();
  console.log('Seed rodado!');
}

runSeed().catch((error) => {
  console.error('Erro ao rodar seed:', error);
  process.exit(1);
});
