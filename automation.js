const  {chromium} = require('playwright');

async function main() {
    const browser = await chromium.launch({headless: false});

    try{

    const page = await browser.newPage();
    await page.goto('https://test.netlify.app/');

    await page.getByLabel('NAME').fill('Noam kadosh test');
    await page.getByLabel('EMAIL').fill('noamkadosh4444@gmail.com');
    await page.getByLabel('PHONE').fill('0500000000');
    await page.getByLabel('COMPANY').fill('test company');
    await page.getByLabel('WEBSITE').fill('https://example.com');

    await page.getByLabel('Number of Employees').selectOption({label: '51-500',});
    console.log('Form filled successfully');

    //Scrrenshot before click on submit button
    await page.screenshot({path: 'screenshot_all_page.png',fullPage: true,});

    await page.locator('.panel').screenshot({ path: 'screenshot_panel.png',});

    //suumbmit button
    await page.getByRole('button', {name: 'Request a call back'}).click();

    await page.waitForURL((url) => { return url.pathname === '/thank-you.html'; });
    
      console.log('Successfully reached the thank-you page');
      
}finally{
      await browser.close(); // Close the browser
}
}

main().catch(error => {
    console.error('Failed:', error.message);
    process.exitCode = 1;
});
