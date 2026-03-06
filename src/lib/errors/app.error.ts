import {ERROR_SEVERITY} from "../constants/constants.ts";

export class AppError extends Error {
    public readonly severity: ERROR_SEVERITY;

    constructor(message: string, severity: ERROR_SEVERITY= ERROR_SEVERITY.TOAST) {
        super(message);
        this.severity = severity;
    }
}