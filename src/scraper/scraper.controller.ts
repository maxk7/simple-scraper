import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scrape')
export class ScraperController {
	constructor(private readonly scraperService: ScraperService) {}

	@Get()
	async scrape() {
		const text = await this.scraperService.scrapeData();
		return { text };
	}
}
