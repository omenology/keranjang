describe("tes", () => {
  it("test", () => {
    cy.visit("https://www.google.com/");
    cy.findAllByText(/Google/i).should("have.lengthOf.gt", 2);
    cy.get("[name=q]").type("Cypress");
    assert.equal(1, 1, "1 is equal to 1");
  });
});

export {};
