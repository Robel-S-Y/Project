import request from "supertest";
import express from "express";
import { updateOrderStatus } from "../../controllers/orderController.js";
import sequelize from "../../config/test-database.js";
import models from "../../models/index.js";
import { createTestUser,createTestRestaurant,loginTest,createTestMenuItem,createTestOrder } from "../../utils/testHelper.js";
import {requireAuthorization} from "../../utils/auth.js"

const {User,Restaurant,MenuItems,Orders,OrderItems} = models;

const app = express();
app.use(express.json());


app.patch("/orders/:id/status", requireAuthorization(["admin"]), updateOrderStatus);


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

let adminEmail;
let customerEmail;
let adminToken;
let customerToken;
let order;

beforeEach(async () => {
    const timestamp = Date.now();

    adminEmail = `admin${timestamp}@gmail.com`;
    customerEmail = `customer${timestamp}@gmail.com`;

    const admin = await createTestUser(User, {
        name: "admin",
        role: "admin",
        email: adminEmail,
        password: "123456"
    });

    const customer = await createTestUser(User, {
        name: "customer",
        role: "customer",
        email: customerEmail,
        password: "123456"
    });

    adminToken = await loginTest(User, { email: adminEmail, password: "123456" });
    customerToken = await loginTest(User, { email: customerEmail, password: "123456" });
    const restaurant = await createTestRestaurant(Restaurant, { name: "Injoy", location: "N/S/L" });
    const menuItem1=await createTestMenuItem(MenuItems, { name: "beyaynet", price: 10, restaurantId: restaurant.id });
    const menuItem2=await createTestMenuItem(MenuItems, { name: "kitfo", price: 100, restaurantId: restaurant.id });
    const orderData = {
    restaurantId: restaurant.id,
    Order_items: [
        { menuItemId: menuItem1.id, quantity: 20 },
        { menuItemId: menuItem2.id, quantity: 30 }
    ]
};
    order = await createTestOrder(Orders, OrderItems, orderData, customer.id);
});


        it("should allow admin to update status in correct sequence", async () => {
                        
            let res = await request(app)
            .patch(`/orders/${order.Order.created.id}/status`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ status: "preparing" })
            .expect(200);

            expect(res.body.Order.status).toBe("preparing");

            res = await request(app)
            .patch(`/orders/${order.Order.created.id}/status`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ status: "delivered" })
            .expect(200);

            expect(res.body.Order.status).toBe("delivered");
        });

        it("should block invalid sequence transitions", async () => {
        
        const res = await request(app)
        .patch(`/orders/${order.Order.created.id}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "delivered" })
        .expect(200);
        expect(res.body.message).toBe("Wrong sequence, status on pending cannot go directly to delivered!");
    });

    it("should reject redundant status updates", async () => {
        
        let res = await request(app)
        .patch(`/orders/${order.Order.created.id}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "pending" })
        .expect(200);
        expect(res.body.message).toBe("status is already on pending");

        await request(app)
        .patch(`/orders/${order.Order.created.id}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "preparing" })
        .expect(200);

        res = await request(app)
        .patch(`/orders/${order.Order.created.id}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "preparing" })
        .expect(200);
        expect(res.body.message).toBe("status is already on preparing");
    });

    it("should forbid downgrading from preparing → pending", async () => {
        await request(app)
        .patch(`/orders/${order.Order.created.id}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "preparing" })
        .expect(200);

        const res = await request(app)
        .patch(`/orders/${order.Order.created.id}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "pending" })
        .expect(200);
        expect(res.body.message).toBe("Order on a preparing mode cannot be set to pending.");
    });

    it("should forbid updates after delivered", async () => {
        await request(app)
        .patch(`/orders/${order.Order.created.id}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "preparing" })
        .expect(200);
        
        await request(app)
        .patch(`/orders/${order.Order.created.id}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "delivered" })
        .expect(200);

        const res = await request(app)
        .patch(`/orders/${order.Order.created.id}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "preparing" })
        .expect(200);
        expect(res.body.message).toBe("Order have been delivered already, cannot update status!");
    });

    it("should forbid non-admins from updating status", async () => {
        
        const res = await request(app)
        .patch(`/orders/${order.Order.created.id}/status`)
        .set("Authorization", `Bearer ${customerToken}`)
        .send({ status: "preparing" })
        .expect(403);
        expect(res.body.message).toBe("Forbidden!");
    });
    })


