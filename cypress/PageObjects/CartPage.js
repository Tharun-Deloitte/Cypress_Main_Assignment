import shoppingPage from "./shoppingPage"

class CartPage {

    #price
    shoppingpage = new shoppingPage
    Validatecartitems(itemname, price, quantity) {
        cy.contains('tbody', itemname).then(ele => {
            cy.wrap(ele).find('.product-item-name').should('include.text', itemname)//Validates item name in cart summary
            cy.wrap(ele).find("td[data-th='Price']").should('include.text', price)//validates item price in cart summary
            cy.wrap(ele).find("input").should('have.attr', 'value', quantity)//validates item quantity in cart summary
        })
    }

    ValidatePriceMulQuantity(){
        cy.get("tbody[class='cart item']").each((ele) => {
            var amount = ele.find("td[data-th='Price']").text()
            amount = this.shoppingpage.returnprice(amount)//gets item price
            cy.wrap(ele).find("input").invoke('attr', 'value').as('qt')//store item quantity
            var subtotal = ele.find("td[data-th='Subtotal']").text()//gets total itemPrice(quantit*item price)
            subtotal = this.shoppingpage.returnprice(subtotal)//Return price will remove $ symbol and converts to Number
            cy.get('@qt').then(qt => {
                expect(subtotal).to.equal(Number(qt) * amount)
                cy.log('Quantity*price=Subtotal is verified')
            });
        })
    }

    getsumofsubotal() {
        cy.get("tbody[class*='cart']").each(($ele, index, $list) => {
            var amount = $ele.find("td[data-th='Subtotal']").text()//total amount of each item
            amount = this.shoppingpage.returnprice(amount)//Return price will remove $ symbol and converts to Number
            this.sumofamount = amount + this.sumofamount
        })
    }

    VerifySumofIndividualAmountEqualsSutotal() {
        cy.then(() => {
            this.sumofamount = 0
        })
        this.getsumofsubotal() //gets sum of total amount of each item from cart summary
        this.getsubtotal()// gets subtotal from order summary
        cy.then(() => {
            expect(this.sumofamount).to.equal(this.subtotal)
            cy.log("Sum of subtotal is verified")
        })
    }


    getsubtotal() {
        cy.get('.cart-summary').then(ele => {
            this.subtotal = ele.find("span[data-th='Subtotal']").text()//gets subtotal from order summary
            this.subtotal = this.shoppingpage.returnprice(this.subtotal)//Return price will remove $ symbol and converts to Number
        })

    }

    deleteitem(productname) {
        cy.contains('tbody', productname).then(ele => {
            this.#price = ele.find('.subtotal').text()
            cy.wrap(ele).find(".action.action-delete").click()
            cy.log(this.#price)
        })
    }

    VerifySumAfterDelete(productname) {
        var beforetotal;
        this.getsubtotal()//gets subtotal from ordersummary
        cy.then(() => {
            beforetotal = this.subtotal
        })
        this.deleteitem(productname)//deletes product specified and stores it price
        this.VerifyCartPageIsVisible()
        this.getsubtotal()//gets subtotal from order summary after deleting item
        cy.then(() => {
            this.#price = this.shoppingpage.returnprice(this.#price)
            expect(this.subtotal).to.equal(beforetotal - this.#price)
            cy.log("Verfied subtotal after deleting item")
        })
    }


    VerifyCartPageIsVisible() {
        cy.get("span[data-th='Subtotal']").should('be.visible')
        cy.get("span[data-bind='text: getValue()']").should('be.visible')
        cy.contains("Order Total").should('be.visible')
    }

    ClickOnProceedToCheckOut() {
        cy.get("button[title='Proceed to Checkout']").eq(1).click({ force: true })
    }

    VerifyTotalAmount() {
        cy.wait(2000)
        var totalamount = 0, discount = 0, payableamount = 0

        cy.get(".totals>tbody").find("tr").each((ele) => {
            var text = ele.find("th[class*='mark']").text().trim()
            var amount = ele.find("td[class*='amount']").text()
            if (text.includes('Order Total') && amount != '$0.00') {
                totalamount = this.shoppingpage.returnprice(amount)
            }
            if (text.includes('Discount') && amount != '$0.00') {
                discount = this.shoppingpage.returnprice(amount)
            }
            if (amount != '$0.00' && text != 'Discount' && text != 'Order Total') {
                payableamount = this.shoppingpage.returnprice(amount) + payableamount
            }
            payableamount = payableamount - discount
            cy.then(() => {
                expect(totalamount).to.equal(payableamount)
                cy.log("Order Total is verified")
            })
        })
    }



}
export default CartPage