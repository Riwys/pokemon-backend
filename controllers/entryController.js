const User = require('../model/User');
const bcrypt = require('bcrypt');

const updateEntry = async (req, res) => {
    const { id } = req.body

    const foundUser = await User.findOne({ _id: id }).exec();

    if (!foundUser) {
        return res.status(204).json({ "message": `No user matched ID ${req.body.id}.` })
    } else {
        foundUser.entries = foundUser.entries + 1;
        const result = await foundUser.save();
        let answer =  result.entries
        res.json(answer);
    }
    
}

module.exports = { updateEntry };