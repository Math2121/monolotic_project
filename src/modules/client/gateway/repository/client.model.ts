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


    @Column({ allowNull: false })
    declare document: string;

    @Column({ allowNull: false })
    declare street: string;

    @Column({ allowNull: false })
    declare number: string;

    @Column({ allowNull: false })
    declare city: string;

    @Column({ allowNull: false })
    declare zipCode: string;

    @Column({ allowNull: false })
    declare state: string;

    @Column({ allowNull: false })
    declare complement: string

    @Column({ allowNull: false })
    createdAt: Date;

    @Column({ allowNull: false })
    updatedAt: Date;

}