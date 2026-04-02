export function renderTextContent(ctx, multiplier) {
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  const onMobile = window.innerWidth < window.innerHeight
  const docHeaderLeftAlign = onMobile ? canvas.width/14 : canvas.width/5;
  const increment = 75;
  const docTextLeftAlign = docHeaderLeftAlign+increment;
  let docBaseHeight = canvas.height/(multiplier*2);

  ctx.font = 'bold 80px Courier';
  ctx.fillText('sierra janson', canvas.width/2, docBaseHeight);

  ctx.font = 'bold 24px Courier';
  ctx.fillText('computer science', canvas.width/2, docBaseHeight + increment);

  ctx.textAlign = 'left';
  let offset = increment;
  // new page
  docBaseHeight += docBaseHeight;
  ctx.fillText('experience', docHeaderLeftAlign, docBaseHeight + offset);
  offset += increment;

  ctx.fillText(`> Lucasfilm SWE Intern${' '.repeat(onMobile ? 3: 18)}(Jan 2026 - Mar 2026)`, docTextLeftAlign, docBaseHeight + offset);
  offset += increment;
  // ctx.font = ' 12px Courier'
  // offset += 30;
  // ctx.fillText('Google Apps Script\tJavaScript\tParallel Programming\tCaching', docTextLeftAlign+50, docBaseHeight + offset);
  // ctx.font = 'bold 24px Courier'
  // offset += 45;

  ctx.fillText(`> NASA Ames SWE Intern${' '.repeat(onMobile ? 3: 18)}(Sep 2025 - Dec 2025)`, docTextLeftAlign, docBaseHeight + offset);
  offset += increment;
  ctx.fillText(`> Lucasfilm SWE Intern${' '.repeat(onMobile ? 3: 18)}(Jun 2025 - Sep 2025)`, docTextLeftAlign, docBaseHeight + offset);
  offset += increment;
  ctx.fillText(`> Blueprint SWE Intern${' '.repeat(onMobile ? 3: 18)}(Feb 2024 - Mar 2025)`, docTextLeftAlign, docBaseHeight + offset);
  offset += increment;
  ctx.fillText('research labs', docHeaderLeftAlign, docBaseHeight + offset);
  offset += increment;

  ctx.fillText('> Neuromorphic Computing Lab      (Jan 2025 - Dec 2025)', docTextLeftAlign, docBaseHeight + offset);
  offset += increment;
  ctx.fillText('> Computational Astrophysics Lab  (Apr 2024 - Oct 2024)', docTextLeftAlign, docBaseHeight + offset);
  offset += increment;
  ctx.fillText('> Lab for Human Mathematics       (Mar 2024 - Jun 2024)', docTextLeftAlign, docBaseHeight + offset);
  offset += increment;

  // ctx.fillText('projects', docHeaderLeftAlign, docBaseHeight + offset); 
}