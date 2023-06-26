//import { DataGraph } from "@essenza/core";

const Type = { bool: 0, small: 1, string: 2, decimal: 3, double: 4, float: 5, int: 6, long: 7, date: 8 };
const bool = 0;
const small = 1;
const string = 2;
const decimal = 3;
const double = 4;
const float = 5;
const int = 6;
const long = 7;
const date = 8;
const money = 3;
const char = 2;

export function AppSchema(app){
    app.setSchema({
            /* users: {
                id: int, tname: string, tsurname: string, temail: string, tpassword: string, itype: int, taddress: string, phone: string, idplatform: int,
                username: string, nusername: string, nemail: string, emailvalid: bool, phonevalid: bool, twofactor: bool, cf: string,  
                tportfolio: string, tprofileimage: string, twebsiteurl: string, cvdate: date,
                mkt: bool, ctrl: bool, tech: bool, locked: bool, dlog: date, dlast: date, url: string,
                tbusinessname: string, tsite: string, tbusinessarea: string, vatnumber: string,tlogo: string, 
                street: string, num: string, locality: string, code: string, city: string
            }, */
            users: {
                id: int, tname: string, tsurname: string, temail: string, tpassword: string, itype: int, taddress: string, phone: string, idplatform: int,
                username: string, nusername: string, nemail: string, emailvalid: bool, phonevalid: bool, twofactor: bool, cf: string, vatnumber: string, 
                tportfolio: string, tprofileimage: string, twebsiteurl: string, cvdate: date,
                mkt: bool, ctrl: bool, tech: bool, locked: bool, dlog: date, dlast: date, url: string,
                tbusinessname: string, tsite: string, tbusinessarea: string, tlogo: string, 
                street: string, num: string, locality: string, code: string, city: string, affiliate: bool
            },
    });
}