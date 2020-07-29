const bot = require("./bot");

(async function main() {
  await bot.crawl("email", "pass");
})();
