import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  async createUser(data: Partial<User>, password: string): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.usersRepository.save({ ...data, password: hashedPassword });
  }
}
