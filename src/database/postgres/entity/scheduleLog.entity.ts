import { Entity, PrimaryGeneratedColumn, Column,  } from 'typeorm';

@Entity()
export class ScheduleLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    scheduleId: number;

    @Column({ nullable: true })
    message: string;

    @Column()
    status: number;

    @Column()
    frequency: number;

    @Column()
    createdAt: number;
}