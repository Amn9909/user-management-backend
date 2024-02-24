"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetail = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let UserDetail = class UserDetail extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserDetail.prototype, "firstName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserDetail.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        unique: true
    }),
    __metadata("design:type", String)
], UserDetail.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserDetail.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true
    }),
    __metadata("design:type", Boolean)
], UserDetail.prototype, "active", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.TEXT
    }),
    __metadata("design:type", String)
], UserDetail.prototype, "accessToken", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.TEXT
    }),
    __metadata("design:type", String)
], UserDetail.prototype, "refreshToken", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", String)
], UserDetail.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", String)
], UserDetail.prototype, "updatedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true }),
    __metadata("design:type", String)
], UserDetail.prototype, "deletedBy", void 0);
UserDetail = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'user_detail',
        timestamps: true,
        underscored: true,
        paranoid: true,
    })
], UserDetail);
exports.UserDetail = UserDetail;
//# sourceMappingURL=user.model.js.map