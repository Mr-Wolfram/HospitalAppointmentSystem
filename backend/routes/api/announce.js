const express = require("express"),
    router = express.Router();

const Announce = require("../../models/announce");
const { v4: uuidv4 } = require('uuid');
const announceDocToInterface = (doc) => {
    if (doc !== null && doc !== undefined) {
        return {
            id: doc.announce_id,
            title: doc.title,
            content: doc.content,
            poster: {
                name: doc.announcer,
            },
            date: doc.date,
        };
    }
    return doc;
};

const announceInterfaceToDoc = (interface) => {
    if (
        interface !== null &&
        interface !== undefined &&
        interface.title !== null &&
        interface.title !== undefined
    ) {
        return {
            announce_id: uuidv4(),
            title: interface.title,
            content: interface.content,
            announcer: interface.poster,
            date: interface.date,
        };
    }
    return undefined;
};

router.get("/get", async(req, res, next) => {
    const num = req.query.num;
    const data =
        (await Announce.find().sort({ date: -1 }).limit(num).exec()) || [];
    const count = data.length;
    const result = data.map(announceDocToInterface);

    const r = {
        status: 200,
        msg: "success",
        data: {
            return_count: num,
            announce: result,
        },
    };
    res.json(r);
});

router.post("/post", async(req, res, next) => {
    const doc = announceInterfaceToDoc(req.body);
    await Announce.insertMany(doc);

    const r = {
        status: 200,
        msg: "succeeded", //"success" ? 
    };
    res.json(r);
});

module.exports = router;