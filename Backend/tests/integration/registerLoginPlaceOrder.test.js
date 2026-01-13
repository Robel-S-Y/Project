import request from "supertest";
import express from "express";
import { createOrders } from "../../controllers/orderController.js";
import { createUser,  login } from "../../controllers/userController.js";
import sequelize from "../../config/test-database";
import models from "../../models";
import { createTestRestaurant,createTestMenuItem } from "../../utils/testHelper.js";
import {requireAuthorization} from "../../utils/auth.js"

const {User,Restaurant,MenuItems,Orders,OrderItems} = models;

const app = express();
app.use(express.json());

app.post('/user', createUser)
app.post('/login', login)
app.post('/orders', requireAuthorization(["customer"]),createOrders)


describe("ordering flow: register -> login -> place order", ()=>{
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
            await createTestRestaurant(Restaurant, restaurantData)
            const restaurant = await Restaurant.findOne();
            await createTestMenuItem(MenuItems,{ ...MenuItemData, restaurantId: restaurant.id })
            await createTestMenuItem(MenuItems,{ ...MenuItemData2, restaurantId: restaurant.id })       
        })

        it('it should register, login, and place an order',async()=>{
            
            const registerRes = await request(app)
            .post('/user')
            .send(userData)
            .expect(201)

            expect(registerRes.body).toHaveProperty('id')
            expect(registerRes.body.name).toBe(userData.name)
            expect(registerRes.body.role).toBe("customer")
            expect(registerRes.body.email).toBe(userData.email)

            const loginRes=await request(app)
            .post('/login')
            .send(loginData)
            .expect(200);

            expect(loginRes.body).toHaveProperty('user')
            expect(loginRes.body).toHaveProperty('message')
            expect(loginRes.body).toHaveProperty('access_token')
            expect(loginRes.body).toHaveProperty('refresh_token') 
            expect(loginRes.body.message).toBe('Login successfull!')                       
            expect(loginRes.body.user.name).toBe(userData.name)
            expect(loginRes.body.user.role).toBe("customer")
            expect(loginRes.body.user.email).toBe(userData.email)

            const access_token=loginRes.body.access_token

            const restaurant = await Restaurant.findOne();
            const menuItems = await MenuItems.findAll();
            const orderData = {
                restaurantId: restaurant.id,
                Order_items: [
                    { menuItemId: menuItems[0].id, quantity: 2 },
                    { menuItemId: menuItems[1].id, quantity: 3 }
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
    })


