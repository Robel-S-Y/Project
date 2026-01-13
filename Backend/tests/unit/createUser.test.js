import request from "supertest";
import express from "express";
import { createUser} from "../../controllers/userController.js";
import sequelize from "../../config/test-database.js";
import models from "../../models/index.js";


const {User} = models;

const app = express();
app.use(express.json());

app.post("/user",createUser);

describe("CreateUser",()=>{
    beforeAll(async() => {
        await sequelize.authenticate();
        models.sequelize =sequelize;
        User.sequelize =sequelize;
        await User.sync({ force: true});      
        process.env.JWT_SECRET = 'test-jwt-secret-key';
        process.env.JWT_SECRET_REFRESH = 'test-jwt-refresh-secret-key'; 
    })

    afterAll(async() => {
        await sequelize.close();
    })
    
    beforeEach(async()=>{
        await User.destroy({ where: {} })
    })

        it('it should create new user',async()=>{
            const userData ={
                name:"test", 
                role:"admin", 
                email:"test1@gmail.com", 
                password:"123456",
            }

            const res = await request (app)
            .post('/user')
            .send(userData)
            .expect(201)

            expect(res.body).toHaveProperty('id')
            expect(res.body.name).toBe(userData.name)
            expect(res.body.role).toBe(userData.role)
            expect(res.body.email).toBe(userData.email) 
        })
        it('it should return 500 for invalid data',async()=>{
            const InvaliduserData ={
                name:"test"
            }

            const res = await request (app)
            .post('/user')
            .send(InvaliduserData)
            .expect(500)

            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toBe("Failed to create user")
        })
    })

