import { IUserSchema } from "../models/user-model";

export default class UserDto {
    email;
    id;
    isActivated;
    name;
    avatar

    constructor(model: IUserSchema) {
        this.email = model.email
        this.id = model.id
        this.isActivated = model.isActivated
        this.name = model.name
        this.avatar = model.avatar
    }
}