import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller()
export class ScraperController {
    constructor(private readonly scraperService: ScraperService) {}

    @Get('scrape')
    async scrape() {
        const text = await this.scraperService.scrapeAndSave();
        return { text };
    }

    @Get('scrapes')
    async scrapes() {
        const history = await this.scraperService.findAll();
        return { history };
    }
}
