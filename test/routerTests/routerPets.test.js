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

describe("Pruebas router Mascotas", function(){
    this.timeout(10_000)

    // after, before???
    before(async()=>{
        // ?? borrar los mocks generados...
    })

    it("Si ejecuto la ruta /api/pets, el server responde con un objeto con la property status con valor success", async()=>{
        // let resultado=await requester.get("/api/pets")
        let {body}=await requester.get("/api/pets")
        expect(body).to.has.property("status").and.to.be.eq("success")

    })


    it("Si ejecuto la ruta /api/pets, el server responde con un objeto con la property payload que es un array", async()=>{
        // let resultado=await requester.get("/api/pets")
        let {body}=await requester.get("/api/pets")

        // console.log(resultado)

        expect(body).to.has.property("payload")
        expect(Array.isArray(body.payload)).to.be.true
 
    })

    it("Si ejecuto la ruta /api/pets, el server responde con un objeto con la property payload que es un array de mascotas", async()=>{
        // let resultado=await requester.get("/api/pets")
        let {body}=await requester.get("/api/pets")

        // console.log(resultado)

        if(Array.isArray(body.payload) && body.payload.length>0){
            expect(body.payload[0]._id).to.be.ok
            expect(isValidObjectId(body.payload[0]._id)).to.be.true
        }
    })

    it("Si ejecuto la ruta /api/pets, el server responde con status code 200", async()=>{
        // let resultado=await requester.get("/api/pets")
        let {status}=await requester.get("/api/pets")

        // console.log(resultado)

        expect(status).to.be.eq(200)
    })

    it("Si envio datos de una mascota válidos, a /api/pets, metodo POST, graba la mascta en DB", async()=>{
        let petMock={
            name:"Marshall", specie:"dog", birthDate:"2019-02-12"
        }

        let {body}=await requester.post("/api/pets").send(petMock)

        expect(body).to.has.property("payload")
        expect(body).to.has.property("status").and.to.be.eq("success")
        expect(body.payload).to.has.property("name").and.to.be.eq(petMock.name)
        expect(body.payload).to.has.property("specie").and.to.be.eq(petMock.specie)
        expect(body.payload).to.has.property("_id")
        expect(isValidObjectId(body.payload._id)).to.be.true

    })

    it("Si envio datos de una mascota invalidos, a /api/pets, metodo POST, el server responde con un status code 500", async()=>{
        let petMock={
            specie:"dog", birthDate:"2019-02-12"
        }

        let {statusCode}=await requester.post("/api/pets").send(petMock)

        expect(statusCode).to.be.eq(500)

    })

  
  



})