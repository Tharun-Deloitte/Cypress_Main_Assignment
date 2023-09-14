// <reference types="cypress" />
import LoginPage from "../PageObjects/LoginPage";
import shoppingPage from "../PageObjects/shoppingPage";
import Checkout from "../PageObjects/CheckOutPage";
import OrderSuccess from "../PageObjects/OrderSuccessPage";
import CartPage from "../PageObjects/CartPage";
import PaymentPage from "../PageObjects/PaymentPage";


describe('TC3_PS_SameCategory  <reg>', () => {

  var data;
  var Login;
  var ShoppingPage, checkout, ordersuccess, cartpage, paymentpage
  before(() => {
    cy.fixture('example').then((regdata) => {
      data = regdata
    })
    Login = new LoginPage
    ShoppingPage = new shoppingPage
    checkout = new Checkout
    ordersuccess = new OrderSuccess
    cartpage = new CartPage
    paymentpage = new PaymentPage
  })

  beforeEach(() => {
    cy.visit(Cypress.env('URL'))
    Login.clickonsignin()
    Login.typeemail(Cypress.env('EMAIL_ID'))
    Login.typepassword(Cypress.env('PASSWORD'))
    Login.clicksubmit()
    Login.validatelogin()
  })

  it('TC3_PS_SameCategory', () => {

    ShoppingPage.DeleteCartItemsIfAny()
    ShoppingPage.gotoJacketsWomen()
    ShoppingPage.clickonitem(data.W_Jacket1[0])

    ShoppingPage.selectcolourandsize('Blue', 'XS')
    ShoppingPage.clickaddtocart()

    ShoppingPage.verifyaddedtocartmsg(data.W_Jacket1[0])
    cy.go('back')
    ShoppingPage.clickonitem(data.W_Jacket2[0])

    ShoppingPage.selectcolourandsize('Blue', 'XS')
    ShoppingPage.clickaddtocart()

    ShoppingPage.verifyaddedtocartmsg(data.W_Jacket2[0])

    ShoppingPage.clickmycart()

    ShoppingPage.VerifyItemsInFloatingCart(data.W_Jacket1[0], data.W_Jacket1[1], data.W_Jacket1[2])
    ShoppingPage.VerifyItemsInFloatingCart(data.W_Jacket2[0], data.W_Jacket2[1], data.W_Jacket2[2])

    ShoppingPage.clickonViewandEditCart()
    cartpage.VerifyCartPageIsVisible()

    cartpage.Validatecartitems(data.W_Jacket1[0], data.W_Jacket1[1], data.W_Jacket1[2])
    cartpage.Validatecartitems(data.W_Jacket2[0], data.W_Jacket2[1], data.W_Jacket2[2])

    cartpage.ValidatePriceMulQuantity()
    cartpage.VerifySumofIndividualAmountEqualsSutotal()
    cartpage.VerifyTotalAmount()
    cartpage.ClickOnProceedToCheckOut()

    // CheckOut.clickonNext()
    // CheckOut.errormsg()
    // CheckOut.selectshippingmethod()
    // CheckOut.clickonNext()
    checkout.VerifyOrderSummaryPageIsDisplayed()
    checkout.ClickOnNewAddress()
    checkout.ClickonShipHere()
    checkout.ValidataAllErrorMSG()

    checkout.entercity("Tadipatri")
    checkout.entercountry('IN')
    checkout.enterphoneno('1234566899')
    checkout.enterpin('123456')
    checkout.enterregion('Andhra Pradesh')
    checkout.enterstreetname('3/494-1-2')
    checkout.ClickonShipHere()

    // cy.wait(7000)
    // CheckOut.selectshippingmethod()
    checkout.clickonNext()

    paymentpage.Verifypaymentpageisloaded()
    paymentpage.CheckBillingAddressSameAsShipping()
    paymentpage.clickonplaceorder()


    ordersuccess.ValidateThankyouMSG()
    ordersuccess.Validateorderid()


  })

})