getHealthcheck = async (req, res) => {
    res.status(200).json({"message": "I am alive and well!"});
};


module.exports = {
    getHealthcheck,
};
