import { Model } from "sequelize-typescript";
export declare class UserDetail extends Model {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    active: boolean;
    accessToken: string;
    refreshToken: string;
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
}
