import {Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn, VersionColumn} from "typeorm";
import {CompanyWorksInCountryDuringPeriod, VacationRequest, Company} from "./index";
import {Role} from "./Role.model";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @OneToMany(type => CompanyWorksInCountryDuringPeriod, companyWorksInCountryDuringPeriod => companyWorksInCountryDuringPeriod.Company)
    CountriesWorkingIn: CompanyWorksInCountryDuringPeriod[]

    @OneToMany(type => VacationRequest, vacationRequest => vacationRequest.Employee)
    HolidaysRequests: VacationRequest[]

    @OneToMany(type => Company, company => company.deletedBy)
    DeletedCompanies: Company[];

    @OneToMany(type => Company, company => company.deletedBy)
    CompaniesUpdatedBy: Company[];

    @VersionColumn()
    version: string;

    @OneToMany(type => Role, role => role.EmployeesHavingRole)
    Roles: Role[];
}
