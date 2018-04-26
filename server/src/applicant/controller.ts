import { Router } from "express";
import { Applicant } from './model';
import logger from "../util/logger";
import { Address } from "../model/address";
//import { JobPosition } from "./model";

const router = Router();
interface addressInterface {
    line1:string,
    line2: string,
    city: string,
    state: string,
    zipCode: string,
};

interface applicantInfo {
    _id: String,
    name: String,
    address: string,
    contact: String,
    email: String,
    liURL: String,
}


router.get("/info", async (req, res) => {
    // const response: any = {
    //     "applicant": {
    //         "name": "Jeewan Jaathilkae",
    //         "email": "efacjewan@gmail.com",
    //         "phone": "1234",
    //         "dob": "11/12/1234",
    //         "address": "123, Nth 4th, AI",
    //         "liURL": "www"
    //     },
    //     "appliedpost": [
    //         {
    //             "jobPositionId": "1",
    //             "title": "Software Engineer",
    //             "description": "java bla bala"
    //         },
    //         {
    //             "jobPositionId": "2",
    //             "title": "Software Engineer 2",
    //             "description": "java bla bala sss"
    //         }
    //     ]
    // };
    // res.send(response);
});


router.post("/update", async (req, res) => {
let body = req.body;
    console.log("My URL=" + JSON.stringify(req.body));

    const query ={
        applicant_id:body.applicant_id
    };

    const newApplicant = {
        $set: {
            applicant_id: body.applicant_id,
            name: body.name,
            address: body.address,
            contact: body.contact,
            email: body.email,
            liURL: body.liURL
        }};
    console.log();
    logger.info("Applicant Updated");
    await Applicant.findOneAndUpdate(query,newApplicant,{upsert:true, new:true});
    res.send({});

});

router.post("/updatepositions", async (req, res) => {
    let body = req.body;
        console.log("My URL=" + JSON.stringify(req.body));
    
        const query ={
            applicant_id:body.applicant_id
        };
    
        const newApplicant = {
            $set: {
                positions:{$push: body.positions}
            }};
        console.log();
        logger.info("Applicant Updated");
        await Applicant.findOneAndUpdate(query,newApplicant,{upsert:true, new:true});
        res.send({});
    
    });
    

export const ApplicantController: Router = router;



// //import { mongoose } from 'mongoose';
// import { Router } from "express";

// import logger from "../util/logger";
// import { Applicant } from "./model";
// import { JobPosition } from "../jobPositions/model";
// import { Address } from '../model/address';
// import { isAuthenticated } from "../auth/controller";


// //var mongoose = require('mongoose');

// //const router = Router();

// interface addressInterface {
//     line1:string,
//     line2: string,
//     city: string,
//     state: string,
//     zipCode: string,
// };

// interface applicantInfo {
//     _id: String,
//     name: String,
//     address: addressInterface,
//     contact: String,
//     email: String,
//     liURL: String,
// }


// export const getApplicantInfo = async (req: any, res: any, next: any) => {
//     const response: any = {
//         "applicant": {
//             "name": "Jeewan Jaathilkae",
//             "email": "efacjewan@gmail.com",
//             "phone": "1234",
//             "dob": "11/12/1234",
//             "address": "123, Nth 4th, AI",
//             "liURL": "www"
//         },
//         "appliedpost": [
//             {
//                 "jobPositionId": "1",
//                 "jobTitle": "Software Engineer",
//                 "description": "java bla bala"
//             },
//             {
//                 "jobPositionId": "2",
//                 "jobTitle": "Software Engineer 2",
//                 "description": "java bla bala sss"
//             }
//         ]
//     };
//     next();
// }

// export const updateApplicantInfo = async (req: any, res: any, next: any) => {
//     const {_id, name, address, contact, email, liURL } : applicantInfo = req.body;

//     const updateApplicant = await Applicant.findOneAndUpdate({ _id },{ name, email, contact, address },{upsert:true, new: true});

//     res.send(updateApplicant);

// }



