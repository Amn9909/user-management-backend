import { UserDetail } from './models/user.model';
import { JwtAuthService } from './jwt.service';
import { CreateUserDto } from './dto/create.dto';
export declare class AuthService {
    private readonly userDetailRepo;
    private readonly JwtAuthService;
    private readonly logger;
    constructor(userDetailRepo: typeof UserDetail, JwtAuthService: JwtAuthService);
    createUser(userData: CreateUserDto): Promise<UserDetail>;
    login(loginData: any): Promise<any>;
    getAllUser(): Promise<UserDetail[]>;
    updateStatus(userId: number, status: boolean): Promise<[affectedCount: number]>;
}
