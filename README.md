# Digikala Scraper

A puppeteer app to scrap digikala and see how much you've spent

Change the index.js file and put in your information to login to digikala

In `index.js` file:

`await bot.crawl("email", "pass"); //put in your info`

You can also set the headless option which will stop puppeteer from opening chrome. It's false by default meaning a chrome window will open.

`await bot.crawl("email", "pass" , true); `

before running make sure you have the latest node installed on your computer then run `npm i` in your command line.

Installing chromium takes a while so be patiant.

to run the bot type in `npm run start`

made with ♥ by Mostafa
