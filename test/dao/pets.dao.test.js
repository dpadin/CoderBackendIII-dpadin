import Pets from "../../src/dao/Pets.dao.js";

import mongoose, { isValidObjectId } from "mongoose";
import {describe, it} from "mocha"
import Assert from "assert"

const assert=Assert.strict

try {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/adoptions')
    //await mongoose.connect('mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=comisPruebas')
} catch (error) {
    console.log(`Error al conectar a DB`)
}

describe("Pruebas al DAO de Pets", function(){
    this.timeout(10_000)

    // hacen falta before, after, beforeEach o el afterEach???
    
    before(async()=>{
        this.petsDAO=new Pets()
        this.petMock={
            name:"test",
            specie:"test",    
            birthDate:"01-01-1000",        
        }
        
    })

    after(async()=>{
        await mongoose.connection.collection("pets").deleteMany({birthDate:"01-01-1000"})
    })

    it("El metodo get devuelve un array de mascotas", async()=>{

        let resultado=await this.petsDAO.get()

        assert.equal(Array.isArray(resultado), true)
        if(Array.isArray(resultado) && resultado.length>0){
            assert.ok(resultado[0]._id)
            assert.ok(resultado[0].birthDate)
        }
    })

    it("El metodo save enviando una mascota valida, lo graba en DB", async()=>{
        
        let resultado=await this.petsDAO.save(this.petMock)

        assert.ok(resultado._id)
        assert.equal(isValidObjectId(resultado._id), true)
        assert.ok(resultado.specie)
        assert.ok(resultado.name)
        assert.equal(resultado.name, this.petMock.name)

    })

})