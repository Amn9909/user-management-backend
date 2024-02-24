import { ApiOperation, ApiBearerAuth, ApiParam, ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Controller, Post, Body, HttpStatus, Res, Logger, Get, Param, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto/create.dto';


@Controller()
@ApiBearerAuth()
export class AuthController {
  private readonly logger = new Logger(AuthController.name)
  constructor(private readonly authService: AuthService) { }


  @ApiOperation({ description: "to login in the system" })
  @Post('user')
  async createUser(@Body() userData: CreateUserDto, @Res() res) {
    try {
      const user = await this.authService.createUser(userData)
      return res.status(HttpStatus.OK).json(user)
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error)
    }
  }


  @ApiOperation({ description: "to login in the system" })
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res) {
    try {
      const result = await this.authService.login(body)
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error)
    }
  }

  @ApiOperation({ description: "to get all users " })
  @Get('users')
  async getAllUsers(@Res() res) {
    try {
      const result = await this.authService.getAllUser()
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error)
    }
  }

  @ApiOperation({ description: "to update user status" })
  @Patch('user/:userId/status/:status')
  async updateStatus(
    @Param('userId') userId: number,
    @Param('status') status: boolean,
    @Res() res
  ) {
    try {
      const result = await this.authService.updateStatus(userId, status)
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error)
    }
  }
}
