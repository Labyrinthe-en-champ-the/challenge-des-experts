'use strict';
/* ============================================================
   APP.JS · Challenge des Experts · v4
   Labyrinthe En-Champ-Thé · Grand-Coude · La Réunion
   ============================================================ */

// ---- Tokens ----
const ACCESS_TOKEN     = 'ECT2025-GRANDCOUDE';
const CORRECTION_TOKEN = 'CORR-ECT-STAFF-2025';
const QR_TOKENS = {
  '7x9mK2pLqR':1,'Qr4nW8vZbT':2,'Hj2sY6cNwX':3,
  'Pf5tA3mKdL':4,'Zc8rV1nJyQ':5,'Wm3hB9sEkU':6,
  'Tn6xC4pGfI':7,'Lb7uD2wMrO':8,'Xk1vF8jHnS':9,
  'Gy4oE5cPtA':10,'Rf9iN3bQlW':11,'Vd2yM7kZeX':12,
  'Jn5pT1sRoC':13,'Uh8wK6mFqB':14,'Ec3bL9nGvY':15,
  'Aw6jP4hXiD':16,'Sq1mR7tNkF':17
};

// ---- Layout lettres ----
const LAYOUT = [
  {qid:1,char:'P',wi:0,pos:0},{qid:2,char:'A',wi:0,pos:1},
  {qid:3,char:'T',wi:0,pos:2},{qid:4,char:'R',wi:0,pos:3},
  {qid:5,char:'I',wi:0,pos:4},{qid:6,char:'M',wi:0,pos:5},
  {qid:7,char:'O',wi:0,pos:6},{qid:8,char:'I',wi:0,pos:7},
  {qid:9,char:'N',wi:0,pos:8},{qid:10,char:'E',wi:0,pos:9},
  {qid:11,char:'T',wi:1,pos:0},{qid:12,char:'E',wi:1,pos:1},
  {qid:13,char:'R',wi:1,pos:2},{qid:14,char:'R',wi:1,pos:3},
  {qid:15,char:'O',wi:1,pos:4},{qid:16,char:'I',wi:1,pos:5},
  {qid:17,char:'R',wi:1,pos:6}
];

