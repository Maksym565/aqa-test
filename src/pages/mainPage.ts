import { expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class MainPage extends BasePage {
    readonly callUsBtn: Locator = this.page.locator('#icw--call--button')
    readonly callUsForm: Locator = this.page.locator('#icw--call--add--container')
    readonly firstNameField: Locator = this.page.locator('#icw--call--input-first')
    readonly lastNameField: Locator = this.page.locator('#icw--call--input-last')
    readonly phoneNumberField: Locator = this.page.locator('#icw--call--input')
    readonly submitBtn: Locator = this.page.locator('#icw--call--done--button')
    readonly successText: Locator = this.page.locator('.icw--call--done--title')
    readonly phoneText: Locator = this.page.locator('#icw--call--done--result')
    readonly dropdownBtn: Locator = this.page.locator('#icw--call--select')
    readonly incorrectPhoneMessage: Locator = this.page.locator('.icw-call-validation-err')
    readonly popUp: Locator = this.page.locator('.icw--alert--container p')

    readonly submitBtnHidden: string = 'icw--call--done--button icw--call--done--button--invalid'
    readonly submitBtnAvailable: string = 'icw--call--done--button'
    readonly incorrectPhoneErrorText: string = 'PLease enter valid phone number'
    readonly popUpText: string = 'Do you have a matter with which our lawyers can help you?'
}