import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Types } from '../../../refs';

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    apiConfigs: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    cronExpression: string;

    @Column()
    frequency: number;

    @Column({ default: 0 })
    frequencyCount: number;

    @Column()
    createdAt: number;

    @Column({ default: 'pending' }) // pending || destroyed || completed
    status: string;
}