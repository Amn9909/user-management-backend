import { Injectable, NestMiddleware, UnauthorizedException, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthService } from 'src/auth/jwt.service';

require("dotenv").config();


@Injectable()
export class UserAuthentication implements NestMiddleware {
    private readonly logger = new Logger(UserAuthentication.name)
    constructor(
        private readonly authService: AuthService,
        private readonly jwtAuthService: JwtAuthService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        console.log(req.headers)
        const token = req?.headers?.authorization
        if (!token) {
            this.logger.debug('no token found !', token)
            throw new UnauthorizedException()
        }
        this.logger.debug('before token verification')
        const isAuthenticated = await this.jwtAuthService.verifyToken(token)
        this.logger.debug('after token verification', isAuthenticated)

        const roleData = isAuthenticated?.orgDetail?.map((org) => org.roleDetail) || []

        const permissions = isAuthenticated?.orgDetail?.roleDetail?.map((role) => role.permissions) || []

        if (isAuthenticated) {
            req.headers['roles'] = roleData
            req.headers['permissions'] = permissions
            req.headers['userId'] = isAuthenticated?.userId
            this.logger.debug('token validation authorized!!')
            next();
        } else {
            res.status(401).send('Unauthorized');
        }
    }
}