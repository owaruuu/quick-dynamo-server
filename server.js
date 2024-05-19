import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";

import { documentCreateDoctor } from "./api/dynamoDB/dynamoDB.js";
import { createClient, createDocClient } from "./api/dynamoDB/dynamoClient.js";
import { assumeRole } from "./api/STS/sts.js";

dotenv.config();

//cookie config
const httpOnly = true;
const secure = true;

const port = 443;
const app = express();

//Esto simula un usuario administrador logeado
//TODO cambiar por un estado global que cambia dependiendo del tipo de cuenta del usuario
let primaryCredentials = null;
try {
    primaryCredentials = await assumeRole(
        process.env.PRIMARY_ROLE_ARN,
        "PrimarySession",
        null
    );
} catch (error) {
    console.log("🚀 ~ error:", error);
}

// codigo para certificado SSL
// let privateKey;
// try {
//     privateKey = fs.readFileSync(
//         "/etc/letsencrypt/live/[site-url]/privkey.pem",
//         "utf8"
//     );
// } catch (error) {
//     console.log("no key file");
// }
// let certificate;
// try {
//     certificate = fs.readFileSync(
//         "/etc/letsencrypt/live/[site-url]/fullchain.pem",
//         "utf8"
//     );
// } catch (error) {
//     console.log("no certificate file");
// }
//const credentials = { key: privateKey, cert: certificate };

const corsOptions = {
    origin: [],
    credentials: true,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send({ msg: "Hello from dynamo api server" });
});

app.post("/doctor", async (req, res) => {
    const client = await createClient(primaryCredentials);
    const docClient = await createDocClient(client);

    try {
        const response = await documentCreateDoctor(docClient);
        res.send({ msg: "success", response: response });
    } catch (error) {
        res.status(404).send({ msg: "error", error: error.message });
    }
});

//server normal
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

// server https
// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(port, () => {
//     console.log(`listening on port ${port}`);
// });
