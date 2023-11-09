const connection = require('../db/config')
const jwt = require('jsonwebtoken')

const createUser = (req, res) => {
    const { id, email, password } = req.body;
    const data = {
        id, email, password
    }
    const query = "INSERT INTO user set ?"
    connection.query(query, data, (err, result) => {
        if (err) {
            res.status(500).json({ data: null, error: err.message })
        } else {
            res.status(200).json({ data: result })
        }
    })
}

const loginUser = (req, res) => {
    const { email, password } = req.body;
    const query = "select * from user where email = ?"
    connection.query(query, email, (err, result) => {
        if (err) {
            res.status(500).json({ data: null, error: err.message })
        } else {

            if (password === result[0].password) {
                const data = {
                    email: result[0].email,
                    id: result[0].id
                }

                const option = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                    path: "/",
                };

                const token = jwt.sign(data, "1234567", { expiresIn: "1d" })

                res.status(200).cookie("token", token, option).json({ data: result, token })
            } else {
                res.status(400).json({ message: "Password not match" })
            }

        }
    })
}

const getAllUser = (req, res) => {
    const query = "select * from user"
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ data: null, error: err.message })
        } else {
            res.status(200).json({ data: result })
        }
    })
}

const userVerify = (req, res) => {

    const query = "select email, id from user where email = ?"
    connection.query(query, req.getEmail, (err, result) => {
        if (err) {
            res.status(400).json({ message: "Please create account first!" })
        } else {
            res.status(200).json({ data: result })
        }
    })

}


const logoutUser = (req, res) => {
    res.status(200).clearCookie('token', { sameSite: "none", secure: true }).json({ data: null, message: "Logout successfully" })
}

module.exports = { createUser, loginUser, getAllUser, logoutUser, userVerify }