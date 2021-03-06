
const loginTestUser = function () {
  // Visiting our app before each test removes any state build up from
  cy.visit('http://localhost:3000/')
    .get('.card')
    .should('be.visible')

  cy.location('pathname')
    .should('contain', '/login')

  cy.get('input[name=email]').as('inputEmail')
    .should('be.empty')
    .and('have.attr', 'placeholder', 'E-Mail')
  cy.get('input[name=password]').as('inputPassword')
    .should('be.empty')
    .and('have.attr', 'placeholder', 'Passwort')
  cy.get('@inputEmail')
    .trigger('focus')
    .type('test@test.de')
  cy.get('@inputPassword')
    .trigger('focus')
    .type('1234')

  cy.get('button[name=submit]').as('submitButton')
    .should('be.visible')
    .and('not.be.disabled')
    .click()

  cy.get('@submitButton')
    .should('has.class', 'is-loading')
    // .next('.snackbar')

  cy.location('pathname')
    .should('eq', '/')
}

describe('Basic HC Test', function () {
  context('Logged in', function () {
    // beforeEach(loginTestUser)

    it('Login Testuser', loginTestUser)

    it('Successfull Login with test user', function () {
      cy.location('pathname')
        .should('eq', '/')

      // notification button is present
      cy.get('nav')
        .should('be.visible')

      cy.get('.hc-navbar-notifications')
        .should('be.visible')
    })

    it('Open Own Profile Page', function () {
      cy.location('pathname')
        .should('eq', '/')

      cy.get('#user-menu')
        .should('be.visible')
        .click()

      cy.get('.hc-navbar-item[href="/profile"]')
        .should('be.visible')
        .click()

      cy.location('pathname')
        .should('eq', '/profile')
    })

    it('Go to Newsfeed by clicking the HC Logo', function () {
      cy.get('.hc-navbar-brand-logo')
        .click()
        .location('pathname')
        .should('eq', '/')
    })

    it('Using the search', function () {
      // click on first contribution card
      // and url starts with /contributions

      cy.location('pathname')
        .should('eq', '/')

      cy.get('#nav-search')
        .should('be.visible')
        .type('this will be an empty result #+ß')

      cy.get('.loader-no-data')
        .should('be.visible')

      cy.get('#nav-search')
        .should('be.visible')
        .clear()
    })

    it('Read a Contribution', function () {
      // click on first contribution card
      // and url starts with /contributions

      cy.location('pathname')
        .should('eq', '/')

      cy.get('.cards > .card:first-child()')
        .should('be.visible')
        .click()

      cy.location('pathname')
        .should('contain', '/contributions/')
    })

    it('Read a Contribution', function () {
      // click on first contribution card
      // and url starts with /contributions

      cy.location('pathname')
        .should('contain', '/contributions/')

      cy.get('.author')
        .click()

      cy.location('pathname')
        .should('contains', '/profile')
    })

    it('Open "More Info" page', function () {
      // click on first contribution card
      // and url starts with /contributions

      cy.get('.hc-navbar-brand-logo')
        .click()

      cy.location('pathname')
        .should('eq', '/')

      cy.get('.cards > .card:first-child()')
        .should('be.visible')
        .click()

      cy.location('pathname')
        .should('contain', '/contributions/')

      // click on more info
      cy.get('.menu-list > :nth-child(2) > a')
        .click({ force: true })

      cy.location('pathname')
        .should('contain', '/contributions/more-info/')
    })

    it('Open "Take-Action" page', function () {
      // click on first contribution card
      // and url starts with /contributions

      cy.get('.hc-navbar-brand-logo')
        .click()

      cy.location('pathname')
        .should('eq', '/')

      cy.get('.cards > .card:first-child()')
        .should('be.visible')
        .click()

      cy.location('pathname')
        .should('contain', '/contributions/')

      // click on take action
      cy.get('.menu-list > :nth-child(3) > a')
        .click({ force: true })

      cy.location('pathname')
        .should('contain', '/contributions/take-action/')
    })

    it('Create Contribution', function () {
      // click on first contribution card
      // and url starts with /contributions

      cy.get('.hc-navbar-brand-logo')
        .click()

      cy.location('pathname')
        .should('eq', '/')

      cy.get('.add-contribution')
        .should('be.visible')
        .click()

      cy.location('pathname')
        .should('contain', '/contributions/write')

      // cy.get('[data-test="title"]')
      //   .type('Test Title')

      // cy.get('.quill-editor')
      //   .type('This is my Test Content')

      // cy.get('#form-categoryIds > :nth-child(7)')
      //   .click()

      // cy.get('[data-test="submit"]')
      //   .click()
    })
  })
})
