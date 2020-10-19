const puppeteer = require('puppeteer');

(async function() {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null, args: ['--start-maximized']});
    try {
        const page = await browser.newPage();
        await page.goto('http://www.adaderana.lk/');
        await page.screenshot({path: 'lesson2.png'});
        await page.waitForTimeout(4000);
    } catch (error) {
      console.error(error);
      console.error("Main Error ...")
    } finally {
      console.error("Done ...")
      await browser.close();
    }
})();




