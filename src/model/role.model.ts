import { Model, Column, Table, DataType } from "sequelize-typescript";

@Table({ tableName: 'role', timestamps: false })
export class Role extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description?: string;
}