interface DeleteProductAPIResponse {
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
    isDeleted: boolean;
    deletedOn: string;
}

describe("Products API testing", () => {
    it("Delete product with ID 1", () => {
        cy.request<DeleteProductAPIResponse>({
            method: 'DELETE',
            url: 'https://dummyjson.com/products/1',
            failOnStatusCode: false // To prevent Cypress from failing of non-2xx response
        }).then(response => {

            // Validate response status - 204 is failing???? 200 is not failing....
            expect(response.status).to.equal(204);
        });
    });
});
