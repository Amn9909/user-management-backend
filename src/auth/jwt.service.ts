import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDetail } from './models/user.model';


@Injectable()
export class JwtAuthService {
  private readonly logger = new Logger(JwtAuthService.name)
  @InjectModel(UserDetail) private readonly userDetailRepo: typeof UserDetail
  constructor(

    private readonly jwtService: JwtService,
  ){}
    async createToken(user: any) {
        try {
          const payload = user
          this.logger.debug('token payload', payload);
      
          const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '11h' });
          const refreshToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '7d' });
      
          return {
            access_token: accessToken,
            refresh_token: refreshToken,
          };
        } catch (error) {
          throw error;
        }
      }
      
    
      async verifyToken(token: string) {
        this.logger.log('verify token ->', token);
      
        try {
          const decoded = this.jwtService.verify(token.replace('Bearer ', ''), { secret: process.env.JWT_SECRET });
          if (decoded) {
            await this.userDetailRepo.update({ active: true }, { where: { id: decoded?.id } })
          }
          this.logger.debug('decoded token', decoded);
          return decoded;
        } catch (error) {
          throw new UnauthorizedException('Invalid token');
        }
      }
}
