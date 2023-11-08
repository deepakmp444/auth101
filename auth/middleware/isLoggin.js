const jwt = require("jsonwebtoken");
const connection = require('../db/config')
const isLoggin = (req, res, next) => {
    const getToken = req.cookies["token"]
    if (getToken) {
        const verifyToken = jwt.verify(getToken, "1234567")
        const query = "select * from user where email = ?"
        connection.query(query, verifyToken.email, (err, result) => {
            if (err) {
                res.status(400).json({ message: "Please create account first!" })
            } else {
                next()
            }
        })
    } else {
        res.status(400).json({ message: "you are not loggedin" })
    }
}

module.exports = isLoggin;