// ---- Questions ----
const QUESTIONS = [
  {id:1,section:"Naissance du village",question:"Qui fut l'acteur principal de la culture du géranium à La Réunion ?",options:[{letter:"P",text:"MR Henri Boisjoli-Potier",correct:true},{letter:"B",text:"MR Charles Payet",correct:false}],anecdote:"Henri Boisjoli-Potier a introduit le géranium rosat à La Réunion depuis l'Algérie en 1887. L'huile essentielle de géranium réunionnais était surnommée 'l'or vert' de l'île et exportée pour parfumer les plus grands noms de la haute parfumerie française."},
  {id:2,section:"Transition Géranium / Thé",question:"Dans quelles régions furent entreprises les premières expérimentations du thé à La Réunion ?",options:[{letter:"C",text:"Plaines des Palmiste et Grand Coude",correct:false},{letter:"A",text:"Bagatelle et Menciole",correct:true}],anecdote:"Bagatelle et Menciole sont situées dans les hauts du Sud de La Réunion, à plus de 1000 mètres d'altitude. Ce climat frais et humide, très proche des grandes régions théicoles asiatiques, explique pourquoi ces sites furent choisis pour les premières expérimentations."},
  {id:3,section:"Début de l'aventure du Thé",question:"Quelle est la conclusion qui ressort après examen de l'expert national en 1957 ?",options:[{letter:"T",text:"Thé de qualité et potentiel d'avenir",correct:true},{letter:"G",text:"Grand rendement et facilité de culture",correct:false}],anecdote:"L'expert envoyé en 1957 était spécialisé dans les cultures tropicales. Son rapport enthousiaste allait déclencher un programme de développement agricole ambitieux avec des objectifs jamais atteints auparavant dans les DOM-TOM français."},
  {id:4,section:"Développement de l'aventure",question:"Quels étaient les objectifs de la Direction des Services Agricoles à plus long terme ?",options:[{letter:"R",text:"Mise en culture de 2 000 hectares",correct:true},{letter:"S",text:"Favoriser l'exportation",correct:false}],anecdote:"2 000 hectares de théiers auraient représenté une révolution agricole pour La Réunion. À titre de comparaison, les plus grandes plantations de thé en Europe n'atteignent pas ce chiffre aujourd'hui."},
  {id:5,section:"Développement (suite)",question:"En 1959, quels étaient les deux planteurs qui entreprirent la culture du thé sur le village de Grand-Coude ?",options:[{letter:"U",text:"Benoît Mondon et Harles Henri",correct:false},{letter:"I",text:"Charles Payet et Yves Mondon",correct:true}],anecdote:"Les familles Payet et Mondon sont encore aujourd'hui des noms bien connus à Grand-Coude. Leur pari sur le thé en 1959 était audacieux — ils misaient sur une culture quasi inconnue dans un village isolé à plus de 1 400 mètres d'altitude."},
  {id:6,section:"Commercialisation du thé",question:"Où était valorisé le thé de Bourbon en 1960 ?",options:[{letter:"Y",text:"La Réunion",correct:false},{letter:"M",text:"Londres",correct:true}],anecdote:"La Bourse du thé de Londres, fondée au XVIIe siècle, était le centre mondial du commerce du thé. Que le 'Thé de Bourbon' y soit coté dès 1960 est une reconnaissance extraordinaire pour une île française de l'océan Indien."},
  {id:7,section:"Restructuration à Grand Coude",question:"Quels sont les rendements des 27 planteurs de Grand-Coude ?",options:[{letter:"O",text:"5 tonnes/hectare",correct:true},{letter:"B",text:"6 tonnes/hectare",correct:false}],anecdote:"5 tonnes de feuilles fraîches par hectare est comparable aux plantations asiatiques. Pour obtenir 1 kg de thé sec, il faut environ 4 à 5 kg de feuilles fraîches. Les planteurs de Grand-Coude avaient maîtrisé leur culture en une dizaine d'années seulement."},
  {id:8,section:"Déclin et fin de l'aventure",question:"Quelle date signe la fin de l'aventure du thé de La Réunion par vote du Conseil Général ?",options:[{letter:"I",text:"Le 4 janvier 1972",correct:true},{letter:"R",text:"Le 1er janvier 1970",correct:false}],anecdote:"Le vote du 4 janvier 1972 fut un tournant dramatique pour les planteurs de Grand-Coude. Il faudra attendre 2005 pour que le thé renaisse à Grand-Coude, soit 33 ans plus tard."},
  {id:9,section:"Raisons de l'échec",question:"Quel est le coût de revient du thé de La Réunion en 1960 et 1970 ?",options:[{letter:"N",text:"3,82 francs en 1960 / 5,62 francs en 1970",correct:true},{letter:"C",text:"3,82 euros en 1960 / 5,62 euros en 1970",correct:false}],anecdote:"La France n'est passée à l'euro qu'en 2002. Le coût de production élevé du thé réunionnais s'expliquait principalement par le coût de la main-d'œuvre locale, bien supérieur à celui des pays asiatiques producteurs."},
  {id:10,section:"Le Thé dans le monde",question:"De quel pays provient la souche de thé présente à La Réunion, soit l'Assamica ?",options:[{letter:"A",text:"Chine",correct:false},{letter:"E",text:"Inde",correct:true}],anecdote:"L'Assam est un État du nord-est de l'Inde. La variété Assamica produit un thé robuste avec des notes maltées. C'est grâce à cette variété robuste que le thé a pu s'adapter au climat de La Réunion."},
  {id:11,section:"Le thé au naturel",question:"Les théiers présents dans le labyrinthe peuvent-ils atteindre combien de mètres ?",options:[{letter:"V",text:"10 à 12 mètres",correct:false},{letter:"T",text:"15 à 20 mètres",correct:true}],anecdote:"Dans les plantations commerciales, les théiers sont taillés à 1 mètre pour faciliter la cueillette. Livrés à eux-mêmes dans le labyrinthe d'En-Champ-Thé, les Assamica peuvent atteindre des hauteurs vertigineuses. Certains arbres ont plus de 50 ans !"},
  {id:12,section:"Le thé cultivé",question:"Au bout de combien d'années un théier devient-il productif ?",options:[{letter:"D",text:"2 à 3 ans",correct:false},{letter:"E",text:"4 à 5 ans",correct:true}],anecdote:"Un théier bien entretenu peut vivre et produire pendant plus de 100 ans. À En-Champ-Thé, certains théiers datent de la première période de culture des années 1960 — ils ont donc plus de 60 ans !"},
  {id:13,section:"Cueillir le thé",question:"Quelles sont les trois types de cueillettes existantes ?",options:[{letter:"R",text:"Impériale ; fine ; classique",correct:true},{letter:"W",text:"Royal ; fine ; basic",correct:false}],anecdote:"La cueillette impériale ne prélève que le tout premier bourgeon de la tige. En Chine ancienne, cette récolte était réservée exclusivement à l'Empereur. Aujourd'hui, les thés issus de cueillette impériale atteignent plusieurs milliers d'euros le kilo."},
  {id:14,section:"Les différentes sortes de thé",question:"Auparavant, quelle sorte de thé était produite par nos anciens ?",options:[{letter:"L",text:"Thé blanc et noir",correct:false},{letter:"R",text:"Thé noir",correct:true}],anecdote:"Le thé noir représente environ 75% de la production mondiale. Sa fabrication implique une étape de fermentation complète qui lui donne sa couleur sombre et ses arômes puissants. C'est ce type que produisaient les planteurs de Grand-Coude dans les années 1960."},
  {id:15,section:"La culture du Thé relancée",question:"Quelles surfaces occupent aujourd'hui les tables de récolte aménagées au labyrinthe ?",options:[{letter:"O",text:"5 hectares",correct:true},{letter:"I",text:"10 hectares",correct:false}],anecdote:"5 hectares de théiers représentent environ 7 terrains de football. La relance de 2005 a fait du Labyrinthe En-Champ-Thé le plus important producteur de thé français, titre qu'il détient encore aujourd'hui."},
  {id:16,section:"L'avenir de la culture",question:"En quelle année la culture du thé a-t-elle été reconnue comme 'plante aromatique et médicinale' ?",options:[{letter:"I",text:"2014",correct:true},{letter:"H",text:"2005",correct:false}],anecdote:"La classification du thé comme 'plante aromatique et médicinale' en 2014 a eu des conséquences concrètes sur la fiscalité et les aides agricoles. Elle a aussi permis de développer la gamme de thés médicinaux proposée à la boutique."},
  {id:17,section:"2022 : année des Médailles",question:"Comment se nomme l'agence qui récompense 'les thés du monde', dont on a été primé en 2022 ?",options:[{letter:"E",text:"CITM — Concours International des Thés du Monde",correct:false},{letter:"R",text:"AVPA — Agence pour la Valorisation des Productions Agricoles",correct:true}],anecdote:"L'AVPA est reconnue internationalement pour la rigueur de ses dégustations à l'aveugle. Être récompensé place le thé d'En-Champ-Thé parmi les meilleurs thés du monde, rivalisant avec les grands crus asiatiques et africains."}
];

