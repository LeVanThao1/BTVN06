const creatUser = (req, res, next) => {
    if (!req.body.username) {
        return next (new Error('require_username'));
    }
    if (!req.body.age) {
        return next (new Error('require_age'));
    }
    if (!req.body.address) {
        return next (new Error('require_adress'));
    }
    return next();
};

const updateUser = (req, res, next) => {
    if (req.params.id.length < 24){
        return next (new Error('Invalid_Id'));
    }
    if (!req.body){
        return next (new Error('require_data_update'));
    }
    return next();
};

const getUser = (req, res, next) => {
    if (req.params.id.length < 24){
        return next (new Error('Invalid_Id'));
    }
    return next();
};

const deleteUser = (req, res, next) => {
    if (req.params.id.length < 24){
        return next (new Error('Invalid_Id'));
    }
    return next();
};

module.exports = {
    creatUser,
    updateUser,
    getUser,
    deleteUser
};