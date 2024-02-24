import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDetail } from './models/user.model';
import { JwtAuthService } from './jwt.service';
import { CreateUserDto } from './dto/create.dto';
require("dotenv").config();

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(
    @InjectModel(UserDetail) private readonly userDetailRepo: typeof UserDetail,
    private readonly JwtAuthService: JwtAuthService
  ) { }

  async createUser(userData: CreateUserDto) {
    console.log(userData)
    try {
      const user = await this.userDetailRepo.create({ ...userData })
      return user
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }


  async login(loginData) {
    const userData = await this.userDetailRepo.findOne({ where: { email: loginData?.email, password: loginData?.password } })
    if (!userData) {
      throw new HttpException('Wrong credentials try again', HttpStatus.BAD_REQUEST)
    } else {
      try {
        let token
        const tokenObj = { name: userData?.firstName + " " + userData?.lastName, email: userData?.email }
        token = this.JwtAuthService.createToken(tokenObj);
        return token
        // if (userData.accessToken) {
        //   try {
        //     const decoadedToken = await this.JwtAuthService.verifyToken(userData.accessToken)
        //   } catch (error) {
        //     await this.userDetailRepo.update({ active: false }, { where: { id: userData?.id } })
        //     throw error
        //   }
        // }
      } catch (error) {
        this.logger.error(error)
        throw error
      }
    }
  }
  async getAllUser() {
    try {
      const users = await this.userDetailRepo.findAll()
      return users
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async updateStatus(userId: number, status: boolean) {
    try {
      const users = await this.userDetailRepo.update({ active: status }, { where: { id: userId } })
      return users
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}  
