import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/singup", (req, res) => {
  res.render("singup");
});

router.get("/products", (req, res) => {
  console.log("req", req);
  const { email, first_name } = req.session;
  res.render("products", { email, first_name });
});

router.get("/logout", (req, res) => {
  // Destruye la sesión actual
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al destruir la sesión:", err);
    }
    // Redirige a la vista de login
    res.redirect("/");
  });
});

export default router;
