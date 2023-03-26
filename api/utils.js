const serverError = (res, err) => {
    res.status(500).json({message: `Server error : ${err}`});
};


module.exports = {
    serverError,
};
