import { ICatalogRepository } from "../interface/catalogRepo.interface";

export class CatalogService{
    
    private _repository:ICatalogRepository

    constructor(repository: ICatalogRepository){
        this._repository = repository
    }


    createProduct(input:any){

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
