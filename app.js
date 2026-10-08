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
    const drawButton = $('drawBtn'); const nextButton = $('nextBtn'); const aboutButton = $('aboutBtn'); const gemmaButton = $('gemmaBtn');
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
    async function tryGemma() {
      const status = $('gemmaStatus');
      if (gemmaButton) { gemmaButton.disabled = true; gemmaButton.textContent = 'asking Gemma …'; }
      if (status) status.textContent = 'connecting to local Gemma · nothing leaves this device';
      try {
        const response = await fetch('http://localhost:11434/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gemma3:1b', prompt: 'Return one short, gentle outdoor observation prompt for a person who wants to notice the world. Return exactly two short sentences and no title.', stream: false }) });
        if (!response.ok) throw new Error('Gemma unavailable');
        const data = await response.json();
        const text = String(data.response || '').replace(/^['"\s]+|['"\s]+$/g, '').trim();
        if (!text) throw new Error('Empty response');
        $('noteText').textContent = text;
        $('noteCategory').textContent = 'GEMMA / LOCAL MODEL';
        $('noteTime').textContent = '~ 15 MINUTES';
        if (status) status.textContent = 'Gemma 3 · local response · take it outside';
      } catch (_) {
        if (status) status.textContent = 'Gemma is not running · offline deck kept you moving';
        draw();
      } finally { if (gemmaButton) { gemmaButton.disabled = false; gemmaButton.innerHTML = 'try local Gemma <b>✦</b>'; } }
    }
    drawButton.addEventListener('click', draw); nextButton.addEventListener('click', draw);
    if (gemmaButton) gemmaButton.addEventListener('click', tryGemma);
    aboutButton.addEventListener('click', () => { const about = $('about'); if (about) about.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    render();
    if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
