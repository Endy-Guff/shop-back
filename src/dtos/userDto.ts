import { IUserSchema } from "../models/user-model";

export default class UserDto {
    email;
    id;
    isActivated;
    name;
    avatar

    constructor(model: IUserSchema) {
        this.id = model.id
        this.email = model.email
        this.isActivated = model.isActivated
        this.name = model.name
        this.avatar = model.avatar || null
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            isActivated: this.isActivated,
            name: this.name,
            avatar: this.avatar
        };
    }
}