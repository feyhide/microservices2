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

    updateProduct(input:any){

    }

    fetchProducts(limit:number,offset:number){

    }

    fetchProduct(id:number){

    }

    deleteProduct(id:number){

    }
}
