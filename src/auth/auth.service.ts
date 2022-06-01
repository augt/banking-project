import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

/* await bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            throw new BadRequestException() ;
          }

          if (user && valid) {
            const { password, ...result } = user;
            return result;
          }
          return null;
        })*/