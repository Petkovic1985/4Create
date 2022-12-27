/// <reference types="cypress". />
import { DROP_MSG,SUCCESSFULLY_ORDER_MSG,ALERT_MSG } from "../constants/messages";
const { load } = require("signal-exit");
import { RAHUL_SHEET_ACADEMY, WEB_DRIVER_UNIVERSITY1,WEB_DRIVER_UNIVERSITY2 } from "../constants/routes";
var products = ["Brocolli - 1 Kg","Cauliflower - 1 Kg","Cucumber - 1 Kg","Beetroot - 1 Kg","Carrot - 1 Kg","Tomato - 1 Kg","Beans - 1 Kg"]
var x = Math.floor((Math.random() * 3)) + 1;
var products1 = ["Mushroom - 1 Kg","Potato - 1 Kg","Pumpkin - 1 Kg","Corn - 1 Kg",]
var x = Math.floor((Math.random() * 3)) + 1;
var products2 = ["Onion - 1 Kg","Apple - 1 Kg","Banana - 1 Kg","Grapes - 1 Kg","Mango - 1 Kg","Musk Melon - 1 Kg","Orange - 1 Kg"]
var x = Math.floor((Math.random() * 3)) + 1;
var country = ["Canada","Austria","Algeria","Andorra","France","Gabon"]
var x = Math.floor((Math.random() * 3)) + 1;
    
const locators = require('../../fixtures/locators.json')

context("Test sites functionalites", () => {

    it("visit page and maximize window", () => {

       
        cy.visit(RAHUL_SHEET_ACADEMY)
        cy.url().should('include','seleniumPractise/#/')
        cy.get('body');
        cy.viewport(window.screen.width, window.screen.height);
    })



    it("Added products to cart flow",()=>{
        var _product = products[x];
        var _product1 = products1[x];
        var _product2 = products2[x];
        var _countries = country[x];

        cy.visit(RAHUL_SHEET_ACADEMY)
        cy.get('.products').as('productlocator')
        cy.wait(2000)
        cy.get('@productlocator').find('.product').each(($el, index, $list) => {

        const textVeg = $el.find('h4.product-name').text()
        if (textVeg.includes("Pears - 1 Kg")) {
                cy.wrap($el).find('button').click().click().click().click()
        }

        if (textVeg.includes(_product)) {
                cy.wrap($el).find('button').click()
        }
    
        if (textVeg.includes(_product1)) {
                cy.wrap($el).find('button').click()
        }
    
        if (textVeg.includes(_product2)) {
                cy.wrap($el).find('button').click()      
        }
        })

        cy.get('.cart-icon').click()
        cy.get('li\[class*="cart-item"\]').find(' p\[class="product-name"\]:visible').should('have.length',4).each(($el, index, $list) => {
        })

        cy.get(locators.products.productNo1).contains("1 No.")    
        cy.get(locators.products.productNo2).contains("1 No.")    
        cy.get(locators.products.productNo3).contains("1 No.")  
        cy.get(locators.products.productNo4).contains("4 Nos.")    
        
        cy.get('.cart-preview > .action-block > button').as('btn').click()
        cy.get('@btn').click()

        cy.get(".totAmt").then(($temp)=>{
           const txt = $temp.text()

        cy.get(".promoCode").type(`${txt}`+'{enter}')
        cy.get(".promoBtn").click()
        cy.wait(1000)
        cy.contains("Invalid code ..!")
        cy.get(":nth-child(14)").click()
        cy.url().should('include','/#/country')
        cy.contains("Choose Country")
        cy.get("select").should('exist')
        cy.get(".chkAgree").should('exist')

        cy.get("select").then(function($select){
            $select.val(null)
        })
            
        cy.get('select')
        .filter('Select')
        .find("Option").first()
        .should('have.text','Select').should("be.disabled")
        cy.get("select").then(function($select){
            $select.val(_countries)
        })
        
        cy.get('select').should('have.value',_countries)
        cy.get(".chkAgree").click()
        cy.get("button").click() 
        cy.contains(SUCCESSFULLY_ORDER_MSG)  
        })
        })

    it("Go to link,screenshots,drag and drop,alerts", function () {
        cy.visit(WEB_DRIVER_UNIVERSITY1)
        cy.contains("LOGIN")
        cy.contains("CONTACT US")
        cy.scrollTo(2500, 3000)
        cy.screenshot("ACTIONS")
        cy.get('[id="actions"]').invoke('removeAttr', 'target').click()
        cy.url().should('include','/Actions/')
        cy.go('back')
        cy.screenshot()
        cy.go('forward')
        cy.title().should('include', 'Actions')
    
        cy.get("#draggable").drag("#droppable > p",{force: true} )
        cy.get("#droppable > p").contains(DROP_MSG)

        cy.get("[class='list-alert']").should("not.be.visible")
        cy.get('.hover > .dropbtn').realHover()
        cy.contains("Link").click()
        
        cy.on('window:confirm', str => {
        expect(str).to.eq(ALERT_MSG)

        cy.get(".list-alert")
        .find('alert')
        .invoke('text').should("have.text",ALERT_MSG)
        })
        })    


    it("open browser and go to link", function () {
        
        cy.visit(WEB_DRIVER_UNIVERSITY2)
        cy.contains("CONTACT US")
        
     
        })
    })

 


    
    







    

