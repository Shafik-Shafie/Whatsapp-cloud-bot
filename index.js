import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// VERIFY TOKEN (MESTI SAMA DENGAN META)
const VERIFY_TOKEN = "hello_world";

// ================================
// WEBHOOK VERIFICATION (META)
// ================================
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK VERIFIED");
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }
  return res.sendStatus(400);
});

// ================================
// RECEIVE WHATSAPP MESSAGE
// ================================
app.post("/webhook", (req, res) => {
  console.log("Incoming message:");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// ================================
// START SERVER
// ================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Bot running on port " + PORT);
});
