import Adoption from "../../src/dao/Adoption.js";

import mongoose, { isValidObjectId } from "mongoose";
import {describe, it} from "mocha"
import Assert from "assert"

const assert=Assert.strict

try {
    //await mongoose.connect('mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=comisPruebas')
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/adoptions')
} catch (error) {
    console.log(`Error al conectar a DB`)
}

describe("Pruebas al DAO de Adoptions", function(){
    this.timeout(10_000)

    // hacen falta before, after, beforeEach o el afterEach???
    
    before(async()=>{
        this.adoptionsDAO=new Adoption()
        this.adoptMock={
            uid:"test",
            pid:"test"            
        }
        
    })

    after(async()=>{
        await mongoose.connection.collection("adoptions").deleteMany({uid:"test"})
    })

    it("El metodo get devuelve un array de adoptions", async()=>{

        let resultado=await this.adoptionsDAO.get()

        assert.equal(Array.isArray(resultado), true)
        if(Array.isArray(resultado) && resultado.length>0){
            assert.ok(resultado[0]._id)             
        }
    })

    it("El metodo save enviando una mascota valida, lo graba en DB", async()=>{
        
        let resultado=await this.adoptionsDAO.save(this.adoptMock)

        assert.ok(resultado._id)
        assert.equal(isValidObjectId(resultado._id), true)
        

    })

})