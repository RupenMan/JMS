import { Router } from "express";

import logger from "../util/logger";
import { Recruiter } from "./model";
import { JobPosition } from "../jobPositions/model";
import { Address } from "../model/address";
import { isAuthenticated } from '../auth/controller';

var mongoose = require('mongoose');

const router = Router();
// 
router.get("/info", isAuthenticated, async (req:any, res:any) => {
    logger.info({ log: "this" });
    console.log("Inside Router");
    const query = {
        // email:"omg@"
        user:req._id
    };
    const recruiter = await Recruiter.findOne(query).populate('user').populate('positions');
    res.send(recruiter);
});

router.get("/me", async (req:any, res) => {
    logger.info({ log: "this" });
    let id = req._id;
    
    const recruiter = await Recruiter.findOne({user:id});
    res.send(recruiter);
});

router.post('/create', async (req, res, next) => {
    logger.info("Recruiter Created");
    let body = req.body;
    // console.log(body.name + body.address + body.contact + body.contact + body.email);
    const newEmployer = new Recruiter({
        name:body.name,
        address: body.address,
        contact: body.contact,
        email:body.email,
        webLink:body.webLink,
        logoURL:""
    });

    await newEmployer.save();
    res.send({});
});

router.put('/update', async (req:any, res, next) => {
    
    let body = req.body;
    console.log("My URL=" + JSON.stringify(req.body));

    const query ={
            // email:"omg@",
            user:req._id
    };
    const newEmployer = {
            $set: {
                // name: body.name,
                address: body.address,
                contact: body.contact,
                email: body.email,
                webLink: body.webLink,
                logoURL: body.logoURL
            }};
    console.log();
    logger.info("Recruiter Updated");
    await Recruiter.findOneAndUpdate(query,newEmployer,{upsert:true, new:true});
    res.send({});
});

export const RecruiterController: Router = router;
