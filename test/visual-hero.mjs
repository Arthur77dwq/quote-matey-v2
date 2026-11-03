import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:3000');

await page.waitForTimeout(3500);

const heroTexts = [
  'Turn messy texts into',
  'professional quotes',
  'Generate trade quotes in under 60 seconds',
];

for (const t of heroTexts) {
  const visible = await page.evaluate((text) => {
    const els = Array.from(
      document.querySelectorAll('h1, p, span'),
    ).filter(
      (el) => el.innerText.includes(text) && !el.parentElement?.parentElement?.classList.contains('not-displayed'),
    );
    return els.length > 0;
  }, t);
  console.log(`${visible ? 'visible' : 'hidden'}: ${t}`);
}

const metrics = await page.evaluate(() => {
  const hero = document.querySelector('section');
  const box = hero.getBoundingClientRect();
  const headings = Array.from(document.querySelectorAll('[style*="color:transparent"], section')).filter((n) =>
    n.classList.contains('hero') || n.id === 'hero' || getComputedStyle(n).zIndex !== 'auto',
  );
  const texts = Array.from(document.querySelectorAll('h1, p, h2')).map((h) => ({
    tag: h.tagName,
    txt: h.innerText,
    top: Math.round(h.getBoundingClientRect().top),
    opacity: getComputedStyle(h).opacity,
  }));
  return {
    heroTop: Math.round(box.top),
    heroHeight: Math.round(box.height),
    viewportHeight: window.innerHeight,
    headings,
    inView: box.top + box.height >= 0 && box.bottom <= window.innerHeight,
  };
});
console.log('Metrics:', JSON.stringify(metrics));

await browser.close();
process.exit(0);
