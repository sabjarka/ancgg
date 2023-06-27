describe('Mocking Response data with Cypress GraphQL Apollo', () => {
  it('Mock graphql DiceBets test', () => {
    Cypress.on('uncaught:exception', () => {
      return false;
    });
    cy.intercept('GET', 'https://api-stage.csgoroll.com/graphql?operationName=DiceBets*', (req) => {

      req.reply((res) => {
        res.body.data.diceBets = [{}]
      })
    })
    cy.visit('https://csgoroll-www-master-h7r4kpopga-uc.a.run.app/dice', {
      auth: {
        username: 'ancient',
        password: 'things',
      }
    });
    cy.get('.mat-table > tbody > tr').should('have.length', 0)
  });
});