import { BelongsTo, Column, ForeignKey, Model, PrimaryKey } from "sequelize-typescript";
import { Table } from "sequelize-typescript/dist/model/table/table";
import InvoiceModel from "./invoice.model";
import { NonAttribute } from "sequelize";


@Table({ tableName: 'invoices_items' })
export default class InvoiceItemModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    declare invoice_id: string;

    @BelongsTo(() => InvoiceModel)
    declare invoice?: NonAttribute<InvoiceModel>;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;
}