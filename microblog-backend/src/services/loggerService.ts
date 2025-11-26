import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_FILE = path.join(__dirname, '../../logs.log');

enum COLORS {
    INFO = "\x1b[36m",
    ERROR = "\x1b[31m",
    SUCCESS = "\x1b[32m",
    RESET = "\x1b[0m"
}

export enum LogMode {
    CONSOLE = "console",
    FILE = "file",
    BOTH = "both"
}

export const getLogMode = (): LogMode => {
    const args = process.argv;

    const logToFlag = args.find(arg => arg.startsWith('--log-to='));

    const logToBoth = args.includes('--log-to-both');

    if (logToBoth) return LogMode.BOTH;

    if (logToFlag) {
        const value = logToFlag.split('=')[1];
        if (value === 'file') return LogMode.FILE;
        if (value === 'console') return LogMode.CONSOLE;
        if (value === 'both') return LogMode.BOTH;
    }

    return LogMode.CONSOLE;
};

interface ILogger {
    info(message: string): void;
    error(message: string): void;
    success(message: string): void;
}

class Logger implements ILogger {
    private mode: LogMode;

    constructor(mode: LogMode) {
        this.mode = mode;
        console.log(`${COLORS.INFO}[LOGGER INIT] Logging mode set to: ${this.mode.toUpperCase()}${COLORS.RESET}`);
    }

    private formatMessage(type: string, message: string): string {
        const timestamp = new Date().toISOString();
        return `${type}: [${timestamp}] - ${message}`;
    }

    private writeToFile(message: string): void {
        fs.appendFile(LOG_FILE, message + '\n', 'utf-8', (err) => {
            if (err) console.error("Failed to write to log file:", err);
        });
    }

    private writeToConsole(typeColor: COLORS, formattedMessage: string): void {
        console.log(`${typeColor}${formattedMessage}${COLORS.RESET}`);
    }

    private log(typeLabel: string, color: COLORS, message: string): void {
        const formatted = this.formatMessage(typeLabel, message);

        if (this.mode === LogMode.CONSOLE || this.mode === LogMode.BOTH) {
            this.writeToConsole(color, formatted);
        }

        if (this.mode === LogMode.FILE || this.mode === LogMode.BOTH) {
            this.writeToFile(formatted);
        }
    }

    public info(message: string): void {
        this.log("[INFO]", COLORS.INFO, message);
    }

    public error(message: string): void {
        this.log("[ERROR]", COLORS.ERROR, message);
    }

    public success(message: string): void {
        this.log("[SUCCESS]", COLORS.SUCCESS, message);
    }
}

export const createLogger = (mode: LogMode): ILogger => {
    return new Logger(mode);
};

export const logger = createLogger(getLogMode());