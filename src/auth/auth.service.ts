import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(body) {
    const user = await this.usersService.findOneByEmail(body.email);
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    }
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