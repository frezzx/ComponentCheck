// src/modules/users/seed/user.seed.ts
import { DataSource } from 'typeorm';
import { Role, User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

export async function seedUsers(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);

  const existingAdmin = await userRepository.findOneBy({ email: 'admin@email.com' });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = userRepository.create({
      name: 'Admin',
      email: 'admin@email.com',
      password: hashedPassword,
      role: Role.ADMIN,
    });

    await userRepository.save(adminUser);
    console.log('✅ Admin user seeded');
  } else {
    console.log('ℹ️ Admin user already exists');
  }
}
