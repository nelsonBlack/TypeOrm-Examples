import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn,OneToMany} from 'typeorm';
import {Account} from './Account';
import {Address} from './Address';

@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    phone:number;

    @OneToMany(type=>Address,address=>address.profile,{
        cascadeInsert:true,
        cascadeUpdate:true
    })
    address:Address[];

    @ManyToOne(type=>Account,account=>account.profile,{
        cascadeInsert:true
    })
    account:Account;

}