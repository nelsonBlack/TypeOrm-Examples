import "reflect-metadata";
import { createConnection } from "typeorm";
import { Account } from "./entity/Account";
import { Profile } from "./entity/Profile";
import { Address } from "./entity/Address";
import {Books} from './entity/Books';
import {Authors} from './entity/Authors';
import {Person} from './entity/Person';
import {Passport} from './entity/Passport';


createConnection({
    type:"mysql",
    host:"localhost",
    port: 3306,
    username: "root",
    password: "digitallync",
    database: "test4",
    entities: [
        Passport,
        Person,
        Authors,
        Books,
        Address,
        Profile,
        Account
    ],
    autoSchemaSync: true,
}).then(async connection=>{
    
    let account = new Account();
    account.name = "Udhaya358";
    account.role = "user";
    //account.profile = profile;


    let profile1= new Profile();
    profile1.name = "Udhaya";
    profile1.email = "udhaya@gmail.com";
    profile1.password = "lyncdigital";
    profile1.phone = 909088;
    // step this carefully
    profile1.account = account;

    let profile2 = new Profile();
    profile2.name = "Shiva";
    profile2.email = "shiva@gmail.com";
    profile2.password = "lyncdigital";
    profile2.phone = 909088;
    // step this carefully
    profile2.account = account;

    let address1 = new Address();
    address1.city = "Hyderabad";
    address1.street = "Kothaguda";
    address1.country = "India";
    address1.pin = 523233

    address1.profile = profile1;
    address1.profile = profile2;

    let address2 = new Address();
    address2.city = "Visakhapatnam";
    address2.street = "Rtc X roads";
    address2.country = "India";
    address2.pin = 523234

    address2.profile = profile1;
    address2.profile = profile2;

    var  books1 = new Books();
    books1.bname="Introduction to Algorithms";
    books1.year = 1994;
    books1.publisher = "Apache solutions";
    //books1.authors = [authors1];

    var  books2 = new Books();
    books2.bname="Introduction to Algorithms";
    books2.year = 1994;
    books2.publisher = "Apache solutions";
    //books2.authors = [authors2];

    var  authors1 = new Authors();
    authors1.aname = "Coreman";
    authors1.surname = "Thomas";
    authors1.subject = "Algorithms";

    authors1.books = [books1];
   // authors2.books = [books2];

    var authors2 = new Authors();
    authors2.aname = "Ronald";
    authors2.surname = "Rivest";
    authors2.subject = "Algorithms";

    authors2.books = [books1];
    //authors2.books = [books2];

    let person = new Person();
    person.name = "Meegada";
    person.city = "visakhapatnam";
    person.state = "Andhra";

    let passport = new Passport();
    passport.country = "India";
    passport.year = 2014;
    passport.person = person;

    let accountRepository = connection.getRepository(Account);
    let profileRepository = connection.getRepository(Profile);
    let addressRepository = connection.getRepository(Address);
    let booksRepository = connection.getRepository(Books);
    let authorsRepository = connection.getRepository(Authors);
    let personRepository = connection.getRepository(Person);
    let passportRepository = connection.getRepository(Passport);

    // await accountRepository.persist(account);
    // await profileRepository.persist(profile1);
    // await profileRepository.persist(profile2);
    // await addressRepository.persist(address1);
    // await addressRepository.persist(address2);
    // await booksRepository.persist(books1);
    // await booksRepository.persist(books2);
    // await authorsRepository.persist(authors1);
    // await authorsRepository.persist(authors2);
    // await personRepository.persist(person);
    // await passportRepository.persist(passport);

    let profiles = await accountRepository.createQueryBuilder("account")
            .innerJoinAndSelect("account.profile", "profile")
            .innerJoinAndSelect("profile.address","address")
            .getMany();

            console.log(JSON.stringify(profiles));
            
            console.log("I am confused");

     console.log("For now account, profile, address is saved and lets wait for other results");


}).catch(error => console.log(error));