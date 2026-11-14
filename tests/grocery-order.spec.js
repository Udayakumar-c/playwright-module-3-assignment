// Q1 - End-to-end order placement (GreenKart)

const { test, expect } = require('@playwright/test');

const APP_URL = 'https://rahulshettyacademy.com/seleniumPractise/#/';
const EXPECTED_MESSAGE = 'Thank you, your order has been placed successfully';  
// NOTE: the application spells the product "Brocolli", so match both spellings.
const BROCCOLI = /Broc{1,2}oll?i/i;

test('Place an order for Broccoli and verify confirmation', async ({ page }) => {
  // 1. Launch app and add Broccoli to cart
  await page.goto(APP_URL);
  const product = page.locator('div.product').filter({ hasText: BROCCOLI });
  await expect(product).toHaveCount(1);
  await product.getByRole('button', { name: 'ADD TO CART' }).click();

  // 2. Open cart, verify product, proceed to checkout
  await page.locator('a.cart-icon').click();
  const cartItem = page.locator('.cart-preview .cart-item').filter({ hasText: BROCCOLI });
  await expect(cartItem).toBeVisible();
  await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();

  // Cart page: selected product is listed
  await expect(page.locator('table#productCartTables tbody')).toContainText(BROCCOLI);

  // 3. Place order, choose India, accept terms, proceed
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.locator('select').selectOption('India');
  await expect(page.locator('select')).toHaveValue('India');
  await page.locator('input.chkAgree').check();
  await expect(page.locator('input.chkAgree')).toBeChecked();
  await page.getByRole('button', { name: 'Proceed' }).click();

  // 4. Web-first assertion on confirmation message
  const confirmation = page.locator('span').filter({ hasText: EXPECTED_MESSAGE });
  await expect(confirmation).toBeVisible();
  await expect(confirmation).toContainText(EXPECTED_MESSAGE);

  // 5. Print to console
  const text = (await confirmation.innerText()).trim();
  console.log(`Confirmation message: ${text}`);
});