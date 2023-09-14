import LoginPage from "../PageObjects/LoginPage";
import shoppingPage from "../PageObjects/shoppingPage";
import Checkout from "../PageObjects/CheckOutPage";
import PaymentPage from "../PageObjects/PaymentPage";
import OrderSuccess from "../PageObjects/OrderSuccessPage";
import CartPage from "../PageObjects/CartPage";


describe('TC5_PS_deleteProduct  <reg>', () => {

  var data;
  var Login;
  var ShoppingPage, paymentpage, ordersuccess, cartpage, checkout;
  before(() => {
    cy.fixture('example').then((regdata) => {
      data = regdata
    })
    Login = new LoginPage
    ShoppingPage = new shoppingPage
    checkout = new Checkout
    paymentpage = new PaymentPage
    ordersuccess = new OrderSuccess
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

  it('TC5_PS_deleteProduct', () => {


    ShoppingPage.DeleteCartItemsIfAny()
    ShoppingPage.gotoJacketsWomen()
    ShoppingPage.clickonitem(data.W_Jacket1[0])
    ShoppingPage.selectcolourandsize('Blue', 'XS')
    ShoppingPage.clickaddtocart()
    ShoppingPage.verifyaddedtocartmsg(data.W_Jacket1[0])

    ShoppingPage.gotohoodiemen()
    ShoppingPage.clickonitem(data.M_Hoodie[0])
    ShoppingPage.selectcolourandsize('Black', 'XS', data.M_Hoodie[2])
    ShoppingPage.clickaddtocart()

    ShoppingPage.verifyaddedtocartmsg(data.M_Hoodie[0])
    ShoppingPage.gotoBagaGear()
    ShoppingPage.clickonitem(data.G_Bag1[0])
    ShoppingPage.clickaddtocart()
    ShoppingPage.verifyaddedtocartmsg(data.G_Bag1[0])

    ShoppingPage.clickmycart()
    cy.wait(2000)
    ShoppingPage.VerifyItemsInFloatingCart(data.W_Jacket1[0], data.W_Jacket1[1], data.W_Jacket1[2])
    ShoppingPage.VerifyItemsInFloatingCart(data.M_Hoodie[0], data.M_Hoodie[1], data.M_Hoodie[2])
    ShoppingPage.VerifyItemsInFloatingCart(data.G_Bag1[0], data.G_Bag1[1], data.G_Bag1[2])


    ShoppingPage.clickonViewandEditCart()

    cartpage.VerifyCartPageIsVisible()
    cartpage.Validatecartitems(data.W_Jacket1[0], data.W_Jacket1[1], data.W_Jacket1[2])
    cartpage.Validatecartitems(data.M_Hoodie[0], data.M_Hoodie[1], data.M_Hoodie[2])
    cartpage.Validatecartitems(data.G_Bag1[0], data.G_Bag1[1], data.G_Bag1[2])



    cartpage.VerifySumAfterDelete(data.M_Hoodie[0])
    cartpage.ClickOnProceedToCheckOut()
    cartpage.subtotal
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
    checkout.selectotheraddress()
    checkout.clickonNext()

    paymentpage.Verifypaymentpageisloaded()
    paymentpage.UncheckBillingandShipping()
    paymentpage.selectotherbilling('Nara Tharun')
    paymentpage.clickonplaceorder()
    ordersuccess.Validatecontinueshopping()
    ordersuccess.ValidateThankyouMSG()

  })

})