describe("login page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("should show error message if either two column or both not fill", async () => {
    cy.findByPlaceholderText(/username or email/i).should("be.empty");
    cy.findByPlaceholderText(/password/i).should("be.empty");
    cy.get(".invalid-feedback").should("not.be.visible");
    cy.findByRole("button", { name: /sign in/i }).click();
    cy.get(".invalid-feedback").should("be.visible").and("have.lengthOf", 2);
    cy.findByPlaceholderText(/username or email/i).type("username");
    cy.findByPlaceholderText(/password/i).type("123");
    cy.findByText(/password to short/i).should("be.visible");
    cy.findByPlaceholderText(/password/i).type("12345678999999999999999999999999999999999");
    cy.findByText(/password to long/i).should("be.visible");
  });
});
