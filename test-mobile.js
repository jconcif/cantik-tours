import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Emular iPhone 13
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  page.on('console', msg => console.log('CONSOLE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.error('REQUEST FAILED:', request.url(), request.failure().errorText));

  try {
    console.log('Navegando a cantiktours.com...');
    await page.goto('https://cantiktours.com', { waitUntil: 'networkidle0', timeout: 15000 });
    const title = await page.title();
    console.log('Título cargado:', title);
    
    // Obtener contenido HTML si está en blanco
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log('Texto visible (primeros 100 caracteres):', bodyText.substring(0, 100));
  } catch (err) {
    console.error('Error durante la navegación:', err);
  } finally {
    await browser.close();
  }
})();
