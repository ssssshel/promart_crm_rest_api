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
      port: Number.parseInt(process.env.DB_PORT, 10),
      logging: (msg) => Logger.log(msg, 'Sequelize'),
      models: [User, UserStatus, Role, Status],

    }),
    SequelizeModule.forFeature([User, UserStatus, Role, Status])
  ],
  controllers: [AppController, UserController],
  providers: [AppService, EnvConfigProvider, UserService, sequelizeProvider],
})
export class AppModule { }
