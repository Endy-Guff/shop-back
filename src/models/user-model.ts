import { model, Schema } from "mongoose"
import { transformMongoId } from "../tools/transform-mongo-id"

export interface IUserSchema {
    id: string
    email: string
    password: string
    name: string
    isActivated: boolean
    activationLink: string
    registrationDate: string
    avatar: string
}

const UserSchema = new Schema<IUserSchema>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    registrationDate: { type: String },
    avatar: { type: String },
})

transformMongoId(UserSchema)

export default model('User', UserSchema)