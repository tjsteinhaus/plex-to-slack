import { Block, KnownBlock, WebClient } from "@slack/web-api"
import { MappedDefaultData, MappedMovieData, MappedTvData } from "./plex"

export type SlackBlocks = (Block | KnownBlock)[] | undefined

export type SlackOptions = {
    blocks: SlackBlocks
}

export const defaultBlocks = (data: MappedDefaultData) => {
    return [
        {
            type: "section",
            fields: [
                {
                    type: "mrkdwn",
                    text: `*Who:*\n${data.user}`
                },
                {
                    type: "mrkdwn",
                    text: `*Status:*\n${data.status}`
                }
            ]
        }
    ]
}

export const movieBlocks = (data: MappedMovieData & MappedDefaultData): SlackBlocks => {
    return [
        {
            type: "section",
            fields: [
                {
                    type: "mrkdwn",
                    text: `*Movie:*\n${data.title}`
                },
                {
                    type: "mrkdwn",
                    text: `*Year:*\n${data.year}`
                }
            ]
        },
        ...defaultBlocks(data),
        {
			type: "divider"
		}
    ]
}

export const tvBlocks = (data: MappedTvData & MappedDefaultData): SlackBlocks => {
    return [
        {
            type: "section",
            fields: [
                {
                    type: "mrkdwn",
                    text: `*Show:*\n${data.show}`
                },
                {
                    type: "mrkdwn",
                    text: `*Season:*\n${data.season}`
                }
            ]
        },
        {
            type: "section",
            fields: [
                {
                    type: "mrkdwn",
                    text: `*Episode #:*\n${data.episodeNumber}`
                },
                {
                    type: "mrkdwn",
                    text: `*Episode:*\n${data.title}`
                }
            ]
        },
        ...defaultBlocks(data),
        {
			type: "divider"
		}
    ]
}

export const notifySlack = async (slack: WebClient, options: SlackOptions) => {
    console.log(`Sending message: "${JSON.stringify(options.blocks, null, 2)}" to Slack.`)
    const sendMessage = await slack.chat.postMessage({
        channel: process.env.SLACK_CHANNEL as string,
        text: `Message was posted`,
        blocks: options.blocks
    })

    console.log(`Message sent: ${sendMessage.ts}`)
}
