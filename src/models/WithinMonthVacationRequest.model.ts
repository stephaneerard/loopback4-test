import * as moment from 'moment'
import {Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {VacationRequest} from "./index";

@Entity()
export class WithinMonthVacationRequest {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @ManyToOne(type => VacationRequest, originalRequest => originalRequest.WithinMonthHolidayRequests)
    OriginalRequest: VacationRequest

    @Column({type: 'date'})
    from: Date

    @Column()
    fromMoment: moment.Moment

    @Column({type: 'date'})
    to: Date

    @Column()
    toMoment: moment.Moment

    @Column()
    days: number = 0

    @Column()
    workingDays: number = 0

    @Column()
    halfDays: number = 0

    set(from: Date, to: Date, originalRequest: VacationRequest) {
        this.from = from;
        this.to = to;
        this.OriginalRequest = originalRequest;
    }
}