import { Product } from "../models/product.model";

export interface ICatalogRepository{
    create(data:Product): Promise<Product>;
    update(data:Product): Promise<Product>;
    delete(id:any): Promise<null>;
    find():Promise<[]>;
    findOne(id:Number):Promise<Product>
}