const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require('cors')
require('./db/config')
const userRoute = require('./router/authRouter')


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use("/api", userRoute)

app.get("/", (req, res) => {
  res.send("Server runing");
});

app.post("/create", (req, res) => {
  const data = req.body;

  const option = {
    // time for JWT Cookies
    // Basically, 1000 is used here just for converting seconds to milliseconds.
    // 1 second = 1000 milliseconds
    // day:3 + hour:24 + mint:60 + second:60 + 1000
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true,
    sameSite: "none",
    path: "/",
  };

  res
    .status(200)
    .cookie("Deepak", data, option)
    .json({ message: "Cookies Created" });
});

app.delete("/delete", (req, res) => {
  res.status(200).clearCookie("Deepak").json({ message: "Clear cookies" });
});

app.get("/getcookie", (req, res) => {
  const getCookies = req.cookies["Deepak"];

  res.status(200).json({ message: "get cookies", data: getCookies });
});

app.post("/jwt", (req, res) => {
  const data = req.body
  // time for JWT token
  // ('2 days')  // 172800000
  // ('1d')   // 86400000
  // ('10h')  // 36000000
  // ('2.5 hrs') // 9000000
  // ('2h')      // 7200000
  // ('1m')      // 60000
  // ('5s')      // 5000
  // ('1y')      // 31557600000

  const jwtData = jwt.sign(data, "lsdnflkasdjflsjd", {
    expiresIn: "1day"
  });

  const option = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true,
    sameSite: "none",
    path: "/",
  };

  res.status(200).cookie("tnplab", jwtData, option).json({ data: jwtData });
});


app.post("/jwt-verify", (req, res) => {
  const getCookies = req.cookies["tnplab"]
  const jwtData = jwt.verify(getCookies, "lsdnflkasdjflsjd");
  console.log('jwtData:', jwtData)

  res.status(200).json({ data: jwtData });
});


app.listen(4004, () => {
  console.log("Server staring");
});
