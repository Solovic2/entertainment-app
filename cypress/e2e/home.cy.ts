describe("Home test", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("displays search input", () => {
    cy.get('[data-test-id="search-input"]').should("exist");
  });
  it("renders trending movies", () => {
    cy.get('[data-test-id="trendingCard"]').should("exist");
  });
  it("renders recommended movies", () => {
    cy.get('[data-test-id="card"]').should("exist");
  });
  it("loads search results when searching", () => {
    cy.get('[data-test-id="search-input"]').type("Cairo{enter}");
    cy.get('[data-test-id="card"]').should("exist");
    cy.get('[data-test-id="trendingCard"]').should("not.exist");
  });

  it("handles empty search query", () => {
    cy.get('[data-test-id="search-input"]').type("{enter}");
    cy.url().should("not.include", "q=");
    cy.get('[data-test-id="card"]').contains("Found").should("not.exist");
  });

  it("displays pagination for search results", () => {
    cy.get('[data-test-id="search-input"]').type("Avengers{enter}");
    cy.get('[data-test-id="search-pagination"]').should("exist");
  });

  it("loads next page of search results on pagination click", () => {
    cy.get('[data-test-id="search-input"]').type("Cairo{enter}");
    cy.get('[data-test-id="search-pagination"]').should("exist");
    cy.get('[data-test-id="search-pagination"]').children().click();
    cy.get('[data-test-id="loading"]').should("exist");
    cy.get('[data-test-id="card"]').should("exist");
  });
  it("should handle error state", () => {
    cy.visit("/?q=cairo&page=1000");
    cy.get('[data-test-id="error"]').should("exist");
  });
});
