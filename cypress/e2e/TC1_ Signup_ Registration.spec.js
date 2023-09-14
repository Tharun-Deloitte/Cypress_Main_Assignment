import Registration from "../PageObjects/Registration";

describe('TC1_ Signup_ Registration <smoke> <reg>', () => {
  var data,signup;
  before(() => {
    cy.fixture('example').then((regdata)=>{
      data=regdata
   })
   signup=new Registration
    })

    beforeEach(() => {
      cy.visit(Cypress.env('URL'))
      signup.clickonsignup()
      })

  it('Invalid EmailID', () => {
    signup.typefirstname(data.firstname)
    signup.typelastname(data.lastname)
    signup.typeemail(data.invalidemail)
    signup.clickcreateaccount()
    signup.getinvalidemailtext().should('include.text',data.emailerror)
  })

  it('empty EmailID', () => {
    signup.typefirstname(data.firstname)
    signup.typelastname(data.lastname)
    signup.typepassword(data.password)
    signup.clickcreateaccount()
    signup.getinvalidemailtext().should('include.text',data.requeriedfield)
  })

  it('empty password', () => {
    signup.typefirstname(data.firstname)
    signup.typelastname(data.lastname)
    signup.clickcreateaccount()
    signup.getinvalidpasswordtext().should('include.text',data.requeriedfield)
  })

  it('empty emailid and password', () => {
    signup.typefirstname(data.firstname)
    signup.typelastname(data.lastname)
    signup.clickcreateaccount()
    signup.getinvalidemailtext().should('include.text',data.requeriedfield)
    signup.getinvalidpasswordtext().should('include.text',data.requeriedfield)
  })

  it('Valid Registration', () => {
    signup.typefirstname(data.firstname)
    signup.typelastname(data.lastname)
    signup.typeemail(signup.getnewemailid())
    signup.typepassword(data.password)
    signup.typeconfirmationpassword(data.password)
    signup.clickcreateaccount()
    signup.signupconfirmation()
  })
})