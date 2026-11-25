'use strict';
// Keep the YouTube player unloaded until the visitor chooses to watch.
document.querySelectorAll('.video-play').forEach(button => {
  button.addEventListener('click', () => {
    const player = button.closest('.video-player');
    const id = player.dataset.video;
    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
    const frame = document.createElement('iframe');
    frame.title = button.getAttribute('aria-label').replace('Reproducir: ', '');
    frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    player.replaceChildren(frame);
    frame.focus();
  }, { once: true });
});
document.querySelectorAll('.copy-link').forEach(button => button.addEventListener('click', async () => {
  const status = button.parentElement.querySelector('.copy-status');
  const canonical = document.querySelector('link[rel="canonical"]').href;
  try { await navigator.clipboard.writeText(canonical); status.textContent = 'Enlace copiado.'; }
  catch { status.textContent = 'Puedes copiar el enlace desde la barra de direcciones.'; }
}));
