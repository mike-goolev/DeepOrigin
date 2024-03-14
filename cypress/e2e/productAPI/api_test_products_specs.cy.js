/// <reference types="cypress" />

describe("Products API testing", function () {

        it("GET Tags API", () => {
            cy.request({
                metthod : 'GET',
                url : 'https://dummyjson.com/products'
            }).then(response => {
                cy.log(JSON.stringify(response))

                expect(response.status).to.equal(200)
            })
        })
    })
