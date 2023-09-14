import shoppingPage from "./shoppingPage"
const Shoppingpage=new shoppingPage
class Checkout{

    VerifyOrderSummaryPage(itemname,price,quantity){
        cy.contains('li',itemname).then(ele=>{
            var qt=ele.find("span[class*='value']").text().trim()//Gets quantity of an item
            cy.wrap(ele).find("strong[class*='product-item-name']").should('include.text',itemname)//verifies itemname
            expect(qt).to.equal(quantity)
            var amount=ele.find("span[class*='cart-price']").text()//Gets the total amount of a particular item
            amount=Shoppingpage.returnprice(amount)
            price=Shoppingpage.returnprice(price)
            expect(parseFloat(qt)*price).to.equal(amount)//verifies quantity*itemPrice equals total item amount
        })
    }

    selectotheraddress(){
        cy.get(".not-selected-item>.action-select-shipping-item").eq(0).click()
        //Selects first address which is not selected
    }

    ClickonOrderSummarry(){
        cy.get('.items-in-cart').click()
    }

    enterstreetname(streetname){
        cy.get("input[name='street[0]']").type(streetname)
    }
    entercity(city){
        cy.get("input[name='city']").type(city)
    }
    enterpin(postcode){
        cy.get("input[name='postcode']").type(postcode)
    }
    enterphoneno(telephone){
        cy.get("input[name='telephone']").type(telephone)
    }
    entercountry(country='IN'){
        cy.get("select[name='country_id']").select(country)
    }
    enterregion(region="Andhra Pradesh"){
        cy.get("select[name='region_id']").select(region)
    }
    selectshippingmethod(){
        cy.get(":nth-child(1) > :nth-child(1) > .radio").check()
        //Selects first shipping method
    }
    clickonNext(){
        cy.get("button[data-role*='opc']").click({force:true})
    }
    clickonplaceorder(){
        cy.get("button[title*='Place Order']").click()
    }
    ShippingMethodErrorMSG(){
        cy.get('.message > span').should('include.text','The shipping method is missing. Select the shipping method and try again.')
    }

    VerifyOrderSummaryPageIsDisplayed(){
        cy.get("button[data-role*='opc']").should('be.visible').should('not.be.disabled')
    }

    ClickOnNewAddress(){
        cy.get('.action-show-popup').click()
    }

    ClickonShipHere(){
        cy.contains('Ship here').click()
    }

    ValidataAllErrorMSG(){
        cy.get(".field-error").each((ele)=>{
            cy.wrap(ele).should('include.text','This is a required field')
        })
    }

}

export default Checkout