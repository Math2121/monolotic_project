import { Model } from "sequelize-typescript";
import { AllowNull, Column, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'products',
    timestamps: false,
})
export class ProductModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    description: string;

    @AllowNull(false)
    @Column
    salesPrice: number;

    @AllowNull(false)
    @Column
    stock: number;

}