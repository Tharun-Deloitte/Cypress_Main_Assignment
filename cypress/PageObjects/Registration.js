class Registration{
    clickonsignup(){
        return cy.contains('Create an Account').click()
    }
    typefirstname(firstname){
        return cy.get('#firstname').type(firstname)
    }
    typelastname(lastname){
        return cy.get('#lastname').type(lastname)
    }
    typeemail(email){
        return cy.get('#email_address').type(email)
    }
    typepassword(password){
        return cy.get('#password').type(password)
    }
    typeconfirmationpassword(password){
        return cy.get('#password-confirmation').type(password)
    }
    getnewemailid(){
        return Math.random().toString(5).substring(2)+"@gmail.com"
    }
    clickcreateaccount(){
        return cy.get('.submit').click()
    }
    getinvalidemailtext(){
        return cy.get('#email_address-error')
    }
    getinvalidpasswordtext(){
        return cy.get('#password-error')
    }
    signupconfirmation(){
        return cy.get("div[data-bind*='html: $parent.prepareMessageForHtml(message.text)']").should('have.text','Thank you for registering with Main Website Store.')
    }
}

export default Registration;