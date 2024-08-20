import { faker } from '@faker-js/faker';
import { ICatalogRepository } from "../../interface/catalogRepo.interface";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { Product } from '../../models/product.model';

// Utility function to generate a mock product
const mockProduct = () => ({
    name: faker.commerce.productName(), 
    description: faker.commerce.productDescription(), 
    stock: faker.number.int({ min: 1, max: 100 }), 
    price: +faker.commerce.price(), 
});

describe("catalogService",()=>{
    let repository: ICatalogRepository

    beforeEach(()=>{
        repository = new MockCatalogRepository()
    })
    
    describe("createProduct",()=>{
        test("should create product",async()=>{
            const service = new CatalogService(repository)
            const reqBody = mockProduct()
            const result = await service.createProduct(reqBody)
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description:expect.any(String),
                price:expect.any(Number),
                stock:expect.any(Number),
            })
        })

        test("should throw error unable to create products",async()=>{
            const service = new CatalogService(repository)
            const reqBody = mockProduct()
            
            jest
                .spyOn(repository,"create")
                .mockImplementationOnce(()=>Promise.resolve({} as Product))
            
            await expect(service.createProduct(reqBody))
                    .rejects.toThrow("unable to create products")
        })

        test("should throw error product already created",async()=>{
            const service = new CatalogService(repository)
            const reqBody = mockProduct()
            
            jest
                .spyOn(repository,"create")
                .mockImplementationOnce(()=>
                    Promise.reject(new Error("product already created"))
                )
            
            await expect(service.createProduct(reqBody))
                    .rejects.toThrow("product already created")
        })
    })

    afterEach(()=>{
        repository = {} as MockCatalogRepository;
    })
})