// ---- State ----
const KEY = 'ect_v4';
let S = {answers:{}, unlocked:{}, started:false};
const save  = () => { try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){} };
const load  = () => { try{const r=localStorage.getItem(KEY);if(r)S={...S,...JSON.parse(r)};}catch(e){} };
const clear = () => { try{localStorage.removeItem(KEY);}catch(e){}; S={answers:{},unlocked:{},started:false}; };

const Q         = id => QUESTIONS.find(x=>x.id===id);
const answered  = id => S.answers[id]!==undefined;
const unlocked  = id => !!S.unlocked[id];
const correct   = id => { const q=Q(id); return q&&q.options.find(o=>o.correct)?.letter===S.answers[id]; };
const doneCount = () => Object.keys(S.answers).length;

// ---- Navigation ----
const show = id => {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const el=document.getElementById(id);
  if(el){el.classList.add('active');window.scrollTo(0,0);}
};

const resolveAccess = () => {
  const p=new URLSearchParams(window.location.search);
  const t=p.get('t'),a=p.get('access'),c=p.get('correction');
  if(c===CORRECTION_TOKEN) return {type:'correction'};
  if(a===ACCESS_TOKEN)     return {type:'welcome'};
  if(t&&QR_TOKENS[t])      return {type:'question',qid:QR_TOKENS[t]};
  return {type:'denied'};
};

// ---- Bandes de lettres ----
const buildBand = (container,wi) => {
  container.innerHTML='';
  LAYOUT.filter(l=>l.wi===wi).sort((a,b)=>a.pos-b.pos).forEach(l=>{
    const b=document.createElement('div');
    b.className='lbox'; b.dataset.qid=l.qid; b.dataset.ch=l.char;
    if(correct(l.qid)){b.textContent=l.char;b.classList.add('on');}
    container.appendChild(b);
  });
};
const refreshBands = () => {
  ['kw-row-0','strip-0'].forEach(id=>{const el=document.getElementById(id);if(el)buildBand(el,0);});
  ['kw-row-1','strip-1'].forEach(id=>{const el=document.getElementById(id);if(el)buildBand(el,1);});
};
const revealBand = qid => {
  document.querySelectorAll(`.lbox[data-qid="${qid}"]`).forEach(b=>{b.textContent=b.dataset.ch;b.classList.add('on');});
};

