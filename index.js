const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const router = require("./router");
const { Adminuser } = require("./models");

const PORT = 8080;

const app = express();

app.use(methodOverride("_method"));

// Accepting Input
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set cookie parser, session and flash
app.use(cookieParser("NotSoSecret"));
app.use(session({
  secret: "something",
  cookie: {maxAge: 6000},
  resave:true,
  saveUninitialized:true,
})
);
app.use(flash());

// Static files
app.use(express.static("public"));

app.use("/login", (req, res) => {
  res.render("login/login");
});

app.get("/signup", (req, res) => {
  res.render("login/signup");
});

app.post("/signup", (req, res) => {
  Adminuser.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(() => {
    res.redirect("/login");
  });
});

// Set Templating Engine
app.use(expressLayouts);
app.set("layout", "./layouts/app");
app.set("view engine", "ejs");

// Middleware to pass `url` to locals variable so we can use it on view
app.use((req, res, next) => {
  res.locals.url = req.originalUrl;
  next();
});

// Router
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
