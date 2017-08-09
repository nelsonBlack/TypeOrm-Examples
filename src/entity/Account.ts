import {Entity,Column,PrimaryGeneratedColumn,OneToMany,ManyToOne} from 'typeorm';
import {Profile} from './Profile';

@Entity()
export class Account{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    role:string;

    @OneToMany(type=>Profile,profile=>profile.account,{
        cascadeInsert:true,
        cascadeUpdate:true
    })
    profile:Profile[];

}