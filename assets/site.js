// Chatra has no pixel offset in ChatraSetup (buttonPosition is a corner code only).
// 'br' keeps the launcher bottom-right; the CSS variable below lifts it on mobile.
window.ChatraSetup=window.ChatraSetup||{};
if(!window.ChatraSetup.buttonPosition)window.ChatraSetup.buttonPosition='br';
if(!window.ChatraSetup.buttonStyle)window.ChatraSetup.buttonStyle='round';
const $=id=>document.getElementById(id);
const PAGE=document.body.dataset.page||'home';
const NAV=[['index.html','Home','home'],['shop.html','Shop All','shop'],['skincare.html','SkinCare','skincare'],['lido-creams.html','Lido Creams','lido'],['devices.html','Devices','devices'],['treatments.html','Treatments','treatments'],['about.html','About','about'],['contact.html','Contact','contact']];
const SHIP='Same-day shipping on orders before 3 PM CT';
const ic={u:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></svg>',h:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 6-8 11-8 11z"/></svg>',b:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11l9-7 9 7v9H3z"/></svg>',m:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'};
const bagN=()=>+(localStorage.bloopBag||0);
document.body.insertAdjacentHTML('afterbegin',`<div class="promo">🚚 <b>${SHIP}</b></div>
<header><div class="w hd"><a class="logo" href="index.html"><img src="assets/img/bloop-logo-charcoal.svg" alt="Bloop" onerror="this.src='assets/img/bloop-logo-600.png'"></a>
<form class="sr" action="shop.html"><svg width="18" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input name="q" placeholder="Search skincare, Lido Creams, devices…" style="border:0;background:none;outline:0;font:inherit;flex:1"></form>
<div class="ac"><a class="t" id="acct" href="cart.html#!/~/account">${ic.u}<span id="acctl">Sign in</span></a><a class="t" href="cart.html#!/~/favorites">${ic.h}Wishlist</a><a href="cart.html" aria-label="Bag">${ic.b}<span class="cnt" id="bag">${bagN()}</span></a></div></div>
<nav><div class="w">${NAV.map(n=>`<a class="${n[2]==PAGE?'on':''}" href="${n[0]}">${n[1]}</a>`).join('')}<a class="r">Mon–Fri 9–5 CT · Sat 9–12</a></div></nav></header>`);
document.body.insertAdjacentHTML('beforeend',`<div class="trust w" style="margin-top:70px"><div><span class="ti">🚚</span><span><b>Same-day shipping</b>On orders before 3 PM CT</span></div><div><span class="ti">🇰🇷</span><span><b>K-beauty favorites</b>Curated catalog</span></div><div><span class="ti">🔒</span><span><b>Secure checkout</b>Safe card payments</span></div><div><span class="ti">💬</span><span><b>Real people</b>Call or email us</span></div></div>
<footer><div class="w"><div class="fc"><div><a class="logo" href="index.html"><img src="assets/img/bloop-logo-charcoal.svg" alt="Bloop" onerror="this.src='assets/img/bloop-logo-600.png'"></a><p style="margin-top:10px;line-height:1.7">bloopifyhub.com — your K-beauty shop for skincare, devices, Lido Creams and pro treatments.</p></div>
<div><h5>Shop</h5><ul>${NAV.slice(1,6).map(n=>`<li><a href="${n[0]}">${n[1]}</a></li>`).join('')}</ul></div><div><h5>Bloop</h5><ul><li><a href="about.html">About</a></li><li><a href="contact.html">Contact</a></li><li><a href="shipping.html">Shipping &amp; payment</a></li><li><a href="returns.html">Returns</a></li><li><a href="terms.html">Terms &amp; conditions</a></li><li><a href="privacy.html">Privacy policy</a></li></ul></div>
<div><h5>Contact</h5><ul><li>Chicago, IL</li><li>Mon–Fri 9 AM–5 PM CT</li><li>Sat 9 AM–12 PM CT</li><li><a href="tel:+18155054387">+1-815-505-4387</a></li><li><a href="mailto:bloop.store25@gmail.com">bloop.store25@gmail.com</a></li></ul></div></div>
<div class="lg">Products are sold for cosmetic and professional beauty use. Statements are not intended to diagnose, treat, cure or prevent any disease. Topical creams: external use only, follow label directions. Treatments and professional items are intended for trained professionals. Orders placed before 3 PM CT Mon–Fri ship the same day. © 2026 Bloop</div></div></footer>
<div class="tb"><a href="index.html"><span>${ic.home}Home</span></a><a href="shop.html"><span>${ic.m}Shop</span></a><a href="cart.html#!/~/favorites"><span>${ic.h}Wishlist</span></a><a href="cart.html#!/~/account"><span>${ic.u}Account</span></a><a href="cart.html"><span>${ic.b}Bag</span></a></div><div class="toast" id="toast"></div>`);
function newsletterBlock(){
  return `<section class="nl"><div><h3>Get new arrivals & restock alerts</h3><p>Be first to know what's new at Bloop.</p><p class="nlmsg" role="status" aria-live="polite" hidden></p></div><form class="nlf" action="https://formsubmit.co/bloop.store25@gmail.com" method="POST"><input type="hidden" name="_subject" value="Bloop newsletter signup"><input type="hidden" name="_captcha" value="false"><input type="hidden" name="_next" value="https://bloopifyhub.com/index.html?subscribed=1"><input class="hp" type="text" name="bloop_hp" tabindex="-1" autocomplete="off" aria-hidden="true"><input type="email" name="email" placeholder="Your email" autocomplete="email" required><button class="btn" type="submit" style="border:0">Subscribe</button></form></section>`;
}
function newsletterEndpoint(){
  const v=window.NEWSLETTER_ENDPOINT;
  if(typeof v!=='string')return '';
  const url=v.trim();
  return /^https:\/\/[^/\s]+/i.test(url)?url:'';
}
function setNlMsg(form,text,kind){
  const el=form.closest('.nl')&&form.closest('.nl').querySelector('.nlmsg');
  if(!el){if(text)toast(text);return}
  el.classList.remove('ok','bad');
  if(!text){el.hidden=true;el.textContent='';return}
  el.hidden=false;el.textContent=text;if(kind)el.classList.add(kind);
}
function wireNewsletter(form){
  form.addEventListener('submit',function(ev){
    const endpoint=newsletterEndpoint();
    if(!endpoint)return;
    ev.preventDefault();
    const data=new FormData(form);
    const email=String(data.get('email')||'').trim();
    const bloop_hp=String(data.get('bloop_hp')||'').trim();
    const btn=form.querySelector('button[type="submit"]');
    const label=btn?btn.textContent:'';
    if(btn){btn.disabled=true;btn.textContent='Subscribing…'}
    setNlMsg(form,'','');
    fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email,bloop_hp})})
      .then(function(res){return res.json().catch(function(){return {}}).then(function(body){return {res,body}})})
      .then(function(out){
        if(out.res.ok&&out.body&&out.body.ok){form.reset();setNlMsg(form,"You're on the list!",'ok');return}
        const err=out.body&&out.body.error;
        if(err==='invalid_email')setNlMsg(form,'Enter a valid email address.','bad');
        else if(err==='rate_limited')setNlMsg(form,'Please wait a few minutes and try again.','bad');
        else setNlMsg(form,'Could not subscribe. Please try again.','bad');
      })
      .catch(function(){setNlMsg(form,'Could not subscribe. Please try again.','bad')})
      .finally(function(){if(btn){btn.disabled=false;btn.textContent=label||'Subscribe'}});
  });
}
if(!document.querySelector('form.nlf')){
  const trust=document.querySelector('.trust');
  const block='<div class="w">'+newsletterBlock()+'</div>';
  if(trust)trust.insertAdjacentHTML('beforebegin',block);
  else document.body.insertAdjacentHTML('beforeend',block);
}
document.querySelectorAll('form.nlf').forEach(wireNewsletter);
const products=()=>window.PRODUCTS||[];
const inC=c=>products().filter(p=>p.cats&&p.cats.includes(c));
const label=p=>p.cats.includes('Lido Creams')?'Lido Cream':p.cats.filter(c=>c!='Best Sellers'&&c!='New')[0]||'Bloop';
const img=p=>(p.img||p.eimg)?`<img src="${p.img||p.eimg}" alt="${p.name}" loading="lazy"${p.img&&p.eimg?` onerror="this.onerror=null;this.src='${p.eimg}'"`:''}>`:`<div style="width:40%;height:55%;background:#fff;border-radius:10px"></div>`;
const money=n=>'$'+(+n).toFixed(2);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const jsStr=s=>String(s==null?'':s).replace(/\\/g,'\\\\').replace(/'/g,"\\'");
function modNum(raw,base){
  if(raw==null||raw==='')return 0;
  const s=String(raw).replace(/\u2212/g,'-').replace(/\s+/g,'');
  const pct=s.match(/^([+-])?(\d+(?:\.\d+)?)%$/);
  if(pct){let n=parseFloat(pct[2]);if(!isFinite(n))return 0;if(pct[1]==='-')n=-n;return base*(n/100)}
  let m=s.match(/^([+-])?\$?(\d+(?:\.\d+)?)$/);
  if(!m)m=s.match(/([+-])?\$(\d+(?:\.\d+)?)/);
  if(!m)return 0;
  let n=parseFloat(m[2]);if(!isFinite(n))return 0;if(m[1]==='-')n=-n;return n;
}
function captureOpts(){
  const box=document.getElementById('popts');
  if(!box)return window.__optKeep||{};
  const st={};
  box.querySelectorAll('[data-opt]').forEach(el=>{
    const name=el.getAttribute('data-opt');
    const type=(el.getAttribute('data-type')||'').toUpperCase();
    if(type==='CHECKBOX'||type==='CHECKBOXES'){st[name]=[].map.call(el.querySelectorAll('input:checked'),i=>i.value);return}
    if(type==='RADIO'||type==='SIZE'||type==='SWATCHES'||type==='COLOR'){const r=el.querySelector('input:checked');st[name]=r?r.value:'';return}
    const inp=el.querySelector('select,textarea,input');
    st[name]=inp?inp.value:'';
  });
  return st;
}
function optionList(sku){const m=(window.ECWID_MAP||{})[sku];return (m&&(window.ECWID_OPTS||{})[m.id])||[]}
function optionsSatisfied(sku){
  const m=(window.ECWID_MAP||{})[sku];
  if(!m||!m.opts)return true;
  const list=optionList(sku);
  if(!list.length)return false;
  const keep=window.__optKeep||{};
  return list.every(o=>{
    if(!o.required)return true;
    const v=keep[o.name];
    const t=(o.type||'').toUpperCase();
    if(t==='CHECKBOX'||t==='CHECKBOXES')return Array.isArray(v)?v.length>0:!!v;
    return v!=null&&String(v).trim()!=='';
  });
}
function optionFields(sku){
  const m=(window.ECWID_MAP||{})[sku];
  if(!m||!m.opts)return '';
  const list=optionList(sku);
  if(!list.length)return `<div class="popts" id="popts" data-sku="${esc(sku)}"><p class="muted">Loading options…</p></div>`;
  const keep=window.__optKeep||{};
  const pre=(window.ECWID_PRE||{})[m.id]||{};
  const kept=name=>{
    if(Object.prototype.hasOwnProperty.call(keep,name))return keep[name];
    const p=pre[name];
    if(typeof p==='string'||typeof p==='number')return String(p);
    if(Array.isArray(p))return p.map(x=>typeof x==='string'||typeof x==='number'?String(x):(x&&(x.choiceName||x.name||x.value))||'').filter(Boolean);
    return undefined;
  };
  const choiceLabel=c=>esc(c.name)+(c.modifier?` (${esc(c.modifier)})`:'');
  return `<div class="popts" id="popts" data-sku="${esc(sku)}">`+list.map((o,i)=>{
    const type=(o.type||'DROPDOWN').toUpperCase();
    const req=o.required?'1':'0';
    const label=`${esc(o.name)}${o.required?' <i class="req" aria-hidden="true">*</i>':''}`;
    const attr=`data-opt="${esc(o.name)}" data-type="${esc(type)}" data-required="${req}"`;
    const cur=kept(o.name);
    if(type==='RADIO'||type==='SIZE'||type==='SWATCHES'||type==='COLOR'){
      const chosen=cur==null?'':String(cur);
      return `<fieldset class="popt" ${attr}><legend class="ol">${label}</legend><div class="choices" role="radiogroup" aria-label="${esc(o.name)}">`+
        (o.choices||[]).map(c=>`<label><input type="radio" name="bopt${i}" value="${esc(c.name)}" data-mod="${esc(c.modifier||'')}"${c.name===chosen?' checked':''}>${choiceLabel(c)}</label>`).join('')+
        `</div></fieldset>`;
    }
    if(type==='CHECKBOX'||type==='CHECKBOXES'){
      const arr=Array.isArray(cur)?cur.map(String):(cur!=null&&String(cur)!==''?[String(cur)]:[]);
      return `<fieldset class="popt" ${attr}><legend class="ol">${label}</legend><div class="choices">`+
        (o.choices||[]).map(c=>`<label><input type="checkbox" value="${esc(c.name)}" data-mod="${esc(c.modifier||'')}"${arr.indexOf(c.name)>=0?' checked':''}>${choiceLabel(c)}</label>`).join('')+
        `</div></fieldset>`;
    }
    if(type==='TEXTAREA')return `<div class="popt" ${attr}><label class="ol" for="bopt${i}">${label}</label><textarea id="bopt${i}">${esc(cur==null?'':cur)}</textarea></div>`;
    if(type==='TEXTFIELD'||type==='TEXT'||type==='DATE'){
      const itype=type==='DATE'?'date':'text';
      return `<div class="popt" ${attr}><label class="ol" for="bopt${i}">${label}</label><input id="bopt${i}" type="${itype}" value="${esc(cur==null?'':cur)}"></div>`;
    }
    if((o.choices||[]).length){
      const chosen=cur==null?'':String(cur);
      return `<div class="popt" ${attr}><label class="ol" for="bopt${i}">${label}</label><select id="bopt${i}"><option value="">Choose…</option>`+
        (o.choices||[]).map(c=>`<option value="${esc(c.name)}" data-mod="${esc(c.modifier||'')}"${c.name===chosen?' selected':''}>${choiceLabel(c)}</option>`).join('')+
        `</select></div>`;
    }
    return `<div class="popt" ${attr}><label class="ol" for="bopt${i}">${label}</label><input id="bopt${i}" type="text" value="${esc(cur==null?'':cur)}"></div>`;
  }).join('')+`</div>`;
}
function refreshOptPrice(){
  const el=$('ppricev'); if(!el)return;
  const wrap=$('pprice');
  const base=wrap?+wrap.dataset.base:NaN;
  if(!isFinite(base))return;
  let extra=0;
  document.querySelectorAll('#popts [data-opt]').forEach(box=>{
    const sel=box.querySelector('select');
    if(sel){const o=sel.options[sel.selectedIndex]; if(o)extra+=modNum(o.getAttribute('data-mod'),base); return}
    box.querySelectorAll('input:checked').forEach(i=>{extra+=modNum(i.getAttribute('data-mod'),base)});
  });
  const next=money(Math.max(0,Math.round((base+extra)*100)/100));
  if(el.textContent!==next)el.textContent=next;
  const changed=Math.abs(extra)>0.0001;
  const em=wrap.querySelector('em'), s=wrap.querySelector('s');
  if(em)em.style.display=changed?'none':'';
  if(s)s.style.display=changed?'none':'';
}
window.refreshOptPrice=refreshOptPrice;
function reviewSku(r){
  if(!r||typeof r!=='object')return '';
  const id=r.tiktok_product_id==null?'':String(r.tiktok_product_id);
  const hit=id&&window.TIKTOK_SKU_MAP&&window.TIKTOK_SKU_MAP[id];
  const sku=(hit&&hit.sku)||r.sku;
  return sku==null?'':String(sku);
}
function reviewsFor(sku){
  const want=String(sku||'');
  if(!want)return [];
  const list=(window.REVIEWS||[]).filter(r=>reviewSku(r)===want);
  list.sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
  return list;
}
function reviewAvg(list){
  const nums=list.map(r=>+r.rating).filter(n=>isFinite(n));
  if(!nums.length)return null;
  return nums.reduce((s,n)=>s+n,0)/nums.length;
}
function fmtAvg(n){return (Math.round(n*10)/10).toFixed(1)}
function starsHtml(score){
  const pct=Math.max(0,Math.min(100,(+score||0)/5*100));
  return `<span class="stars" style="--w:${pct.toFixed(2)}%" aria-hidden="true"><i></i></span>`;
}
const RV_MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(s){
  const m=String(s||'').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if(!m)return '';
  const mo=RV_MONTHS[+m[2]-1];
  return mo?`${mo} ${+m[3]}, ${m[1]}`:'';
}
function reviewItem(r){
  const ratingNum=+r.rating;
  const rating=isFinite(ratingNum)?Math.max(0,Math.min(5,ratingNum)):null;
  const text=r.text==null?'':String(r.text).trim();
  const when=fmtDate(r.date);
  const iso=(String(r.date||'').match(/^(\d{4}-\d{2}-\d{2})/)||[])[1]||'';
  const stars=rating==null?'':starsHtml(rating);
  const body=text?`<p class="rv-text">${esc(text).replace(/\n/g,'<br>')}</p>`:(rating==null?'':`<p class="rv-text rv-only">Rated ${rating} star${rating===1?'':'s'}</p>`);
  return `<article class="rv"><div class="rv-top">${stars}<span class="rv-who">Verified buyer</span>${when?`<time datetime="${esc(iso)}">${esc(when)}</time>`:''}</div>${body}</article>`;
}
function onlyAtBadge(){
  return `<span class="onlyat" role="img" aria-label="Only at Bloop"><span class="onlyat-only" aria-hidden="true">ONLY</span><span class="onlyat-at" aria-hidden="true">AT</span><img class="onlyat-logo" src="assets/img/bloop-logo-white.svg" alt="" aria-hidden="true"></span>`;
}
function reviewChip(sku){
  const list=reviewsFor(sku),avg=reviewAvg(list);
  if(!list.length||avg==null)return '';
  const n=list.length,label=`Rated ${fmtAvg(avg)} out of 5 from ${n} review${n===1?'':'s'}`;
  return `<span class="rv-card" aria-label="${esc(label)}"><span class="star" aria-hidden="true">★</span> ${fmtAvg(avg)} <em>(${n})</em></span>`;
}
function reviewSummary(sku){
  const list=reviewsFor(sku),avg=reviewAvg(list);
  if(!list.length||avg==null)return '';
  const n=list.length,label=`Rated ${fmtAvg(avg)} out of 5 from ${n} review${n===1?'':'s'}`;
  return `<a class="rv-sum" href="#reviews" aria-label="${esc(label)}">${starsHtml(avg)}<b>${fmtAvg(avg)}</b><span>${n} review${n===1?'':'s'}</span></a>`;
}
function reviewSection(sku){
  const list=reviewsFor(sku);
  if(!list.length)return '';
  const avg=reviewAvg(list),n=list.length,open=window.__rvOpen===sku,PRE=8;
  const head=list.slice(0,PRE).map(reviewItem).join('');
  const tail=list.slice(PRE);
  const rest=tail.length?`<div class="rv-list" id="rv-rest"${open?'':' hidden'}>${tail.map(reviewItem).join('')}</div>`:'';
  const more=tail.length&&!open?`<button type="button" class="rv-more" data-for="${esc(sku)}" onclick="showAllReviews(this)">Show all ${n} reviews</button>`:'';
  const avgLine=avg==null?`${n} review${n===1?'':'s'}`:`${starsHtml(avg)}<span>${fmtAvg(avg)} average · ${n} review${n===1?'':'s'}</span>`;
  return `<section class="reviews" id="reviews"><div class="rv-head"><h2>Reviews</h2><p>${avgLine}</p></div><p class="rv-note">Customer reviews from TikTok Shop.</p><div class="rv-list">${head}</div>${rest}${more}</section>`;
}
function showAllReviews(btn){
  if(!btn)return;
  window.__rvOpen=btn.getAttribute('data-for')||'';
  const rest=document.getElementById('rv-rest');
  if(rest)rest.hidden=false;
  btn.remove();
}
function card(p,i,rank){const off=p.compare?Math.round((1-p.price/p.compare)*100):0;const u='product.html?id='+encodeURIComponent(p.sku);
const choose=!!((window.ECWID_MAP||{})[p.sku]||{}).opts;
const buy=choose
  ? `<a class="addb" data-sku="${esc(p.sku)}" href="${u}">Choose options</a>`
  : `<button type="button" class="addb" data-sku="${esc(p.sku)}" onclick="event.stopPropagation();add('${jsStr(p.sku)}')">Add to bag</button>`;
return `<div class="card"><button type="button" class="hrt" style="top:10px;z-index:5" title="Save to wishlist" data-fav="${p.sku}" aria-label="Save to wishlist" aria-pressed="false">♡</button>
<a class="card-link" href="${u}"><span class="im">${rank?`<span class="rk">${i+1}</span>`:''}${img(p)}${p.onlyAt?onlyAtBadge():''}</span>
<span class="bd">${label(p)}</span><span class="nm">${p.name.toLowerCase()}</span>
<span class="pr">${off?`<em>${off}%</em>`:''}${money(p.price)}${off?`<s>${money(p.compare)}</s>`:''}</span>
${reviewChip(p.sku)}
<span class="tg">${p.cats.includes('New')?'<span class="n">NEW</span>':''}${p.cats.includes('Treatments')?'<span class="p">Pro use</span>':''}<span>Same-day ship</span></span></a>
${buy}</div>`}
function chgQty(d){const e=$('qtyv');if(!e)return;e.textContent=Math.max(1,(+e.textContent||1)+d)}
function toast(t){const e=$('toast');if(!e)return;e.textContent=t;e.classList.add('s');setTimeout(()=>e.classList.remove('s'),1600)}
const rail=(id,a,rank)=>{const e=$(id);if(e)e.innerHTML=a.map((p,i)=>card(p,i,rank)).join('')};
const CAT={shop:null,skincare:'SkinCare',lido:'Lido Creams',devices:'Devices',treatments:'Treatments'};
let shopMetaDone=false;
window.renderCatalog=function(){
 const P=products();
 // category / shop pages
 if($('plist')){let base=CAT[PAGE]?inC(CAT[PAGE]):P.slice();const q=new URLSearchParams(location.search).get('q');const cat=new URLSearchParams(location.search).get('cat');
  if(cat){base=inC(cat);if(!shopMetaDone){shopMetaDone=true;const qi=$('qinfo');if(qi)qi.textContent=cat;const h1=document.querySelector('.ph h1');if(h1)h1.textContent=cat;const ey=document.querySelector('.pbn .ey');if(ey)ey.textContent='BLOOP · '+cat.toUpperCase();const crumb=document.querySelector('.crumb');if(crumb)crumb.innerHTML='<a href="index.html">Home</a> › '+cat;document.title=cat+' | Bloop Beauty Shop';const md=document.querySelector('meta[name="description"]');if(md)md.setAttribute('content','Shop '+cat+' at Bloop — K-beauty favorites with same-day shipping on orders before 3 PM CT.');const ogt=document.querySelector('meta[property="og:title"]');if(ogt)ogt.setAttribute('content',document.title);const canon=document.querySelector('link[rel="canonical"]');if(canon)canon.href='https://bloopifyhub.com/shop.html?cat='+encodeURIComponent(cat)}}
  if(q){base=base.filter(p=>p.name.toLowerCase().includes(q.toLowerCase()));const qi=$('qinfo');if(qi)qi.textContent=`Results for “${q}”`;document.title='Search: '+q+' | Bloop'}
  const sortEl=$('sort');const ps=new URLSearchParams(location.search).get('sort');if(ps&&sortEl)sortEl.value=ps;
  const draw=()=>{let a=base.slice();const s=sortEl?sortEl.value:'';if(s=='lo')a.sort((x,y)=>x.price-y.price);if(s=='hi')a.sort((x,y)=>y.price-x.price);if(s=='new')a.sort((x,y)=>y.cats.includes('New')-x.cats.includes('New'));
  if($('cnt'))$('cnt').textContent=a.length+' products';$('plist').innerHTML=a.map(p=>card(p)).join('')||'<p>No products found.</p>'};
  if(sortEl)sortEl.onchange=draw;draw()}
 // home
 if(PAGE=='home'){const sk=inC('SkinCare'),li=inC('Lido Creams'),dv=inC('Devices');
  if($('heroimgs'))$('heroimgs').innerHTML='<img class="hero-flyer" src="assets/img/hero-coming-soon.jpg?v=20261113e" alt="Bloop Coming Soon — GHK-Cu, PDRN, Copper Peptide serums">';
  const C=[['SkinCare','skincare.html',sk],['Lido Creams','lido-creams.html',li],['Devices','devices.html',dv],['Treatments','treatments.html',inC('Treatments')],['New','shop.html?sort=new',inC('New')],['Shop All','shop.html',inC('Best Sellers')]];
  if($('cats'))$('cats').innerHTML=C.map(([n,u,a],i)=>`<a class="cat" href="${u}"><div class="c">${a[i==5?3:0]?img(a[i==5?3:0]):''}</div>${n}</a>`).join('');
  rail('r-best',inC('Best Sellers').slice(0,10),true);rail('r-skin',sk);rail('r-lido',li);rail('r-dev',dv);rail('r-new',inC('New'));
  if(sk[1]&&$('bn1'))$('bn1').src=sk[1].img||sk[1].eimg;if(dv[1]&&$('bn2'))$('bn2').src=dv[1].img||dv[1].eimg}
 // product
 if(PAGE=='product'&&$('pd')){const id=new URLSearchParams(location.search).get('id');
  let p=id?P.find(x=>x.sku==id):null;
  if(!p&&!id)p=P[0];
  if(!p){
   if(id&&/^E\d+$/.test(id)&&!window.__ECWID_CATALOG_SYNCED)$('pd').innerHTML='<p class="muted">Loading product…</p>';
   else $('pd').innerHTML='<p class="muted">Product not found. <a href="shop.html">Browse shop</a></p>';
   return;
  }
  document.title=p.name+' — Bloop';
  const _img=p.img||p.eimg||'https://bloopifyhub.com/assets/img/hero-coming-soon.jpg';const _abs=/^https?:/.test(_img)?_img:('https://bloopifyhub.com/'+_img.replace(/^\//,''));
  const _desc='Shop '+p.name+' at Bloop. Same-day shipping on orders before 3 PM CT.';
  [['meta[name="description"]','content',_desc],['meta[property="og:title"]','content',document.title],['meta[property="og:description"]','content',_desc],['meta[property="og:image"]','content',_abs],['meta[name="twitter:title"]','content',document.title],['meta[name="twitter:description"]','content',_desc],['meta[name="twitter:image"]','content',_abs],['link[rel="canonical"]','href','https://bloopifyhub.com/product.html?id='+encodeURIComponent(p.sku)]].forEach(([sel,attr,val])=>{const el=document.querySelector(sel);if(el)el.setAttribute(attr,val)});
  const c=label(p),u={'Lido Cream':'lido-creams.html','SkinCare':'skincare.html','Devices':'devices.html','Treatments':'treatments.html'}[c]||'shop.html';
  const off=p.compare?Math.round((1-p.price/p.compare)*100):0;
  const qtyKeep=$('qtyv')?$('qtyv').textContent:'1';
  window.__optKeep=captureOpts();
  const optHtml=optionFields(p.sku);
  const canAdd=optionsSatisfied(p.sku);
  $('pd').innerHTML=`<div class="crumb" style="grid-column:1/-1;margin:0"><a href="index.html">Home</a> › <a href="${u}">${c}</a> › ${p.name.toLowerCase()}</div><div class="gal"><div class="imframe">${p.onlyAt?onlyAtBadge():''}<div class="im" id="pim" style="aspect-ratio:1">${img(p)}</div></div><div class="thumbs" id="pthumbs"></div></div><div><div class="bd">${c} · SKU ${p.sku}</div><h1>${p.name.toLowerCase()}</h1><div class="pr" id="pprice" data-base="${p.price}">${off?`<em>${off}%</em>`:''}<span id="ppricev">${money(p.price)}</span>${off?`<s>${money(p.compare)}</s>`:''}</div>
 ${reviewSummary(p.sku)}
 <div class="tg" style="margin-top:12px">${p.cats.includes('New')?'<span class="n">NEW</span>':''}${p.cats.includes('Treatments')?'<span class="p">Professional use</span>':''}<span class="stk" data-sku="${p.sku}">Checking stock…</span></div>
 ${optHtml}
 <div class="qty"><div class="q"><button type="button" aria-label="Decrease quantity" onclick="chgQty(-1)">−</button><span id="qtyv" style="width:26px;text-align:center">${qtyKeep||1}</span><button type="button" aria-label="Increase quantity" onclick="chgQty(1)">+</button></div><button type="button" class="btn" data-sku="${esc(p.sku)}"${canAdd?'':' disabled'} onclick="add('${jsStr(p.sku)}',+($('qtyv').textContent)||1)">Add to bag</button></div>
 <div class="pdesc" id="pdesc"><p class="muted">Loading description…</p></div><ul><li><b>Shipping</b>Same-day shipping on orders before 3 PM CT</li><li><b>Category</b>${p.cats.join(' · ')}</li><li><b>Use</b>${c=='Lido Cream'?'External use only. Follow label directions. For trained beauty professionals.':c=='Treatments'?'Professional-use item for trained, qualified professionals.':'Cosmetic use. Follow label directions.'}</li><li><b>Questions</b>+1-815-505-4387 · bloop.store25@gmail.com</li></ul></div>${reviewSection(p.sku)}`;
  refreshOptPrice();
  rail('r-rel',P.filter(x=>x.sku!=p.sku&&label(x)==c).slice(0,8))}
};
window.renderCatalog();
// Publish the fixed bottom bar's height so the chat launcher can clear it.
function syncChatLauncherOffset(){
  const root=document.documentElement;
  const mobile=window.matchMedia('(max-width:900px)').matches;
  const tb=document.querySelector('.tb');
  let h=0;
  if(mobile&&tb){const r=tb.getBoundingClientRect();if(r.height>0)h=Math.round(r.height)}
  root.style.setProperty('--bloop-nav-h',(h||(mobile?60:0))+'px');
  const launcher=document.querySelector('.chatway--trigger-container')||document.getElementById('chatra');
  if(launcher){const lr=launcher.getBoundingClientRect();if(lr.height>0)root.style.setProperty('--bloop-launcher-h',Math.round(lr.height)+'px')}
}
syncChatLauncherOffset();
window.addEventListener('resize',syncChatLauncherOffset);
if(window.ResizeObserver){const tb=document.querySelector('.tb');if(tb)new ResizeObserver(syncChatLauncherOffset).observe(tb)}
// Chatway/Chatra inject after Ecwid. Poll briefly instead of watching the whole DOM.
let chatTries=0;
const chatPoll=setInterval(()=>{
  chatTries++;
  const launcher=document.querySelector('.chatway--trigger-container')||document.getElementById('chatra');
  if(launcher&&launcher.getBoundingClientRect().height>0){syncChatLauncherOffset();clearInterval(chatPoll);return}
  if(chatTries>40)clearInterval(chatPoll);
},300);
