const P=window.PRODUCTS,$=id=>document.getElementById(id);
const PAGE=document.body.dataset.page||'home';
const NAV=[['index.html','Home','home'],['shop.html','Shop All','shop'],['skincare.html','SkinCare','skincare'],['lido-creams.html','Lido Creams','lido'],['devices.html','Devices','devices'],['treatments.html','Treatments','treatments'],['about.html','About','about'],['contact.html','Contact','contact']];
const SHIP='Same-day shipping on orders before 3 PM CT';
const ic={u:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></svg>',h:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 6-8 11-8 11z"/></svg>',b:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11l9-7 9 7v9H3z"/></svg>',m:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'};
const bagN=()=>+(localStorage.bloopBag||0);
document.body.insertAdjacentHTML('afterbegin',`<div class="promo">🚚 <b>${SHIP}</b></div>
<header><div class="w hd"><a class="logo" href="index.html"><img src="assets/img/bloop-logo-charcoal.svg" alt="bloop" onerror="this.src='assets/img/bloop-logo-600.png'"></a>
<form class="sr" action="shop.html"><svg width="18" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input name="q" placeholder="Search skincare, Lido Creams, devices…" style="border:0;background:none;outline:0;font:inherit;flex:1"></form>
<div class="ac"><a class="t" id="acct" href="cart.html#!/~/account">${ic.u}<span id="acctl">Sign in</span></a><a class="t" href="cart.html#!/~/favorites">${ic.h}Wishlist</a><a href="cart.html" aria-label="Bag">${ic.b}<span class="cnt" id="bag">${bagN()}</span></a></div></div>
<nav><div class="w">${NAV.map(n=>`<a class="${n[2]==PAGE?'on':''}" href="${n[0]}">${n[1]}</a>`).join('')}<a class="r">Mon–Fri 9–5 CT · Sat 9–12</a></div></nav></header>`);
document.body.insertAdjacentHTML('beforeend',`<div class="trust w" style="margin-top:70px"><div><span class="ti">🚚</span><span><b>Same-day shipping</b>On orders before 3 PM CT</span></div><div><span class="ti">🇰🇷</span><span><b>K-beauty favorites</b>Curated catalog</span></div><div><span class="ti">🔒</span><span><b>Secure checkout</b>Safe card payments</span></div><div><span class="ti">💬</span><span><b>Real people</b>Call or email us</span></div></div>
<footer><div class="w"><div class="fc"><div><a class="logo" href="index.html"><img src="assets/img/bloop-logo-charcoal.svg" alt="bloop" onerror="this.src='assets/img/bloop-logo-600.png'"></a><p style="margin-top:10px;line-height:1.7">bloopifyhub.com — your K-beauty shop for skincare, devices, Lido Creams and pro treatments.</p></div>
<div><h5>Shop</h5><ul>${NAV.slice(1,6).map(n=>`<li><a href="${n[0]}">${n[1]}</a></li>`).join('')}</ul></div><div><h5>Bloop</h5><ul><li><a href="about.html">About</a></li><li><a href="contact.html">Contact</a></li><li><a href="shipping.html">Shipping &amp; payment</a></li><li><a href="returns.html">Returns</a></li><li><a href="terms.html">Terms &amp; conditions</a></li><li><a href="privacy.html">Privacy policy</a></li></ul></div>
<div><h5>Contact</h5><ul><li>Chicago, IL</li><li>Mon–Fri 9 AM–5 PM CT</li><li>Sat 9 AM–12 PM CT</li><li><a href="tel:+18155054387">+1-815-505-4387</a></li><li><a href="mailto:bloop.store25@gmail.com">bloop.store25@gmail.com</a></li></ul></div></div>
<div class="lg">Products are sold for cosmetic and professional beauty use. Statements are not intended to diagnose, treat, cure or prevent any disease. Topical creams: external use only, follow label directions. Treatments and professional items are intended for trained professionals. Orders placed before 3 PM CT Mon–Fri ship the same day. © 2026 Bloop</div></div></footer>
<div class="tb"><a href="index.html"><span>${ic.home}Home</span></a><a href="shop.html"><span>${ic.m}Shop</span></a><a href="cart.html#!/~/favorites"><span>${ic.h}Wishlist</span></a><a href="cart.html#!/~/account"><span>${ic.u}Account</span></a><a href="cart.html"><span>${ic.b}Bag</span></a></div><div class="toast" id="toast"></div>`);
const inC=c=>P.filter(p=>p.cats.includes(c));
const label=p=>p.cats.includes('Lido Creams')?'Lido Cream':p.cats.filter(c=>c!='Best Sellers'&&c!='New')[0]||'Bloop';
const img=p=>(p.img||p.eimg)?`<img src="${p.img||p.eimg}" alt="${p.name}" loading="lazy"${p.img&&p.eimg?` onerror="this.onerror=null;this.src='${p.eimg}'"`:''}>`:`<div style="width:40%;height:55%;background:#fff;border-radius:10px"></div>`;
const money=n=>'$'+n.toFixed(2);
function card(p,i,rank){const off=p.compare?Math.round((1-p.price/p.compare)*100):0;const u='product.html?id='+p.sku;
return `<div class="card"><a class="hrt" style="top:10px;z-index:2" title="Save to wishlist" data-fav="${p.sku}" href="${u}" onclick="event.stopPropagation()">♡</a>
<a class="card-link" href="${u}"><span class="im">${rank?`<span class="rk">${i+1}</span>`:''}${img(p)}</span>
<span class="bd">${label(p)}</span><span class="nm">${p.name.toLowerCase()}</span>
<span class="pr">${off?`<em>${off}%</em>`:''}${money(p.price)}${off?`<s>${money(p.compare)}</s>`:''}</span>
<span class="tg">${p.cats.includes('New')?'<span class="n">NEW</span>':''}${p.cats.includes('Treatments')?'<span class="p">Pro use</span>':''}<span>Same-day ship</span></span></a>
<button type="button" class="addb" data-sku="${p.sku}" onclick="event.stopPropagation();add('${p.sku}')">Add to bag</button></div>`}
function chgQty(d){const e=$('qtyv');if(!e)return;e.textContent=Math.max(1,(+e.textContent||1)+d)}
function toast(t){const e=$('toast');e.textContent=t;e.classList.add('s');setTimeout(()=>e.classList.remove('s'),1600)}
const rail=(id,a,rank)=>{const e=$(id);if(e)e.innerHTML=a.map((p,i)=>card(p,i,rank)).join('')};
// category / shop pages
const CAT={shop:null,skincare:'SkinCare',lido:'Lido Creams',devices:'Devices',treatments:'Treatments'};
if($('plist')){let base=CAT[PAGE]?inC(CAT[PAGE]):P.slice();const q=new URLSearchParams(location.search).get('q');const cat=new URLSearchParams(location.search).get('cat');
 if(cat){base=inC(cat);const qi=$('qinfo');if(qi)qi.textContent=cat}
 if(q){base=base.filter(p=>p.name.toLowerCase().includes(q.toLowerCase()));$('qinfo').textContent=`Results for “${q}”`}
 const ps=new URLSearchParams(location.search).get('sort');if(ps)$('sort').value=ps;const draw=()=>{let a=base.slice();const s=$('sort').value;if(s=='lo')a.sort((x,y)=>x.price-y.price);if(s=='hi')a.sort((x,y)=>y.price-x.price);if(s=='new')a.sort((x,y)=>y.cats.includes('New')-x.cats.includes('New'));
 $('cnt').textContent=a.length+' products';$('plist').innerHTML=a.map(p=>card(p)).join('')||'<p>No products found.</p>'};$('sort').onchange=draw;draw()}
// home
if(PAGE=='home'){const sk=inC('SkinCare'),li=inC('Lido Creams'),dv=inC('Devices');
 $('heroimgs').innerHTML=[sk[0],li[0],dv[0],sk[3]].filter(Boolean).map(img).join('');
 const C=[['SkinCare','skincare.html',sk],['Lido Creams','lido-creams.html',li],['Devices','devices.html',dv],['Treatments','treatments.html',inC('Treatments')],['New','shop.html?sort=new',inC('New')],['Shop All','shop.html',inC('Best Sellers')]];
 $('cats').innerHTML=C.map(([n,u,a],i)=>`<a class="cat" href="${u}"><div class="c">${a[i==5?3:0]?img(a[i==5?3:0]):''}</div>${n}</a>`).join('');
 rail('r-best',inC('Best Sellers').slice(0,10),true);rail('r-skin',sk);rail('r-lido',li);rail('r-dev',dv);rail('r-new',inC('New'));
 if(sk[1])$('bn1').src=sk[1].img||sk[1].eimg;if(dv[1])$('bn2').src=dv[1].img||dv[1].eimg}
// product
if(PAGE=='product'){const p=P.find(x=>x.sku==new URLSearchParams(location.search).get('id'))||P[0];document.title=p.name+' — Bloop';
 const c=label(p),u={'Lido Cream':'lido-creams.html','SkinCare':'skincare.html','Devices':'devices.html','Treatments':'treatments.html'}[c]||'shop.html';
 const off=p.compare?Math.round((1-p.price/p.compare)*100):0;
 $('pd').innerHTML=`<div class="crumb" style="grid-column:1/-1;margin:0"><a href="index.html">Home</a> › <a href="${u}">${c}</a> › ${p.name.toLowerCase()}</div><div class="gal"><div class="im" id="pim" style="aspect-ratio:1">${img(p)}</div><div class="thumbs" id="pthumbs"></div></div><div><div class="bd">${c} · SKU ${p.sku}</div><h1>${p.name.toLowerCase()}</h1><div class="pr">${off?`<em>${off}%</em>`:''}${money(p.price)}${off?`<s>${money(p.compare)}</s>`:''}</div>
 <div class="tg" style="margin-top:12px">${p.cats.includes('New')?'<span class="n">NEW</span>':''}${p.cats.includes('Treatments')?'<span class="p">Professional use</span>':''}<span class="stk" data-sku="${p.sku}">Checking stock…</span></div>
 <div class="qty"><div class="q"><button type="button" aria-label="Decrease quantity" onclick="chgQty(-1)">−</button><span id="qtyv" style="width:26px;text-align:center">1</span><button type="button" aria-label="Increase quantity" onclick="chgQty(1)">+</button></div><button class="btn" data-sku="${p.sku}" onclick="add('${p.sku}',+($('qtyv').textContent)||1)">Add to bag</button></div>
 <div class="pdesc" id="pdesc"><p class="muted">Loading description…</p></div><ul><li><b>Shipping</b>Same-day shipping on orders before 3 PM CT</li><li><b>Category</b>${p.cats.join(' · ')}</li><li><b>Use</b>${c=='Lido Cream'?'External use only. Follow label directions. For trained beauty professionals.':c=='Treatments'?'Professional-use item for trained, qualified professionals.':'Cosmetic use. Follow label directions.'}</li><li><b>Questions</b>+1-815-505-4387 · bloop.store25@gmail.com</li></ul></div>`;
 rail('r-rel',P.filter(x=>x.sku!=p.sku&&label(x)==c).slice(0,8))}
