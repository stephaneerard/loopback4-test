import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Generated, JoinColumn} from "typeorm";
import {Company} from "./Company.model";
import {Country} from "./Country.model";

@Entity()
export class CompanyWorksInCountryDuringPeriod {

    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @ManyToOne(type => Company, {nullable: true})
    @JoinColumn()
    Company: Company

    @ManyToOne(type => Country, {nullable: true})
    @JoinColumn()
    Country: Country

    @Column({type: 'date'})
    from: Date

    @Column({type: 'date', nullable: true})
    to?: Date

    @Column({type: "boolean", default: false})
    isActive: boolean = false

}