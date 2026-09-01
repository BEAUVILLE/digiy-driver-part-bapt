/* DIGIY DRIVER LIVE PRESENCE V1 — fiche publique */
(()=>{
'use strict';
const ENDPOINT='https://wesqmwjjtsefyjnluosj.supabase.co/functions/v1/driver-public-presence?slug=baptiste-driver-ambassador';
const $=id=>document.getElementById(id);
const T={
fr:{title:'Disponibilité maintenant',available:'🟢 Disponible',busy:'🟠 Occupé',unavailable:'⚫ Indisponible',confirm:'⚪ À confirmer',sector:'Secteur actuel',none:'Secteur à confirmer',note:'Statut déclaré par le chauffeur. Après 4 heures sans mise à jour, la fiche revient automatiquement à « À confirmer ».'},
en:{title:'Availability now',available:'🟢 Available',busy:'🟠 Busy',unavailable:'⚫ Unavailable',confirm:'⚪ To confirm',sector:'Current area',none:'Area to confirm',note:'Status set by the driver. After 4 hours without an update, the profile automatically returns to “To confirm”.'},
es:{title:'Disponibilidad ahora',available:'🟢 Disponible',busy:'🟠 Ocupado',unavailable:'⚫ No disponible',confirm:'⚪ Por confirmar',sector:'Zona actual',none:'Zona por confirmar',note:'Estado indicado por el conductor. Tras 4 horas sin actualización, la ficha vuelve automáticamente a “Por confirmar”.'},
pt:{title:'Disponibilidade agora',available:'🟢 Disponível',busy:'🟠 Ocupado',unavailable:'⚫ Indisponível',confirm:'⚪ A confirmar',sector:'Zona atual',none:'Zona a confirmar',note:'Estado indicado pelo motorista. Após 4 horas sem atualização, a ficha volta automaticamente a “A confirmar”.'},
de:{title:'Verfügbarkeit jetzt',available:'🟢 Verfügbar',busy:'🟠 Beschäftigt',unavailable:'⚫ Nicht verfügbar',confirm:'⚪ Zu bestätigen',sector:'Aktueller Bereich',none:'Bereich zu bestätigen',note:'Status vom Fahrer angegeben. Nach 4 Stunden ohne Aktualisierung wechselt das Profil automatisch zu „Zu bestätigen“.'},
it:{title:'Disponibilità adesso',available:'🟢 Disponibile',busy:'🟠 Occupato',unavailable:'⚫ Non disponibile',confirm:'⚪ Da confermare',sector:'Zona attuale',none:'Zona da confermare',note:'Stato indicato dall’autista. Dopo 4 ore senza aggiornamento, la scheda torna automaticamente a “Da confermare”.'},
nl:{title:'Beschikbaarheid nu',available:'🟢 Beschikbaar',busy:'🟠 Bezet',unavailable:'⚫ Niet beschikbaar',confirm:'⚪ Te bevestigen',sector:'Huidige zone',none:'Zone te bevestigen',note:'Status door de chauffeur ingesteld. Na 4 uur zonder update gaat het profiel automatisch terug naar “Te bevestigen”.'},
ar:{title:'التوفر الآن',available:'🟢 متاح',busy:'🟠 مشغول',unavailable:'⚫ غير متاح',confirm:'⚪ يحتاج إلى تأكيد',sector:'المنطقة الحالية',none:'المنطقة تحتاج إلى تأكيد',note:'يحدد السائق حالته بنفسه. بعد 4 ساعات دون تحديث تعود البطاقة تلقائياً إلى «يحتاج إلى تأكيد».'}
};
let row=null;
function lang(){const l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return T[l]?l:'fr'}
function render(){const t=T[lang()],status=row?.effective_status||'confirm';if($('liveTitle'))$('liveTitle').textContent=t.title;if($('liveStatus'))$('liveStatus').textContent=t[status]||t.confirm;if($('liveSectorLabel'))$('liveSectorLabel').textContent=t.sector;if($('liveSector'))$('liveSector').textContent=row?.current_sector||t.none;if($('liveNote'))$('liveNote').textContent=t.note;}
async function load(){try{const r=await fetch(ENDPOINT,{cache:'no-store'});if(r.ok)row=await r.json();else row=null}catch(_){row=null}render()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{render();load()});else{render();load()}
window.addEventListener('storage',e=>{if(e.key==='digiy-driver-baptiste-presence-sync')load()});
window.addEventListener('focus',load);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')load()});
new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
setInterval(load,60000);
})();