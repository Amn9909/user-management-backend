import { JwtService } from '@nestjs/jwt';
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtAuthService } from './jwt.service';
import { UserDetail } from './models/user.model';
require("dotenv").config();


@Module({
  imports: [
    SequelizeModule.forFeature(
      [
        UserDetail,
      ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtAuthService],
  exports: [AuthService, JwtAuthService]
})
export class AuthModule { }
