describe("Movies Page", () => {
  beforeEach(() => {
    cy.visit("/movies");
  });

  it("displays search input", () => {
    cy.get('[data-test-id="search-input"]').should("exist");
  });

  it("renders movie series by default", () => {
    cy.get('[data-test-id="card"]').contains("Found").should("not.exist");
    cy.get('[data-test-id="card"]').should("exist");
  });

  it("loads search results when searching", () => {
    cy.get('[data-test-id="search-input"]').type("Cairo{enter}");
    cy.get('[data-test-id="card-title"]').contains("Found").should("exist");
  });

  it("displays pagination for search results", () => {
    cy.get('[data-test-id="search-input"]').type("Cairo{enter}");
    cy.get('[data-test-id="search-pagination"]').should("exist");
  });

  it("loads next page of search results on pagination click", () => {
    cy.get('[data-test-id="search-input"]').type("Cairo{enter}");
    cy.get('[data-test-id="search-pagination"]').should("exist");
    cy.get('[data-test-id="search-pagination"]').children().click();
    cy.get('[data-test-id="loading"]').should("exist");
    cy.get('[data-test-id="card-title"]').contains("Found").should("exist");
  });
  it("should handle error state", () => {
    cy.visit("/movies?page=1000");
    cy.get('[data-test-id="card"]').should("not.exist");
  });
});
