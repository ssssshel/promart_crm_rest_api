import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "./role.model";

@Table({ tableName: 'user' })
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
  })
  middle_name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password_hash: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  is_deleted: boolean;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;
}