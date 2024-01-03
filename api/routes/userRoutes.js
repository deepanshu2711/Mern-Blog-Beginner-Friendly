import express from "express";
import {Logout ,createPost ,getAllPosts ,postWithId, update} from "../controller/userController.js"



const router = express.Router();


router.get('/logout',Logout);
router.post('/create',createPost)
router.get('/allposts',getAllPosts);
router.get('/post/:id',postWithId)
router.post('/edit/:id',update);

export default router;