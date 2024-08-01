/// <reference types="cypress"/>

describe('Deletar dispositivo', () => {

    it('Deletar um dispositivo', () =>{
        
        const body = {
            "name": "Celular da Qazando",
            "data": {
               "year": 2023,
               "price": 999.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }
        }

        //pegar o result do cadastro para pegar o id
        //SEM O COMMANDS:
        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body
        }).as('postDeviceResult')

        //ve se esta tudo ok, pegar o result do cadastrp
        cy.get('@postDeviceResult').then((response_post) => {
            expect(response_post.status).equal(200)

            //pega o criado e deleta
            cy.request({
                method: 'DELETE',
                url: `/objects/${response_post.body.id}`,
                failOnStatusCode: false,
            }).as('deleteDeviceResult')

        //validações do delete
            cy.get('@deleteDeviceResult').then((response_del) => {
                expect(response_del.status).equal(200)
                expect(response_del.body.message).equal(`Object with id = ${response_post.body.id} has been deleted.`)

            })
        })
    })

    it.only('Deletar um dispositivo inexistente', () =>{
    
        const id_inexistente = 'marina'
        //SEM O COMMANDS:

        //pega o criado e deleta
        // cy.request({
        //     method: 'DELETE',
        //     url: `/objects/${id_inexistente} `,
        //     failOnStatusCode: false,
        // }).as('deleteDeviceResult')

    //validações do delete
        // cy.get('@deleteDeviceResult').then((response_del) => {
        //     expect(response_del.status).equal(404)
        //     expect(response_del.body.error).equal(`Object with id = ${id_inexistente} doesn't exist.`)

        // })

        //COM O COMMANDS:
        cy.deletarDeviceInvalido(id_inexistente).then((response_del) => {//validações do delete
            expect(response_del.status).equal(404)
            expect(response_del.body.error).equal(`Object with id = ${id_inexistente} doesn't exist.`)

        })
    })

})
