//GlobalSQA Bank Manager: add customer, open account, search, delete
const { test, expect } = require('@playwright/test');

const APP_URL = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login';

//** click an element that triggers a JS alert; capture, print and accept it. */
async function clickAndHandleAlert(page, locator, label) {
  const handledDialog = new Promise((resolve, reject) => {
    page.once('dialog', async (dialog) => {
      try {
        const message = dialog.message();

        console.log(`${label} alert: ${message}`);

        await dialog.accept();
        resolve(message);
      } catch (error) {
        reject(error);
      }
    });
  });

  const [message] = await Promise.all([
    handledDialog,
    locator.click()
  ]);

  return message;
}

test('add customer, open account, search and delete', async ({ page }) => {
  // Unique test data for repeatability
  const suffix = Date.now().toString().slice(-6); 
  const firstName = 'John';
  const lastName = `Auto${suffix}`;
  const postCode = '682001';
  const fullName = `${firstName} ${lastName}`;

  // 1. Bank Manager Login
  await page.goto(APP_URL);
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();
  await expect(page.getByRole('button', { name: 'Add Customer' }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open Account' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Customers' })).toBeVisible();

  // 2-3. Add Customer
  await page.getByRole('button', { name: 'Add Customer' }).first().click();
  await page.getByPlaceholder('First Name').fill(firstName);  
  await page.getByPlaceholder('Last Name').fill(lastName);
  await page.getByPlaceholder('Post Code').fill(postCode);
  const addMsg = await clickAndHandleAlert( 
    page,
    page.locator('form button[type="submit"]'),
    'Add Customer'
  );
  expect(addMsg).toContain('Customer added successfully');

  // 4. Open Account (Dollar)
  await page.getByRole('button', { name: 'Open Account' }).click();
  await page.locator('#userSelect').selectOption({ label: fullName });
  await page.locator('#currency').selectOption('Dollar');
  const accMsg = await clickAndHandleAlert(
    page,
    page.getByRole('button', { name: 'Process' }),
    'Open Account'
  );
  expect(accMsg).toContain('Account created successfully'); 

  // 5. Search by unique last name, exactly one record
  await page.getByRole('button', { name: 'Customers' }).click();
  await page.getByPlaceholder('Search Customer').fill(lastName);
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(1);  
  await expect(rows.first()).toContainText(lastName);
  const details = (await rows.first().innerText())
  .replace(/\s+/g, ' ')
  .trim();
  console.log(`Customer details: ${details}`);

  // 6. Delete and verify
  await rows.first().getByRole('button', { name: 'Delete' }).click();
  await expect(rows).toHaveCount(0);
  await expect(page.getByText(lastName)).toHaveCount(0);
  console.log(`Deleted confirmed: customer "${fullName}  no longer exits.`);
});