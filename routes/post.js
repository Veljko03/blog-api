const { Router } = require("express");
const router = Router();
const postController = require("../controllers/postController");

router.get("/", postController.getPosts);
router.get("/:id", postController.getPostsById);
router.delete("/:id", postController.deletePostById);
router.put("/:id", postController.updatePost);
router.post("/", postController.createPost);

//LIKE
//router.post("/like/:id", postController.likePost);

module.exports = router;
