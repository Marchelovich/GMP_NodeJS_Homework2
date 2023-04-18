import winston from 'winston';
import process from 'node:process';

const logger = winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.Console({
            silent: process.env.NODE_ENV === 'test'
        })
    ]
});

process.on('uncaughtException', (err) => {
    logger.error(err.message, err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    // @ts-ignore
    logger.error(reason.message, reason);
});

export default logger;
