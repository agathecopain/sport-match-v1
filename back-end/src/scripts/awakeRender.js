import "dotenv/config";
import cron from "cron";
import https from "node:https";

const job = new cron.CronJob("*/10 * * * *", function () {
    https
        .get(process.env.RENDER_EXTERNAL_URL, (res) => {
            if (res.statusCode === 200) {
                console.log("Ping réussi à", new Date().toLocaleTimeString());
            } else {
                console.log("Échec du ping :", res.statusCode);
            }
        })
        .on("error", (e) => {
            console.error("Erreur de ping :", e.message);
        });
});

// Se lance uniquement si le serveur est hébergé sur Render
if (process.env.RENDER_EXTERNAL_URL) {
    console.log(
        "Cron Render démarré, ping toutes les 10 minutes de l'url :",
        process.env.RENDER_EXTERNAL_URL
    );
    job.start();
}