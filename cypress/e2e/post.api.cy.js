/// <reference types="cypress"/>

describe('Cadastro de dispositivos', () => {

    const payload_cadastro_device = require('../fixtures/cadastrar_device_sucesso.json')
    it('Cadastrar um dispositivo', () =>{

        const dataAtual = new Date().toISOString().slice(0, 10)

        

        //SEM COMMANDS:
        // cy.request({
        //     method: 'POST',
        //     url: '/objects',
        //     failOnStatusCode: false,
        //     body: body
        // }).as('postDeviceResult')


        //COM COMMANDS:
        cy.cadastrarDevice(payload_cadastro_device).then((response) => {
            expect(response.status).equal(200)

            expect(response.body.id).not.empty

            expect(response.body.createdAt).not.empty

            expect(response.body.createdAt.slice(0, 10)).equal(dataAtual)

            expect(response.body.name).equal('Celular da Qazando')            
        
            // console.log(response.body.createdAt.slice(0, 10))
            // console.log(new Date().toISOString().slice(0, 10))
        })
    })

    it('Cadastrar um dispositivo sem mandar dados', () =>{
        // cy.request({
        //     method: 'POST',
        //     url: '/objects',
        //     failOnStatusCode: false,
        //     body: ''
        // }).as('postDeviceResult')

         //COM COMMANDS E APENAS O THEN:
        cy.cadastrarDevice('')
        .then((response) => {//validações
            expect(response.status).equal(400)
            expect(response.body.error).equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')
        })

        //dificilmente não manda nada
    })
})
