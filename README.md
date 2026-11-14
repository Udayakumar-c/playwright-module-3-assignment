# Playwright Module 3 End Assignment

End-to-end browser automation with Playwright Test (JavaScript).

- Task 1: Grocery order placement (GreenKart)
- Task 2: Bank Manager - add customer, open account, search, delete (GlobalSQA)

## Application URLs
- Task 1: https://rahulshettyacademy.com/seleniumPractise/#/
- Task 2: https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login



## Task 1: Broccoli Order Placement

**File:** `tests/grocery-order.spec.js`

**Steps**
- Open the application
- Find Broccoli and click ADD TO CART
- Open the cart and verify Broccoli is listed
- Click PROCEED TO CHECKOUT, then Place Order
- Select India from the country dropdown
- Tick the terms and conditions checkbox
- Click Proceed
- Assert the confirmation message
- Print the message in the console

**Expected result**
- Message contains: `Thank you, your order has been placed successfully`
- Test passes

---

## Task 2: Bank Manager Customer Management

**File:** `tests/bank-manager.spec.js`

**Steps**
- Click Bank Manager Login and verify the dashboard
- Add Customer: First Name `John`, unique Last Name, Post Code `682001`
- Handle and print the "Customer added" alert
- Open Account: select the new customer, currency Dollar, click Process
- Handle and print the "Account created" alert
- Customers: search by the unique last name
- Verify exactly one record and print its details
- Delete the customer and verify no record remains
- Print a deletion confirmation

**Expected result**
- Customer created, account opened, found by search, deleted and verified
- Test passes

---

## Assumptions
- The site spells the product "Brocolli"; the locator accepts both spellings.
- Last name is `Auto<6 digits of timestamp>`, so every run uses unique data.
- JS alerts are handled with the Playwright `dialog` event, registered before the click.
- No fixed waits; only auto-waiting and web-first assertions.
- Tests run headless in Chromium by default.

## Execution Evidence
- Console log: `npm test | tee evidence/console-log.txt`
- Screenshots: saved under `test-results/`, S
- HTML report: `playwright-report/`

## GitHub Repository
Add your link here: `https://github.com/Udayakumar-c/playwright-module-3-assignment`