// ---- Grille ----
const buildGrid = () => {
  const grid=document.getElementById('grid');
  if(!grid)return; grid.innerHTML='';
  QUESTIONS.forEach(q=>{
    const card=document.createElement('button');
    card.className='qcard'; card.dataset.id=q.id;
    if(answered(q.id)){
      card.classList.add('qdone');
      card.innerHTML=`<span class="qnum">${String(q.id).padStart(2,'0')}</span><span class="qsect">${q.section}</span><span class="qcheck">✓</span>`;
      card.disabled=true;
    } else if(unlocked(q.id)){
      card.innerHTML=`<span class="qnum">${String(q.id).padStart(2,'0')}</span><span class="qsect">${q.section}</span>`;
      card.addEventListener('click',()=>openModal(q.id));
    } else {
      card.classList.add('qlocked');
      card.innerHTML=`<span class="qnum">${String(q.id).padStart(2,'0')}</span><span class="qsect">${q.section}</span><span class="qscan">Scannez la pancarte<br/>pour débloquer</span>`;
      card.disabled=true;
    }
    grid.appendChild(card);
  });
};

const updateProg = () => {
  const n=doneCount();
  const pt=document.getElementById('prog-text');
  const pf=document.getElementById('prog-fill');
  if(pt)pt.textContent=`${n} / 17`;
  if(pf)pf.style.width=`${Math.round(n/17*100)}%`;
};

const updateCard = qid => {
  const card=document.querySelector(`.qcard[data-id="${qid}"]`);
  if(!card)return;
  card.classList.remove('qlocked'); card.classList.add('qdone'); card.disabled=true;
  card.innerHTML=`<span class="qnum">${String(qid).padStart(2,'0')}</span><span class="qsect">${Q(qid).section}</span><span class="qcheck">✓</span>`;
};

// ---- Modal ----
let curQid=null, selLetter=null;

const openModal = qid => {
  const q=Q(qid); if(!q)return;
  curQid=qid; selLetter=null;

  // Numéro en filigrane + label
  const numStr = String(q.id).padStart(2,'0');
  document.getElementById('modal-num-bg').textContent  = numStr;
  document.getElementById('modal-num').textContent     = `Pancarte ${numStr}`;
  document.getElementById('modal-section').textContent = q.section;
  document.getElementById('modal-question').textContent = q.question;

  document.getElementById('modal-confirm').classList.add('hidden');

  // Options
  const opts=document.getElementById('modal-opts'); opts.innerHTML='';
  q.options.forEach(opt=>{
    const btn=document.createElement('button');
    btn.className='opt-btn'; btn.dataset.letter=opt.letter;
    btn.innerHTML=`<span class="opt-letter">${opt.letter}</span><span class="opt-sep">/</span><span class="opt-text">${opt.text}</span>`;
    btn.addEventListener('click',()=>selectOpt(btn,opt));
    opts.appendChild(btn);
  });

  document.getElementById('modal').classList.remove('hidden');
  setTimeout(()=>document.getElementById('btn-modal-close').focus(),80);
};

