const jwt = require("jsonwebtoken");
const connection = require('../db/config')

const isLoggin = (req, res, romel) => {
    const getToken = req.cookies["token"]
    if (getToken) {
        const verifyToken = jwt.verify(getToken, "1234567")
        console.log('verifyToken:', verifyToken)
        const query = "select * from user where email = ?"
        connection.query(query, verifyToken.email, (err, result) => {
            if (err) {
                res.status(400).json({ message: "Please create account first!" })
            } else {
            console.log('result:',)
                req.getEmail =  result[0].email
                romel()
            }
        })
    } else {
        res.status(400).json({ message: "you are not loggedin" })
    }
}

module.exports = isLoggin;