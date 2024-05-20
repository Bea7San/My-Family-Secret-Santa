const getExceptions = (users) =>
  users.reduce(
    (acc, curr) => {
      return {
        ...acc,
        [curr.userName]: curr.directFamily.concat(curr.lastThree),
      };
    },
    {
      [users[0].userName]: users[0].directFamily.concat(users[0].lastThree),
    }
  );

const getPriority = (list, exceptions) => {
  let priority = list[0];
  let exceptionsNum = -1;
  list.forEach((m, i) => {
    const excep = exceptions[list[i].userName];
    if (excep.length > exceptionsNum) {
      exceptionsNum = excep.length;
      priority = list[i];
    }
  });
  return priority;
};

const match = (users) => {
  const picks = [];
  let availables = [...users];
  let pickers = [...users];
  const exceptions = getExceptions(users);
  while (pickers.length > 0) {
    const priority = getPriority(pickers, exceptions);
    pickers = pickers.filter((s) => s.userId !== priority.userId);

    let possibles = availables;
    possibles = possibles.filter((p) => {
      return (
        p.userId !== priority.userId &&
        !exceptions[priority.userName].includes(p.userId)
      );
    });
    if (possibles.length === 0) {
      return null;
    }
    const selection = possibles[Math.floor(Math.random() * possibles.length)];
    availables = availables.filter((d) => d.userId !== selection.userId);
    picks.push({ ...priority, secretSanta: selection.userId });
  }
  return picks;
};

const getSecretSanta = (users) => {
  const pick1 = match(users);
  if (pick1) return pick1;
  const pick2 = match(users);
  if (pick2) return pick2;
  const pick3 = match(users);
  if (pick3) return pick3;
  const pick4 = match(users);
  if (pick4) return pick4;
  return null;
};

module.exports = { getSecretSanta };
