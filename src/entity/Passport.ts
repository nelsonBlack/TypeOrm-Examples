import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './Person';

@Entity()
export class Passport{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    country:string;

    @Column()
    year:number;

    @OneToOne(type=>Person,person=>person.passport,{
        cascadeInsert:true,
        cascadeUpdate:true
    })
    person:Person;

}