const puppeteer = require('puppeteer');

const searchString = "ray fz";

(async function() {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null, args: ['--start-maximized']});
    try {
        const page = await browser.newPage();
        await page.goto('https://ikman.lk/en/ads/colombo/vehicles', {waitUntil: 'networkidle0'});
        await page.type('#input_1', searchString, {delay: 200});
        await page.click('form button[type="button"]');
        await page.waitForTimeout(4000);

    } catch (error) {
      console.error(error);
      console.error("Main Error ...")
    } finally {
      console.error("Done ...")
      await browser.close();
    }
})();
