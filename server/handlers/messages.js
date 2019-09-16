const db = require('../models');

exports.addmessage = async function (req, res, next) {
    try{
        const message = await db.Message.create(req.body);
        res.status(201).json(message);
    }catch(err){
        err.message = 'Error Happened With database';
        next(err);
    }
};

exports.getmessages = async function (req, res, next) {
    try{
        const messages = await db.Message.find();
        res.status(201).json(messages);
    }catch(err){
        err.message = 'Error Happened With database';
        next(err);
    }
};