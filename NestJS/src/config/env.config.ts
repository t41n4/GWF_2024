export default () => ({
    database: {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
    },
    weather: {
        baseUrl: process.env.WEATHER_BASE_URL,
        apiKey: process.env.WEATHER_API_KEY,
    },
    mail: {
        host: process.env.BACKEND_HOSTNAME,
    },
});