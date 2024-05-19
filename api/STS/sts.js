import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { fromIni } from "@aws-sdk/credential-providers";
import dotenv from "dotenv";

dotenv.config();

export async function assumeRole(roleArn, roleSessionName, credentials) {
    const stsClient = new STSClient({
        region: process.env.REGION,
        credentials:
            credentials ||
            fromIni({
                profile: process.env.SSO_PROFILE,
            }),
    });

    const command = new AssumeRoleCommand({
        RoleArn: roleArn,
        RoleSessionName: roleSessionName,
    });

    const response = await stsClient.send(command);
    return {
        accessKeyId: response.Credentials.AccessKeyId,
        secretAccessKey: response.Credentials.SecretAccessKey,
        sessionToken: response.Credentials.SessionToken,
    };
}
