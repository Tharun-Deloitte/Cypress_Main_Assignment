import LoginPage from "../PageObjects/LoginPage";
import shoppingPage from "../PageObjects/shoppingPage";
import CartPage from "../PageObjects/CartPage";


describe('TC6_selectProductWithoutSelectingSizeAndColour  <reg>', () => {

  var data;
  var ShoppingPage, cartpage, Login;

  before(() => {
    cy.fixture('example').then((regdata) => {
      data = regdata
    })
    Login = new LoginPage
    ShoppingPage = new shoppingPage
    cartpage = new CartPage
  })

  beforeEach(() => {
    cy.visit(Cypress.env('URL'))
    Login.clickonsignin()
    Login.typeemail(Cypress.env('EMAIL_ID'))
    Login.typepassword(Cypress.env('PASSWORD'))
    Login.clicksubmit()
    Login.validatelogin()
  })

  it('TC6_selectProductWithoutSelectingSizeAndColour', () => {
    Login = new LoginPage
    ShoppingPage = new shoppingPage
    cartpage = new CartPage
    cy.wait(5000)
    ShoppingPage.gotoJacketsWomen()
    ShoppingPage.clickonitem(W_Jacket1[0])
    ShoppingPage.clickaddtocart()
    ShoppingPage.verifyerrormsg()
    ShoppingPage.gotohoodiemen()
    ShoppingPage.getTotalproductscount()
    ShoppingPage.verifytotalproducts()
    ShoppingPage.typesearch('yoga')
    ShoppingPage.verifyRelatedsearchitems('yoga')
    ShoppingPage.selectfromrelatedsearch('yoga top')











  })

})