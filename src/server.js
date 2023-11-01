import express from "express";
import { __dirname } from "./utils.js";
import cookieParser, { signedCookies } from "cookie-parser";
import handlebars from "express-handlebars";
import session from "express-session";
import FileStore from "session-file-store";
import "./db/configDB.js";
import mongoStore from "connect-mongo";

import loginRouter from "./routes/login.routes.js";
import viewsRouter from "./routes/views.routes.js";

const app = express();

const secret = "123456";

app.use(cookieParser(secret));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//SESSION
/*const fileStore = FileStore(session);
app.use(
  session({
    secret: "SESSIONSECRETKEY",
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: new fileStore({
      path: __dirname + "/sessions",
    }),
  })
); */

//MONGO STORE
const URI =
  "mongodb+srv://limapablomdz:repili123@coder.bykusle.mongodb.net/?retryWrites=true&w=majority";
app.use(
  session({
    secret: "SESSIONSECRETKEY",
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: new mongoStore({
      mongoUrl: URI,
    }),
  })
);

//HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//ROUTES
app.use("/api/login", loginRouter);
app.use("/", viewsRouter);
/* app.get("/set-cookie", (req, res) => {
  res.cookie("idioma", "ingles").json({ msg: "ok" });
});

app.get("/get-cookie", (req, res) => {
  console.log(req.cookies);
  const { idioma } = req.cookies;
  idioma === "ingles" ? res.send("Hello") : res.send("Hola");
});

app.get("/delete-cookie", (req, res) => {
  res.clearCookie("idioma").send("estas eliminado");
});

app.get("/setsingedcookie", (req, res) => {
  res.cookie("name", "Santino", { signed: true }).json({ msg: "ok" });
});

app.get("/", (req, res) => {
  res.json({
    cookies: req.cookies,
    signedCookies: req.signedCookies,
  });
  // res.clearCookie('idioma')
  // res.send('ok')
}); */

app.listen(8080, () => {
  console.log("Servidor en puerto 8080");
});
