# Send Plex Alerts to Slack
This uses the Slack WebClient API to send messages from Plex to a Slack channel.

## Plex Webhook Address
Setup a new Plex Webhook that sends webhooks to `SERVER_ADDRESS/plex-webhook` where `SERVER_ADDRESS` is the url this service is hosted on.

## Required Environment Variables
`PORT` Defaults to 3000. Choose which port you want Fastify to run on.<br />
`ADDRESS` Defaults to 127.0.0.1, but to run in a Docker image `0.0.0.0` is required.<br />
`SLACK_CHANNEL` This is the Slack Channel ID<br />
`SLACK_TOKEN` Token generated from a Slack App. Make sure `chat:write` scope is added under *Bot Token Scopes*

## Current Support
Currently this only supports Media Playback event types.<br />
`media.play` Media starts playing. An appropriate poster is attached.<br />
`media.pause` Media playback pauses.<br />
`media.rate` Media is rated. A poster is also attached to this event.<br />
`media.resume` Media playback resumes.<br />
`media.scrobble` Media is viewed (playe past the 90% mark.)<br />
`media.stop` Media playback stops.<br />

## Future Support
`library.on.deck` A new item is added that appears in the user's On Deck. A poster is also attached to this event.<br />
`library.new`  A new item is added to a library to which the user has access. A poster is also attached to this event.
