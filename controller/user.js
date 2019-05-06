const path = require('path');
const fs = require('fs');
const { ObjectId } = require('mongodb');


const deleteUser = async (req, res, next) => {
    try {
        const deletingUserId = req.params.id;
        const collection = req.db.collection('users');
        await collection.findOne({
            _id: ObjectId(deletingUserId)
            }, (err, data) => {
            if (err) {
                return next(err);
            }
            collection.remove({
                _id: ObjectId(deletingUserId)
            }, (err, result) => {
                if (err) {
                    return next(new Error('not_delete'));
                }
                return res.status(200).json({
                    message : 'delete user successful',
                    data: result
                });
            });
        });
    } catch (e) {
        console.error(e);
        return res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            Error : e
        });
    }
};

const addUser = async (req, res, next) => {
    try {
        const newUser = req.body;
        const db = req.db;
        const collection = req.db.collection('users');
        await collection.findOne({username}, (err, data) => {
            if (err) {
                return next(err);
            }
            if (data) {
                return next(new Error('User_already_exists'))
            }
            collection.insertOne(newUser, (err, result) => {
                if (err) {
                    return next(err);
                }
                console.log(result);
                return res.status(201).json({
                    message: "create user successfull",
                    data: result.ops[0]  // yeu cau in ra 1 user nen ops[0] 
                });
            });
        });
    } catch (e) {
        console.error(e);
        return res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            error : e
        });
    }
};

const getListUser = async (req, res, next) => {
    try {
        let users = await req.db.collection('users').find().toArray();
        if (!users) {
            return next(new Error('No_data'));
        }
        return res.status(200).json({
            message: 'List users',
            data: users
        });
    } catch (e) {
        console.error(e);
        return res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            Error : e
        });
    }
};

const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await req.db.collection('users').findOne({
            _id: ObjectId(userId)
        });        
        if (!user) {
            return next(new Error('User_not_found'));
        }
        return res.status(200).json({
            message: 'User',
            data: user
        });
    } catch (e) {
        console.error(e);
        return res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            Error : e
        });
    }
};

const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const newValues = {$set: req.body};
        const update = req.db.collection('users');
        await update.findOne({
            _id: ObjectId(userId)
        }, (err, data) => {
            if (err) {
                return next(err);
            }
            if (!data) {
                return next(new Error('User_does_not_exist'))
            }
            update.updateOne({
                _id: ObjectId(userId)
            }, newValues, (err, result) => {
                if (err) {
                    return next(err);
                }
                return res.status(200).json({
                    message : 'update user succesful',
                    data: result
                });
            });
            
        });
    } catch (e) {
        console.error(e);
        return res.status(400).json({
            message : 'Error! An error occurred. Please try again later',
            Error : e.stack
        });
    }
};

module.exports = {
    deleteUser,
    addUser,
    getListUser,
    getUser,
    updateUser
};