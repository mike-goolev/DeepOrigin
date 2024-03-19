interface LimitAndSkipProductsAPIResponse {
    products: {
        id: number;
        title: string;
        price: number;
    }[];
    total: number;
    skip: number;
    limit: number;
}

// Use cace with "limit" and "skip" equal to 10
describe("Products API testing", () => {
    it("Passing 'limit' and 'skip' params to limit and skip the results for pagination", () => {
        const limit = 10;
        const skip = 10;
        const selectParams = 'title,price';

        cy.request<LimitAndSkipProductsAPIResponse>({
            method: 'GET',
            url: `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=${selectParams}`
        }).then(response => {
            // Validate response status
            expect(response.status).to.equal(200);

        
            // Validate response body
            expect(response.body.products.length).to.equal(limit);
            expect(response.body.skip).to.equal(skip);
            expect(response.body.limit).to.equal(limit);

            // Validate selected properties for each product
            response.body.products.forEach(product => {
                expect(product).to.have.keys('id', 'title', 'price');
                expect(product.title).to.be.a('string');
                expect(product.price).to.be.a('number');
            });

            // Validate other properties
            expect(response.body.total).to.be.a('number');

            // Validate header
            expect(response.headers).to.exist;
            expect(response.headers['content-type']).to.include('application/json');
        });
    });
    
    // Use cace with "limit"=0
    it("Test fetching all items with limit=0", () => {
        const limit = 0;
        const selectParams = 'title,price';

        cy.request<LimitAndSkipProductsAPIResponse>({
            method: 'GET',
            url: `https://dummyjson.com/products?limit=${limit}&select=${selectParams}`
        }).then(response => {
            // Validate response status
            expect(response.status).to.equal(200);

            // Validate response body
            expect(response.body.products.length).to.equal(response.body.total); 
            expect(response.body.skip).to.equal(0); 
            expect(response.body.limit).to.equal(100);

            // Validate selected properties for each product
            response.body.products.forEach(product => {
                expect(product).to.have.keys('id', 'title', 'price');
                expect(product.id).to.be.a('number');
                expect(product.title).to.be.a('string');
                expect(product.price).to.be.a('number');
            });
        });
    });
});
