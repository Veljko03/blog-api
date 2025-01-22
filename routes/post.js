const { Router } = require("express");
const router = Router();
const postController = require("../controllers/postController");
const passport = require("passport");
router.get("/", postController.getPosts);
router.get("/:id", postController.getPostsById);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.deletePostById
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.updatePost
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

//LIKE
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  postController.likePost
);

//COMMENTS
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  postController.createComment
);
router.delete(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  postController.deleteComment
);

module.exports = router;
