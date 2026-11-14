# Failure Analysis Report
## Failure 1 - Strict mode violation on "Add Customer"
- **Symptom:** `locator.click: strict mode violation: getByRole('button', {name: 'Add Customer'}) resolved to 2 elements`
- **Root cause:** "Add Customer" is both the top navigation tab and the form submit button.
- **Debugging:** read the error's element list; inspected DOM with `npx playwright codegen` / Inspector.
- **Correction:** nav tab uses `.first()`; submit uses `form button[type="submit"]`.
- **Validation:** rerun passes; alert text printed.

## Failure 2 - Broccoli not found
- **Symptom:** `expect(locator).toHaveCount(1)` fails with 0 for text "Broccoli".
- **Root cause:** the site spells it "Brocolli".
- **Correction:** regex `/Broc{1,2}oll?i/i`.
-
## Failure 3 - Missed alert / timeout
- **Symptom:** test hangs or alert auto-dismissed, message not captured.
- **Root cause:** dialog listener registered after the click.
- **Correction:** `Promise.all([page.waitForEvent('dialog'), click()])`.
