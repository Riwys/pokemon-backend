const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { email, name, pwd } = req.body;
    if (!email || !name || !pwd) return res.status(400).json({ 'message': 'Username and password are required' });
    
    // check for duplicate usernames in db
    const duplicate = await User.findOne({ username: name }).exec();
    if (duplicate) return res.sendStatus(409); // Conflict

    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // create store the new user
        const result = await User.create({ 
            "username": name, 
            "emailId": email,
            "password": hashedPwd 
        });
        
        console.log(result);
        
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports = {handleNewUser}