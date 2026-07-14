/* EBP core interactions */
(function(){
  // Header scroll
  const header=document.querySelector('.site-header');
  const bar=document.querySelector('.scroll-bar');
  let last=0;
  const onScroll=()=>{
    const y=window.scrollY;
    if(header){
      header.classList.toggle('scrolled',y>40);
      header.classList.toggle('hide',y>last&&y>400);
    }
    last=y;
    if(bar){const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(y/h*100)+'%';}
  };
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  // Mobile nav
  const burger=document.querySelector('.burger');
  const mnav=document.querySelector('.mnav');
  if(burger&&mnav){
    burger.addEventListener('click',()=>{
      const open=mnav.classList.toggle('open');
      burger.classList.toggle('open',open);
      document.body.style.overflow=open?'hidden':'';
    });
    mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      mnav.classList.remove('open');burger.classList.remove('open');document.body.style.overflow='';
    }));
  }

  // Reveal on scroll
  const io=new IntersectionObserver((es)=>{
    es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));

  // Counters
  const cio=new IntersectionObserver((es)=>{
    es.forEach(e=>{
      if(!e.isIntersecting)return;
      const el=e.target,to=parseFloat(el.dataset.count),dec=(el.dataset.dec|0),suf=el.dataset.suffix||'';
      let s=null,dur=1600;
      const tick=(t)=>{if(!s)s=t;const p=Math.min((t-s)/dur,1);const v=(1-Math.pow(1-p,3))*to;
        el.textContent=v.toFixed(dec)+suf;if(p<1)requestAnimationFrame(tick);};
      requestAnimationFrame(tick);cio.unobserve(el);
    });
  },{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));
})();
