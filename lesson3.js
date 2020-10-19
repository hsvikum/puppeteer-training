const puppeteer = require('puppeteer');

(async function() {
    const browser = await puppeteer.launch({headless: true, defaultViewport: null, args: ['--start-maximized']});
    try {
        const page = await browser.newPage();
        await page.goto('https://en.wikipedia.org/wiki/COVID-19_pandemic');
        await page.pdf({
            path: 'lesson3.pdf',
            format: 'A4',
            preferCSSPageSize: true,
            printBackground: true
        });
    } catch (error) {
      console.error(error);
      console.error("Main Error ...")
    } finally {
      console.error("Done ...")
      await browser.close();
    }
})();




