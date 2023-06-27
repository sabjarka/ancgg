
describe('CSGO Roll', () => {
    beforeEach(() => {
        cy.visit('https://csgoroll-www-master-h7r4kpopga-uc.a.run.app/dice', {
            auth: {
                username: 'ancient',
                password: 'things',
            }
        });
    })

    it('Check if +1 button is working', () => {
        cy.dataCy('clear').click()
        cy.dataCy('plus-1').click()
        cy.dataCy('bet-amount-input-fields').should('have.value', '1')
    });

    it('Check if +10 button is working', () => {
        cy.dataCy('clear').click()
        cy.dataCy('plus-10').click()
        cy.dataCy('bet-amount-input-fields').should('have.value', '10')
    });

    it('Check if 1/2 button is working', () => {

        cy.dataCy('clear').click()
        cy.dataCy('bet-amount-input-fields').type('10', { force: true })
        cy.dataCy('1-div-2').click()
        cy.dataCy('bet-amount-input-fields').should('have.value', '5')
        cy.dataCy('1-div-2').click()
        cy.dataCy('bet-amount-input-fields').should('have.value', '2.5')
    });

    it('Check if x2 button is working', () => {

        cy.dataCy('bet-amount-input-fields').clear({ force: true }).type('10', { force: true })
        cy.dataCy('x2').click()
        cy.dataCy('bet-amount-input-fields').should('have.value', '20')
        cy.dataCy('bet-amount-input-fields').clear({ force: true }).type('1.2', { force: true })
        cy.dataCy('x2').click()
        cy.dataCy('bet-amount-input-fields').should('have.value', '2.4')
    });

    it('Roll over/under test', () => {

        cy.get('[data-test="choice-label"]').then(($element) => {
            const innerText = $element.text();
            expect(innerText.trim().toUpperCase()).to.equal('ROLL UNDER')
        })

        cy.dataCy('threshold').invoke('val').then((res) => {
        }).as('previousThreshold')

        cy.dataCy('choice-switch').click()

        cy.get('@previousThreshold').then((previousThreshhold) => {
            cy.dataCy('threshold').should('not.have.value', previousThreshhold)
        })

        cy.get('[data-test="choice-label"]').then(($element) => {
            const innerText = $element.text();
            expect(innerText.trim().toUpperCase()).to.equal('ROLL OVER')
        })

        cy.dataCy('choice-switch').click()

        cy.get('@previousThreshold').then((previousThreshhold) => {
            cy.dataCy('threshold').should('have.value', previousThreshhold)
        })
    });


it('Updating inputs makes other inputs update test', () => {
    cy.dataCy('multiplier').invoke('val').then((res) => {
    }).as('previousMultiplier')

    cy.dataCy('profit-on-win').invoke('text').then((res) => {
        console.log(res)
    }).as('previousProfitOnWin')

    cy.dataCy('threshold').invoke('val').then((value) => {
        cy.dataCy('chance').clear({ force: true }).type('60', { force: true })
        cy.dataCy('threshold').should('not.have.value', value)
    })

    cy.get('@previousMultiplier').then((previousMultiplier) => {
        cy.dataCy('multiplier').should('not.have.value', previousMultiplier)
    })

    cy.get('@previousProfitOnWin').then((previousProfitOnWin) => {
        cy.dataCy('profit-on-win').invoke('text').should('not.equal', previousProfitOnWin)
    })
})

it('Updating Rolls count in Spray mode updates button text', () => {

    cy.dataCy('mode-batch').click()
    cy.contains('ROLL 2 TIMES')
    cy.dataCy('rolls-per-click').clear().type('5')
    cy.contains('ROLL 5 TIMES')
    cy.dataCy('rolls-per-click').clear().type('51')
    cy.get('#mat-error-3').should('have.text', '50 Max. ')
})

it('Dragging test', () => {
    cy.dataCy('threshold').invoke('val').then((val) => { }).as('previousThreshhold')
    cy.dataCy('multiplier').invoke('val').then((val) => { }).as('previousMultiplier')
    cy.dataCy('chance').invoke('val').then((val) => { }).as('previousChance')


    cy.get('.uo-range').click()

    cy.get('@previousThreshhold').then((previousThreshhold) => {
        cy.dataCy('threshold').should('not.have.value', previousThreshhold)
    })

    cy.get('@previousMultiplier').then((previousMultiplier) => {
        cy.dataCy('multiplier').should('not.have.value', previousMultiplier)
    })

    cy.get('@previousChance').then((previousChance) => {
        cy.dataCy('multiplier').should('not.have.value', previousChance)
    })

})
})
