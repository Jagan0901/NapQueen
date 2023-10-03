import express from "express";
import { creatingPost, getAllPosts, getPostById, updatePostById,deleteBlogById } from "../helper.js";

const router = express.Router();


//Create blog
router.post("/", async(req,res)=>{
    const {title,content, category_id} = req.body;
    if(!title || !content || !category_id){
        res.status(400).send({error: "Invalid Credentials"});
        return;
    }
    
    // To declaring the id with the random number
    const id = Math.floor(Math.random() * 10000 + 1);
    const data = {
      id: id.toString(),
      title: title,
      content: content,
      category_id: +category_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const create = await creatingPost(data);
    res.send({ message: "Created Successfully" });
});


//Get all posts
router.get("/", async(req,res)=>{

    if(req.query.id){
        req.query.id = +req.query.id;
    }else if(req.query.category_id){
        req.query.category_id = +req.query.category_id;
    }

    const retrieve = await getAllPosts(req);
    res.send(retrieve);
});


//Get blog by id
router.get("/:id", async(req,res)=>{
    const {id} = req.params;   
    const data = await getPostById(id);
    
    data
      ? res.send(data)
      : res.status(400).send({ error: "Post is not stored in Database" });
});

//Update blog
router.put("/:id", async(req,res)=>{
    const {id} = req.params;
    const {title,content} = req.body;
    if(!title || !content) return res.status(400).send({error:"Invalid Credentials"});
    const retrieve = await getPostById(id);
    if(!retrieve) return res.status(400).send({ error: "Post is not stored in Database" });

    const data = {
      id: id,
      title: title,
      content: content,
      category_id: retrieve.category_id,
      createdAt: retrieve.createdAt,
      updatedAt: new Date()
    };
    const update = await updatePostById(id,data);
    res.send(update);
});

//Delete blog
router.delete("/:id", async (req,res) => {
  const {id} = req.params;
  const retrieve = await getPostById(id);
  if (!retrieve)
    return res.status(400).send({ error: "Post is not stored in Database" });
  const post = await deleteBlogById(id);
  res.send(post); 
})




export const postsRouter = router;