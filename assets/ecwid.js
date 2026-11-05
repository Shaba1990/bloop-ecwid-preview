// Real Ecwid cart (store 138742751). Replaces the old localStorage demo bag.
(function(){
var SID=138742751;window.ecwid_script_defer=true;window.ecwid_dynamic_widgets=true;
var s=document.createElement('script');s.src='https://app.ecwid.com/script.js?'+SID+'&data_platform=code&data_date=2026-11-04';s.charset='utf-8';
s.onload=function(){window.Ecwid&&Ecwid.init&&Ecwid.init();if(document.getElementById('my-store-'+SID)&&window.xProductBrowser){xProductBrowser('categoriesPerRow=3','views=grid(20,3) list(60) table(60)','categoryView=grid','searchView=list','id=my-store-'+SID);}};
document.head.appendChild(s);
function setBag(n){var e=document.getElementById('bag');if(e)e.textContent=n;}
function ready(){return window.Ecwid&&Ecwid.Cart&&Ecwid.Cart.addProduct;}
window.bagN=function(){return 0};setBag(0);
var poll=setInterval(function(){if(!window.Ecwid||!Ecwid.OnAPILoaded)return;clearInterval(poll);
 Ecwid.OnAPILoaded.add(function(){Ecwid.Cart.get(function(c){setBag(c.productsQuantity)});
  Ecwid.OnCartChanged.add(function(c){setBag(c.productsQuantity)});
  // Account label: "Account" when an Ecwid customer is signed in
  function acct(){Ecwid.Customer.get(function(cu){var l=document.getElementById('acctl');if(l)l.textContent=cu?'Account':'Sign in'})}
  acct();if(Ecwid.OnSetProfile)Ecwid.OnSetProfile.add(acct);
  Ecwid.OnPageLoaded.add(function(pg){acct();var t=document.getElementById('crumbt');if(!t)return;
   var n={ACCOUNT:'My account',ACCOUNT_SETTINGS:'My account',ORDERS:'My orders',FAVORITES:'Wishlist',SIGN_IN:'Sign in',RESET_PASSWORD:'Sign in',PRODUCT:'Product',CART:'Bag & checkout'}[pg.type];
   if(n)t.textContent=n;});
  if(document.body.dataset.page==='cart'&&!location.hash)Ecwid.openPage('cart');});},200);
window.add=function(sku,qty){var m=(window.ECWID_MAP||{})[sku];qty=Math.max(1,parseInt(qty)||1);
 if(!m){toast('This item is not in the online store yet — call us to order');return;}
 if(SOLD[m.id]){toast('Sorry, this item is sold out');return;}
 if(m.opts){location.href='cart.html#!/~/product/id='+m.id;return;} // needs size/option choice
 if(!ready()){toast('Cart is loading — try again in a second');return;}
 Ecwid.Cart.addProduct({id:m.id,quantity:qty,callback:function(ok){toast(ok?'Added to bag':'Could not add — please try again')}});};
// Live stock from Ecwid's public storefront catalog (fetched on every page load).
var MEDIA={},DESC={},SOLD={},API='https://us-vir2-storefront-api.ecwid.com/storefront/api/v1/'+SID+'/catalog';
var CATS=[0,204683856,204683857,204686094,204683858,203054753,203054755,209002026];
function q(id){return fetch(API,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({lang:'en',categoryViewMode:'COLLAPSED',parentCategoryId:id,pagination:{offset:0,limit:100},urlParams:{urlType:'CLEAN_URL',baseUrl:'/products',isCleanUrls:true}})}).then(function(r){return r.json()})}
function paint(){var M=window.ECWID_MAP||{};
 document.querySelectorAll('[data-sku]').forEach(function(el){var m=M[el.dataset.sku];if(!m)return;var out=!!SOLD[m.id];
  if(el.classList.contains('stk')){var t=out?'Sold out':'In stock';if(el.textContent!==t)el.textContent=t;el.style.cssText=out?'background:#eee;color:#888':'';}
  else{el.disabled=out;var t2=out?'Sold out':'Add to bag';if(el.textContent!==t2)el.textContent=t2;el.style.opacity=out?'.5':'';el.style.cursor=out?'not-allowed':'';}});}
Promise.all(CATS.map(q)).then(function(rs){rs.forEach(function(d){['expandedCategories','collapsedCategories'].forEach(function(k){(d[k]||[]).forEach(function(c){(c.products||[]).forEach(function(p){SOLD[p.identifier.productId]=!!(p.flags&&p.flags.isAllVariationsSoldOut);DESC[p.identifier.productId]=p.description||'';MEDIA[p.identifier.productId]=((p.defaultOptionsOverrides||{}).variationOverrides||{}).mediaItems||[]})})})});paint();showDesc();showGallery();})
 .catch(function(){showDesc();document.querySelectorAll('.stk').forEach(function(el){el.textContent='Same-day ship'})});
// Live product description (HTML from Ecwid, sanitized to basic formatting).
var OK={P:1,BR:1,B:1,STRONG:1,I:1,EM:1,U:1,UL:1,OL:1,LI:1,H2:1,H3:1,H4:1,A:1,SPAN:1,DIV:1};
function clean(html){var doc=new DOMParser().parseFromString(html,'text/html');
 (function walk(n){[].slice.call(n.childNodes).forEach(function(c){if(c.nodeType===3)return;if(c.nodeType!==1){c.remove();return;}
  walk(c);var t=c.tagName;if(!OK[t]){if(/^(SCRIPT|STYLE|IFRAME|OBJECT|EMBED|FORM|INPUT|BUTTON|SVG|MATH|LINK|META|IMG|VIDEO|AUDIO)$/.test(t))c.remove();else c.replaceWith.apply(c,[].slice.call(c.childNodes));return;}
  var h=t==='A'?c.getAttribute('href'):null;[].slice.call(c.attributes).forEach(function(a){c.removeAttribute(a.name)});
  if(h&&/^(https?:|mailto:|tel:)/i.test(h.trim())){c.setAttribute('href',h);c.setAttribute('target','_blank');c.setAttribute('rel','noopener nofollow')}});})(doc.body);
 return doc.body.innerHTML.trim();}
function showDesc(){var box=document.getElementById('pdesc');if(!box)return;var sku=(new URLSearchParams(location.search).get('id'))||((window.PRODUCTS||[])[0]||{}).sku;
 var m=(window.ECWID_MAP||{})[sku],h=m&&DESC[m.id]?clean(DESC[m.id]):'';
 box.innerHTML=h.replace(/<[^>]+>|&nbsp;|\s/g,'')?h:'<p class="muted">Product details coming soon. Questions? Call +1-815-505-4387 or email bloop.store25@gmail.com.</p>';}
// Live gallery: every Ecwid media picture, main first; thumbs swap the main image.
function showGallery(){var main=document.getElementById('pim'),th=document.getElementById('pthumbs');if(!main||!th)return;
 var sku=(new URLSearchParams(location.search).get('id'))||((window.PRODUCTS||[])[0]||{}).sku,m=(window.ECWID_MAP||{})[sku];
 var it=(m&&MEDIA[m.id]||[]).filter(function(x){return x.type==='PICTURE'&&(x.image800pxUrl||x.image400pxUrl)});
 if(!it.length)return; it.sort(function(a,b){return (b.isMain?1:0)-(a.isMain?1:0)});
 var alt=(document.querySelector('.pd h1')||{}).textContent||'';
 function set(i){var x=it[i];main.innerHTML='<img src="'+(x.image1500pxUrl||x.image800pxUrl||x.image400pxUrl)+'" alt="'+alt.replace(/"/g,'&quot;')+'">';
  [].forEach.call(th.children,function(b,j){b.classList.toggle('on',j===i)});}
 th.innerHTML=it.length>1?it.map(function(x,i){return '<button type="button" aria-label="Image '+(i+1)+'"><img src="'+(x.image160pxUrl||x.image400pxUrl)+'" alt="" loading="lazy"></button>'}).join(''):'';
 [].forEach.call(th.children,function(b,i){b.onclick=function(){set(i)}});set(0);}
// Live legal pages (Returns, Terms, Privacy, Shipping) from Ecwid's storefront API.
(function(){var box=document.getElementById('legal');if(!box)return;
 fetch('https://us-vir2-storefront-api.ecwid.com/storefront/api/v1/'+SID+'/legal-page',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({lang:'en',type:box.dataset.type})})
 .then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){var h=clean(d.text||'');if(!h.replace(/<[^>]+>|&nbsp;|\s/g,''))throw 0;
  if(d.title){document.getElementById('ltitle').textContent=d.title;document.title=d.title+' — Bloop';}box.innerHTML=h;})
 .catch(function(){box.innerHTML='<p class="muted">This policy could not be loaded right now. Please refresh, or contact us at +1-815-505-4387 or bloop.store25@gmail.com.</p>'});})();
