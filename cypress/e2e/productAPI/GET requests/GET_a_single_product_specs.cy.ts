interface ProductApiResponse {
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
    isDeleted?: boolean;
    deletedOn?: string;
}

describe("Products API testing", () => {
    it("GET Single Product API", () => {
        cy.request<ProductApiResponse>({
            method: 'GET',
            url: 'https://dummyjson.com/products/1'
        }).then(response => {
            // Validate status code
            expect(response.status).to.equal(200);

            // Validate response time
            expect(response.duration).to.be.lessThan(2000); // Assumption: Response time should be less than 2 seconds

            // Validate single product data
            const product = response.body;
            expect(product.id).to.equal(1);
            expect(product.title).to.equal('iPhone 9');
            expect(product.description).to.equal('An apple mobile which is nothing like apple');
            expect(product.price).to.equal(549);
            expect(product.discountPercentage).to.equal(12.96);
            expect(product.rating).to.equal(4.69);
            expect(product.stock).to.equal(94);
            expect(product.brand).to.equal('Apple');
            expect(product.category).to.equal('smartphones');
            expect(product.thumbnail).to.be.a('string');
            expect(product.images).to.be.an('array').that.is.not.empty;
            expect(product.isDeleted).to.be.true; // Assuming isDeleted is true after deletion
            expect(product.deletedOn).to.be.a('string'); // assumption that "ISOTime" is a string
        });
    });
});
