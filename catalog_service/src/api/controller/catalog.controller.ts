import { NextFunction, Request, Response } from "express"

export const product = async (req:Request,res:Response,next:NextFunction) => {
    return res.status(201).json({})
}