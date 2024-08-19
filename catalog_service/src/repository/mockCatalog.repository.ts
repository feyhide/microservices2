import { ICatalogRepository } from "../interface/catalogRepo.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
    create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: any): Promise<null> {
        throw new Error("Method not implemented.");
    }
    find(): Promise<[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: Number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    
}
