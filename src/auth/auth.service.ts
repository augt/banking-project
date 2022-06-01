import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(body) {
    const user = await this.usersService.findOneByEmail(body.email);
    let payload: object;

    if (user) {
      await bcrypt.compare(body.password, user.password).then((valid) => {
        if (!valid) {
          throw new UnauthorizedException();
        }
        return (payload = { sub: user.id });
      });
    } else {
      throw new UnauthorizedException();
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
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
