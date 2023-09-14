import LoginPage from "../PageObjects/LoginPage";

describe('TC2_ Signup_Login  <smoke> <reg>', () => {

  var data,Login;
  before(() => {
    cy.fixture('example').then((regdata)=>{
      data=regdata
   })
   Login =new LoginPage
   
    })

    beforeEach(() => {
      cy.visit(Cypress.env('URL'))
      })

      it('InValid login', () => {
        Login.clickonsignin()
        Login.typeemail(data.email)
        Login.typepassword(data.invalidpassword)
        Login.clicksubmit()
        Login.validateerrormsg()
    })

    it('Valid login', () => {
        Login.clickonsignin()
        Login.typeemail(Cypress.env('EMAIL_ID'))
        Login.typepassword(Cypress.env('PASSWORD'))
        Login.clicksubmit()
        Login.validatelogin()
        Login.ValidateLogoVisibility()
        
    })

})