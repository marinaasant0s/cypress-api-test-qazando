/// <reference types="cypress"/>

describe('Buscar dispositivos', () => {

    it('Buscar um dispositivo específico', () =>{

        const device_id = '7'
        const device_name = 'Apple MacBook Pro 16'

        //SEM COMMANDS
        // cy.request({
        //     method: 'GET',
        //     url: `/objects/${device_id}`,
        //     failOnStatusCode: false
        // }).as('getDeviceResult')

        //COM COMMANDS:
        cy.buscarDeviceEspecifico(device_id).as('getDeviceResult') 
        
        // nota: pode usar o then direto também.
        cy.get('@getDeviceResult').then((response) => {
            expect(response.status).equal(200)

            expect(response.body.id).equal(device_id)

            expect(response.body.name).equal(device_name)

            expect(response.body).not.empty

            expect(response.body.data).not.empty

            expect(response.body.data.year).not.string
            expect(response.body.data.year).equal(2019)

            expect(response.body.data.price).not.string
            expect(response.body.data.price).equal(1849.99)

            expect(response.body.data['CPU model']).not.empty
            expect(response.body.data['Hard disk size']).not.empty
        })
    })

    it('Buscar um dispositivo inexistente', () =>{

        const device_id = 'xpto'

        //COM COMMANDS:
        // nota: pode usar o then direto também.
        cy.buscarDeviceEspecifico(device_id).then((response) => {
            expect(response.status).equal(404)

            expect(response.body.error).equal(`Oject with id=${device_id} was not found.`)
        })
    })
})