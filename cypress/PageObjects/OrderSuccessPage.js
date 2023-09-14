class OrderSuccess{

    ValidateThankyouMSG(){
        cy.get('.base').should('have.text','Thank you for your purchase!')
    }
    Validateorderid(){
        cy.get('.checkout-success').should('include.text','Your order number is:')
        cy.get('.order-number').should('be.visible',true)
    }
    Validatecontinueshopping(){
        cy.contains('Continue Shopping').should('be.visible').should('not.be.disabled')
    }
}
export default OrderSuccess