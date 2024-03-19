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
        // Fetch the product with the old title
        cy.request<UpdateProductAPIResponse>({
            method: 'GET',
            url: 'https://dummyjson.com/products/1'
        }).then(oldResponse => {
            const oldTitle = oldResponse.body.title;

            // Update the product with the new title
            cy.request<UpdateProductAPIResponse>({
                method: 'PUT',
                url: 'https://dummyjson.com/products/1',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    title: 'iPhone Galaxy +1'
                }
            }).then(newResponse => {
                cy.log(JSON.stringify(newResponse));

                // Validate response status
                expect(newResponse.status).to.equal(200);

                // Validate updated product data
                expect(newResponse.body.id).to.equal(1);
                expect(newResponse.body.title).to.equal('iPhone Galaxy +1');

                // Compare old and new titles
                expect(newResponse.body.title).to.not.equal(oldTitle);
            });
        });
    });
});
