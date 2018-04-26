import { Router } from "express";

import logger from "../util/logger";
import { Address } from "../model/address";
import { JobPosition } from "./model";
import { Recruiter } from "../recruiter/model";

const router = Router();

router.get("/", async (req, res) => {
    logger.info({ log: "this" });
    const jobPos = await JobPosition.find();
    res.send(jobPos);
});

router.post("/create", async (req, res) => {
    console.log("MY REQUEST BODY=" + JSON.stringify(req.body));
    logger.info("creating Recruiter");
    let newJob = req.body;
    let recruiter_id = req.body.id;
    const aJob = new JobPosition({
            title: newJob.title,
            description: newJob.description,
            tags: newJob.tags,
            status: newJob.status,
            postDate: newJob.postDate,
        });
    const pos = await aJob.save();

    const query = {
        recruiter_id:recruiter_id
    };

    const operator = {
        $push:{ positions:pos._id}
    };

    await Recruiter.findOneAndUpdate(query,operator, {new:true});
    res.send({msg:"ok"});
});

router.get('/search', async (req, res) => {
    logger.info({ log: "this" });
    for (let term in req.query) {
        req.query[term]  = {$regex: req.query[term], $options: 'i'};
    }
    console.log(req.query);
    const jobPos = await JobPosition.find(req.query);
        
    res.send(jobPos);
})

export const JobPositionController: Router = router;
