/*
  CapyLinks (bio moderna)
  - loader com fade
  - micro-parallax nos blobs
  - reveal sutil dos links
*/

(function () {
  const root = document.documentElement;
  const app = document.getElementById('app');
  const year = document.getElementById('year');

  if (year) year.textContent = String(new Date().getFullYear());

  // Show app after initial paint
  const reveal = () => {
    app?.removeAttribute('hidden');
    // CSS handles the rest
    window.setTimeout(() => root.classList.add('is-loaded'), 150);
  };

  if (document.readyState === 'complete') {
    reveal();
  } else {
    window.addEventListener('load', () => {
      // A small pause makes the loader feel intentional (and avoids flicker)
      window.setTimeout(reveal, 650);
    }, { once: true });
  }

  // Micro-parallax on aurora blobs
  const blobs = Array.from(document.querySelectorAll('.blob'));
  if (blobs.length) {
    let raf = 0;
    let target = { x: 0, y: 0 };

    const onMove = (clientX, clientY) => {
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = (clientY / window.innerHeight) * 2 - 1;
      target = { x, y };

      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        blobs.forEach((b, i) => {
          const k = (i + 1) * 6;
          b.style.transform = `translate3d(${target.x * k}px, ${target.y * k}px, 0)`;
        });
      });
    };

    window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY), { passive: true });
    window.addEventListener('touchmove', (e) => {
      const t = e.touches?.[0];
      if (t) onMove(t.clientX, t.clientY);
    }, { passive: true });
  }

  // Reveal links with a small stagger (no library)
  const links = Array.from(document.querySelectorAll('.link'));
  links.forEach((el, idx) => {
    el.style.animationDelay = `${Math.min(idx * 65, 420)}ms`;
  });
})();
