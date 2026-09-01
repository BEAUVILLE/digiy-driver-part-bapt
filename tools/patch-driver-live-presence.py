from pathlib import Path

# gestion.html
p = Path('gestion.html')
s = p.read_text()
if 'DIGIY DRIVER LIVE PRESENCE V1' not in s:
    anchor = '<div class="session"><span id="who"></span><button id="logout">Déconnexion</button></div>'
    block = '<div class="session"><span id="who"></span><button id="logout">Déconnexion</button></div>\n<!-- DIGIY DRIVER LIVE PRESENCE V1 -->\n<div class="box" id="presenceBox"><div class="head"><div><h3>📍 Ma disponibilité maintenant</h3><p class="hint">Visible sur votre fiche publique · sans GPS. La mise à jour reste active 4 heures.</p></div></div><div class="grid"><div class="field"><label>Statut actuel</label><select id="presenceStatus"><option value="available">🟢 Disponible</option><option value="busy">🟠 Occupé</option><option value="unavailable">⚫ Indisponible</option></select></div><div class="field"><label>Secteur actuel</label><select id="presenceSector"><option value="">À confirmer</option><option>Saly</option><option>Mbour</option><option>AIBD</option><option>Dakar</option><option>Petite Côte</option><option>Ngaparou</option><option>Somone</option></select></div></div><div class="actions"><button class="btn gold" id="savePresence" type="button">📍 Mettre à jour ma fiche</button></div><p class="status" id="presenceStatusMsg"></p></div>'
    if anchor not in s:
        raise SystemExit('Ancre session gestion introuvable')
    s = s.replace(anchor, block, 1)
script = '<script src="./assets/driver-owner-presence-v1.js?v=20260901-v1"></script>'
if script not in s:
    s = s.replace('</body>', script + '</body>', 1)
p.write_text(s)

# index.html
p = Path('index.html')
s = p.read_text()
if 'DIGIY DRIVER PUBLIC LIVE PRESENCE V1' not in s:
    anchor = '<section><h2 data-k="8"></h2>'
    block = '<!-- DIGIY DRIVER PUBLIC LIVE PRESENCE V1 --><section id="livePresence"><div class="badge">● LIVE DRIVER</div><h2 id="liveTitle">Disponibilité maintenant</h2><div id="liveStatus" style="font-size:24px;font-weight:1000;margin:10px 0">⚪ À confirmer</div><div class="muted"><strong id="liveSectorLabel">Secteur actuel</strong> · <span id="liveSector">Secteur à confirmer</span></div><p class="muted" id="liveNote" style="font-size:12px;margin-bottom:0">Statut déclaré par le chauffeur.</p></section>' + anchor
    if anchor not in s:
        raise SystemExit('Ancre fiche publique introuvable')
    s = s.replace(anchor, block, 1)
script = '<script src="./assets/driver-public-presence-v1.js?v=20260901-v1"></script>'
if script not in s:
    s = s.replace('</body>', script + '</body>', 1)
p.write_text(s)
