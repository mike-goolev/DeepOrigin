interface UpdateProductAPIResponse {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

describe("Products API testing", () => {
    it("Update product with ID 1", () => {
        cy.request<UpdateProductAPIResponse>({
            method: 'PUT',
            url: 'https://dummyjson.com/products/1',
            headers: { 'Content-Type': 'application/json' },
            body: { title: 'iPhone Galaxy +1' }
        }).then(response => {
            cy.log(JSON.stringify(response));

            // Validate response status
            expect(response.status).to.equal(200);

            // Validate updated product data value
            expect(response.body.title).to.equal('iPhone Galaxy +1');

            // Validate other properties remain unchanged
            expect(response.body.id).to.equal(1);
            expect(response.body.description).to.equal("An apple mobile which is nothing like apple");
            expect(response.body.price).to.equal(549);
            expect(response.body.discountPercentage).to.equal(12.96);
            expect(response.body.rating).to.equal(4.69);
            expect(response.body.stock).to.equal(94);
            expect(response.body.brand).to.equal('Apple');
            expect(response.body.category).to.equal('smartphones');
        });
    });
});
