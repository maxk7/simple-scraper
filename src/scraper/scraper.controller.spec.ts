import { Test, TestingModule } from '@nestjs/testing';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Scraper } from './scraper.entity';

describe('ScraperController', () => {
    let controller: ScraperController;
    let service: ScraperService;

    // Mock repository
    const mockRepository = {
        find: jest.fn(),
        save: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ScraperController],
            providers: [
                ScraperService,
                {
                    provide: getRepositoryToken(Scraper),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        controller = module.get<ScraperController>(ScraperController);
        service = module.get<ScraperService>(ScraperService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllScrapes', () => {
        it('should return an array of scrapers', async () => {
            const result = [{ id: 1, timestamp: new Date(), trending_result: {} }];
            mockRepository.find.mockResolvedValue(result);

            expect(await service.findAll()).toBe(result);
        });
    });
});
