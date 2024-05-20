import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MiembroType } from "../../types";
import { getUsers } from "../../services";
import { useAppDispatch } from "../../store/hooks";
import { setCurrentUser } from "../../features/users/currentUserSlice";
import { saveUsers } from "../../features/users/usersSlice";

export const LandingPage = () => {
  const [miembro, setMiembro] = useState<MiembroType>();
  const [users, setUsers] = useState<MiembroType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    dispatch(setCurrentUser(miembro as MiembroType));
    navigate("/home");
  };
  async function fetchData() {
    setIsLoading(true);
    const data = await getUsers();
    setUsers(data);
    setIsLoading(false);
  }
  useEffect(() => {
    dispatch(saveUsers(users));
  }, [users, dispatch]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Secret Santa</h1>
      {isLoading ? (
        <h3>LOADING...</h3>
      ) : (
        <>
          <h3>Indentifícate</h3>
          <form onSubmit={onSubmit}>
            <select
              onChange={(e) =>
                setMiembro(
                  users?.find((u) => u.userId?.toString() === e.target.value)
                )
              }
              value={miembro?.userId ?? ""}
            >
              <option value="" selected disabled hidden>
                Selecciona una opción
              </option>
              {users.map((u) => (
                <option key={u.userId} value={u.userId}>
                  {u.userName}
                </option>
              ))}
            </select>

            <button type="submit" disabled={!miembro}>
              Go
            </button>
          </form>
        </>
      )}
    </>
  );
};
