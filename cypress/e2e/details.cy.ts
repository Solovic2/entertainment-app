describe("Details Page", () => {
  beforeEach(() => {
    cy.visit("/movie/123");
  });

  it("displays loading indicator while fetching movie details", () => {
    cy.get('[data-test-id="loading"]').should("exist");
  });

  it("displays error message if movie details fetch fails", () => {
    cy.visit("/movie/10200000");
    cy.get('[data-test-id="movie-details"]').should("not.exist");
  });

  it("displays movie details after successful fetch", () => {
    cy.get('[data-test-id="movie-details"]').should("exist");
  });

  it('displays trailer when "Play" button is clicked', () => {
    cy.get('[data-test-id="play-button"]').click();

    cy.get('[data-test-id="trailer-modal"]').should("exist");
  });

  it("displays similar movies section", () => {
    cy.get('[data-test-id="card"]').should("exist");
  });
});
