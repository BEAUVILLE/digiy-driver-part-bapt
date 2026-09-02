/* DIGIY DRIVER — repère visuel après acceptation */
(()=>{
'use strict';
function apply(){
  document.querySelectorAll('.trip').forEach(card=>{
    const select=card.querySelector('.tripactions select');
    if(!select)return;
    let notice=card.querySelector('.digiy-accepted-notice');
    if(select.value==='todo'){
      if(!notice){
        notice=document.createElement('div');
        notice.className='digiy-accepted-notice';
        notice.style.cssText='margin-top:9px;padding:10px 12px;border-radius:12px;background:#e1f4e8;color:#245035;font-size:12px;font-weight:1000;line-height:1.45';
        const actions=card.querySelector('.tripactions');
        if(actions)card.insertBefore(notice,actions);
      }
      notice.textContent='✅ Course acceptée — prévenir le client : SMS ou WhatsApp.';
    }else if(notice){
      notice.remove();
    }
    if(!select.dataset.digiyAcceptedBound){
      select.dataset.digiyAcceptedBound='1';
      select.addEventListener('change',()=>setTimeout(apply,0));
    }
  });
}
const observer=new MutationObserver(()=>apply());
function start(){apply();const list=document.getElementById('list');if(list)observer.observe(list,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
