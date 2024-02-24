"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JwtAuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthService = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./models/user.model");
let JwtAuthService = JwtAuthService_1 = class JwtAuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(JwtAuthService_1.name);
    }
    async createToken(user) {
        try {
            const payload = user;
            this.logger.debug('token payload', payload);
            const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '11h' });
            const refreshToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '7d' });
            return {
                access_token: accessToken,
                refresh_token: refreshToken,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async verifyToken(token) {
        this.logger.log('verify token ->', token);
        try {
            const decoded = this.jwtService.verify(token.replace('Bearer ', ''), { secret: process.env.JWT_SECRET });
            if (decoded) {
                await this.userDetailRepo.update({ active: true }, { where: { id: decoded === null || decoded === void 0 ? void 0 : decoded.id } });
            }
            this.logger.debug('decoded token', decoded);
            return decoded;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
__decorate([
    (0, sequelize_1.InjectModel)(user_model_1.UserDetail),
    __metadata("design:type", Object)
], JwtAuthService.prototype, "userDetailRepo", void 0);
JwtAuthService = JwtAuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtAuthService);
exports.JwtAuthService = JwtAuthService;
//# sourceMappingURL=jwt.service.js.map