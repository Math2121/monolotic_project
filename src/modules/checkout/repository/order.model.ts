import { Table, Model, PrimaryKey, Column, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";

import ProductOrder from "./product.order.model";
import { ClientModel } from "../../client/gateway/repository/client.model";


@Table({
    tableName: 'order',
    timestamps: false
})
export default class OrderModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @ForeignKey(() => ClientModel)
    declare client_id: string;

    @BelongsTo(() => ClientModel)
    declare client: ClientModel;

    @HasMany(() => ProductOrder, { onUpdate: 'CASCADE' })
    declare products?: ProductOrder[];
}