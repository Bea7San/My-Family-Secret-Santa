import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useEffect, useMemo, useState } from "react";
import { generateSecretsSantas } from "../../services";
import { setCurrentUser } from "../../features/users/currentUserSlice";
import { MiembroType } from "../../types";

export const Home = () => {
  const [error, setError] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [secretSanta, setSecretSanta] = useState<MiembroType | undefined>();
  const currentUser = useAppSelector((state) => state.currentUser.value);
  const users = useAppSelector((state) => state.users.value);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log(currentUser);
  useEffect(() => {
    const userSecretSanta = users?.find(
      (u) => u.userId === currentUser?.secretSanta
    );
    setSecretSanta(userSecretSanta);
  }, [currentUser, users]);

  useEffect(() => {
    if (!currentUser) navigate("/");
  }, []);

  const onGenerate = async () => {
    setIsGenerating(true);
    if (!currentUser?.userId) return;
    const data = await generateSecretsSantas(currentUser?.userId);
    if (data.msg) {
      setError(data.msg);
      setIsGenerating(false)
      return;
    }
    dispatch(setCurrentUser(data.response));
    setSecretSanta(users?.find((u) => u.userId === data.response.secretSanta));
    setIsGenerating(false);
  };

  return (
    <div>
      Hola {currentUser?.userName}!
      {secretSanta ? (
        <>
          <h3>Tu Secret Santa es {secretSanta.userName}</h3>
          {currentUser?.isAdmin && 
          <button disabled={isGenerating} onClick={() => onGenerate()}>
            Volver a Generar
          </button>}
        </>
      ) : currentUser?.isAdmin ? (
        <div>
          {error && (
            <>
              <span>{error}</span>
              <span>Intentar de nuevo</span>
            </>
          )}
          {isGenerating && <h3>GENERATING...</h3>}
          <button disabled={isGenerating} onClick={() => onGenerate()}>
            Generar Secret Santas
          </button>
        </div>
      ) : (
        <div>
          <span>Espera a que el administrador genere los Secret Santas </span>
        </div>
      )}
    </div>
  );
};
