import {Entity,Column,PrimaryGeneratedColumn,ManyToMany,JoinTable} from 'typeorm';
import { Books } from './Books';

@Entity()
export class Authors{
    @PrimaryGeneratedColumn()
    aid:number;

    @Column()
    aname:string;

    @Column()
    surname:string;

    @Column()
    subject:string;

    @ManyToMany(type=>Books,books=>books.authors,{
        cascadeInsert:true,
        cascadeUpdate:true
    })
    @JoinTable()
    books:Books[];

}