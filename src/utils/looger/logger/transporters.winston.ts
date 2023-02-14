import { transports } from 'winston';

export const getLogTransporters = () => {
    // TODO: Can be improved with more robust logging system for analyzing the logs
    const transporters = [
        new transports.Console({
            level: process.env.LOG_LEVEL,
            silent: process.env.NODE_ENV === 'tests',
        }),
    ];
    return transporters;
};
