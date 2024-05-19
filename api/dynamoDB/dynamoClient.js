import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { assumeRole } from "../STS/sts.js";
import dotenv from "dotenv";

dotenv.config();

export const createClient = async (credentials) => {
    const roleArn = process.env.ADMIN_ROLE;
    const roleSessionName = "localSession";
    const clientCredentials = await assumeRole(
        roleArn,
        roleSessionName,
        credentials
    );

    const config = {
        region: process.env.REGION,

        // endpoint para db local (JAVA)
        // es necesario hacer correr el server de db aparte
        // endpoint: "http://localhost:8000",

        endpoint: process.env.ENDPOINT,

        // Credentials for local db
        // credentials: {
        //     accessKeyId: "dummy",
        //     secretAccessKey: "dummy",
        // },

        // Credenciales ocupando Cognito
        // credentials: fromCognitoIdentityPool({
        //     identityPoolId: process.env.IDENTITY_POOL_ID,
        //     logins: {
        //         [process.env.LOGIN]: idToken,
        //     },
        //     clientConfig: { region: process.env.REGION },
        // }),

        // Credenciales para EC2 server
        // credentials: {
        //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        //     sessionToken: process.env.AWS_SESSION_TOKEN,
        //     region: process.env.REGION,
        // },

        //Credenciales por rol asumido
        credentials: clientCredentials,
    };
    return new DynamoDBClient(config);
};

export async function createDocClient(client) {
    return DynamoDBDocument.from(client);
}
