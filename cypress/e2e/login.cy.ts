describe("Login test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("displays email and password input fields", () => {
    cy.get('[name="email"]').should("exist");
    cy.get('[name="password"]').should("exist");
  });
  it("displays login button", () => {
    cy.get('[data-test-id="button"]').should("exist");
  });

  it("submits login form", () => {
    cy.get('[name="email"]').type("test@example.com");
    cy.get('[name="password"]').type("password");

    cy.get("form").submit();

    cy.url().should("include", "/");
  });
  it("display error if user enter a not valid email ", () => {
    cy.visit("/login");
    cy.get("input[name=email]").type("islam");
    cy.get("input[name=password]").type(`islam{enter}`);
    cy.contains("Add Valid Email");
  });
});
