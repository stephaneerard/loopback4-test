import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Generated,
    Index,
    DeleteDateColumn,
    UpdateDateColumn, ManyToOne
} from "typeorm";
import {Employee, Country, CompanyWorksInCountryDuringPeriod} from "./index";
import {WorkingDays} from "./WorkingDay.model";

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @Column({length: 100, type: 'text', unique: true})
    @Index()
    name: string;

    @OneToMany(type => CompanyWorksInCountryDuringPeriod, companyWorksInCountryDuringPeriod => companyWorksInCountryDuringPeriod.Company)
    CountriesWorkingIn: CompanyWorksInCountryDuringPeriod[];

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: Date;

    @ManyToOne(type => Employee, employee => employee.DeletedCompanies)
    deletedBy?: Employee

    @ManyToOne(type => Employee, employee => employee.CompaniesUpdatedBy)
    updatedBy?: Employee

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @OneToMany(type => WorkingDays, workingDays => workingDays.Company)
    workingDays: WorkingDays[]

    public async worksInCountryDuringPeriod(country: Country, from: Date, to: Date, work?: CompanyWorksInCountryDuringPeriod) {
        if (!work)
            work = new CompanyWorksInCountryDuringPeriod();

        work.Country = country
        work.from = from
        work.to = to
        work.Company = this

        if (this.CountriesWorkingIn && !this.CountriesWorkingIn.includes(work)) {
            this.CountriesWorkingIn.push(work);
        }

        if (country.CompaniesWorkingIn && !country.CompaniesWorkingIn.includes(work)) {
            country.CompaniesWorkingIn.push(work);
        }

        return work;
    }

}



