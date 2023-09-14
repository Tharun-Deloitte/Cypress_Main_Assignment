// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('ReturnNumber', (price) => {
    price=price.trim()
    const array=price.split('$')
    return parseFloat(array[1])
  })


Cypress.Commands.add('newCampaignUSP', () => {
  
  cy.get('.cart-summary').then(ele=>{
    var subtotal=ele.find("span[data-th='Subtotal']").text()
    return subtotal

  })
  });

  Cypress.Commands.add('deleteitem', (productname) => {
    var price
      cy.contains('tbody',productname).then(ele=>{
          price=ele.find('.subtotal').text()
          cy.wrap(ele).find(".action.action-delete").click()    
      })
      return price        
    });