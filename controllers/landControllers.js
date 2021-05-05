const Land = require("../models/Land");

const createLand = (req, res) => {
    const data = req.body;
    const newLand = new Land(data);
    newLand.save().then((doc) => {
        return res.json({
            success: true,
            data: doc
        })
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            error: err,
            message: "Internal Server Error!"
        })
    })
};

const deleteLandById = (req, res) => {
    const { lid } = req.params;
    Land.deleteOne({ _id: lid }, (err) => {
        if (err)
            return res.json({
                success: false,
                error: err
            });
        return res.json({
            success: true,
            message: "Deleted Successfully!"
        })
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            error: err,
            message: "Internal Server Error!"
        })
    })
};


const updateLandById = (req, res) => {
    const { lid } = req.params;
    Land.updateOne({ _id: lid }, { ...req.body }, (err, doc) => {
        if (err)
            return res.json({
                success: false,
                error: err
            })
        return res.json({
            success: true,
            error: false,
            data: doc
        })
    })
};


const getLands = (req, res) => {
    let { skip, limit } = req.query;
    if (skip)
        skip = parseInt(skip)
    if (limit)
        limit = parseInt(limit)
    Land.find()
        .sort({ createdAt: -1 })
        .skip(skip ? skip : 0)
        .limit(limit ? limit : 40)
        .exec((err, docs) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    error: err
                })
            return res.status(200).json({
                success: true,
                data: docs,
            })
        })
};


const getLandById = (req, res) => {
    const { lid } = req.params;
    Land.findById({ _id: lid }, (err, doc) => {
        if (err) return res.status(400).json({
            success: false,
            error: err
        });
        if (!doc) return res.status(400).json({
            success: false,
            error: true,
            message: "Land Not Found"
        });
        return res.json({
            success: true,
            error: false,
            data: doc
        })
    })
}

module.exports = {
    createLand,
    deleteLandById,
    updateLandById,
    getLands,
    getLandById
}