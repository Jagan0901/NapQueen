import {client} from "./index.js";

export async function creatingPost(data) {
  return await client
    .db("Nap-Queen")
    .collection("posts")
    .insertOne(data);
}

export async function getAllPosts(req) {
  return await client
    .db("Nap-Queen")
    .collection("posts")
    .find(req.query)
    .toArray();
}

export async function getPostById(id) {
  return await client
    .db("Nap-Queen")
    .collection("posts")
    .findOne({id: id})
}

export async function updatePostById(id,data) {
  return await client
    .db("Nap-Queen")
    .collection("posts")
    .updateOne({id:id}, {$set:data});
}

export async function deleteBlogById(id) {
  return await client
    .db("Nap-Queen")
    .collection("posts")
    .deleteOne({ id: id });
}