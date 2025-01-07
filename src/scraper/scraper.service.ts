import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scraper } from './scraper.entity';
import { chromium, Browser, Page } from 'playwright';

@Injectable()
export class ScraperService {
    constructor(@InjectRepository(Scraper) private scraperRepository: Repository<Scraper>) {}


    async scrapeAndSave(): Promise<string> {
        const url = 'https://trends.google.com/trending?geo=US';
        const selector = '#trend-table > div.enOdEe-wZVHld-zg7Cn-haAclf > table > tbody:nth-child(3) > tr:nth-child(1) > td.enOdEe-wZVHld-aOtOmf.jvkLtd > div.mZ3RIc';

        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url);

        const element = await page.locator(selector);
        const text = await element.textContent();

        await browser.close();

        try {
            const scraper = new Scraper();
            scraper.trending_result = text;
            this.scraperRepository.save(scraper)
        } catch (error) {
            console.error('Error saving trending result: ', error);
        }

        return text || 'error';
    }

    async findAll(): Promise<Scraper[]> {
        try {
            return await this.scraperRepository.find({
                order: { timestamp: 'DESC' }
            });
        } catch (error) {
            console.error('/scrapes failed to fetch scraper data');
        }
    }
}
