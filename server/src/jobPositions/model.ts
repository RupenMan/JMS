/**
 * Created on: April 23, 2018
 * An object model for Job Position
 * Uses the model schema developed by David Roncancio
 * Designed by Jeewan Mahendra Jayathilake and Rupendra Maharjan
 * @author Rupendra MAHARJAN
 */

import { model, Schema } from "mongoose";

const jobPositionSchema: Schema = new Schema({
    position_id:String,
    title: String,
    description: String,
    tags: String,
    status: String,
    postDate: { type: Date, default: new Date() }
});

export const JobPosition = model("job_position", jobPositionSchema);
