import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigProvider } from './infraestructure/configuration/env-config-provider/env-config-provider';
import { SequelizeModule } from "@nestjs/sequelize"
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';
import { User } from './model/user.model';
import { UserStatus } from './model/user-status.model';
import { Status } from './model/status.model';
import { Role } from './model/role.model';
import { sequelizeProvider } from './infraestructure/configuration/sequelize-provider/sequelize-provider';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infraestructure/auth/jwt.strategy';
import { UserStatusService } from './service/user-status/user-status.service';
import { UserStatusController } from './controller/user-status/user-status.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PSW,
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT, 3000),
      logging: (msg) => Logger.log(msg, 'Sequelize'),
      models: [User, UserStatus, Role, Status],

    }),
    SequelizeModule.forFeature([User, UserStatus, Role, Status]),
    PassportModule,
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      signOptions: { expiresIn: '30m' }
    })
  ],
  controllers: [AppController, UserController, AuthController, UserStatusController],
  providers: [AppService, EnvConfigProvider, UserService, sequelizeProvider, AuthService, JwtStrategy, UserStatusService],
})
export class AppModule { }
