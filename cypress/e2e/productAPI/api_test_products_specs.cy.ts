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

            // Validate properties and values of the first product[0]
            const firstProduct = response.body.products[0];
            expect(firstProduct.id).to.equal(1);
            expect(firstProduct.title).to.equal('iPhone 9');
            expect(firstProduct.description).to.equal('An apple mobile which is nothing like apple');
            expect(firstProduct.price).to.equal(549);
            expect(firstProduct.discountPercentage).to.equal(12.96);
            expect(firstProduct.rating).to.equal(4.69);
            expect(firstProduct.stock).to.equal(94);
            expect(firstProduct.brand).to.equal('Apple');
            expect(firstProduct.category).to.equal('smartphones');

            // Validate additional properties: total, srip, limit
            expect(response.body.total).to.equal(100);
            expect(response.body.skip).to.equal(0);
            expect(response.body.limit).to.equal(30);
        });
    });
});
