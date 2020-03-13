import {Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Employee} from "./index";

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @ManyToOne(type=>Employee, employee=>employee.Roles)
    EmployeesHavingRole:Employee[]

    @Column()
    name: string

    @Column()
    description: string

    @Column({type: Date})
    activeFrom: Date

    @Column({type: Date})
    activeTo?: Date
}