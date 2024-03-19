interface CategoriesAPIResponse {
    categories: string[];
}

describe("Products API testing", () => {
    it("Get all products categories", () => {
        cy.request<CategoriesAPIResponse>({
            method: 'GET',
            url: 'https://dummyjson.com/products/categories'
        }).then(response => {
            // Log only the response body
            console.log(response.body);

            // Validate response status
            expect(response.status).to.equal(200);

            // Check response body is an array
            expect(response.body).to.be.an('array');

            // Check values of each category
            expect(response.body).to.eql([
                "smartphones",
                "laptops",
                "fragrances",
                "skincare",
                "groceries",
                "home-decoration",
                "furniture",
                "tops",
                "womens-dresses",
                "womens-shoes",
                "mens-shirts",
                "mens-shoes",
                "mens-watches",
                "womens-watches",
                "womens-bags",
                "womens-jewellery",
                "sunglasses",
                "automotive",
                "motorcycle",
                "lighting"
            ]);
        });
    });
});
