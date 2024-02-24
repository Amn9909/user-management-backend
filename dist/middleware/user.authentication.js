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
var UserAuthentication_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthentication = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const jwt_service_1 = require("../auth/jwt.service");
require("dotenv").config();
let UserAuthentication = UserAuthentication_1 = class UserAuthentication {
    constructor(authService, jwtAuthService) {
        this.authService = authService;
        this.jwtAuthService = jwtAuthService;
        this.logger = new common_1.Logger(UserAuthentication_1.name);
    }
    async use(req, res, next) {
        var _a, _b, _c, _d;
        console.log(req.headers);
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!token) {
            this.logger.debug('no token found !', token);
            throw new common_1.UnauthorizedException();
        }
        this.logger.debug('before token verification');
        const isAuthenticated = await this.jwtAuthService.verifyToken(token);
        this.logger.debug('after token verification', isAuthenticated);
        const roleData = ((_b = isAuthenticated === null || isAuthenticated === void 0 ? void 0 : isAuthenticated.orgDetail) === null || _b === void 0 ? void 0 : _b.map((org) => org.roleDetail)) || [];
        const permissions = ((_d = (_c = isAuthenticated === null || isAuthenticated === void 0 ? void 0 : isAuthenticated.orgDetail) === null || _c === void 0 ? void 0 : _c.roleDetail) === null || _d === void 0 ? void 0 : _d.map((role) => role.permissions)) || [];
        if (isAuthenticated) {
            req.headers['roles'] = roleData;
            req.headers['permissions'] = permissions;
            req.headers['userId'] = isAuthenticated === null || isAuthenticated === void 0 ? void 0 : isAuthenticated.userId;
            this.logger.debug('token validation authorized!!');
            next();
        }
        else {
            res.status(401).send('Unauthorized');
        }
    }
};
UserAuthentication = UserAuthentication_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_service_1.JwtAuthService])
], UserAuthentication);
exports.UserAuthentication = UserAuthentication;
//# sourceMappingURL=user.authentication.js.map