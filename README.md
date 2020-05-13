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

 __     __     ______     __   __     ______   __         __     ______     ______
/\ \  _ \ \   /\  __ \   /\ "-.\ \   /\__  _\ /\ \       /\ \   /\  ___\   /\__  _\
\ \ \/ ".\ \  \ \  __ \  \ \ \-.  \  \/_/\ \/ \ \ \____  \ \ \  \ \___  \  \/_/\ \/
 \ \__/".~\_\  \ \_\ \_\  \ \_\\"\_\    \ \_\  \ \_____\  \ \_\  \/\_____\    \ \_\
  \/_/   \/_/   \/_/\/_/   \/_/ \/_/     \/_/   \/_____/   \/_/   \/_____/     \/_/
  
</pre>

Recieve your discogs wantlist in your telegram app and enhanced it! You will recieve the new entries every
hour (by default) and you can block sellers, no more sellers with abusive price or repited records, ban it!

<hr>

## Requisites

-   Install [Docker](https://docs.docker.com/)
-   Install [Node](https://nodejs.org/en/download/)
-   [Telegram token](https://core.telegram.org/bots/api#authorizing-your-bot) for your bot, something like
    this: `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`
-   Telegram chat id, where you recieve the messages with the scrapped data. If you want more info about the
    bot integration check [Telebot](https://github.com/mullwar/telebot) documentation.

## Installation

`npm run docker:start`

You will asked to enter the config parameters:

-   Discogs username and password.
-   Telegram token and chat id.
-   Cron schedule. By default is `47 07-23,00-01 * * *` Is active between 7:47 am to 01:47 am every hour. Set
    as you want, you can use [Crontab Guru](https://crontab.guru/) to make the schedule.

## Important notes

-   At this moment the app is only working at dev enviroment.

## Pending task

-   Add test. The enviroment is ready to use jest test.
