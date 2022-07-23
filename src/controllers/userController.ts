import { Request, Response } from "express";

import * as services from "../services/usersServices.js";

export async function create(req:Request, res: Response) {
    const user = req.body;
    if(!user.email || !user.password || user.password !== user.confirmPassword) { 
        throw {type: "not_found"}
    }

    const signUp = await services.signUp(user)

    return res.status(201).send(signUp) // created
}

export async function login(req: Request, res: Response) {
    const user: services.CreateUserData = req.body;
    if(!user.email || !user.password) { throw { type: "not_found" } };

    const login = await services.login(user);

    return res.status(200).send(login); // ok
}