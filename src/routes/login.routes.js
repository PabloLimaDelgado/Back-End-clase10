import { Router } from "express";
import { loginManager } from "../managers/loginManager.js";

const router = Router();

//FILES
/*router.post("/", (req, res) => {
  const { password, email } = req.body;
  //res.cookie(name, email, { maxAge: 10000 }).send("cookie agregada");
  req.session["email"] = email;
  res.send("Usuario logeado");
}); */

//MONGO
router.post("/login", async (req, res) => {
  const { password, email } = req.body;
  const loginDB = await loginManager.findByEmail(email);

  if (!loginDB) {
    return res.json({ error: "This email does not exist" });
  }

  req.session["email"] = email;
  req.session["first_name"] = loginDB.first_name;

  if (email === "adminCoder@coder.com" && password === "Cod3r123") {
    req.session["isAdmin"] = true;
  } else {
    req.session["isAdmin"] = false;
  }

  //res.send("Usuario logeado");
  res.redirect("/products");
});

router.post("/singup", async (req, res) => {
  const createdLogin = await loginManager.createOne(req.body);
  res.status(200).json({ msg: "User created", createdLogin });
});
export default router;
