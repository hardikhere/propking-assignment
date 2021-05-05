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
router.delete("/delete/:lid", deleteLandById);
router.put("/update/:lid", updateLandById);
router.post("/create-land", checkToken, createLand)

module.exports = router;