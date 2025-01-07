import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScraperController } from './scraper/scraper.controller';
import { ScraperService } from './scraper/scraper.service';
import { Scraper } from './scraper/scraper.entity';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env'
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DATABASE_HOST'),
            port: configService.get('DATABASE_PORT'),
            username: configService.get('DATABASE_USERNAME'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            entities: [Scraper],
            synchronize: false,
            logging: true
          }),
          inject: [ConfigService]
      }),
      TypeOrmModule.forFeature([Scraper])
  ],
  controllers: [ScraperController],
  providers: [ScraperService]
})
export class AppModule {}
