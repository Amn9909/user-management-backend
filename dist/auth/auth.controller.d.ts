import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto/create.dto';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    createUser(userData: CreateUserDto, res: any): Promise<any>;
    login(body: LoginDto, res: any): Promise<any>;
    getAllUsers(res: any): Promise<any>;
    updateStatus(userId: number, status: boolean, res: any): Promise<any>;
}