// Empty-cart "Browse Store" / "Continue shopping" → our Shop All, not Ecwid's catalog.
(function(){
  function isBrowse(el){if(!el||!el.closest)return null;var b=el.closest('button,.form-control__button,a,[role=button]');if(!b)return null;var t=(b.innerText||b.textContent||'').replace(/\s+/g,' ').trim();return /^(browse store|continue shopping)$/i.test(t)?b:null}
  document.addEventListener('click',function(ev){var b=isBrowse(ev.target);if(!b)return;ev.preventDefault();ev.stopPropagation();if(ev.stopImmediatePropagation)ev.stopImmediatePropagation();location.href='shop.html'},true);
  function inject(){var wrap=document.querySelector('.ec-cart--empty .ec-cart__button');if(!wrap||wrap.dataset.bloopShop)return;wrap.dataset.bloopShop='1';
    wrap.querySelectorAll('button,.form-control').forEach(function(n){n.style.display='none'});
    var a=document.createElement('a');a.href='shop.html';a.className='btn bloop-browse';a.textContent='Browse Store';a.style.cssText='display:inline-flex;align-items:center;justify-content:center;padding:12px 28px;border-radius:26px;background:var(--ink,#111);color:#fff;text-decoration:none;font:600 14px/1 inherit';
    wrap.appendChild(a);}
  var mo=new MutationObserver(inject);mo.observe(document.body,{childList:true,subtree:true});
  if(window.Ecwid&&Ecwid.OnPageLoaded)Ecwid.OnPageLoaded.add(function(){setTimeout(inject,50)});
  // If Ecwid still opens its category home from an empty-cart browse, bounce to Shop All
  if(window.Ecwid&&Ecwid.OnPageLoaded)Ecwid.OnPageLoaded.add(function(pg){if(!pg)return;if((pg.type==='CATEGORY'||pg.type==='CATEGORIES')&&/cart\.html/i.test(location.pathname||'')&&!(location.hash||'').match(/product|checkout|account|favorites|order/i)){location.replace('shop.html')}});
})();
// Wishlist hearts: toggle Ecwid favorites (cookie/localStorage PSecwid__{store}PSfavorites).
var FAV_KEY='PSecwid__'+SID+'PSfavorites',FAV_EXP=FAV_KEY+'_expire';
function favRead(){
  var raw=null;
  try{raw=localStorage.getItem(FAV_KEY)}catch(e){}
  if(!raw){try{var m=document.cookie.match(new RegExp('(?:^|; )'+FAV_KEY.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'=([^;]*)'));if(m)raw=decodeURIComponent(m[1])}catch(e){}}
  if(!raw)return [];
  try{var v=JSON.parse(raw);if(Array.isArray(v))return v.map(Number).filter(Boolean);
    if(v&&typeof v==='object'){var a=v.ids||v.productIds||v.favorites||v.items;if(Array.isArray(a))return a.map(function(x){return Number(x&&x.id||x)}).filter(Boolean)}}
  catch(e){return String(raw).split(/[,\s]+/).map(Number).filter(Boolean)}
  return [];
}
function favWrite(ids){
  var val=JSON.stringify(ids),exp=Date.now()+365*24*3600*1000,maxAge=365*24*3600;
  try{localStorage.setItem(FAV_KEY,val);localStorage.setItem(FAV_EXP,String(exp))}catch(e){}
  document.cookie=FAV_KEY+'='+encodeURIComponent(val)+';path=/;max-age='+maxAge+';SameSite=Lax';
  document.cookie=FAV_EXP+'='+encodeURIComponent(String(exp))+';path=/;max-age='+maxAge+';SameSite=Lax';
}
function favPaint(){
  var set={};favRead().forEach(function(id){set[id]=1});
  var M=window.ECWID_MAP||{};
  document.querySelectorAll('[data-fav]').forEach(function(a){
    var m=M[a.dataset.fav],on=!!(m&&set[m.id]);
    a.classList.toggle('on',on);
    a.setAttribute('aria-pressed',on?'true':'false');
    a.title=on?'Remove from wishlist':'Save to wishlist';
    if(!a.querySelector('svg'))a.textContent=on?'♥':'♡';
  });
}
window.toggleFav=function(sku,el){
  var m=(window.ECWID_MAP||{})[sku];
  if(!m){toast('This item is not in the online store yet');return;}
  var ids=favRead(),i=ids.indexOf(m.id),adding=i<0;
  if(adding)ids.push(m.id);else ids.splice(i,1);
  favWrite(ids);favPaint();
  if(el){el.classList.toggle('on',adding);el.textContent=adding?'♥':'♡';el.setAttribute('aria-pressed',adding?'true':'false')}
  toast(adding?'Saved to wishlist':'Removed from wishlist');
  // Guests: after add, send to Ecwid favorites so sign-in / sync can happen
  if(adding){
    var go=function(cu){if(!cu)location.href='cart.html#!/~/favorites'};
    try{if(window.Ecwid&&Ecwid.Customer&&Ecwid.Customer.get)Ecwid.Customer.get(go);else go(null)}catch(e){go(null)}
  }
};
document.addEventListener('click',function(ev){
  var a=ev.target.closest&&ev.target.closest('[data-fav]');if(!a)return;
  ev.preventDefault();ev.stopPropagation();if(ev.stopImmediatePropagation)ev.stopImmediatePropagation();
  window.toggleFav(a.dataset.fav,a);
},true);
favPaint();
new MutationObserver(function(){favPaint()}).observe(document.documentElement,{childList:true,subtree:true});
// re-paint after any client-side re-render (e.g. sort change)
new MutationObserver(function(){if(Object.keys(SOLD).length)paint()}).observe(document.body,{childList:true,subtree:true});
})();

(function hideLightspeed(){
  function zap(){
    document.querySelectorAll('.ec-footer, .ec-store__footer, a[href*="lightspeedhq.com"], a[href*="www.ecwid.com"], a[href*="ecwid.com"]').forEach(function(el){
      var t=(el.textContent||'').toLowerCase();
      if(el.matches('.ec-footer, .ec-store__footer') || /powered|lightspeed|ecwid/.test(t)){
        var n=el.closest('.ec-footer, .ec-store__footer')||el;
        n.style.setProperty('display','none','important');
      }
    });
    document.querySelectorAll('div,a,span').forEach(function(el){
      if(el.childElementCount>2)return;
      var t=(el.textContent||'').trim().toLowerCase();
      if(t==='powered by lightspeed'||t==='powered by ecwid'||t==='made with ecwid by lightspeed'){
        el.style.setProperty('display','none','important');
      }
    });
  }
  zap();
  var mo=new MutationObserver(zap);
  if(document.body)mo.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',zap);
  setInterval(zap,1500);
})();