const selectOpt = (btn,opt) => {
  document.querySelectorAll('.opt-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  selLetter=opt.letter;
  document.getElementById('confirm-txt').innerHTML=`Vous avez choisi : <strong>${opt.letter} / ${opt.text}</strong>`;
  document.getElementById('modal-confirm').classList.remove('hidden');
};

const validateAnswer = () => {
  if(!selLetter||!curQid)return;
  S.answers[curQid]=selLetter; save();
  if(correct(curQid)) revealBand(curQid);
  updateCard(curQid); updateProg();
  closeModal();
};

const closeModal = () => {
  document.getElementById('modal').classList.add('hidden');
  curQid=null; selLetter=null;
};

const resetGame = () => {
  if(!confirm('Réinitialiser toute votre progression ?'))return;
  clear(); refreshBands(); buildGrid(); updateProg(); show('screen-welcome');
};

// ---- Résultats ----
const getMention = s => {
  if(s===17) return "Expert absolu du Labyrinthe En-Champ-Thé ! 🏅";
  if(s>=15)  return "Excellent ! Vous maîtrisez l'histoire du thé réunionnais.";
  if(s>=12)  return "Très bien ! Quelques secrets du labyrinthe vous ont résisté...";
  if(s>=8)   return "Bien ! Continuez pour découvrir tous les secrets.";
  return "Le labyrinthe garde encore bien ses secrets...";
};

const showResults = () => {
  let score=0;
  QUESTIONS.forEach(q=>{if(correct(q.id))score++;});
  document.getElementById('score-val').textContent=score;
  document.getElementById('score-mention').textContent=getMention(score);

  const list=document.getElementById('results-list'); list.innerHTML='';
  QUESTIONS.forEach(q=>{
    const given=S.answers[q.id];
    const co=q.options.find(o=>o.correct);
    const go=q.options.find(o=>o.letter===given);
    const isOk=given&&co?.letter===given;
    const skipped=!given;

    const item=document.createElement('div');
    item.className=`ritem ${skipped?'rskipped':isOk?'rcorrect':'rwrong'}`;
    item.innerHTML=`
      <div class="ritem-top">
        <span class="ritem-num">Pancarte ${String(q.id).padStart(2,'0')}</span>
        <span class="ritem-icon">${skipped?'⬜':isOk?'✅':'❌'}</span>
      </div>
      <div class="ritem-q">${q.question}</div>
      <div class="ritem-ans">
        <span class="rletter ${isOk||skipped?'':'bad'}">${skipped?'?':co.letter}</span>
        ${skipped?'<em style="color:rgba(255,255,255,.4)">Non répondue</em>':co.text}
      </div>
      ${!isOk&&!skipped?`<div style="font-size:.75rem;color:#C0392B;margin-top:.2rem;">Votre réponse : ${go?.letter} / ${go?.text}</div>`:''}
      <button class="btn-anec">💡 Le saviez-vous ?</button>
      <div class="ritem-anec hidden">${q.anecdote}</div>`;
    item.querySelector('.btn-anec').addEventListener('click',function(){
      const anec=this.nextElementSibling;
      anec.classList.toggle('hidden');
      this.textContent=anec.classList.contains('hidden')?'💡 Le saviez-vous ?':'▲ Réduire';
    });
    list.appendChild(item);
  });

  buildDD();
  show('screen-results');
};

const resumeGame = () => {
  QUESTIONS.forEach(q=>{if(answered(q.id)&&!correct(q.id))delete S.answers[q.id];});
  save(); buildGrid(); updateProg(); show('screen-game');
};

// ---- Drag & Drop ----
const WORDS=['PATRIMOINE','TERROIR'];
let dragEl=null;

const buildDD = () => {
  const pool=document.getElementById('dd-pool');
  const targets=document.getElementById('dd-targets');
  const sub=document.getElementById('dd-sub');
  pool.innerHTML=''; targets.innerHTML='';

  const earned=LAYOUT.filter(l=>correct(l.qid));
  if(!earned.length){
    pool.innerHTML=`<p style="color:var(--sprout);font-size:.84rem;font-style:italic;text-align:center;width:100%;padding:.5rem;">Répondez correctement aux questions pour débloquer des lettres !</p>`;
    sub.textContent=''; return;
  }
  sub.textContent=`${earned.length} lettre${earned.length>1?'s':''} débloquée${earned.length>1?'s':''}. Glissez-les dans les cases !`;

  [...earned].sort(()=>Math.random()-.5).forEach((l,i)=>{
    const el=document.createElement('div');
    el.className='dl'; el.textContent=l.char; el.dataset.ch=l.char; el.dataset.i=i;
    el.draggable=true;
    el.addEventListener('dragstart',e=>{dragEl=el;e.dataTransfer.setData('text',l.char);setTimeout(()=>el.classList.add('dragging'),0);});
    el.addEventListener('dragend',()=>{el.classList.remove('dragging');dragEl=null;});
    el.addEventListener('touchstart',onTS,{passive:false});
    el.addEventListener('touchmove',onTM,{passive:false});
    el.addEventListener('touchend',onTE);
    pool.appendChild(el);
  });

  WORDS.forEach((word,wi)=>{
    const row=document.createElement('div'); row.className='dd-row';
    const lbl=document.createElement('div'); lbl.className='dd-row-label';
    lbl.textContent=wi===0?'Premier mot (10 lettres)':'Deuxième mot (7 lettres)';
    const slots=document.createElement('div'); slots.className='dd-slots'; slots.dataset.wi=wi;
    for(let i=0;i<word.length;i++){
      const s=document.createElement('div'); s.className='ds';
      s.dataset.wi=wi; s.dataset.pos=i;
      s.addEventListener('dragover',e=>{e.preventDefault();if(!s.classList.contains('filled'))s.classList.add('over');});
      s.addEventListener('dragleave',()=>s.classList.remove('over'));
      s.addEventListener('drop',e=>{e.preventDefault();s.classList.remove('over');if(dragEl&&!s.classList.contains('filled'))place(dragEl,s);});
      s.addEventListener('click',()=>{if(s.classList.contains('filled'))unplace(s);});
      slots.appendChild(s);
    }
    row.appendChild(lbl); row.appendChild(slots); targets.appendChild(row);
  });
};

const place = (el,slot) => {
  slot.textContent=el.dataset.ch; slot.classList.add('filled');
  slot.dataset.placed=el.dataset.ch; slot.classList.remove('ok','bad','over');
  el.classList.add('placed');
};
const unplace = slot => {
  const ch=slot.dataset.placed;
  const found=Array.from(document.querySelectorAll('.dl.placed')).find(el=>el.dataset.ch===ch);
  if(found)found.classList.remove('placed');
  slot.textContent=''; slot.classList.remove('filled','ok','bad'); delete slot.dataset.placed;
};

// Touch drag
let tEl=null,tClone=null,tOX=0,tOY=0;
const onTS=e=>{e.preventDefault();tEl=e.currentTarget;const t=e.touches[0],r=tEl.getBoundingClientRect();tOX=t.clientX-r.left;tOY=t.clientY-r.top;tClone=tEl.cloneNode(true);tClone.style.cssText=`position:fixed;z-index:9999;opacity:.85;pointer-events:none;width:${r.width}px;height:${r.height}px;left:${r.left}px;top:${r.top}px;`;document.body.appendChild(tClone);tEl.classList.add('dragging');};
const onTM=e=>{e.preventDefault();if(!tClone)return;const t=e.touches[0];tClone.style.left=`${t.clientX-tOX}px`;tClone.style.top=`${t.clientY-tOY}px`;document.querySelectorAll('.ds').forEach(s=>s.classList.remove('over'));tClone.style.display='none';const el=document.elementFromPoint(t.clientX,t.clientY);tClone.style.display='';if(el?.classList.contains('ds')&&!el.classList.contains('filled'))el.classList.add('over');};
const onTE=e=>{if(!tEl||!tClone)return;const t=e.changedTouches[0];tClone.style.display='none';const el=document.elementFromPoint(t.clientX,t.clientY);document.querySelectorAll('.ds').forEach(s=>s.classList.remove('over'));if(el?.classList.contains('ds')&&!el.classList.contains('filled'))place(tEl,el);tEl.classList.remove('dragging');tClone.remove();tClone=null;tEl=null;};

const checkWords = () => {
  const res=document.getElementById('dd-result');
  let allOk=true,allFilled=true;
  WORDS.forEach((word,wi)=>{
    const slots=document.querySelectorAll(`.ds[data-wi="${wi}"]`);
    let str='';
    slots.forEach(s=>{if(!s.classList.contains('filled')){allFilled=false;}else{str+=s.dataset.placed;}});
    if(str.length===word.length){
      slots.forEach((s,i)=>{const ok=s.dataset.placed===word[i];s.classList.toggle('ok',ok);s.classList.toggle('bad',!ok);if(!ok)allOk=false;});
    } else allOk=false;
  });
  if(!allFilled){res.textContent='Placez toutes vos lettres avant de vérifier !';res.className='dd-result bad';return;}
  if(allOk){
    res.textContent='🎉 Bravo ! Vous avez trouvé les mots secrets !';res.className='dd-result ok';
    document.getElementById('btn-go-victory').classList.remove('hidden');
  } else {
    res.textContent='Certaines lettres ne sont pas à la bonne place... Réessayez !';res.className='dd-result bad';
  }
};

const resetDD = () => {
  document.querySelectorAll('.dl').forEach(el=>el.classList.remove('placed'));
  document.querySelectorAll('.ds').forEach(s=>{s.textContent='';s.classList.remove('filled','ok','bad','over');delete s.dataset.placed;});
  const r=document.getElementById('dd-result');if(r){r.textContent='';r.className='dd-result';}
  document.getElementById('btn-go-victory')?.classList.add('hidden');
};

// ---- Victoire ----
const showVictory = () => {
  const score=QUESTIONS.filter(q=>correct(q.id)).length;
  const el=document.getElementById('victory-score');
  if(el)el.textContent=`Score final : ${score} / 17`;
  show('screen-victory');
  if(typeof confetti==='function'){
    const end=Date.now()+4500,colors=['#D4AF37','#4A8C5C','#8FBA9F','#F7F4EE'];
    (function frame(){
      confetti({particleCount:3,angle:60,spread:55,origin:{x:0},colors});
      confetti({particleCount:3,angle:120,spread:55,origin:{x:1},colors});
      if(Date.now()<end)requestAnimationFrame(frame);
    })();
  }
};

// ---- Partage ----
const shareScore = async () => {
  const score=QUESTIONS.filter(q=>correct(q.id)).length;
  const text=`🍃 Je viens de terminer le Challenge des Experts du Labyrinthe En-Champ-Thé à La Réunion !\n\nScore : ${score}/17 questions réussies ✓\n\nEt toi, tu relèves le défi ? Viens découvrir les mots secrets... On t'attend ! 🍃\n\n📍 Grand-Coude · La Réunion`;
  try{if(navigator.share){await navigator.share({text});return;}}catch(e){}
  const modal=document.createElement('div');
  modal.style.cssText='position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.82);display:flex;align-items:center;justify-content:center;padding:1rem;';
  modal.innerHTML=`<div style="background:#F7F4EE;border-radius:14px;padding:1.5rem;max-width:380px;width:100%;color:#1A3A2A;text-align:center;"><h3 style="font-family:Georgia,serif;margin-bottom:.75rem;">Partager ma réussite</h3><textarea readonly style="width:100%;height:105px;border:1px solid #2D5A3D;border-radius:8px;padding:.6rem;font-size:.78rem;resize:none;background:#f5f5f0;">${text}</textarea><div style="display:flex;gap:.6rem;margin-top:.85rem;justify-content:center;flex-wrap:wrap;"><button id="_cp" style="background:#D4AF37;color:#1A3A2A;border:none;border-radius:50px;padding:.52rem 1.2rem;font-weight:700;cursor:pointer;">📋 Copier</button><a href="https://www.facebook.com/sharer/" target="_blank" style="background:#1877F2;color:#fff;border-radius:50px;padding:.52rem 1.2rem;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;">Facebook</a><button id="_cl" style="background:transparent;color:#4A8C5C;border:1px solid #4A8C5C;border-radius:50px;padding:.52rem 1rem;cursor:pointer;">Fermer</button></div></div>`;
  document.body.appendChild(modal);
  modal.querySelector('#_cp').addEventListener('click',()=>{navigator.clipboard?.writeText(text).then(()=>{modal.querySelector('#_cp').textContent='✓ Copié !';});});
  modal.querySelector('#_cl').addEventListener('click',()=>modal.remove());
  modal.addEventListener('click',e=>{if(e.target===modal)modal.remove();});
};

// ---- Scanner ----
let scanStream=null,scanActive=false;
const openScanner  = ()=>{document.getElementById('scanner-modal').classList.remove('hidden');startCam();};
const closeScanner = ()=>{stopCam();document.getElementById('scanner-modal').classList.add('hidden');};
const startCam = async ()=>{
  try{
    scanStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment',width:{ideal:640},height:{ideal:480}}});
    const v=document.getElementById('scan-video');v.srcObject=scanStream;await v.play();
    scanActive=true;requestAnimationFrame(scanFrame);
  }catch(e){showScanErr("Impossible d'accéder à la caméra. Vérifiez les autorisations dans votre navigateur.");}
};
const stopCam = ()=>{scanActive=false;if(scanStream){scanStream.getTracks().forEach(t=>t.stop());scanStream=null;}};
const scanFrame = ()=>{
  if(!scanActive)return;
  const v=document.getElementById('scan-video');
  if(!v||v.readyState!==v.HAVE_ENOUGH_DATA){requestAnimationFrame(scanFrame);return;}
  const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;
  const ctx=c.getContext('2d');ctx.drawImage(v,0,0);
  try{if(typeof jsQR!=='undefined'){const code=jsQR(ctx.getImageData(0,0,c.width,c.height).data,c.width,c.height);if(code?.data){handleScan(code.data);return;}}}catch(e){}
  if(scanActive)requestAnimationFrame(scanFrame);
};
const handleScan = url=>{
  stopCam();closeScanner();
  try{
    const p=new URL(url);
    const t=p.searchParams.get('t'),a=p.searchParams.get('access');
    if(a===ACCESS_TOKEN){show('screen-welcome');return;}
    if(t&&QR_TOKENS[t]){
      const qid=QR_TOKENS[t];
      S.unlocked[qid]=true;S.started=true;save();
      buildGrid();updateProg();show('screen-game');
      if(!answered(qid))setTimeout(()=>openModal(qid),350);
    }else showScanErr('QR code non reconnu. Scannez une pancarte du labyrinthe.');
  }catch(e){showScanErr('QR code invalide.');}
};
const showScanErr=msg=>{const el=document.getElementById('scan-error');if(el){el.textContent=msg;el.classList.remove('hidden');}};

// ---- Correction ----
const buildCorrection = ()=>{
  const list=document.getElementById('correction-list');if(!list)return;list.innerHTML='';
  QUESTIONS.forEach(q=>{
    const co=q.options.find(o=>o.correct);
    const item=document.createElement('div');
    item.style.cssText='background:#2D5A3D;border-radius:10px;padding:.75rem .9rem;display:flex;align-items:flex-start;gap:.6rem;';
    item.innerHTML=`<div style="font-family:var(--mono);font-size:.95rem;font-weight:500;color:var(--gold);min-width:26px;">${String(q.id).padStart(2,'0')}</div><div><div style="font-size:.78rem;color:rgba(255,255,255,.6);margin-bottom:.22rem;">${q.question}</div><div style="font-size:.9rem;font-weight:700;color:#fff;display:flex;align-items:center;gap:.4rem;"><span style="background:#D4AF37;color:#1A3A2A;font-weight:600;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.78rem;flex-shrink:0;">${co.letter}</span>${co.text}</div></div>`;
    list.appendChild(item);
  });
};

// ============================================================
// INIT — événements attachés EN PREMIER, toujours
// ============================================================
const attachAll = ()=>{
  // Modal question
  document.getElementById('btn-modal-close')?.addEventListener('click',closeModal);
  document.getElementById('modal')?.addEventListener('click',e=>{if(e.target.id==='modal')closeModal();});
  document.getElementById('btn-valider')?.addEventListener('click',validateAnswer);

  // Header jeu
  document.getElementById('btn-finish')?.addEventListener('click',showResults);
  document.getElementById('btn-reset')?.addEventListener('click',resetGame);
  document.getElementById('btn-scan')?.addEventListener('click',openScanner);

  // Scanner
  document.getElementById('btn-scanner-close')?.addEventListener('click',closeScanner);
  document.getElementById('scanner-modal')?.addEventListener('click',e=>{if(e.target.id==='scanner-modal')closeScanner();});

  // Résultats — reprendre (haut ET bas)
  document.getElementById('btn-resume-top')?.addEventListener('click',resumeGame);
  document.getElementById('btn-resume-bottom')?.addEventListener('click',resumeGame);

  // Résultats — autres
  document.getElementById('btn-check')?.addEventListener('click',checkWords);
  document.getElementById('btn-reset-dd')?.addEventListener('click',resetDD);
  document.getElementById('btn-go-victory')?.addEventListener('click',showVictory);
  document.getElementById('btn-share')?.addEventListener('click',shareScore);
  document.getElementById('btn-restart-results')?.addEventListener('click',resetGame);

  // Victoire
  document.getElementById('btn-share-victory')?.addEventListener('click',shareScore);
  document.getElementById('btn-restart-victory')?.addEventListener('click',resetGame);

  // Clavier
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
};

const init = ()=>{
  load();
  attachAll(); // TOUJOURS EN PREMIER

  const access=resolveAccess();

  if(access.type==='denied'){show('screen-denied');return;}
  if(access.type==='correction'){buildCorrection();show('screen-correction');return;}

  refreshBands();
  buildGrid();
  updateProg();

  if(access.type==='question'){
    const qid=access.qid;
    S.unlocked[qid]=true;S.started=true;save();
    show('screen-game');
    if(!answered(qid))setTimeout(()=>openModal(qid),350);
    return;
  }

  // welcome
  show(S.started&&doneCount()>0?'screen-game':'screen-welcome');
};

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
