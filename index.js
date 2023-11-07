const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server runing");
});

app.post("/create", (req, res) => {
  const data = req.body;

  const option = {
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

  const jwtData = jwt.sign(data, "lsdnflkasdjflsjd", {
    expiresIn:"1day"
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
