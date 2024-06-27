describe("Login test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("login to page", () => {
    cy.get('[data-test-id="button"]').click();

    cy.url().should("include", "/");
  });
});
