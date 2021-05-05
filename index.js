require("dotenv").config();
const express = require("express");
const { json } = require("express")
const morgan = require("morgan");
const mongoose = require("mongoose");
const { LandRoutes, UserRoutes } = require("./routes/index");

(function () {
    const app = express();
    const BaseAPI = "/api/v1";
    app.use(morgan(process.env.NODE_ENV || "dev"));
    app.use(json());
    app.use(BaseAPI, LandRoutes);
    app.use(BaseAPI, UserRoutes);
    function connect_db() {
        try {
            mongoose.connect(process.env.DATABASE,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false
                })
                .then(() => {
                    console.log("db connected");
                });
        }
        catch (err) {
            console.log("db not connected", err);
        };
    }
    const port = process.env.PORT || 8080;

    app.listen(port, () => {
        console.log(`server started at ${port}`);
        connect_db();
    })
})()