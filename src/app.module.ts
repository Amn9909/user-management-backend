import { AppService } from './app.service';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAuthentication } from './middleware/user.authentication';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
require("dotenv").config();


@Module({
  imports: [
    SequelizeModule.forRoot({
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
    JwtModule.register({
      secret: process.env.JWT_SECRETE,
      signOptions: { expiresIn: '11h' }
    }),
    AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .exclude(
        { path: 'auth/login', method: RequestMethod.ALL },
        { path: 'horeca1-disco/s3update', method: RequestMethod.ALL },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}

