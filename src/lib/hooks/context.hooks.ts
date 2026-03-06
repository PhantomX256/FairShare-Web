import {ERROR_SEVERITY} from "../constants/constants.ts";
import {useContext} from "react";
import {AppError} from "../errors/app.error.ts";
import {ToastContext} from "../../components/context/ToastContext.ts";

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new AppError("useToast must be used inside context", ERROR_SEVERITY.FATAL)
    return context;
}