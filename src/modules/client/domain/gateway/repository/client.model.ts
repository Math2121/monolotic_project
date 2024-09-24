import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: 'clients',
    timestamps: false,
})
export class ClientModel extends Model {
    @PrimaryKey
    @Column
    id: string;

    @Column
    name: string;

    @Column
    email: string;


    @Column
    address: string;

}