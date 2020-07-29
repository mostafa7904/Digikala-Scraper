const puppeteer = require("puppeteer");
async function enNumber(input) {
  try {
    input = input.split(",").join("");
    input = input.replace(/۱/g, "1");
    input = input.replace(/۲/g, "2");
    input = input.replace(/۳/g, "3");
    input = input.replace(/۴/g, "4");
    input = input.replace(/۵/g, "5");
    input = input.replace(/۶/g, "6");
    input = input.replace(/۷/g, "7");
    input = input.replace(/۸/g, "8");
    input = input.replace(/۹/g, "9");
    input = input.replace(/۰/g, "0");
    return input;
  } catch (e) {
    console.log(e);
  }
}
async function crawl(user, pass) {
  try {
    const browser = await puppeteer.launch({
      headless: false,
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
    console.log(all);
    await browser.close();
  } catch (e) {
    console.log(e);
  }
}

module.exports = { crawl };
