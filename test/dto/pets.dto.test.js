import PetDTO from "../../src/dto/Pet.dto.js";
import { describe, it } from "mocha"
import { expect, should } from "chai"

import Assert from "assert"
const assert = Assert.strict

should()

describe("Pruebas Pets DTO", () => {

    let petsMock = {
        name: "Candie",
        specie: "Mestiza",
        brithDate: "12-30-2000"
        
    }

    it("Si envío un nombre chekcea que no este vacio", () => {
        let resultado = PetDTO.getPetInputFrom(petsMock)
  
        expect(resultado).to.has.property("name").and.to.be.eq(`${petsMock.name}`)

    })

    it("Si envío un pets al DTO, retona una prop. adpted = false", () => {
        let resultado = PetDTO.getPetInputFrom(petsMock)
        
        expect(resultado).to.has.property("adopted").and.to.be.eq(false)
        
    })

    it("Si envío un pets al DTO, retona una prop. birthdate ", () => {
        let resultado = PetDTO.getPetInputFrom(petsMock)

        // assert.equal(resultado.name, `${userMock.first_name} ${userMock.last_name}`)
        expect(resultado).to.has.property("birthDate")
                
    })

 


})