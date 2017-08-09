import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {Profile} from './Profile';

@Entity()
export class Address{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    city:string;

    @Column()
    street:string;

    @Column()
    country:string;

    @Column()
    pin:number;

    @ManyToOne(type=>Profile,profile=>profile.address,{
        cascadeInsert:true
    })
    profile:Profile;

}