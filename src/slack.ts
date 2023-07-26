import { WebClient } from "@slack/web-api"

export type SlackOptions = {
    text: string
    footer: string
}

export const notifySlack = async (slack: WebClient, options: SlackOptions) => {
    console.log(`Sending message: "${options.text}" to Slack.`)
    const sendMessage = await slack.chat.postMessage({
        channel: process.env.SLACK_CHANNEL as string,
        text: options.text
    })

    console.log(`Message sent: ${sendMessage.ts}`)
}
