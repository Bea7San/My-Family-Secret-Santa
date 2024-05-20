const { Router } = require("express");
const { User } = require("../db.js");
const router = Router();
const { getSecretSanta } = require("../helper/index.js");

router.get("/users", async (req, res, next) => {
  try {
    let users = await User.findAll();
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

router.patch("/users/generate-secrets-santas", async (req, res, next) => {
  const { userId } = req.body;
  try {
    const users = await User.findAll({ raw: true });
    const updatedUsers = getSecretSanta(users);
    if (!updatedUsers)
      return res.status(406).json({
        msg: "Parece que es difícil generar Secrets Santa con las restricciones actuales. Incremente cantidad de participantes o disminuya las restricciones familiares.",
      });
    await Promise.all(
      updatedUsers.map((u) =>
        User.update(
          { secretSanta: u.secretSanta },
          { where: { userId: u.userId } }
        )
      )
    );
    const response = updatedUsers.find((u) => u.userId === userId);
    return res.status(200).json({ response });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
