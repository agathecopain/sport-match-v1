import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api";

export default function EmailVerificationPage() {
  const { token } = useParams();
  const [message, setMessage] = useState("Vérification en cours ...");
  useEffect(() => {
    async function verifyEmail() {
      try {
        await API.get("/verify/:token");
        setMessage("Email vérifié avec succès");
      } catch (error) {
        setMessage(
          "Échec lors de la vérification. Le lien a peut être expiré."
        );
      }
    }
    verifyEmail();
  }, [token]);

  return (
    <>
      <p>{message}</p>
    </>
  );
}
