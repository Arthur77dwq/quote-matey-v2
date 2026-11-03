import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:3000');
await page.waitForTimeout(3500);

const result = await page.evaluate(() => {
  const allTags = Array.from(document.querySelectorAll('h1, h2, p, span')).map((el) => ({
    tag: el.tagName,
    text: el.innerText?.slice(0, 60),
    top: Math.round(el.getBoundingClientRect().top),
    opacity: getComputedStyle(el).opacity,
    zIndex: getComputedStyle(el).zIndex,
    visible: !!(getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden'),
  }));

  const openScene = document.querySelector('[data-nimg]');
  const renderedImg = allTags.find((t) => t.tag === 'IMG') || null;
  const heroSections = Array.from(document.querySelectorAll('section')).map((s) => ({
    id: s.id,
    class: s.className,
    top: Math.round(s.getBoundingClientRect().top),
    bottom: Math.round(s.getBoundingClientRect().bottom),
    height: Math.round(s.getBoundingClientRect().height),
  }));

  return { allTags, renderedImg, heroSections };
});
console.log('Result:', JSON.stringify(result, null, 2));
await browser.close();
process.exit(0);
