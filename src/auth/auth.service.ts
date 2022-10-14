import { sign, verify } from "jsonwebtoken";
import { hash, compare } from 'bcryptjs';
import { PrismaClient } from "@prisma/client";
import { ReqWithBody } from "../model/RequestModel";
import { Request, Response } from "express";
import { LoginDto, RegDto } from "./dto/auth.dto";

const cursor = new PrismaClient();
export default class AuthController {
    static async signup(req: ReqWithBody<RegDto>, res: Response) {
        try {
            // @ts-ignore
            const token: string = sign({ ...req.body, password: '' }, process.env.TOKEN);
            const password = await hash(req.body.password, 10);
            const user = await cursor.user.create({
                data: { ...req.body, token, password }
            });

            return res.status(201).json(user);
        } catch (error) {
            return res.status(403).json({ 
              msg: 'name or trailer is repeated.' 
            })
        }
    }
    static async signin(req: ReqWithBody<LoginDto>, res: Response) {
        try {
            const { email, password } = req.body;
            const getUser = await cursor.user.findUnique({ where: { email } });
            // @ts-ignore
            const passwordValid = await compare(password, getUser.password);

            if (getUser && passwordValid) {
                return res.status(200).json({ token: getUser.token });
            }
            return res.status(401).json({ msg: 'email or password not correct.' });
        } catch (error) {
            
        }
    }
    static tokenValidation(req: Request, res: Response) {
        try {
            //@ts-ignore
            const data = verify(req.headers['x-access-token'], process.env.TOKEN);
        
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({
              msg: 'token not found.'
            })
        }
    }
}