type Logger = {
    info: (message: any) => void;
    error: (message: any) => void;
}

const logger: Logger = {
    info: (message: any) => {
        console.log("[INFO]", message);
    },
    error: (message: any) => {
        console.error("[ERROR]", message);
    }
}


export default logger;