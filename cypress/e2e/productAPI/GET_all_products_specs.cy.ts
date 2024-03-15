interface ApiResponse {
    products: {
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
    }[];
    total: number;
    skip: number;
    limit: number;
}

describe("Products API testing", () => {
    it("GET Tags API", () => {
        cy.request<ApiResponse>({
            method: 'GET',
            url: 'https://dummyjson.com/products'
        }).then((response) => {
            cy.log(JSON.stringify(response));

            // Validate status code
            expect(response.status).to.equal(200);

            // Validate response time
            expect(response.duration).to.be.lessThan(3000); // Assumption: Response time should be less than 3 seconds

            // Validate body data response
            response.body.products.forEach((product, index) => {
                // Validate propertiy values of the first product[0]
                if (index === 0) {
                    expect(product.id).to.equal(1);
                    expect(product.title).to.equal('iPhone 9');
                    expect(product.description).to.equal('An apple mobile which is nothing like apple');
                    expect(product.price).to.equal(549);
                    expect(product.discountPercentage).to.equal(12.96);
                    expect(product.rating).to.equal(4.69);
                    expect(product.stock).to.equal(94);
                    expect(product.brand).to.equal('Apple');
                    expect(product.category).to.equal('smartphones');
                }

                // Validate common properties for all products
                expect(product.id).to.be.a('number');
                expect(product.title).to.be.a('string');
                expect(product.description).to.be.a('string');
                expect(product.price).to.be.a('number');
                expect(product.discountPercentage).to.be.a('number');
                expect(product.rating).to.be.a('number');
                expect(product.stock).to.be.a('number');
                expect(product.brand).to.be.a('string');
                expect(product.category).to.be.a('string');
                expect(product.thumbnail).to.be.a('string'); // asumption here that all products shuld have a small low-level resolution image of the product (thumbnail URL in the API response)
                expect(product.images).to.be.an('array').that.is.not.empty; // assumption here that all products should include images (picture names in the API response)
            });

            // Validate other property values
            expect(response.body.total).to.equal(100);
            expect(response.body.skip).to.equal(0);
            expect(response.body.limit).to.equal(30);

            // Validate header
            expect(response.headers).to.exist;
            expect(response.headers['content-type']).to.include('application/json');
        });
    });
});
