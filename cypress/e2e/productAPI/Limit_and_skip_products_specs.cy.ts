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

describe("Products API testing", () => {
    it("", () => {
        const limit = 10;
        const skip = 10;
        const selectParams = 'title,price';

        cy.request<LimitAndSkipProductsAPIResponse>({
            method: 'GET',

            // passing "limit" and "skip" params to limit and skip the results for pagination
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
                expect(product).to.have.keys('title', 'price');
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
});
