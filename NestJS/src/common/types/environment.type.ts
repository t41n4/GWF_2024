export interface EnvironmentVariables {
    database: DatabaseEnv;
    weather: WeatherAPIEnv;
    mail: MailEnv;
}

export interface DatabaseEnv {
    host: string;
    port: number;
}

export interface WeatherAPIEnv {
    baseUrl: string;
    apiKey: string;
}

export interface MailEnv {
    host: string;
}