import { AllowNull, Column, Model, PrimaryKey, Table } from "sequelize-typescript"

@Table({
    tableName: 'products',
    timestamps: false
})
export default class ProductModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    id: string;


    @Column
    name: string;


    @Column
    salesPrice: number;

    @Column
    description: string;

    @Column
    category: string;

}