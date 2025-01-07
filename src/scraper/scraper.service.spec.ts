import { Test, TestingModule } from '@nestjs/testing';
import { ScraperService } from './scraper.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Scraper } from './scraper.entity';
import { Repository } from 'typeorm';

// Mock the entire playwright module
jest.mock('playwright', () => ({
    chromium: {
        launch: jest.fn().mockImplementation(() => Promise.resolve({
            newPage: jest.fn().mockImplementation(() => Promise.resolve({
                goto: jest.fn().mockImplementation(() => Promise.resolve()),
                locator: jest.fn().mockImplementation(() => ({
                    textContent: jest.fn().mockImplementation(() => Promise.resolve('Trending Topic'))
                })),
            })),
            close: jest.fn().mockImplementation(() => Promise.resolve()),
        })),
    },
}));

describe('ScraperService', () => {
    let service: ScraperService;
    let mockRepository: Partial<Repository<Scraper>>;

    beforeEach(async () => {
        mockRepository = {
            save: jest.fn(),
            find: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ScraperService,
                {
                    provide: getRepositoryToken(Scraper),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<ScraperService>(ScraperService);
    });

    describe('scrapeAndSave', () => {
        it('should return scraped text', async () => {
            (mockRepository.save as jest.Mock).mockResolvedValue({});
            
            const result = await service.scrapeAndSave();
            expect(result).toBe('Trending Topic');
        });
    });

    describe('findAll', () => {
        it('should return all scrapers', async () => {
            const mockScrapers = [
                { id: 1, timestamp: new Date(), trending_result: 'Result 1' },
                { id: 2, timestamp: new Date(), trending_result: 'Result 2' },
            ];
            (mockRepository.find as jest.Mock).mockResolvedValue(mockScrapers);

            const result = await service.findAll();
            expect(result).toEqual(mockScrapers);
        });
    });
});
