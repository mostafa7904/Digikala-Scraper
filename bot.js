const puppeteer = require("puppeteer");
async function enNumber(input) {
  try {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    input = input.split(",").join("");

   return input.toString().replace(/[0-9]/g, (x) => farsiDigits[x]);
  } catch (e) {
    console.log("There was an error in enNumber");
    console.error(e);
  }
}
async function crawl(user, pass, headless = false) {
  try {
    const browser = await puppeteer.launch({
      headless,
    });
    const page = await browser.newPage();
    await page.goto(
      "https://www.digikala.com/profile/my-orders/?activeTab=delivered"
    );
    await page.waitFor(".o-form__field");
    await page.type(".o-form__field", user);
    await page.click(".c-login__form-action");
    await page.waitForSelector(".js-input-field");
    await page.type(".js-input-field", pass);
    await page.click(".o-btn--contained-red-lg");
    await page.waitForSelector(".c-profile-order__list-item-detail--currency");
    async function getElements(elements) {
      return Promise.all(
        elements.map(async (element) => {
          let value = await page.evaluate((el) => el.innerText, element);
          return parseInt(await enNumber(value.split(":")[1]));
        })
      );
    }
    const elements = [];
    const pages = await page.$$("li a.c-pager__item");
    for (let i = 1; i <= pages.length; i++) {
      await page.goto(
        `https://www.digikala.com/profile/my-orders/?activeTab=delivered&page=${i}`
      );
      await page.waitForSelector(
        ".c-profile-order__list-item-detail--currency"
      );
      let newElements = await page.$$(
        ".c-profile-order__list-item-detail--currency"
      );
      const a = await getElements(newElements);
      elements.push(...a);
    }
    const all = elements.reduce((per, cur) => per + cur);
    console.log(await prettyPrint(all));
    await browser.close();
  } catch (e) {
    console.log("There was an error in crawl");
    console.error(e);
  }
}

async function prettyPrint(number) {
  try {
    let str = number.toString();
    str = str
      .split("")
      .reverse()
      .join("")
      .split(/(.{3})/)
      .filter((o) => o)
      .map((s) => s.split("").reverse().join(""))
      .reverse()
      .join();

    return `You've spent ${str} toman on Digikala.
    \n 
    Reprot issues here: https://github.com/mostafa7904/Digikala-Scraper/issues/new
    `;
  } catch (e) {
    console.log("There was an error in prettyPrint");
    console.error(e);
  }
}

module.exports = { crawl };
