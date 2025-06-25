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
 
} catch (error) {
    console.log("error...")
}

describe("Pruebas router Adoptions", function(){
    this.timeout(10_000)

    // after, before???
    before(async()=>{
        // ?? borrar los mocks generados...
    })

    it("Si ejecuto la ruta /api/Adoptions, el server responde con un objeto con la property status con valor success", async()=>{
        
        let {body}=await requester.get("/api/adoptions")
        expect(body).to.has.property("status").and.to.be.eq("success")

    })


    it("Si ejecuto la ruta /api/adoptions, el server responde con un objeto con la property payload que es un array", async()=>{
        
        let {body}=await requester.get("/api/adoptions")

        expect(body).to.has.property("payload")
        expect(Array.isArray(body.payload)).to.be.true
 
    })

    it("Si ejecuto la ruta /api/adoptions, el server responde con un objeto con la property payload que es un array de adoptions", async()=>{
       
        let {body}=await requester.get("/api/adoptions")

        if(Array.isArray(body.payload) && body.payload.length>0){
            expect(body.payload[0]._id).to.be.ok
            expect(isValidObjectId(body.payload[0]._id)).to.be.true
        }
    })

    it("Si ejecuto la ruta /api/adoptions, el server responde con status code 200", async()=>{
        
        let {status}=await requester.get("/api/adoptions")

        expect(status).to.be.eq(200)
    })

  it("Si envio datos de un adoptions invalidos, a /api/adoptions, metodo POST, el server responde con un status code 500", async()=>{
       
        let adoptionsMock="/f5ea66d306aafa2dd6f537a0/cde2809c6dcbde9e92dbc3ea"

        let {statusCode}=await requester.post("/api/adoptions" + adoptionsMock)

        expect(statusCode).to.be.eq(500)

    })
    it("Si envio datos de una adoption validos, a /api/adoptions, metodo POST, el server responde con un status code 200", async()=>{
        let adoptionsMock=        {
                    owner:{
                    type:mongoose.SchemaTypes.ObjectId,
                    ref:'Users'
                },
                pet:{
                    type:mongoose.SchemaTypes.ObjectId,
                    ref:'Pets'
    }

            }
        
        let {statusCode}=await requester.post("/api/adoptions").send(adoptionsMock)
    

    })
  



})