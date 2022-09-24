import { createLogger, format, transports } from 'winston';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info=>`[${info.timestamp}] - ${info.level} : ${info.message}`)
    ),
    transports: [
        new transports.Console({ level: 'info'}),
        new transports.File({ filename: `${__dirname}/../logs/warning.log`, level: "warn" }),
        new transports.File({ filename: `${__dirname}/../logs/error.log`, level: "error" }),
    ]
});
