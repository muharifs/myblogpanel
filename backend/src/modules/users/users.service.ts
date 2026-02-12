import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    return this.userRepo.findOne({
      where: { username },
    });
  }

  async create(username: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      username,
      password: hashedPassword,
      name,
    });

    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: number, name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepo.update(id, { name, password: hashedPassword });
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.userRepo.delete(id);

    if (!result.affected) throw new NotFoundException('User not found');

    return { message: 'User deleted' };
  }
}
