const bot = require("./bot");

(async function main() {
  await bot.crawl("your_email", "your_password");
})();
