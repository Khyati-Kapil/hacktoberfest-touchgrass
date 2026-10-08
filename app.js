(() => {
  const notes = [
    ['Find the greenest thing near you.', 'Stay with it for one full minute.', 'A FIELD OBSERVATION', '~ 15 MINUTES'],
    ['Walk until you hear a sound you cannot name.', 'Don’t record it. Let the mystery keep its shape.', 'A FIELD LISTENING', '~ 20 MINUTES'],
    ['Find a shadow with a sharp edge.', 'Trace it with your eyes. Notice what the sun is doing.', 'A FIELD STUDY', '~ 10 MINUTES'],
    ['Pick up one fallen thing.', 'Carry it for a while, then return it exactly where you found it.', 'A FIELD RITUAL', '~ 25 MINUTES'],
    ['Look for the oldest surface you can find.', 'Stone, bark, weathered wood. Imagine its first day.', 'A FIELD TIME TRAVEL', '~ 15 MINUTES']
  ];
  const storage = {
    get(key) { try { return window.localStorage.getItem(key); } catch (_) { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); } catch (_) {} }
  };
  function init() {
    const $ = (id) => document.getElementById(id);
    const drawButton = $('drawBtn'); const nextButton = $('nextBtn'); const aboutButton = $('aboutBtn');
    if (!drawButton || !nextButton || !aboutButton) return;
    let index = Number(storage.get('field-note-index')) || 0;
    function render() {
      const [first, second, category, duration] = notes[index];
      $('noteText').innerHTML = `${first}<br>${second}`; $('noteCategory').textContent = category; $('noteTime').textContent = duration; $('noteIndex').textContent = `NO. ${String(index + 1).padStart(3, '0')}`;
    }
    function draw() {
      index = (index + 1) % notes.length; render(); storage.set('field-note-index', String(index));
      const stage = $('noteStage');
      if (stage && typeof stage.animate === 'function') stage.animate([{ opacity: 0.55, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 360, easing: 'ease-out' });
    }
    drawButton.addEventListener('click', draw); nextButton.addEventListener('click', draw);
    aboutButton.addEventListener('click', () => { const about = $('about'); if (about) about.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    render();
    if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
