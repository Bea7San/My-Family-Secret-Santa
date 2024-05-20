const server = require("./src/app.js");
const { sq } = require("./src/db.js");
const { preloadUsers } = require("./src/preloadDb/index.js");

const port = 3001;

sq.sync({ force: true }).then(async () => {
  server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  try {
    await preloadUsers();
    console.log("Preload Done");
  } catch (error) {
    throw new Error(error);
  }
});
