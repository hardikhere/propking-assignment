const express = require("express");
const { getLands,
    getLandById,
    deleteLandById,
    updateLandById,
    createLand } =
    require("../controllers/landControllers");
const checkToken = require("../middlewares/checkToken");
const router = express.Router();
const basicWrapper = async (req, res, controller) => {
    try {
        return await controller(req, res);
    } catch (err) {
        return SendResponse(res, 500, {}, "Internal Server Error!", err.message);
    }
};

router.get("/lands", getLands);
router.get("/lands/:lid", getLandById);
router.delete("/delete/:lid", checkToken, deleteLandById);
router.put("/update/:lid", checkToken, updateLandById);
router.post("/create-land", checkToken, createLand)
router.get("/checkToken", checkToken, (req, res) => {
    return res.json({
        message: "valid token",
        success: true,
        data: req.decoded
    })
})
module.exports = router;