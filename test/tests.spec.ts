import { test, expect } from '@playwright/test';
import * as process from 'process';
import { MainPage } from '../src/pages/mainPage';
import * as dotenv from 'dotenv';
import {faker} from "@faker-js/faker";

dotenv.config();

const baseUrl: string = process.env.TEST_URL || '';

test.describe('Test suite for Call Us form', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await page.goto(baseUrl);

        await test.step('Verify that call us form opened and visible', async () => {
            await mainPage.callUsBtn.click();
            await expect(mainPage.callUsForm).toBeVisible();
        });
    });

    test('Verify that Call Us form can be successfully filed with valid data', async () => {

        await test.step('Fill call us form and validate success message', async () => {
            const phoneNumber = faker.string.numeric(10)

            await mainPage.firstNameField.type(`${faker.name.firstName()}`, { delay: 100 })
            await mainPage.lastNameField.type(`${faker.name.lastName()}`, { delay: 100 })
            await mainPage.phoneNumberField.type(phoneNumber, { delay: 100 })
            await mainPage.submitBtn.click()

            await expect(mainPage.successText).toHaveText('You’ve requested a call for')
            await expect(mainPage.phoneText).toHaveText(`+380${phoneNumber}`)
        });

    });

    test('Verify that submit button is hidden before all fields are not filled with valid data', async () => {

        await test.step('Fill call us form with not full data and validate that submit button is hidden', async () => {
            await mainPage.firstNameField.type(`${faker.name.firstName()}`, { delay: 100 })
            await expect(mainPage.submitBtn).toHaveClass(mainPage.submitBtnHidden)

            await mainPage.lastNameField.type(`${faker.name.lastName()}`, { delay: 100 })
            await expect(mainPage.submitBtn).toHaveClass(mainPage.submitBtnHidden)

            await mainPage.phoneNumberField.type(faker.string.numeric(6), { delay: 100 })
            await expect(mainPage.submitBtn).toHaveClass(mainPage.submitBtnHidden)
        });

        await test.step('Add correct phone and verify that submit button is available', async () => {
            await mainPage.phoneNumberField.type(faker.string.numeric(1), { delay: 100 })
            await expect(mainPage.submitBtn).toHaveClass(mainPage.submitBtnAvailable)
        });

    });

    test('Verify that error massage is displayed with incorrect phone number', async () => {

        await test.step('Choose US country code in dropdown', async () => {
            await mainPage.dropdownBtn.click()
            await mainPage.dropdownBtn.selectOption({ label: 'US (+1)' });
        });

        await test.step('Fill call us form with invalid phone and validate error message', async () => {
            const invalidPhoneNumber = '1234567890'

            await mainPage.firstNameField.type(`${faker.name.firstName()}`, { delay: 100 })
            await mainPage.lastNameField.type(`${faker.name.lastName()}`, { delay: 100 })
            await mainPage.phoneNumberField.type(invalidPhoneNumber, { delay: 100 })
            await mainPage.submitBtn.click()

            await expect(mainPage.incorrectPhoneMessage).toBeVisible()
            await expect(mainPage.incorrectPhoneMessage).toContainText(mainPage.incorrectPhoneErrorText)
        });

    });

    test('Verify that pop up is displayed after 15sec after form was successfully send', async ({page}) => {

        await test.step('Fill call us form and validate success message', async () => {
            const phoneNumber = faker.string.numeric(10)

            await mainPage.firstNameField.type(`${faker.name.firstName()}`, { delay: 100 })
            await mainPage.lastNameField.type(`${faker.name.lastName()}`, { delay: 100 })
            await mainPage.phoneNumberField.type(phoneNumber, { delay: 100 })
            await mainPage.submitBtn.click()

            await expect(mainPage.successText).toHaveText('You’ve requested a call for')
            await expect(mainPage.phoneText).toHaveText(`+380${phoneNumber}`)
        });

        await test.step('Verify popUp and text', async () => {
            await expect(mainPage.popUp).toBeVisible({timeout: 15000})
            await expect(mainPage.popUp).toContainText(mainPage.popUpText)
        });

    });

});