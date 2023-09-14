class PaymentPage{
    clickonplaceorder(){
        cy.get("button[title*='Place Order']").click()
    }

    CheckBillingAddressSameAsShipping(){
        cy.get('#billing-address-same-as-shipping-checkmo').check()
    }

    UncheckBillingandShipping(){
        cy.get('#billing-address-same-as-shipping-checkmo').check().uncheck()
    }

    selectotherbilling(option){
        cy.get('select[name="billing_address_id"]').select(option)
    }

    ValidateBillingaddress(firsname,phoneno,city,pin){
        cy.get('.ship-to>.shipping-information-content').should('include.text',firsname)
        cy.get('.ship-to>.shipping-information-content').should('include.text',phoneno)
        cy.get('.ship-to>.shipping-information-content').should('include.text',city)
        cy.get('.ship-to>.shipping-information-content').should('include.text',pin)
    }

    Verifypaymentpageisloaded(){
        cy.get("button[title*='Place Order']").should('be.visible').should('not.be.disabled')
    }

}
export default PaymentPage