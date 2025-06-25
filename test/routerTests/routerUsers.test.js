import {expect} from "chai"
import { describe, it} from "mocha"
import supertest from "supertest"

import fs from "fs"

import mongoose, { isValidObjectId } from "mongoose"
// import { server } from "../src/app.js"

const requester=supertest("http://localhost:8080")
// const requester=supertest(server)

try {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/adoptions')
    /await mongoose.connect('mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=comisPruebas')
} catch (error) {
    console.log("error...")
}

describe("Pruebas router Users", function(){
    this.timeout(10_000)

    // after, before???
    before(async()=>{
        // ?? borrar los mocks generados...
    })

    it("Si ejecuto la ruta /api/users, el server responde con un objeto con la property status con valor success", async()=>{
        
        let {body}=await requester.get("/api/users")
        expect(body).to.has.property("status").and.to.be.eq("success")

    })


    it("Si ejecuto la ruta /api/users, el server responde con un objeto con la property payload que es un array", async()=>{
        
        let {body}=await requester.get("/api/users")

        expect(body).to.has.property("payload")
        expect(Array.isArray(body.payload)).to.be.true
 
    })

    it("Si ejecuto la ruta /api/users, el server responde con un objeto con la property payload que es un array de users", async()=>{
       
        let {body}=await requester.get("/api/users")

        if(Array.isArray(body.payload) && body.payload.length>0){
            expect(body.payload[0]._id).to.be.ok
            expect(isValidObjectId(body.payload[0]._id)).to.be.true
        }
    })

    it("Si ejecuto la ruta /api/users, el server responde con status code 200", async()=>{
        
        let {status}=await requester.get("/api/users")

        expect(status).to.be.eq(200)
    })

  it("Si envio datos de un usuario invalidos, a /api/users, metodo POST, el server responde con un status code 500", async()=>{
        let userMock={
            specie:"dog", birthDate:"2019-02-12"
        }

        let {statusCode}=await requester.post("/api/users").send(userMock)

        expect(statusCode).to.be.eq(500)

    })
    it("Si envio datos de un usuario validos, a /api/users, metodo POST, el server responde con un status code 200", async()=>{
        let userMock=        {
            "first_name": "Cathryn",
            "last_name": "Strosin",
            "email": "Madalyn.McLaughlin@gmail.com",
            "password": "$2b$10$mHqZygwiN9nuhQ74aZzCleo3KqqRurpNVjNHcS4GQdO2kaVusNJty",
            "role": "user",
            "pets": [],
            "_id": "b7ebef4e16f82ff2daf5adfa",
            "__v": 0
        }

    })
  



})