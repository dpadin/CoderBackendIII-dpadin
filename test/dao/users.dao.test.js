import Users from "../../src/dao/Users.dao.js";
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

describe("Pruebas al DAO de users", function(){
    this.timeout(10_000)

    // hacen falta before, after, beforeEach o el afterEach???
    
    before(async()=>{
        this.usersDAO=new Users()
        this.userMock={
            first_name:"test",
            last_name:"test",
            email:"test@test.com",
            password:"test",
        }
        
    })

    after(async()=>{
        await mongoose.connection.collection("users").deleteMany({email:"test@test.com"})
    })

    it("El metodo get devuelve un array de usuarios", async()=>{

        let resultado=await this.usersDAO.get()

        assert.equal(Array.isArray(resultado), true)
        if(Array.isArray(resultado) && resultado.length>0){
            assert.ok(resultado[0]._id)
            assert.ok(resultado[0].email)
        }
    })

    it("El metodo save enviando un usuario valido, lo graba en DB", async()=>{
        
        let resultado=await this.usersDAO.save(this.userMock)

        assert.ok(resultado._id)
        assert.equal(isValidObjectId(resultado._id), true)
        assert.ok(resultado.email)
        assert.ok(resultado.first_name)
        assert.equal(resultado.email, this.userMock.email)
        assert.equal(resultado.first_name, this.userMock.first_name)

        let consultaDB=await mongoose.connection.collection("users").findOne({email:this.userMock.email})
        assert.ok(consultaDB._id)

    })

})