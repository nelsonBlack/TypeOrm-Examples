import {Entity,Column,PrimaryGeneratedColumn,ManyToMany,JoinTable} from 'typeorm';
import { Authors } from './Authors';

@Entity()
export class Books{
    @PrimaryGeneratedColumn()
    bid:number;

    @Column()
    bname:string;

    @Column()
    year:number;

    @Column()
    publisher:string;

    @ManyToMany(type=>Authors,authors=>authors.books,{
        cascadeInsert:true,
        cascadeUpdate:true
    })
    @JoinTable()
    authors:Authors[]

}