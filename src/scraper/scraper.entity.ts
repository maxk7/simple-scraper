import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('trending_data')
export class Scraper {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;

    @Column({ type: 'varchar' })
    trending_result: string;
}
