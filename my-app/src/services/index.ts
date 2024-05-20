const URL = "http://localhost:3001";

export const getUsers = () => {
  const response = fetch(`${URL}/users`)
    .then((resp) => resp.json())
    .then((data) => data);
  return response;
};

export const generateSecretsSantas = (userId: number) => {
  const response = fetch(`${URL}/users/generate-secrets-santas`, {
    method: "PATCH",
    mode: "cors",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: userId }),
  })
    .then((resp) => resp.json())
    .then((data) => data);
  return response;
};
