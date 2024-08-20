import request from 'supertest'
import express from 'express'
import { faker } from '@faker-js/faker';
import catalogRoutes from '../catalog.routes'
import { catalogService } from '../../controller/catalog.controller';
import { ProductFactory } from '../../../utils/fixtures';

const app = express()
app.use(express.json())
app.use(catalogRoutes)

const mockRequest = () => {
    return {
    name: faker.commerce.productName(), 
    description: faker.commerce.productDescription(), 
    stock: faker.number.int({ min: 1, max: 100 }), 
    price: +faker.commerce.price(), 
}};

describe("catalog routes",()=>{
    describe("POST /products",()=>{
        test("should create product",async()=>{
            const reqBody = mockRequest()
            const product = ProductFactory.build()
            jest.spyOn(catalogService,"createProduct")
                .mockImplementationOnce(()=>
                    Promise.resolve(product)
                )
            const response = await request(app)
                .post("/product")
                .send(reqBody)
                .set("Accept","application/json")

            console.log("TEST RESPONSE",response)
            expect(response.status).toBe(201)
            expect(response.body).toEqual(product)
        })

        test("should response with validation error",async()=>{
            const reqBody = mockRequest()
            
            const response = await request(app)
                .post("/product")
                .send({...reqBody,name:""})
                .set("Accept","application/json")

            console.log("TEST RESPONSE",response)
            expect(response.status).toBe(400)
            expect(response.body).toEqual("name should not be empty")
        })
    })
})