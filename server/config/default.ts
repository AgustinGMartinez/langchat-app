export default {
  port: process.env.PORT ?? 4000,
  isDev: process.env.NODE_ENV !== 'production',
}
