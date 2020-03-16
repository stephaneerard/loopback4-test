import {Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Company, DAYS_OF_WEEK, WorkingHours} from "./index";

@Entity()
export class WorkingDay {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @ManyToOne(type => Company, company => company.workingDays)
    Company: Company

    @Column({type: "number", enum: DAYS_OF_WEEK})
    day: DAYS_OF_WEEK

    @OneToMany(type => WorkingHours, workingHour => workingHour.WorkingDay)
    WorkingHours: WorkingHours[]

    @Column({type: Date})
    activeFrom: Date

    @Column({type: Date, nullable: true})
    activeTo: Date
}