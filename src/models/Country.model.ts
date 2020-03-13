import {Column, Entity, Generated, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CompanyWorksInCountryDuringPeriod} from "./CompanyWorksInCountryDuringPeriod.model";

@Entity()
export class Country {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @Column()
    @Index()
    name: string;

    @OneToMany(type => CompanyWorksInCountryDuringPeriod, countryWithCompanies => countryWithCompanies.Country)
    CompaniesWorkingIn: CompanyWorksInCountryDuringPeriod[];

    @Column({type: 'number'})
    legalNumberOfDaysOfVacation: number

}