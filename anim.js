/* Animations légères AEC — respecte « réduire les animations » */
(function(){
  var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* 6. barre pilule compacte au défilement */
  var nav=document.querySelector('.nav');
  if(nav){var t=false;window.addEventListener('scroll',function(){if(t)return;t=true;requestAnimationFrame(function(){nav.classList.toggle('nav-compact',window.scrollY>60);t=false;});},{passive:true});}
  if(rm)return;
  /* 3. titre d'accueil mot par mot */
  var h=document.querySelector('.hero-slider h1');
  if(h&&!h.dataset.split){h.dataset.split='1';var n=0;
    (function walk(node){Array.prototype.slice.call(node.childNodes).forEach(function(c){
      if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(w));return;}var s=document.createElement('span');s.className='wd';s.style.animationDelay=(0.15+n*0.11)+'s';s.textContent=w;n++;f.appendChild(s);});c.parentNode.replaceChild(f,c);}
      else if(c.nodeType===1&&c.tagName!=='BR')walk(c);});})(h);}
  /* 2. chiffres qui comptent : se lancent quand les repères deviennent visibles (ordinateur et mobile) */
  var facts=document.querySelectorAll('.hero-facts strong');
  var tiles=document.querySelectorAll('.hero-facts div');
  var count=function(el){var end=parseInt(el.dataset.end,10),from=end>100?end-60:0,s=null,dur=1400;
    (function step(ts){if(!s)s=ts;var p=Math.min((ts-s)/dur,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(from+(end-from)*e);if(p<1)requestAnimationFrame(step);else el.textContent=end;})(performance.now());};
  facts.forEach(function(el){var end=parseInt(el.textContent,10);if(isNaN(end))return;el.dataset.end=end;el.textContent=end>100?end-60:0;});
  tiles.forEach(function(t,i){t.classList.add('hf-pre');t.style.transitionDelay=(i*140)+'ms';});
  var box=document.querySelector('.hero-facts');
  var start=function(){tiles.forEach(function(t){t.classList.add('hf-in');});facts.forEach(function(el,i){if(el.dataset.end)setTimeout(function(){count(el);},300+i*140);});};
  if(box&&'IntersectionObserver' in window){var seen=false;var fo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!seen){seen=true;fo.disconnect();start();}});},{threshold:.35});fo.observe(box);}
  else{start();}
  /* cartes : apparition décalée */
  document.querySelectorAll('.sp-track,.cn-gallery,.cn-offers,.ar-fiches,.ba-grid').forEach(function(g){Array.prototype.forEach.call(g.children,function(c,i){c.style.transitionDelay=Math.min(i,5)*90+'ms';});});
})();

/* glissement de la droite vers la gauche (étapes de méthode) */
(function(){
  var groups=document.querySelectorAll('[data-slide-left]');
  if(!groups.length)return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!('IntersectionObserver' in window))return;
  groups.forEach(function(g){Array.prototype.forEach.call(g.children,function(c,i){c.classList.add('sl-item');c.style.transitionDelay=(i*140)+'ms';});});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('sl-in');io.unobserve(e.target);}});},{threshold:.25});
  groups.forEach(function(g){io.observe(g);});
})();
