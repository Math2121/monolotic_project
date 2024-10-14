import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceItemModel from "./invoice.item.model";
import { NonAttribute } from "sequelize";


@Table({ tableName: 'invoices' })
export default class InvoiceModel extends Model {
    
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare document: string;

    @Column({ allowNull: false })
    declare street: string;

    @Column({ allowNull: false })
    declare number: string;

    @Column({ allowNull: false })
    declare complement: string;

    @Column({ allowNull: false })
    declare city: string;

    @Column({ allowNull: false })
    declare state: string;

    @Column({ allowNull: false })
    declare zipCode: string;

    @HasMany(() => InvoiceItemModel)
    declare items?: NonAttribute<InvoiceItemModel[]>;

    @Column({ allowNull: false })
    declare total: number;

    @Column({ allowNull: false })
    declare createdAt: Date;
}