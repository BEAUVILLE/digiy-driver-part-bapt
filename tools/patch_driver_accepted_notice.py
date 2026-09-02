from pathlib import Path
p=Path('gestion.html')
s=p.read_text()
marker='driver-accepted-notice-v1.js'
if marker not in s:
    needle='</body></html>'
    repl='<script src="./assets/driver-accepted-notice-v1.js?v=20260901-v1"></script></body></html>'
    if needle not in s:
        raise SystemExit('closing body/html anchor not found')
    s=s.replace(needle,repl,1)
    p.write_text(s)
print('patched', marker in p.read_text())
