# Digikala Scraper

A puppeteer app to scrap digikala and see how much you've spent

Change the index.js file and put in your information to login to digikala

In `index.js` file:

`await bot.crawl("email", "pass"); //put in your info`

You can also set the headless option which will stop puppeteer to open a chrome window. It's false by default meaning a chrome window runs.

`await bot.crawl("email", "pass" , true); `

before running the project run `npm i` in your command line

Installing chromium takes a while so be patiant.

to run the bot type in `npm run start`

made with ♥ by Mostafa
