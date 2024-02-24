"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const app_service_1 = require("./app.service");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const sequelize_1 = require("@nestjs/sequelize");
const auth_module_1 = require("./auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
require("dotenv").config();
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply()
            .exclude({ path: 'auth/login', method: common_1.RequestMethod.ALL }, { path: 'horeca1-disco/s3update', method: common_1.RequestMethod.ALL })
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DATABASE,
                autoLoadModels: true,
                synchronize: true,
                models: [],
            }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRETE,
                signOptions: { expiresIn: '11h' }
            }),
            auth_module_1.AuthModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map