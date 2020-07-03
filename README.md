<pre>
 _____     __     ______     ______     ______     ______     ______
/\  __-.  /\ \   /\  ___\   /\  ___\   /\  __ \   /\  ___\   /\  ___\
\ \ \/\ \ \ \ \  \ \___  \  \ \ \____  \ \ \/\ \  \ \ \__ \  \ \___  \
 \ \____-  \ \_\  \/\_____\  \ \_____\  \ \_____\  \ \_____\  \/\_____\
  \/____/   \/_/   \/_____/   \/_____/   \/_____/   \/_____/   \/_____/

 ______     ______     ______     ______     ______   ______     ______
/\  ___\   /\  ___\   /\  == \   /\  __ \   /\  == \ /\  ___\   /\  == \
\ \___  \  \ \ \____  \ \  __<   \ \  __ \  \ \  _-/ \ \  __\   \ \  __<
 \/\_____\  \ \_____\  \ \_\ \_\  \ \_\ \_\  \ \_\    \ \_____\  \ \_\ \_\
  \/_____/   \/_____/   \/_/ /_/   \/_/\/_/   \/_/     \/_____/   \/_/ /_/

</pre>

Recieve your discogs wantlist in your telegram app and enhanced it! You will recieve the new entries every
hour (by default) and you can block sellers, no more sellers with abusive price or repited records, ban it!

<hr>

## Requisites

Follow this instructions to install it:

-   Install [Docker](https://docs.docker.com/)
-   Install [Node](https://nodejs.org/en/download/)
-   Get your [Telegram token](https://core.telegram.org/bots/api#authorizing-your-bot) for your bot, something
    like this: `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`
    -   Ask to [Botfather](https://core.telegram.org/bots#6-botfather) to obtain it.
-   Get your [Telegram chat id](https://stackoverflow.com/questions/45414021/get-telegram-channel-group-id),
    where you recieve the messages with the scrapped data.
    -   If you want more info about the bot integration check [Telebot](https://github.com/mullwar/telebot)
        documentation.

## Installation

`npm run docker:start`

You will asked to enter these config parameters:

-   Discogs username and password.
-   Telegram token and chat id.
-   Cron schedule. By default is set to `47 07-23,00-01 * * *`
    -   Is active between 7:47 am to 01:47 am every hour.
    -   You can use [Crontab Guru](https://crontab.guru/) to make the schedule.
-   This will create `config.json` file that will be used by scrapy to scrap your wantlist discogs account.

## App uses

This is a quick reference to know the app uses.

### Docker

`npm run docker:up`

Start app and db docker containers and attach to the app terminal container.

`npm run docker:down`

Down app and db docker containers.

`npm run docker:start`

Launch and attach to the app terminal container if it is already up.

`npm run docker:build`

Build app and db docker containers.

`npm run docker:app`

Get shell inside the app container.

`npm run docker:db`

Get shell inside the db container.

### Dev utils

`npm run prettier`

Pretify the code.

`npm run test`

Run Jest test util.

## Bot uses

Inside Telegram you can send commands to the app, to block some sellers that abuse (some sellers are deleting
items and uploading again every day) or have high prices.

`/ban`

-   You will ask to insert the seller nickname.

`/banlist`

-   Recieve the entire list of banned sellers.

## Important notes

-   At this moment the app is only working at dev enviroment.
-   **Use as your own risk, if you set your cron every 5-10 minutes, discogs maybe block your account. I
    recommend to set the cron to 1 hour minimum.**
-   Feel free to create an issue / pull request if you find some bug or improvement.

## Pending task

-   Add test. The enviroment is ready to use jest test.
-   Persist config data when the container is down.

## About

This app runs with two docker container:

-   [nikolaik/python-nodejs](https://hub.docker.com/r/nikolaik/python-nodejs/) Node backend over Express with
    python for Scrapy.
-   [mariadb](https://hub.docker.com/_/mariadb) for the database.

The app is build over [Express](https://github.com/expressjs/express) framework that provides the API.

This a side project, feel free to send pull request to fix or improve the app! I work as I senior UI
developer, this backend project is a challenge for me. **Done with love by Pol Escolar**
