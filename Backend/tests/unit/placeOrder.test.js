import request from "supertest";
import express from "express";
import { createOrders } from "../../controllers/orderController.js";
import sequelize from "../../config/test-database.js";
import models from "../../models/index.js";
import { createTestUser,createTestRestaurant,loginTest,createTestMenuItem } from "../../utils/testHelper.js";
import {requireAuthorization} from "../../utils/auth.js"

const {User,Restaurant,MenuItems,Orders,OrderItems} = models;

const app = express();
app.use(express.json());

app.post('/orders', requireAuthorization(["customer"]),createOrders)


describe("place Order",()=>{
    beforeAll(async() => {
        await sequelize.authenticate();
        models.sequelize =sequelize;
        User.sequelize =sequelize;
        await User.sync({ force: true});  
        Restaurant.sequelize =sequelize;
        await Restaurant.sync({ force: true});
        MenuItems.sequelize =sequelize;
        await MenuItems.sync({ force: true});  
        Orders.sequelize =sequelize;
        await Orders.sync({ force: true});
        OrderItems.sequelize =sequelize;
        await OrderItems.sync({ force: true});                             
        process.env.JWT_SECRET = 'test-jwt-secret-key';
        process.env.JWT_SECRET_REFRESH = 'test-jwt-refresh-secret-key'; 
    })

    afterAll(async() => {
        await sequelize.close();
    })
    
    beforeEach(async()=>{
        await User.destroy({ where: {} })
        await Restaurant.destroy({ where: {} })
        await Orders.destroy({ where: {} })
        await OrderItems.destroy({ where: {} })
        await MenuItems.destroy({ where: {} })
    })


            const userData ={
                name:"customer", 
                role:"customer", 
                email:"customer@gmail.com", 
                password:"123456",
            }

            const restaurantData ={
                name:"Injoy",
                location:"N/S/L"
            }
            const MenuItemData ={
                name:"beyaynet", 
                price:"10"
            }
            const MenuItemData2 ={
                name:"kitfo", 
                price:"100"
            }
            const loginData ={
                email:"customer@gmail.com", 
                password:"123456",
            }

        beforeEach(async()=>{
            await createTestUser(User, userData)
            await createTestRestaurant(Restaurant, restaurantData)
            const restaurant = await Restaurant.findOne()
            await createTestMenuItem(MenuItems,{ ...MenuItemData, restaurantId: restaurant.id })
            await createTestMenuItem(MenuItems,{ ...MenuItemData2, restaurantId: restaurant.id })            
        })

        it('it should create an order',async()=>{
            const access_token = await loginTest(User, loginData);

            const orderData ={
                "restaurantId": 1,
                "Order_items": [
                    { "menuItemId": 1, "quantity": 20 },
                    { "menuItemId": 2, "quantity": 30 }
                ]
                }


            const res = await request (app)
            .post('/orders')
            .set("Authorization", `Bearer ${access_token}`)
            .send(orderData)
            .expect(201)

            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('Order')
            expect(res.body.message).toBe("Order created successfully!")
            expect(res.body.Order.created.status).toBe("pending")                        
            expect(res.body.Order.created.restaurantId).toBe(orderData.restaurantId)
            expect(res.body.Order.OrderItems.createdOrderItems[0].menuItemId).toBe(orderData.Order_items[0].menuItemId)
            expect(res.body.Order.OrderItems.createdOrderItems[1].menuItemId).toBe(orderData.Order_items[1].menuItemId)
            expect(res.body.Order.OrderItems.createdOrderItems[0].quantity).toBe(orderData.Order_items[0].quantity)
            expect(res.body.Order.OrderItems.createdOrderItems[1].quantity).toBe(orderData.Order_items[1].quantity)            
        })

        it('it should return 500 for invalid data',async()=>{
            const access_token = await loginTest(User, loginData);
            const InvalidorderData ={
                restaurantId: 1,
            }

            const res = await request (app)
            .post('/orders')
            .set("Authorization", `Bearer ${access_token}`)
            .send(InvalidorderData)
            .expect(500)

            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toBe("Failed to create Orders")
        })

        it('it should return 401 for invalid data',async()=>{

            const orderData ={
                "restaurantId": 1,
                "Order_items": [
                    { "menuItemId": 1, "quantity": 20 },
                    { "menuItemId": 2, "quantity": 30 }
                ]
                }


            const res = await request (app)
            .post('/orders')
            .send(orderData)
            .expect(401)

            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toBe("Unauthorized!")
        })
    })


