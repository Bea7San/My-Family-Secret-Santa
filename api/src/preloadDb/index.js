const { users } = require("./data");
const { User } = require("../db.js");

const preloadUsers = async () => {
  try {
    await Promise.all(
      users.map((u) =>
        User.findOrCreate({
          where: { userName: u.userName },
          defaults: {
            userId: u.userId,
            userName: u.userName,
            directFamily: u.directFamily,
            lastThree: u.lastThree,
            isAdmin: u.isAdmin,
          },
        })
      )
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { preloadUsers };
