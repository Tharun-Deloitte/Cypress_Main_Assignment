import LoginPage from "../PageObjects/LoginPage";
import shoppingPage from "../PageObjects/shoppingPage";
import Checkout from "../PageObjects/CheckOutPage";
import PaymentPage from "../PageObjects/PaymentPage";
import OrderSuccess from "../PageObjects/OrderSuccessPage";


describe('TC4_PS_DiffCategory  <reg>', () => {

  var data;
  var Login;
  var ShoppingPage, checkout, paymentpage, ordersuccess
  before(() => {
    cy.fixture('example').then((regdata) => {
      data = regdata
    })
    Login = new LoginPage
    ShoppingPage = new shoppingPage
    checkout = new Checkout
    paymentpage = new PaymentPage
    ordersuccess = new OrderSuccess
  })

  beforeEach(() => {
    cy.visit(Cypress.env('URL'))
    Login.clickonsignin()
    Login.typeemail(Cypress.env('EMAIL_ID'))
    Login.typepassword(Cypress.env('PASSWORD'))
    Login.clicksubmit()
    Login.validatelogin()
  })

  it('TC4_PS_DiffCategory', () => {
    ShoppingPage.DeleteCartItemsIfAny()
    ShoppingPage.gotoTeesWomen()
    ShoppingPage.clickonitem(data.W_Tee1[0])
    ShoppingPage.selectcolourandsize('Orange', 'S')
    ShoppingPage.clickaddtocart()
    ShoppingPage.verifyaddedtocartmsg(data.W_Tee1[0])

    ShoppingPage.gotohoodiemen()
    ShoppingPage.clickonitem(data.M_Hoodie[0])
    ShoppingPage.selectcolourandsize('Black', 'XS', data.M_Hoodie[2])
    ShoppingPage.clickaddtocart()
    ShoppingPage.verifyaddedtocartmsg(data.M_Hoodie[0])

    ShoppingPage.clickmycart()
    ShoppingPage.VerifyItemsInFloatingCart(data.W_Tee1[0], data.W_Tee1[1], data.W_Tee1[2])
    ShoppingPage.VerifyItemsInFloatingCart(data.M_Hoodie[0], data.M_Hoodie[1], data.M_Hoodie[2])
    ShoppingPage.clickonProceedtocheckout()


    checkout.VerifyOrderSummaryPageIsDisplayed()
    checkout.ClickonOrderSummarry()
    checkout.VerifyOrderSummaryPage(data.W_Tee1[0], data.W_Tee1[1], data.W_Tee1[2])
    checkout.VerifyOrderSummaryPage(data.M_Hoodie[0], data.M_Hoodie[1], data.M_Hoodie[2])
    checkout.ClickOnNewAddress()
    checkout.ClickonShipHere()
    checkout.ValidataAllErrorMSG()

    checkout.entercity(data.Address4City)
    checkout.entercountry(data.Address4Country)
    checkout.enterphoneno(data.Address4Phoneno)
    checkout.enterpin(data.Address4Pin)
    checkout.enterregion(data.Address4Region)
    checkout.enterstreetname(data.Address4Street)
    checkout.ClickonShipHere()
    checkout.clickonNext()
    // Ordersummary.selectshippingmethod()

    paymentpage.Verifypaymentpageisloaded()
    paymentpage.CheckBillingAddressSameAsShipping()
    paymentpage.ValidateBillingaddress("Nara", data.Address4Phoneno, data.Address4City, data.Address4Pin)
    paymentpage.clickonplaceorder()
    ordersuccess.ValidateThankyouMSG()
    ordersuccess.Validatecontinueshopping()





  })

})