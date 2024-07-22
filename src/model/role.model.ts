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

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  p_unlock_client: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  p_modify_client_status: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  p_create_client: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  p_delete_client: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  p_update_client: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  p_view_client: boolean;
}