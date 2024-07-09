import { model, Schema } from "mongoose";
import { IUserSchema } from "./user-model";
import { transformMongoId } from "../tools/transform-mongo-id";

export interface ITokenSchema {
    user: IUserSchema
    refreshToken: string
}

const TokenSchema = new Schema<ITokenSchema>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
})

transformMongoId(TokenSchema)

export default model('Token', TokenSchema)