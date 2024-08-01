/// <reference types="cypress"/>

describe('Alterar/Atualizar dispositivo', () => {

    const body_cadastro = require('../fixtures/cadastrar_device_sucesso.json')
    const body_update = require('../fixtures/update_device_sucesso.json')

    it('Alterar um dispositivo', () =>{
        
        //POST - requisição para cadastro
        // const body_cadastro = {
        //     "name": "Celular da Qazando",
        //     "data": {
        //        "year": 2023,
        //        "price": 999.99,
        //        "CPU model": "Intel Core i9",
        //        "Hard disk size": "1 TB",
        //        "owner": "Qazando LTDA"
        //     }
        // }

         //PUT - requisição para update
        //  const body_update = {
        //     "name": "Celular da Qazando - UPDATE",
        //     "data": {
        //        "year": 2023,
        //        "price": 999.99,
        //        "CPU model": "Intel Core i9",
        //        "Hard disk size": "1 TB",
        //        "owner": "Empresa Qazando LTDA"
        //     }
        // }

        //fazendo o post
        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body_cadastro //const
        }).as('postDeviceResult')

        //ve se esta tudo ok, pegar o result do cadastro
        cy.get('@postDeviceResult').then((response_post) => {
            expect(response_post.status).equal(200)
            expect(response_post.body.name).equal(body_cadastro.name)

            //fazendo o PUT
            cy.request({
                method: 'PUT',
                url: `/objects/${response_post.body.id}`,
                failOnStatusCode: false,
                body: body_update //const
            }).as('putDeviceResult')

            //validações do PUT
            cy.get('@putDeviceResult').then((response_put) => {
                expect(response_put.status).equal(200)
                expect(response_put.body.name).equal(body_update.name)

            })
        })
    })
})
