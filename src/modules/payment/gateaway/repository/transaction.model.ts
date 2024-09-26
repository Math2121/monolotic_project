import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: 'transactions' })
export default class TransactionModel extends Model{

    @PrimaryKey
    @Column
    id: string

    @Column
    orderId: string

    @Column
    amount: number

    @Column
    status: string

    @Column
    createdAt: Date

    @Column
    updatedAt: Date
}