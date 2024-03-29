import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { InstitutionsModule } from 'src/institutions/institutions.module';

@Module({
  imports: [
    UsersModule,
    InstitutionsModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET', // should be in env variables
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
