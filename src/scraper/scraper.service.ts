import { Injectable } from '@nestjs/common';
import { chromium, Browser, Page } from 'playwright';

@Injectable()
export class ScraperService {
	private browser: Browser;
	private url = 'https://trends.google.com/trending?geo=US';
	private selector = '#trend-table > div.enOdEe-wZVHld-zg7Cn-haAclf > table > tbody:nth-child(3) > tr:nth-child(1) > td.enOdEe-wZVHld-aOtOmf.jvkLtd > div.mZ3RIc';

	async scrapeData() {

		if (!this.browser) {
			this.browser = await chromium.launch({ headless: true });
		}

		const page = await this.browser.newPage();
		await page.goto(this.url);

		const element = await page.locator(this.selector);
		const text = await element.textContent();

		if (this.browser) {
			await this.browser.close();
		}

		return text || 'error';
	}
}
