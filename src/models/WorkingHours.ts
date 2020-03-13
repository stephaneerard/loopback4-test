import {Column, Generated, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {WorkingDay} from "./index";

export class WorkingHours {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @ManyToOne(type => WorkingHours, workingHours => workingHours.WorkingDay)
    WorkingDay: WorkingDay

    @Column()
    name: string

    @Column({type: Date})
    from: Date

    @Column({type: Date})
    to: Date
}
