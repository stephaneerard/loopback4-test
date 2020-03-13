import {Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Employee, WithinMonthVacationRequest} from "./index";
import {MOMENT_OF_DAY} from "./MOMENT_OF_DAY";
import {GetWorkingDaysWithinPeriod} from "../operations/GetWorkingDaysWithinPeriod";

const moment = require('moment');

@Entity()
export class VacationRequest {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @ManyToOne(type => Employee, employee => employee.HolidaysRequests)
    Employee: Employee

    @Column()
    requestedOn: Date

    @Column()
    from: Date

    @Column()
    fromMomentum: MOMENT_OF_DAY

    @Column()
    to: Date

    @Column()
    toMomentum: MOMENT_OF_DAY

    @Column()
    comment: string

    @Column()
    nbDays: number = 0;

    @Column()
    nbWorkingDays: number = 0;

    @Column()
    nbMonths: number = 0;

    @Column()
    nbHalfDays: number = 0;

    @OneToMany(type => WithinMonthVacationRequest, withinMonthHolidayRequest => withinMonthHolidayRequest.OriginalRequest)
    WithinMonthHolidayRequests: Array<WithinMonthVacationRequest>

    public splitIntoMonths(): Array<WithinMonthVacationRequest> {
        const diff = moment.duration(moment(this.to).diff(moment(this.from)));

        const months = diff.asMonths();
        this.nbMonths = months;

        const splits = new Array<WithinMonthVacationRequest>(months + 1);

        const nbDays = diff.asDays();
        this.nbDays = nbDays;

        this.nbWorkingDays = GetWorkingDaysWithinPeriod(this.from, this.to);

        const halfDay = nbDays - parseInt(nbDays)
        this.nbHalfDays = halfDay;

        let from = (() => {
            switch (this.fromMomentum) {
                case MOMENT_OF_DAY.MORNING:
                    return moment(this.from).set({hour: 9, minute: 0}).toDate();
                case MOMENT_OF_DAY.AFTERNOON:
                    return moment(this.from).set({hour: 14, minute: 0}).toDate();
            }
        })()

        for (let i = 0, j = months; i <= j; i++) {
            const w = new WithinMonthVacationRequest()
            w.OriginalRequest = this;
            w.from = from

            if (j === 1)
                w.to = moment(this.to).endOf('day').set({hour: 23, minute: 59, millisecond: 59}).toDate()
            else
                w.to = moment(w.from).endOf('month').set({hour: 23, minute: 59, millisecond: 59}).toDate()

            const days = moment.duration(moment(w.to).diff(moment(w.from))).asDays()
            w.halfDays = days - parseInt(days);
            w.days = Math.round(days);
            w.workingDays = GetWorkingDaysWithinPeriod(w.from, w.to);
            splits.push(w)

            from = moment(w.to).add(1, 'second').toDate() // for next looping
        }

        // handle resting half day, shouldn't be more than 1 (day)
        if (halfDay < 0.5) { // > 0.5 = error in computing seconds
            const _from = splits[splits.length - 1].to;
            const _to = moment(splits[splits.length - 1].to).add(halfDay, 'hours')
            const halfDays = new WithinMonthVacationRequest();
            halfDays.OriginalRequest = this;
            halfDays.from = _from;
            halfDays.to = _to.toDate();
            halfDays.days = 0
            halfDays.workingDays = 0
            splits.push(halfDays);
        }

        this.WithinMonthHolidayRequests = splits;

        return splits;
    }


}