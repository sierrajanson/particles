export function renderTextContent(ctx) {
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  const docHeaderLeftAlign = canvas.width/5;
  const docTextLeftAlign = docHeaderLeftAlign+75;
  let docBaseHeight = canvas.height/5;

  ctx.font = 'bold 80px Courier';
  ctx.fillText('sierra janson', canvas.width/2, docBaseHeight);

  ctx.font = 'bold 24px Courier';
  ctx.fillText('computer science', canvas.width/2, docBaseHeight + 75);

  ctx.textAlign = 'left';
  let offset = 75;

  // new page
  docBaseHeight += docBaseHeight;
  ctx.fillText('experience', docHeaderLeftAlign, docBaseHeight + offset);
  offset += 75;

  ctx.fillText('> Lucasfilm SWE Intern                    (Jan 2026 - Present)', docTextLeftAlign, docBaseHeight + offset);
  offset += 75;
  // ctx.font = ' 12px Courier'
  // offset += 30;
  // ctx.fillText('Google Apps Script\tJavaScript\tParallel Programming\tCaching', docTextLeftAlign+50, docBaseHeight + offset);
  // ctx.font = 'bold 24px Courier'
  // offset += 45;

  ctx.fillText('> NASA Ames SWE Intern                    (Sep 2025 - Dec 2025)', docTextLeftAlign, docBaseHeight + offset);
  offset += 75;
  ctx.fillText('> Lucasfilm SWE Intern                    (Jun 2025 - Sep 2025)', docTextLeftAlign, docBaseHeight + offset);
  offset += 75;
  ctx.fillText('> Blueprint SWE Intern                    (Feb 2024 - Mar 2025)', docTextLeftAlign, docBaseHeight + offset);
  offset += 75;
  ctx.fillText('labs', docHeaderLeftAlign, docBaseHeight + offset);
  offset += 75;

  ctx.fillText('> Neuromorphic Computing Research Assistant      (Jan 2025 - Dec 2025)', docTextLeftAlign, docBaseHeight + offset);
  offset += 75;
  ctx.fillText('> Computational Astrophysics Research Assistant  (Apr 2024 - Oct 2024)', docTextLeftAlign, docBaseHeight + offset);
  offset += 75;
  ctx.fillText('> Human Mathematics Research Assistant           (Mar 2024 - Jun 2024)', docTextLeftAlign, docBaseHeight + offset);
  offset += 75;

  // ctx.fillText('projects', docHeaderLeftAlign, docBaseHeight + offset); 
}