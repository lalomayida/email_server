require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const transporter = require("./mailer");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Ruta para enviar correos
app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;
  console.log("/send-email: ", to);

  if (!to || !subject || !text) {
    return res.status(400).send("Faltan parámetros");
  }

  const mailOptions = {
    from: "lalomayida@gmail.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log("Sending email");

    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Correo enviado: " + info.response);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
