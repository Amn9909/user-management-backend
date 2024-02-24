import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";



@Table({
    tableName: 'user_detail',
    timestamps: true,
    underscored: true,
    paranoid: true,
})
export class UserDetail extends Model {

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column({
        unique: true
    })
    email: string

    @Column
    password: string

    @Column({
        allowNull : true
    })
    active: boolean

    @Column({
        allowNull : true,
        type : DataType.TEXT
    })
    accessToken: string

    @Column({
        allowNull : true,
        type : DataType.TEXT
    })
    refreshToken: string

    @Column({ allowNull: true })
    createdBy: string;

    @Column({ allowNull: true })
    updatedBy: string;

    @Column({ allowNull: true })
    deletedBy: string;

}