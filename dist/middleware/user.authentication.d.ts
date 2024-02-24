import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthService } from 'src/auth/jwt.service';
export declare class UserAuthentication implements NestMiddleware {
    private readonly authService;
    private readonly jwtAuthService;
    private readonly logger;
    constructor(authService: AuthService, jwtAuthService: JwtAuthService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
