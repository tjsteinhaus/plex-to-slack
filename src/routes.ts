import { FastifyInstance } from "fastify"
import { PlexPayload } from "./types"
import { WebClient } from "@slack/web-api"
import multer from "fastify-multer"
import { SlackBlocks, movieBlocks, notifySlack, tvBlocks } from "./slack"
const upload = multer({storage: multer.memoryStorage()})
import { mapDefaultData, mapMovieData, mapTvData } from "./plex"

export default async function routes(
    fastify: FastifyInstance,
    options: {
        slack: WebClient
    }
) {
    const {slack} = options
    fastify.post<{
        Body: {
            payload: string
        }
    }>(
        '/plex-webhook',
        { 
            preHandler: upload.single('thumb'), 
        },
        async (request, reply): Promise<void> => {
            const payload: PlexPayload = JSON.parse(request.body.payload)

            const isVideo = ['movie', 'episode', 'season'].includes(payload.Metadata.type)
            const isTV = ['episode', 'season'].includes(payload.Metadata.type)
            const isAudio = payload.Metadata.type === 'track'

            if (!payload.user || !payload.Metadata || !(isAudio || isVideo)) {
                return reply.send(400)
            }
            
            let blocks: SlackBlocks
            const getDefaultData = mapDefaultData(payload)
            if (isTV) {
                const getTvData = mapTvData(payload.Metadata)
                blocks = tvBlocks({
                    ...getTvData,
                    ...getDefaultData
                })
            } else {
                const getMovieData = mapMovieData(payload.Metadata)
                blocks = movieBlocks({
                    ...getMovieData,
                    ...getDefaultData
                })
            }

            notifySlack(slack, {
                blocks
            })
            return reply.send(200)
        }
    )
}
