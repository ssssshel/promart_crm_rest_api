import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Status } from "./status.model";

@Table({ tableName: 'user_status', timestamps: false })
export class UserStatus extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  user_id: number;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  current_status_id: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false
  })
  change_status_date: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  changed_by_user_id?: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => User, 'changed_by_user_id')
  changed_by_user: User;

  @BelongsTo(() => Status, 'current_status_id')
  current_status: Status;
}
