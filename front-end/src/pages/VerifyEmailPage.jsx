import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api";

export default function VerifyEmailPage() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await API.get(`/auth/verify/${token}`);
        setStatus("success");
        setMessage(res.data.message);
      } catch (err) {
        setStatus("error");
        setMessage("Lien invalide ou expiré");
      }
    };

    verify();
  }, [token]);

  if (status === "loading") return <p>Vérification en cours…</p>;

  return (
    <div>
      {status === "success" && (
        <>
          <h2>Email vérifié</h2>
          <p>{message}</p>
          <p>
            Vous avez déjà un compte ? <a href="/signin">Se connecter</a>
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <h2>⚠ Vérification impossible</h2>
          <p>{message}</p>
          <button>Renvoyer un email de vérification</button>
        </>
      )}
    </div>
  );
}
