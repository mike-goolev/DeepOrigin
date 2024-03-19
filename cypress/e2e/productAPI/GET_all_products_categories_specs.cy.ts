interface CategoriesAPIResponse {
    categories: string[];
}

describe("Products API testing", () => {
    it("Get all products categories", () => {
        cy.request<CategoriesAPIResponse>({
            method: 'GET',
            url: 'https://dummyjson.com/products/categories'
        }).then(response => {
            // Validate response status
            expect(response.status).to.equal(200);

            // Validate response body
            expect(response.body.categories).to.be.an('array').that.is.not.empty;

            // Validate each category is a string
            response.body.categories.forEach(category => {
                expect(category).to.be.a('string');
            });
        });
    });
});
