import { Logger, Provider } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { EnvConfigProvider } from "../env-config-provider/env-config-provider";
import { User } from "src/model/user.model";
import { UserStatus } from "src/model/user-status.model";
import { Role } from "src/model/role.model";
import { Status } from "src/model/status.model";

export const sequelizeProvider: Provider = {
  provide: 'SEQUELIZE',
  useFactory: async (envConfigProvider: EnvConfigProvider) => {
    const sequelize = new Sequelize({
      dialect: 'postgres',
      database: envConfigProvider.getEnvVariable('DB_DATABASE'),
      username: envConfigProvider.getEnvVariable('DB_USERNAME'),
      password: envConfigProvider.getEnvVariable('DB_PSW'),
      host: envConfigProvider.getEnvVariable('DB_HOST'),
      port: Number.parseInt(envConfigProvider.getEnvVariable('DB_PORT')),
      logging: (msg) => Logger.log(msg, 'Sequelize'),
      models: [User, UserStatus, Role, Status]
    })

    await sequelize.sync()
    return sequelize
  },
  inject: [EnvConfigProvider]
}