const { verifyToken } = require("./verifyToken");

const router = require("express").Router();
//  update user

router.put("/:id", verifyToken, (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        res.status(200).json("User updated successfully");
    } else {
        res.status(403).json("You can only update your own account");
    }
})


module.exports = router;