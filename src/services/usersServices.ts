import { Users } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import * as repository from "../repositories/usersRepository.js"

export type CreateUserData = Omit<Users, "id">;

export async function signUp (createUserData: CreateUserData) {
    const user = await repository.findByEmail(createUserData.email);
    if(user) { 
        throw { type: "conflict", message: "Users must have unique emails" }; 
    };
    
    const passwordEncrypt = bcrypt.hashSync(createUserData.password, process.env.SALT);
    
    const createuser = await repository.insert(createUserData.email, passwordEncrypt);
    return { ... createuser};
}

export async function login (createUserData: CreateUserData) {
    const user = await repository.findByEmail(createUserData.email);
    if(!user) { throw { type: "unauthorized", message: "Incorrect email or password" }; };
    
    const authorization = bcrypt.compareSync(createUserData.password, user.password);
    if (!authorization) { throw { type: "unauthorized", message: "Incorrect email or password" }; };
    
    const userId = user.id
    const token = jwt.sign({userId}, process.env.JWT)

    return token
}