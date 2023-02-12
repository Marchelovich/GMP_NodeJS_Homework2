import winston from 'winston';

const logger = winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.Console()
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
