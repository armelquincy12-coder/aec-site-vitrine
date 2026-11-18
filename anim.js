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
  /* 2. chiffres qui comptent */
  var facts=document.querySelectorAll('.hero-facts strong');
  facts.forEach(function(el){var end=parseInt(el.textContent,10);if(isNaN(end))return;el.dataset.end=end;
    var run=function(){var s=null,dur=1400,from=end>100?end-60:0;(function step(ts){if(!s)s=ts;var p=Math.min((ts-s)/dur,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(from+(end-from)*e);if(p<1)requestAnimationFrame(step);})(performance.now());};
    setTimeout(run,700);});
  /* cartes : apparition décalée */
  document.querySelectorAll('.sp-track,.cn-gallery,.cn-offers,.ar-fiches,.ba-grid').forEach(function(g){Array.prototype.forEach.call(g.children,function(c,i){c.style.transitionDelay=Math.min(i,5)*90+'ms';});});
})();
