import { faker } from '@faker-js/faker';
import { ICatalogRepository } from "../../interface/catalogRepo.interface";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { Product } from '../../models/product.model';
import {Factory} from 'rosie'

const productFactory = new Factory<Product>()
    .attr("id",faker.number.int({min:1,max:1000}))
    .attr("name",faker.commerce.productName())
    .attr("description",faker.commerce.productDescription())
    .attr("stock",faker.number.int({min:10,max:100}))
    .attr("price",+faker.commerce.price())

const mockProduct = (rest:any) => ({
    name: faker.commerce.productName(), 
    description: faker.commerce.productDescription(), 
    stock: faker.number.int({ min: 1, max: 100 }), 
    price: +faker.commerce.price(), 
    ...rest
});

describe("catalogService",()=>{
    let repository: ICatalogRepository

    beforeEach(()=>{
        repository = new MockCatalogRepository()
    })
    
    describe("createProduct",()=>{
        test("should create product",async()=>{
            const service = new CatalogService(repository)
            const reqBody = mockProduct({})
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
            const reqBody = mockProduct({})
            
            jest
                .spyOn(repository,"create")
                .mockImplementationOnce(()=>Promise.resolve({} as Product))
            
            await expect(service.createProduct(reqBody))
                    .rejects.toThrow("unable to create products")
        })

        test("should throw error product already created",async()=>{
            const service = new CatalogService(repository)
            const reqBody = mockProduct({})
            
            jest
                .spyOn(repository,"create")
                .mockImplementationOnce(()=>
                    Promise.reject(new Error("product already created"))
                )
            
            await expect(service.createProduct(reqBody))
                    .rejects.toThrow("product already created")
        })
    })

    describe("updateProduct",()=>{
        test("should update product", async () => {
            const service = new CatalogService(repository)
            const reqBody = mockProduct({
                id: faker.number.int({min:10,max:1000})
            })
            const result = await service.updateProduct(reqBody)
            expect(result).toMatchObject(reqBody)
        })

        test("should throw error product not created",async()=>{
            const service = new CatalogService(repository)
            
            jest
                .spyOn(repository,"update")
                .mockImplementationOnce(()=>
                    Promise.reject(new Error("product not created"))
                )
            
            await expect(service.updateProduct({}))
                    .rejects.toThrow("product not created")
        })
    })

    describe("fetchProducts",()=>{
        test("should get products by offsets and limit",async()=>{
            const service = new CatalogService(repository)
            const randomLimit = faker.number.int({min:1,max:50})
            const products = productFactory.buildList(randomLimit)
            jest.spyOn(repository,"find")
                .mockImplementationOnce(()=>
                    Promise.resolve(products)
                )
            const result = await service.fetchProducts(0,0)

            expect(result.length).toEqual(randomLimit)
            expect(result).toMatchObject(products)
        })

        test("should throw error products not created",async()=>{
            const service = new CatalogService(repository)
            
            jest
                .spyOn(repository,"find")
                .mockImplementationOnce(()=>
                    Promise.reject(new Error("products not created"))
                )
            
            await expect(service.fetchProducts(0,0))
                    .rejects.toThrow("products not created")
        })
    })

    describe("fetchProduct",()=>{
        test("should get product by id",async()=>{
            const service = new CatalogService(repository)
            const product = productFactory.build()
            jest.spyOn(repository,"findOne")
                .mockImplementationOnce(()=>
                    Promise.resolve(product)
                )
            const result = await service.fetchProduct(product.id!)

            expect(result).toMatchObject(product)
        })

        test("should throw error product not created",async()=>{
            const service = new CatalogService(repository)
            
            jest
                .spyOn(repository,"findOne")
                .mockImplementationOnce(()=>
                    Promise.reject(new Error("product not created"))
                )
            
            await expect(service.fetchProduct(0))
                    .rejects.toThrow("product not created")
        })
    })

    describe("deleteProduct",()=>{
        test("should delete product by id",async()=>{
            const service = new CatalogService(repository)
            const product = productFactory.build()
            jest.spyOn(repository,"delete")
                .mockImplementationOnce(()=>
                    Promise.resolve({id:product.id})
                )
            const result = await service.deleteProduct(product.id!)

            expect(result).toMatchObject({
                id:product.id
            })
        })

        test("should throw error product not find to delete",async()=>{
            const service = new CatalogService(repository)
            
            jest
                .spyOn(repository,"delete")
                .mockImplementationOnce(()=>
                    Promise.reject(new Error("product not find to delete"))
                )
            
            await expect(service.deleteProduct(0))
                    .rejects.toThrow("product not find to delete")
        })
    })

    afterEach(()=>{
        repository = {} as MockCatalogRepository;
    })
})