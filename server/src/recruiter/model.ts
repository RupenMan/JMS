/**
 * Created on: April 23, 2018
 * An object model for Recruiter
 * Uses the model schema developed by David Roncancio
 * Designed by Jeewan Mahendra Jayathilake and Rupendra Maharjan
 * @author Rupendra MAHARJAN
 */
import { model, Schema } from 'mongoose';
import {Address} from '../model/address';
import { JobPosition } from '../jobPositions/model';

const recruiterSchema: Schema = new Schema({
    // recruiter_id: String,
    name: String,
    address: String,
    // address:{type:Schema.Types.ObjectId,refs:'Address'},
    contact: String,
    email: String,
    webLink: String,
    logoURL:String,
    // positions:[String]
});

export const Recruiter = model("recruiter", recruiterSchema);
