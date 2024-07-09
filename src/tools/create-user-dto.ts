import UserDto from "../dtos/userDto";
import { IUserSchema } from "../models/user-model";

export const createUserDto = (userData: IUserSchema): UserDto =>
    new UserDto(userData)