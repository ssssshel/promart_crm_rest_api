import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'status', timestamps: false })
export class Status extends Model {
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
  name: string;
}
