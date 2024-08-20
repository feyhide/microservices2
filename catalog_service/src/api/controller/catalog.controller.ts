import { NextFunction, Request, Response } from "express"
import { CatalogService } from "../../service/catalog.service"
import { CatalogRepository } from "../../repository/catalog.repository"

export const catalogService = new CatalogService(new CatalogRepository())

export const product = async (req:Request,res:Response,next:NextFunction) => {
    const data = await catalogService.createProduct(req.body)
    return res.status(201).json(data)
}