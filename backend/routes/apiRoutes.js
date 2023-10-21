import express from "express";
import mongoose from "mongoose";
import jwtAuth from "../lib/jwtAuth.js"

import User from '../db/User.js'; 
import JobApplicant from '../db/JobApplicant.js';
import Recruiter from '../db/Recruiter.js';
import Job from '../db/Job.js';
import Application from '../db/Application.js';
import Rating from '../db/Rating.js';

const router = express.Router();

router.post("/jobs", jwtAuth, async (req, res)=>{
    const user = req.user;

    if(user.type != "recruiter"){
        return res.status(401).json({
            message: "You don't have permissions to add jobs",
          });
    }

    const data = req.body;
    const job = new Job({
        userId: user._id,
        ...data
    });
    try {
        await job.save();
        res.json({ message: "Job added successfully to the database" });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get("/jobs", jwtAuth, async (req, res)=>{
    const user = req.user;
    let findParams = {};
    let sortParams = {};

    if(user.type === "recruiter" && req.query.myjobs){
        findParams = {
            ...findParams,
            userId: user._id,
        };
    }

    if(req.query.q){
        findParams = {
            ...findParams,
            title: {
                $regex: new RegExp(req.query.q, "i"),
            },
        };
    }

    if (req.query.jobType) {
        let jobTypes = Array.isArray(req.query.jobType) ? req.query.jobType : [req.query.jobType];
        findParams = {
          ...findParams,
          jobType: {
            $in: jobTypes,
          },
        };
      }
    
    if (req.query.salaryMin && req.query.salaryMax) {
        findParams = {
            ...findParams,
            $and: [
            {
                salary: {
                $gte: parseInt(req.query.salaryMin),
                },
            },
            {
                salary: {
                $lte: parseInt(req.query.salaryMax),
                },
            },
            ],
    };
    } else if (req.query.salaryMin) {
        findParams = {
            ...findParams,
            salary: {
            $gte: parseInt(req.query.salaryMin),
            },
    };
    } else if (req.query.salaryMax) {
        findParams = {
            ...findParams,
            salary: {
            $lte: parseInt(req.query.salaryMax),
            },
        };
    }
    if (req.query.duration) {
        findParams = {
            ...findParams,
            duration: {
            $lt: parseInt(req.query.duration),
            },
        };
    }

    if (req.query.asc) {
        if (Array.isArray(req.query.asc)) {
          req.query.asc.forEach((key) => {
            sortParams = {
              ...sortParams,
              [key]: 1,
            };
          });
        } else {
          sortParams = {
            ...sortParams,
            [req.query.asc]: 1,
          };
        }
      }
    
    if(req.query.desc){
        if(Array.isArray(req.query.desc)){
            req.query.desc.forEach((key)=>{
                sortParams = {
                    ...sortParams,
                    [key]: -1,
                };
            });
        }else{
            sortParams = {
                ...sortParams,
                [req.query.desc]: -1,
            };
        }
    }
    let aggregationPipeline = [
        {
          $lookup: {
            from: "recruiterinfos",
            localField: "userId",
            foreignField: "userId",
            as: "recruiter",
          },
        },
        { $unwind: "$recruiter" },
        { $match: findParams },
      ];
    
    if (Object.keys(sortParams).length > 0) {
        aggregationPipeline.push({
          $sort: sortParams,
        });
    }
    try {
        const posts = await Job.aggregate(aggregationPipeline);
        //console.log("length" + posts.length);
        if (posts.length === 0) {
          return res.status(404).json({
            message: "No job found",
          });
        }
        res.json(posts);
    } catch (err) {
        console.log("error encountered");
        console.log(err);
        res.status(400).json(err);
    }     
});
router.get("/jobs/:id", jwtAuth, async (req, res) => {
    try {
      const job = await Job.findOne({ _id: req.params.id }).exec();
  
      if (!job) {
        return res.status(404).json({
          message: "Job does not exist",
        });
      }
  
      res.json(job);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put("/jobs/:id", jwtAuth, async (req, res) => {

    const user = req.user;
    // console.log(req.user);
    if(user.type !== "recruiter"){
        return res.status(401).json({
            message: "You don't have permissions to update jobs",
        });
    }
    try{
        const job = await Job.findOne({_id: req.params.id, userId: user.id}).exec();
        if(!job){
            return res.status(404).json({
                message: "Job does not exist",
            });
        }
        const data = req.body;
        // console.log(data);
        if(data.maxApplicants){
            // console.log(data.maxApplicants);
            job.maxApplicants = data.maxApplicants;
        }

        if(data.maxPositions){
            job.maxPositions = data.maxPositions;
        }
        if(data.deadline){
            job.deadline = data.deadline;
        }
        // console.log(typeof job);
        await job.save();
        // console.log("done");
        res.json({
            message: "Job updated successfully",
        });
    } catch (err){
        // console.log("error");
        // console.log(err);
        res.status(400).json(err);
    }
});
  
router.delete("/jobs/:id", jwtAuth, async(req, res)=>{
    const user = req.user;
    if(user.type !== "recruiter"){
        return res.status(401).json({
            message: "You don't have permissions to delete jobs",
        });
    }
    try{
        const job = await Job.findOneAndDelete({_id: req.params.id, userId: user.id});
        if(!job){
            return res.status(401).json({
                message: "Inavlid JobID",
            });
        }
        res.json({
            message: "Job deleted successfully",
        });
    }catch(err){
        res.status(400).json({err});
    }
});
router.get("/user", jwtAuth, async (req, res) => {
    const user = req.user;
    // console.log(user);
    try {
      if (user.type === "recruiter") {
        const recruiter = await Recruiter.findOne({ userId: user._id });
        // console.log(recruiter);
        if (recruiter === null) {
          return res.status(404).json({
            message: "User does not exist",
          });
        }
  
        res.json(recruiter);
      } else {
        const jobApplicant = await JobApplicant.findOne({ userId: user._id });
  
        if (jobApplicant === null) {
          return res.status(404).json({
            message: "User does not exist",
          });
        }
  
        res.json(jobApplicant);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  });
router.get("/user/:id", jwtAuth, async (req, res) => {
    try {
      const userData = await User.findOne({ _id: req.params.id }).exec();
      // console.log(userData);
      if (userData === null) {
        return res.status(404).json({
          message: "User does not exist",
        });
      }
      
      if (userData.type === "recruiter") {

        const recruiter = await Recruiter.findOne({ userId: userData._id }).exec();
        // console.log(recruiter);
        if (recruiter === null) {
          return res.status(404).json({
            message: "User does not exist",
          });
        }
  
        res.json(recruiter);
      } else {
        const jobApplicant = await JobApplicant.findOne({ userId: userData._id }).exec();
  
        if (jobApplicant === null) {
          return res.status(404).json({
            message: "User does not exist",
          });
        }
  
        res.json(jobApplicant);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
router.put("/user", jwtAuth, async (req, res) => {
    
    const user = req.user;
    const data = req.body;
    console.log(user)
    console.log(data)
  
    try {
      if (user.type === "recruiter") {
        
        const recruiter = await Recruiter.findOne({ userId: user._id }).exec();
  
        if (recruiter === null) {
            // console.log("updating recruiter");

          return res.status(404).json({
            message: "User does not exist",
          });
        }
  
        // Update recruiter's information if provided
        if (data.name) {
          recruiter.name = data.name;
        }
        if (data.contactNumber) {
          recruiter.contactNumber = data.contactNumber;
        }
        if (data.bio) {
          recruiter.bio = data.bio;
        }
  
        // Save the updated recruiter's information
        await recruiter.save();
  
        res.json({
          message: "User information updated successfully",
        });
      } else {
        // Find the job applicant by user ID
        const jobApplicant = await JobApplicant.findOne({ userId: user._id }).exec();
  
        if (jobApplicant === null) {
          return res.status(404).json({
            message: "User does not exist",
          });
        }
  
        // Update job applicant's information if provided
        if (data.name) {
          jobApplicant.name = data.name;
        }
        if (data.education) {
          jobApplicant.education = data.education;
        }
        if (data.skills) {
          jobApplicant.skills = data.skills;
        }
        if (data.resume) {
          jobApplicant.resume = data.resume;
        }
        if (data.profile) {
          jobApplicant.profile = data.profile;
        }
  
        // Save the updated job applicant's information
        await jobApplicant.save();
  
        res.json({
          message: "User information updated successfully",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

router.post("/jobs/:id/applications", jwtAuth, async (req, res) => {
    const user = req.user;
    console.log(user);
    if(user.type !== "applicant"){
        return res.status(401).json({
            message: "You don't have permissions to apply for jobs",
        });
    }

    try{
      const data = req.body;
      const userId  = user._id;
      const jobId = req.params.id;
      console.log(req.body);
      const appliedApplication =  await Application.findOne({
        userId: user._id,
        jobId: jobId,
        status: {
          $nin: ["deleted", "accepted", "cancelled"],
        },
      }).exec();

      if(appliedApplication){
        return res.status(400).json({
          message: "You have already applied for this job",
        });
      }
      const job = await Job.findOne({_id: jobId}).exec();

      if(!job){
        return res.status(400).json({
          message: "Job does not exist",
        });
      }

      const activeApplicationCount = await Application.countDocuments({
        jobId: job._id, 
        status: { $nin: ["deleted", "accepted", "cancelled"] } 
      }).exec();
      
      if(activeApplicationCount < job.maxApplicants){

        const myActiveApplicationCount = await Application.countDocuments({
          userId: user._id,
          status: {
            $nin: ["rejected", "deleted", "cancelled", "finished"],
          },
        }).exec();

        if(myActiveApplicationCount < 5){
          const acceptedJobs = await Application.countDocuments({
            userId: user._id,
            status: "accepted",
          }).exec();

          if(acceptedJobs === 0){
            const application = new Application({
              userId: user._id,
              recruiterId: job.userId,
              jobId: job._id,
              status: "applied",
              sop: data.sop,
            });

            await application.save();

            return res.json({
              message: "Application sent successfully",
            });
          }else{
            return res.status(400).json({
              message: "You already have an accepted job",
            });
          }
        }else{
          return res.status(400).json({
            message: "You cannot have more than 10 active applications",
          });
        }
      }else{
        console.log(activeApplicationCount);
        console.log(job.maxApplicants);
        return res.status(400).json({
          message: "Application limit reached for this job",
        });
      }
    }catch(err){
      console.log("This is the error##############################")
      console.log(err);
      res.status(400).json(err);
    }
  });
  
  export default router;
  


