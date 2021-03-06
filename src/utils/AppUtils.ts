import * as fs from "fs";
export class AppUtils {
    static normalisePort(defaultPort: number) {
        const envPort = process.env.PORT;
        if (envPort === undefined)
        {
            return defaultPort;
        }
        const parsedEnvPort = parseInt(envPort, 10);
        if (isNaN(parsedEnvPort)) {
            return defaultPort;
        }
        if (parsedEnvPort > 0) {
            return parsedEnvPort;
        }
        return defaultPort;
    }
    static normaliseVersion(defaultVersion: string) {
        if (fs.existsSync('VERSION')) {
            const fileVersion = fs.readFileSync('VERSION').toString().replace('\n', '');
            if (fileVersion.match("^[0-9]*\.[0-9]*\.[0-9]*$"))
            {
                return fileVersion;
            }
        }
        return defaultVersion;
    }
    static normaliseAuthorisation(authorisationHeader: string) {
        const encodedCredentials = authorisationHeader.substr(6);
        const buffer = Buffer.from(encodedCredentials, 'base64');
        const text = buffer.toString('ascii');
        const splitText = text.split(':');
        return {
            username: splitText[0],
            password: splitText[1]
        };
    }
}