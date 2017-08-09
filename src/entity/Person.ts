import { Column, Entity, JoinColumn,OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Passport } from './Passport';

@Entity()
export class Person{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    city:string;

    @Column()
    state:string;

    @OneToOne(type=>Passport,passport=>passport.person,{
        cascadeInsert:true,
        cascadeUpdate:true
    })
    @JoinColumn()
    passport:Passport;

}