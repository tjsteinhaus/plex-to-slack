import Fastify from "fastify"
import fastifyHealthcheck from "fastify-healthcheck"
import multer from 'fastify-multer'
import { WebClient } from "@slack/web-api"
import Routes from './routes'

const start = async () => {
    // Setup Slack
    const token = process.env.SLACK_TOKEN
    const slack = new WebClient(token)

    // Setup Fastify
    const fastify = Fastify({
        logger: true
    })
    
    fastify.register(fastifyHealthcheck)
    fastify.register(multer.contentParser)

    // Register Routes
    fastify.register(Routes, {
        slack
    })
    
    const PORT = process.env.PORT as unknown as number || 3000
    const HOST = process.env.HOST || '127.0.0.1'

    try {
        await fastify.listen({
            port: PORT,
            host: HOST
        }, () => {
            console.log(`SERVER LISTENING TO PORT ${PORT} AT ADDRESS ${HOST}.`)
        })
    } catch (e) {
        fastify.log.error(e)
        process.exit(1)
    }
}

start()
