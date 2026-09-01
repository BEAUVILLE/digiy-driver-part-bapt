/* DIGIY DRIVER LIVE PRESENCE V2 — accès adhérent avec vérification DB */
(()=>{
'use strict';
const URL='https://wesqmwjjtsefyjnluosj.supabase.co';
const KEY='sb_publishable_tGHItRgeWDmGjnd0CK1DVQ_BIep4Ug3';
const db=window.supabase.createClient(URL,KEY,{auth:{persistSession:true,detectSessionInUrl:true}});
const slug='baptiste-driver-ambassador';
const $=id=>document.getElementById(id);
let member=null;

function msg(text,bad=false){const el=$('presenceStatusMsg');if(!el)return;el.textContent=text||'';el.classList.toggle('error',bad)}
function fill(){if(!member)return;const s=$('presenceStatus'),z=$('presenceSector');if(s)s.value=member.availability_status||'unavailable';if(z)z.value=member.current_sector||'';}

async function load(){
  const {data:{session}}=await db.auth.getSession();
  if(!session)return null;
  const {data,error}=await db.from('digiy_driver_master_members').select('id,availability_status,current_sector,presence_updated_at').eq('slug',slug).eq('is_active',true).maybeSingle();
  if(error||!data)return null;
  member=data;fill();return data;
}

async function save(){
  if(!member)await load();
  if(!member)return msg('⚠️ Profil chauffeur non disponible.',true);
  const status=$('presenceStatus')?.value||'unavailable';
  const sector=$('presenceSector')?.value||'';
  const b=$('savePresence');if(b)b.disabled=true;msg('Mise à jour…');
  const {data,error}=await db.rpc('digiy_driver_master_set_presence_v1',{p_driver_id:member.id,p_status:status,p_sector:sector||null});
  if(error||!data||!data.length){if(b)b.disabled=false;return msg('⚠️ Mise à jour impossible.',true)}
  const {data:check,error:checkError}=await db.from('digiy_driver_master_members').select('id,availability_status,current_sector,presence_updated_at').eq('id',member.id).maybeSingle();
  if(b)b.disabled=false;
  if(checkError||!check)return msg('⚠️ Mise à jour non vérifiée.',true);
  const sectorOk=(check.current_sector||'')===sector;
  const statusOk=check.availability_status===status;
  if(!statusOk||!sectorOk){member=check;fill();return msg('⚠️ La base ne confirme pas exactement le statut et le secteur. Réessayez.',true)}
  member=check;
  try{localStorage.setItem('digiy-driver-baptiste-presence-sync',String(Date.now()))}catch(_){ }
  msg('✓ Disponibilité '+status+' · secteur '+(sector||'à confirmer')+' confirmés en base pour 4 heures.');
}

function bind(){const b=$('savePresence');if(b&&!b.dataset.bound){b.dataset.bound='1';b.addEventListener('click',save)}load()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
db.auth.onAuthStateChange((event)=>{if(event==='SIGNED_IN')setTimeout(load,0)});
})();