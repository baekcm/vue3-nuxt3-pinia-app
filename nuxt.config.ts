// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@pinia/nuxt"],
    //--- runtimeConfig : .env file 을 사용하여 API_KEY 값을 저장 후 store 에서 사용하기 위함 
    runtimeConfig: {
        public: {
            api_key: process.env.API_KEY
        }
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/index.scss" as *;'
                }
            }
        }
    }
});