import p from 'pino'
export const pino = p({
  transport: {
    target: "pino/file",
    options: { destination: `${__dirname}/app.log` }
  }
})