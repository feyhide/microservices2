import { ICatalogRepository } from "../interface/catalogRepo.interface";

export class CatalogService{
    
    private _repository:ICatalogRepository

    constructor(repository: ICatalogRepository){
        this._repository = repository
    }


    async createProduct(input:any){
        const data = await this._repository.create(input);
        if(!data.id){
            throw new Error("unable to create products")
        }
        return data
    }

    async updateProduct(input:any){
        const data = await this._repository.update(input)
        //emit event to update record in Elastic Search
        return data
    }

    //instead of this we will get product from elastic search
    async fetchProducts(limit:number,offset:number){
        const products = await this._repository.find(limit,offset)
        return products
    }

    async fetchProduct(id:number){
        const product = await this._repository.findOne(id)
        return product
    }

    async deleteProduct(id:number){
        const response = await this._repository.delete(id)
        if(!response.id){
            throw new Error("unable to create products")
        }
        //delete by elastic search
        return response
    }
}
