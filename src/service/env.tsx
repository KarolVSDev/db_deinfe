const env = {
    API_URL : import.meta.env.VITE_API_BACKEND,
    EMAIL_MASTER : import.meta.env.VITE_EMAIL_ADMIN,
    DOMAIN_ENV : import.meta.env.VITE_APP_AUTH0_DOMAIN,

}

export default env;