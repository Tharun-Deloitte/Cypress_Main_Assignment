/// <reference types="cypress" />



class shoppingPage {

    #price

    gotoJacketsWomen() {
        cy.get('.nav-2').trigger('mouseover')
        cy.get('.nav-2-1').trigger('mouseover')
        cy.get('.nav-2-1-1').click()
    }
    gotoTeesWomen() {
        cy.get('.nav-2').trigger('mouseover')
        cy.get('.nav-2-1').trigger('mouseover')
        cy.get('.nav-2-1-3').click()
    }
    gotohoodiemen() {
        cy.get('.nav-3').trigger('mouseover')
        cy.get('.nav-3-1').trigger('mouseover')
        cy.get('.nav-3-1-2').click()
    }
    gotoBagaGear() {
        cy.get('.nav-4').trigger('mouseover')
        cy.get('.nav-4-1').click()
    }
    clickonitem(itemname) {
        cy.get('.product-item-name').contains(itemname).click()
    }

    selectcolourandsize(colour, size, quantity = '1') {
        cy.get("div[option-label=" + size + "]").should('be.visible').should('not.be.disabled')
        cy.get("div[option-label=" + size + "]").click()
        cy.get("div[option-label=" + colour + "]").click()
        cy.get('#qty').clear().type(quantity)
    }
    clickaddtocart() {
        cy.get('.tocart').click()
    }
    verifyerrormsg() {
        cy.get('.swatch-attribute.size').should('be.visible').should('not.be.disabled')
        cy.get('.swatch-attribute.size').should('include.text', 'This is a required field.')
        cy.get('.swatch-attribute.color').should('include.text', 'This is a required field.')
    }
    Verifycartempty() {
        cy.wait(2000)
        cy.get('.subtitle.empty').should('include.text', 'You have no items in your shopping cart')
    }

    DeleteCartItemsIfAny() {
        cy.get('.counter-number').then((ele) => {
            var cartcount = ele.text()
            if (cartcount != '0') {
                this.clickmycart()
                cy.get("a[title='Remove item']").each((ele) => {
                    cy.wrap(ele).click()
                    cy.get(".action-accept").click()
                })
            }
        })
    }

    getTotalproductscount() {
        cy.get(':nth-child(3) > #toolbar-amount>.toolbar-number:last-of-type').then((ele) => {
            this.total = ele.text()

        })
    }

    verifytotalproducts() {
        cy.log("totalproducts")

        cy.then(() => {
            this.total = Number(this.total)
            if (this.total > 0) {
                if (this.total > 12) {
                    this.verifylength('12')
                    this.total = this.total - 12
                    cy.get(":nth-child(5) > .pages > .items > .pages-item-next > .action").click()
                    this.verifytotalproducts()
                }
                else {
                    this.verifylength(String(this.total))
                }
            }
        })

    }
    verifylength(length) {
        cy.get('.list>.item.product.product-item').should('have.length', length)
    }

    typesearch(itemname) {
        cy.get('#search').clear().type(itemname).type('{enter}')
    }

    verifyRelatedsearchitems(itemname) {
        cy.get(".block>.item").each(ele => {
            var result = ele.text().trim().toLowerCase()
            expect(result).to.include(itemname)
            cy.log('Related search links verified')
        })
    }

    selectfromrelatedsearch(itemname) {
        cy.get(".block>.item").each(ele => {
            var result = ele.text().trim().toLowerCase()
            if (result == itemname) {
                cy.wrap(ele).contains('a').click()
            }
        })
        cy.get('#search').invoke('attr', 'value').as('qt')
        cy.get('@qt').then(qt => {
            expect(qt.toLowerCase()).to.include(itemname)
        });

    }






    verifyaddedtocartmsg(productname) {
        cy.get('.message-success').should('include.text', 'You added ' + productname)
    }
    clickmycart() {
        cy.get('.showcart').trigger('mouseover').click()
    }
    VerifyItemsInFloatingCart(itemname, price, quantity) {
        cy.contains('li', itemname).then(ele => {
            cy.wrap(ele).find("strong[class*='product-item-name']").should('include.text', itemname)
            var amount = ele.find("span[class='minicart-price']").text()
            amount = amount.trim()
            expect(amount).to.equal(price)
            cy.wrap(ele).find("input[class*='cart-item-qty']").should('have.attr', 'data-item-qty', quantity)

        })
    }
    clickonViewandEditCart() {
        cy.contains('View and Edit Cart').click()
    }

    Verifycartisvisible() {
        cy.contains('View and Edit Cart').should('be.visible').should('not.be.disabled')
    }




    clickonProceedtocheckout() {
        cy.get("button[title='Proceed to Checkout']").click({ force: true })

    }
    returnprice(price) {
        price = price.trim()
        const array = price.split('$')
        return parseFloat(array[1])
    }

}

export default shoppingPage
