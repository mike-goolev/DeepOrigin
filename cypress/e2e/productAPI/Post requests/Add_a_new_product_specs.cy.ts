interface AddProductAPIResponse {
    id: number;
    title: string;
    // Add other properties as needed
}

describe("Products API testing", () => {
    it("Add a new product", () => {
        cy.request<AddProductAPIResponse>({
            method: 'POST',
            url: 'https://dummyjson.com/products/add',
            headers: { 'Content-Type': 'application/json' },
            body: { title: 'BMW Pencil' }

        }).then(response => {
            cy.log(JSON.stringify(response));

            // Validate response status
            expect(response.status).to.equal(200);

            // Validate product data
            expect(response.body.title).to.equal('BMW Pencil');
        });
    });
});
