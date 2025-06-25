import UserDTO from "../../src/dto/User.dto.js";
import { describe, it } from "mocha"
import { expect, should } from "chai"

import Assert from "assert"
const assert = Assert.strict

should()

describe("Pruebas Users DTO", () => {

    // before, etc...???

    let userMock = {
        first_name: "Juan",
        last_name: "Roldan",
        email: "jroldan@test.com",
        password: "123", 
        role:"admin"
    }

    it("Si envío un usuario al DTO con first_name, y last_name, retona name, con la concatenación de ambos", () => {
        let resultado = UserDTO.getUserTokenFrom(userMock)

        // assert.equal(resultado.name, `${userMock.first_name} ${userMock.last_name}`)
        expect(resultado).to.has.property("name").and.to.be.eq(`${userMock.first_name} ${userMock.last_name}`)
        expect(resultado.name).to.be.equal(`${userMock.first_name} ${userMock.last_name}`)
    })

    it("Si envío un usuario al DTO, retona una prop. email", () => {
        let resultado = UserDTO.getUserTokenFrom(userMock)

        // assert.equal(resultado.name, `${userMock.first_name} ${userMock.last_name}`)
        expect(resultado).to.has.property("email")
        resultado.should.has.property("email")
    })

    it("Si envío un usuario al DTO, retona una prop. role", () => {
        let resultado = UserDTO.getUserTokenFrom(userMock)

        // assert.equal(resultado.name, `${userMock.first_name} ${userMock.last_name}`)
        expect(resultado).to.has.property("role")
        expect(resultado.role).to.exist
        expect(resultado.role).to.be.ok
    })

    it("Si envío un usuario al DTO sin role, retona una prop. role con valor undefined", () => {
        delete userMock.role
        let resultado = UserDTO.getUserTokenFrom(userMock)

        // assert.equal(resultado.name, `${userMock.first_name} ${userMock.last_name}`)
        expect(resultado.role).to.be.undefined
    })


})