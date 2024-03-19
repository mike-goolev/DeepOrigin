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

            // Validate response status - why 201 is failing after POST here????
            expect(response.status).to.equal(201);

            // Validate product data
            expect(response.body.title).to.equal('BMW Pencil');
            expect(response.body.id).to.equal(101);
        });
    });
});
