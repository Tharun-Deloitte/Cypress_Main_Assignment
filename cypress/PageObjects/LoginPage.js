class LoginPage{
    clickonsignin(){
        return cy.contains('Sign In').click()
    }
    typeemail(email){
        cy.get('#email').type(email)
    }
    typepassword(password){
        cy.get("input[name*='login[password]']").type(password)
    }
    clicksubmit(){
        cy.get("div.primary>button.primary").click()
    }
    validateerrormsg(){
        cy.get('.message-error').should('include.text','The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later').o
    }
    validatelogin(){
        cy.get('.logged-in').should('include.text','Welcome, Nara Tharun!')
    }

    ValidateLogoVisibility(){
        cy.get('.logo>img').should('be.visible')
    }



}
export default LoginPage;