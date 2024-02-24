import { JwtService } from '@nestjs/jwt';
export declare class JwtAuthService {
    private readonly jwtService;
    private readonly logger;
    private readonly userDetailRepo;
    constructor(jwtService: JwtService);
    createToken(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    verifyToken(token: string): Promise<any>;
}
