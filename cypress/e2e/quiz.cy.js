describe('Tech Quiz E2E Test', () => {
  it('runs through a full quiz flow', () => {
    cy.visit('http://localhost:5173');

    cy.contains('Start Quiz').click();

    for (let i = 0; i < 10; i++) {
      cy.get('button').contains('1').click();
    }

    cy.contains('Quiz Completed', { timeout: 6000 }).should('exist');
    cy.contains('Your score:').should('exist');

    cy.contains('Take New Quiz').click();

    cy.get('h2').should('exist');
  });
});


