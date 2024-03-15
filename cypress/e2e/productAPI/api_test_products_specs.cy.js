/// <reference types="cypress" />

describe("Products API testing", function () {

    it("GET Tags API", () => {
        cy.request({
            metthod : 'GET',
            url : 'https://dummyjson.com/products'
        }).then(response => {
            cy.log(JSON.stringify(response))

            // Validate status code
            expect(response.status).to.equal(200);

            // Validate properties and values of the first product[0]
            const firstProduct = response.body.products[0];
            expect(firstProduct).to.have.property('id').that.is.a('number').and.equal(1);
            expect(firstProduct).to.have.property('title').that.is.a('string').and.equal('iPhone 9');
            expect(firstProduct).to.have.property('description').that.is.a('string').and.equal('An apple mobile which is nothing like apple');
            expect(firstProduct).to.have.property('price').that.is.a('number').and.equal(549);
            expect(firstProduct).to.have.property('discountPercentage').that.is.a('number').and.equal(12.96);
            expect(firstProduct).to.have.property('rating').that.is.a('number').and.equal(4.69);
            expect(firstProduct).to.have.property('stock').that.is.a('number').and.equal(94);
            expect(firstProduct).to.have.property('brand').that.is.a('string').and.equal('Apple');
            expect(firstProduct).to.have.property('category').that.is.a('string').and.equal('smartphones');
        })
    })
})
