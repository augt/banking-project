import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private institutionsService: InstitutionsService,
    private jwtService: JwtService,
  ) {}

  async login(body) {
    if (body.email) {
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

    if (body.privateKey) {
      const institution = await this.institutionsService.getOneById(body.id);
      let payload: object;

      if (institution) {
        await bcrypt.compare(body.privateKey, institution.privateKey).then((valid) => {
          if (!valid) {
            throw new UnauthorizedException();
          }
          return (payload = { sub: institution.id });
        });
      } else {
        throw new UnauthorizedException();
      }
      return {
        access_token: this.jwtService.sign(payload),
      };

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
