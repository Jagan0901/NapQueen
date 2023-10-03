import express from "express";
import { getLatestPosts } from "../helper.js";


const router = express.Router();

//Get latest blog
router.get("/", async(req,res)=>{
    const retrieves = await getLatestPosts();
    res.send(retrieves[0]);
});



export const latestPostRouter = router;