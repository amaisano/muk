# Websocket Troll Chests

Let's make a website layer for OBS that shows dynamic troll chests!

- Streamdeck plugin for sending web requests
  - https://apps.elgato.com/plugins/gg.datagram.web-requests
- A simple web server we can use to listen for those requests
  - https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTP-server/
- An external/cloud service for the websocket (to avoid local shenanigans)
  - https://devcenter.heroku.com/articles/node-websockets#option-1-websocket

## Chaos
<img src="https://pbs.twimg.com/media/FO_T7O5XwAM6oFV?format=png&name=small" />

- But, better... and automated!

## Running Locally

Developed on Mac + Lando for Heroku. Lando uses Docker for a containerized set of services. No need to install node.js or npm on your machine (unless you want to of course).

1. Clone to repo.
2. Install Lando (see https://github.com/lando/lando/releases). This includes Docker Desktop.
3. In terminal, change directory to this repo root folder.
4. Run `lando start` (this should do everything you need).
5. Visit the URL listed in the command output.

## Current Features

- Websocket connection proof-of-concept (server time is pushed to webpage via websocket)
- Add/remove chests one by one
- Clear all chests
- Click on individual chests to remove them
- Show a count of total chests on the screen