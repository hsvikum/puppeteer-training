const puppeteer = require('puppeteer');

const searchString = "ray fz";

(async function() {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null, args: ['--start-maximized']});
    try {
        const page = await browser.newPage();
        await page.goto('https://ikman.lk/en/ads/colombo/vehicles', {waitUntil: 'networkidle0'});
        await page.type('#input_1', searchString, {delay: 200});
        await page.click('form button[type="button"]');
                
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        await page.waitForSelector(".gtm-next-page a div", { visible: true });

        let parsePageCount = 5;
        let parsePageIncrement = 0;
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

        while(parsePageIncrement < parsePageCount) {
          let data = await page.$$eval(
            'ul.list--3NxGO li a div.content--3JNQz',
            function (contents) {
                return contents.map(function(content) {
                    $(content).find('.sub-title--1nbZO').remove();
                    return {
                      title: $(content).find('span.title--3yncE').text(),
                      distance: $(content).find('div:nth-child(1)').text(),
                      price: $(content).find('div.price--3SnqI span').text()
                    }
                })
              }
          );
          console.log("\x1b[44m\x1b[5m%s\x1b[0m", `page ${parsePageIncrement+1} values`);
          console.table(data);
          await Promise.all([
            page.click('.gtm-next-page a'),
            page.waitForTimeout(3000)
          ]);
          parsePageIncrement++;
        }
    } catch (error) {
      console.error(error);
      console.error("Main Error ...")
    } finally {
      console.error("Done ...")
      await browser.close();
    }
})();
