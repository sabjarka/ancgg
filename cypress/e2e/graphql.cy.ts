describe('Graphql mocking tests', () => {
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


  it('Check response match from graphql into the table', () => {
    Cypress.on('uncaught:exception', () => {
      return false;
    });
    cy.intercept('GET', 'https://api-stage.csgoroll.com/graphql?operationName=DiceBets*', (req) => {
    }).as('DiceBets')
    cy.visit('https://csgoroll-www-master-h7r4kpopga-uc.a.run.app/dice', {
      auth: {
        username: 'ancient',
        password: 'things',
      }
    });
    cy.wait('@DiceBets').then((interception) => {
      cy.contains(interception.response?.body.data.diceBets.edges[0].node.chance)
    })
  });
});