'use strict';
/* ============================================================
   APP.JS — Challenge des Experts · Version finale
   Labyrinthe En-Champ-Thé · Grand-Coude · La Réunion
   ============================================================ */

// ============================================================
// TOKENS
// ============================================================
const ACCESS_TOKEN     = 'ECT2025-GRANDCOUDE';
const CORRECTION_TOKEN = 'CORR-ECT-STAFF-2025';

const QR_TOKENS = {
  '7x9mK2pLqR':1, 'Qr4nW8vZbT':2, 'Hj2sY6cNwX':3,
  'Pf5tA3mKdL':4, 'Zc8rV1nJyQ':5, 'Wm3hB9sEkU':6,
  'Tn6xC4pGfI':7, 'Lb7uD2wMrO':8, 'Xk1vF8jHnS':9,
  'Gy4oE5cPtA':10,'Rf9iN3bQlW':11,'Vd2yM7kZeX':12,
  'Jn5pT1sRoC':13,'Uh8wK6mFqB':14,'Ec3bL9nGvY':15,
  'Aw6jP4hXiD':16,'Sq1mR7tNkF':17
};

// ============================================================
// LAYOUT DES LETTRES
// ============================================================
const LAYOUT = [
  {qid:1, char:'P', wi:0, pos:0}, {qid:2, char:'A', wi:0, pos:1},
  {qid:3, char:'T', wi:0, pos:2}, {qid:4, char:'R', wi:0, pos:3},
  {qid:5, char:'I', wi:0, pos:4}, {qid:6, char:'M', wi:0, pos:5},
  {qid:7, char:'O', wi:0, pos:6}, {qid:8, char:'I', wi:0, pos:7},
  {qid:9, char:'N', wi:0, pos:8}, {qid:10,char:'E', wi:0, pos:9},
  {qid:11,char:'T', wi:1, pos:0}, {qid:12,char:'E', wi:1, pos:1},
  {qid:13,char:'R', wi:1, pos:2}, {qid:14,char:'R', wi:1, pos:3},
  {qid:15,char:'O', wi:1, pos:4}, {qid:16,char:'I', wi:1, pos:5},
  {qid:17,char:'R', wi:1, pos:6}
];

// ============================================================
// ILLUSTRATIONS SVG
// ============================================================
const ILLUS = {
  1:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><circle cx="150" cy="60" r="38" fill="#2D5A3D" stroke="#D4AF37" stroke-width="2"/><circle cx="150" cy="50" r="18" fill="#4A8C5C"/><rect x="132" y="67" width="36" height="25" rx="4" fill="#4A8C5C"/><text x="150" y="116" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia">Henri Boisjoli-Potier</text><text x="150" y="134" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Pionnier du géranium · 1887</text><ellipse cx="75" cy="88" rx="16" ry="9" fill="#2D5A3D" opacity=".5"/><ellipse cx="225" cy="80" rx="20" ry="11" fill="#2D5A3D" opacity=".5"/></svg>`,
  2:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><path d="M0 108 Q75 68 150 88 Q225 108 300 78L300 155L0 155Z" fill="#2D5A3D"/><path d="M0 128 Q75 98 150 113 Q225 128 300 103L300 155L0 155Z" fill="#4A8C5C" opacity=".45"/><circle cx="80" cy="83" r="7" fill="#D4AF37" opacity=".8"/><circle cx="165" cy="73" r="6" fill="#D4AF37" opacity=".6"/><circle cx="235" cy="65" r="7" fill="#D4AF37" opacity=".7"/><text x="150" y="140" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia">Bagatelle et Menciole</text></svg>`,
  3:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><rect x="62" y="16" width="176" height="98" rx="4" fill="#F7F4EE" opacity=".95"/><rect x="62" y="16" width="176" height="22" rx="4" fill="#2D5A3D"/><text x="150" y="32" text-anchor="middle" fill="#D4AF37" font-size="9" font-family="Georgia">RAPPORT EXPERT · 1957</text><line x1="77" y1="52" x2="223" y2="52" stroke="#2D5A3D" stroke-width="1" opacity=".3"/><line x1="77" y1="64" x2="208" y2="64" stroke="#2D5A3D" stroke-width="1" opacity=".3"/><line x1="77" y1="76" x2="215" y2="76" stroke="#2D5A3D" stroke-width="1" opacity=".3"/><text x="150" y="104" text-anchor="middle" fill="#2D5A3D" font-size="8" font-family="Georgia" font-style="italic">"Thé de qualité et potentiel d'avenir"</text><text x="150" y="134" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Novembre 1957 · Expert national</text></svg>`,
  4:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><rect x="22" y="88" width="34" height="55" fill="#4A8C5C" rx="2"/><rect x="66" y="73" width="34" height="70" fill="#4A8C5C" rx="2"/><rect x="110" y="80" width="34" height="63" fill="#4A8C5C" rx="2"/><rect x="154" y="52" width="34" height="91" fill="#D4AF37" rx="2" opacity=".85"/><rect x="198" y="66" width="34" height="77" fill="#4A8C5C" rx="2"/><text x="171" y="47" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia" font-weight="bold">2 000 ha</text><text x="150" y="150" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Objectif Direction Services Agricoles</text></svg>`,
  5:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><circle cx="98" cy="55" r="27" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/><circle cx="98" cy="45" r="13" fill="#4A8C5C"/><rect x="85" y="62" width="26" height="18" rx="3" fill="#4A8C5C"/><circle cx="202" cy="55" r="27" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/><circle cx="202" cy="45" r="13" fill="#4A8C5C"/><rect x="189" y="62" width="26" height="18" rx="3" fill="#4A8C5C"/><path d="M125 62L175 62" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="3,2"/><text x="98" y="108" text-anchor="middle" fill="#D4AF37" font-size="9" font-family="Georgia">Charles Payet</text><text x="202" y="108" text-anchor="middle" fill="#D4AF37" font-size="9" font-family="Georgia">Yves Mondon</text><text x="150" y="135" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Pionniers · Grand-Coude 1959</text></svg>`,
  6:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><rect x="22" y="36" width="93" height="68" rx="3" fill="#2D5A3D" stroke="#8FBA9F" stroke-width="1"/><text x="68" y="72" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">La Réunion</text><rect x="185" y="36" width="93" height="68" rx="3" fill="#2D5A3D" stroke="#D4AF37" stroke-width="2"/><text x="231" y="65" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia">Londres</text><text x="231" y="80" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">Bourse du thé</text><line x1="115" y1="70" x2="185" y2="70" stroke="#D4AF37" stroke-width="2"/><polygon points="182,65 192,70 182,75" fill="#D4AF37"/><text x="150" y="133" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia">Thé de Bourbon valorisé · 1960</text></svg>`,
  7:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><text x="150" y="50" text-anchor="middle" fill="#D4AF37" font-size="32" font-family="Georgia" font-weight="bold">27</text><text x="150" y="70" text-anchor="middle" fill="#8FBA9F" font-size="10" font-family="Georgia">planteurs de Grand-Coude</text><line x1="52" y1="80" x2="248" y2="80" stroke="#2D5A3D" stroke-width="1"/><text x="150" y="106" text-anchor="middle" fill="#D4AF37" font-size="25" font-family="Georgia" font-weight="bold">5 t/ha</text><text x="150" y="124" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Meilleur rendement de l'île · 1969</text></svg>`,
  8:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><rect x="52" y="16" width="196" height="98" rx="6" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/><rect x="52" y="16" width="196" height="24" rx="6" fill="#1A3A2A"/><text x="150" y="33" text-anchor="middle" fill="#D4AF37" font-size="9" font-family="Georgia">CONSEIL GÉNÉRAL</text><text x="150" y="62" text-anchor="middle" fill="#F7F4EE" font-size="14" font-family="Georgia" font-weight="bold">4 janvier 1972</text><text x="150" y="82" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia" font-style="italic">Vote de l'arrêt de la culture du thé</text><path d="M128 100L150 120L172 100Z" fill="#C0392B" opacity=".7"/><text x="150" y="138" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Fin de la première aventure</text></svg>`,
  9:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><rect x="28" y="26" width="93" height="78" rx="6" fill="#2D5A3D" stroke="#8FBA9F" stroke-width="1"/><text x="74" y="50" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">1960</text><text x="74" y="72" text-anchor="middle" fill="#D4AF37" font-size="15" font-family="Georgia" font-weight="bold">3,82</text><text x="74" y="88" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">francs</text><rect x="179" y="26" width="93" height="78" rx="6" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/><text x="225" y="50" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">1970</text><text x="225" y="72" text-anchor="middle" fill="#D4AF37" font-size="15" font-family="Georgia" font-weight="bold">5,62</text><text x="225" y="88" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">francs</text><line x1="121" y1="65" x2="179" y2="65" stroke="#C0392B" stroke-width="2"/><polygon points="177,60 187,65 177,70" fill="#C0392B"/><text x="150" y="136" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Coût de revient · avant l'euro</text></svg>`,
  10:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><ellipse cx="150" cy="72" rx="63" ry="40" fill="#2D5A3D" stroke="#4A8C5C" stroke-width="1"/><ellipse cx="150" cy="72" rx="44" ry="27" fill="#1A3A2A" stroke="#2D5A3D" stroke-width="1"/><circle cx="180" cy="59" r="10" fill="#D4AF37" opacity=".9"/><text x="180" y="63" text-anchor="middle" fill="#1A3A2A" font-size="6" font-family="Georgia" font-weight="bold">Assam</text><text x="150" y="128" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia">Camellia sinensis Assamica</text><text x="150" y="145" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Originaire d'Inde · Région d'Assam</text></svg>`,
  11:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><rect x="88" y="16" width="8" height="106" fill="#4A8C5C" rx="2"/><rect x="141" y="8" width="8" height="114" fill="#2D5A3D" rx="2"/><rect x="194" y="20" width="8" height="102" fill="#4A8C5C" rx="2"/><ellipse cx="92" cy="20" rx="19" ry="11" fill="#4A8C5C"/><ellipse cx="145" cy="12" rx="23" ry="13" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1"/><ellipse cx="198" cy="24" rx="17" ry="10" fill="#4A8C5C"/><line x1="30" y1="122" x2="40" y2="122" stroke="#D4AF37" stroke-width="1.5"/><line x1="35" y1="16" x2="35" y2="122" stroke="#D4AF37" stroke-width="1" stroke-dasharray="3,2"/><text x="20" y="20" fill="#D4AF37" font-size="7" font-family="Georgia">20m</text><text x="22" y="126" fill="#D4AF37" font-size="7" font-family="Georgia">0m</text><text x="150" y="148" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia">15 à 20 mètres de hauteur</text></svg>`,
  12:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><line x1="42" y1="133" x2="258" y2="133" stroke="#4A8C5C" stroke-width="1.5"/><circle cx="76" cy="128" r="5" fill="#8FBA9F"/><text x="76" y="147" text-anchor="middle" fill="#8FBA9F" font-size="7" font-family="Georgia">An 1</text><circle cx="126" cy="122" r="6" fill="#8FBA9F"/><text x="126" y="147" text-anchor="middle" fill="#8FBA9F" font-size="7" font-family="Georgia">An 2</text><circle cx="176" cy="110" r="8" fill="#4A8C5C"/><text x="176" y="147" text-anchor="middle" fill="#8FBA9F" font-size="7" font-family="Georgia">An 3</text><circle cx="226" cy="86" r="13" fill="#D4AF37" stroke="#F0D060" stroke-width="2"/><text x="226" y="147" text-anchor="middle" fill="#D4AF37" font-size="7" font-family="Georgia">An 4-5</text><text x="226" y="90" text-anchor="middle" fill="#1A3A2A" font-size="9" font-weight="bold" font-family="Georgia">✓</text><text x="150" y="30" text-anchor="middle" fill="#D4AF37" font-size="13" font-family="Georgia" font-weight="bold">4 à 5 ans</text><text x="150" y="48" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">avant la première récolte</text></svg>`,
  13:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><rect x="12" y="26" width="74" height="88" rx="6" fill="#2D5A3D" stroke="#D4AF37" stroke-width="2"/><text x="49" y="50" text-anchor="middle" fill="#D4AF37" font-size="7" font-family="Georgia" font-weight="bold">IMPÉRIALE</text><text x="49" y="70" text-anchor="middle" fill="#F7F4EE" font-size="22">👑</text><text x="49" y="100" text-anchor="middle" fill="#8FBA9F" font-size="7" font-family="Georgia">1 bourgeon</text><rect x="108" y="40" width="70" height="74" rx="6" fill="#2D5A3D" stroke="#8FBA9F" stroke-width="1"/><text x="143" y="60" text-anchor="middle" fill="#8FBA9F" font-size="7" font-family="Georgia">FINE</text><text x="143" y="80" text-anchor="middle" fill="#F7F4EE" font-size="20">🌿</text><text x="143" y="104" text-anchor="middle" fill="#8FBA9F" font-size="7" font-family="Georgia">1 b. + 1 f.</text><rect x="204" y="52" width="70" height="62" rx="6" fill="#2D5A3D" stroke="#8FBA9F" stroke-width="1" opacity=".8"/><text x="239" y="70" text-anchor="middle" fill="#8FBA9F" font-size="7" font-family="Georgia">CLASSIQUE</text><text x="239" y="90" text-anchor="middle" fill="#F7F4EE" font-size="18">🍃</text><text x="150" y="143" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Les 3 types de cueillette</text></svg>`,
  14:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><ellipse cx="150" cy="65" rx="50" ry="30" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/><ellipse cx="150" cy="65" rx="36" ry="19" fill="#4A8C5C"/><text x="150" y="70" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia" font-weight="bold">THÉ NOIR</text><rect x="116" y="94" width="68" height="30" rx="4" fill="#2D5A3D"/><ellipse cx="150" cy="94" rx="34" ry="5" fill="#4A8C5C"/><text x="150" y="115" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">Production historique</text><text x="150" y="143" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Seul thé produit par nos anciens</text></svg>`,
  15:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><path d="M22 120Q78 75 150 85Q222 95 278 58L278 145L22 145Z" fill="#2D5A3D" opacity=".7"/><path d="M22 135Q78 105 150 113Q222 121 278 95L278 145L22 145Z" fill="#4A8C5C" opacity=".45"/><rect x="120" y="26" width="60" height="30" rx="3" fill="#D4AF37" opacity=".9"/><text x="150" y="46" text-anchor="middle" fill="#1A3A2A" font-size="12" font-family="Georgia" font-weight="bold">5 ha</text><line x1="150" y1="56" x2="150" y2="80" stroke="#D4AF37" stroke-width="1.5"/><text x="150" y="148" text-anchor="middle" fill="#D4AF37" font-size="9" font-family="Georgia">5 hectares · Tables de récolte · 2005</text></svg>`,
  16:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><rect x="55" y="16" width="190" height="98" rx="6" fill="#F7F4EE" opacity=".95"/><rect x="55" y="16" width="190" height="24" rx="6" fill="#2D5A3D"/><text x="150" y="33" text-anchor="middle" fill="#D4AF37" font-size="8" font-family="Georgia">RECONNAISSANCE OFFICIELLE</text><text x="150" y="68" text-anchor="middle" fill="#2D5A3D" font-size="24" font-family="Georgia" font-weight="bold">2014</text><text x="150" y="88" text-anchor="middle" fill="#4A8C5C" font-size="8" font-family="Georgia">"Plante aromatique et médicinale"</text><text x="150" y="133" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Classification administrative officielle</text></svg>`,
  17:`<svg viewBox="0 0 300 155" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="155" fill="#1A3A2A"/><circle cx="150" cy="65" r="45" fill="#2D5A3D" stroke="#D4AF37" stroke-width="3"/><circle cx="150" cy="65" rx="32" fill="#1A3A2A" stroke="#D4AF37" stroke-width="1"/><text x="150" y="55" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia" font-weight="bold">AVPA</text><text x="150" y="71" text-anchor="middle" fill="#F7F4EE" font-size="8" font-family="Georgia">Médaille</text><text x="150" y="85" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia">2022</text><path d="M132 110L150 128L168 110Z" fill="#D4AF37"/><rect x="141" y="109" width="18" height="7" fill="#D4AF37"/><text x="150" y="146" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">Agence Valorisation Productions Agricoles</text></svg>`
};

// ============================================================
// QUESTIONS
// ============================================================
const QUESTIONS = [
  {id:1,section:"Naissance du village",pancarte:"En 1887, Henri Boisjoli-Potier fut le premier à cultiver le géranium sur ses terres du Tampon, à La Réunion. Cette culture parfumée allait transformer l'économie locale et préparer le terrain pour l'aventure du thé.",question:"Qui fut l'acteur principal de la culture du géranium à La Réunion ?",options:[{letter:"P",text:"MR Henri Boisjoli-Potier",correct:true},{letter:"B",text:"MR Charles Payet",correct:false}],hint:"Cherchez qui a initié cette culture sur ses terres au Tampon dès 1887.",anecdote:"Henri Boisjoli-Potier a introduit le géranium rosat à La Réunion depuis l'Algérie. L'huile essentielle de géranium réunionnais était surnommée 'l'or vert' de l'île et exportée pour parfumer les plus grands noms de la haute parfumerie française."},
  {id:2,section:"Transition Géranium / Thé",pancarte:"Après la crise du géranium dans les années 1950, les autorités agricoles cherchèrent une culture de substitution. Les premières expérimentations du thé furent menées dans deux lieux emblématiques des hauts de La Réunion.",question:"Dans quelles régions furent entreprises les premières expérimentations du thé à La Réunion ?",options:[{letter:"C",text:"Plaines des Palmiste et Grand Coude",correct:false},{letter:"A",text:"Bagatelle et Menciole",correct:true}],hint:"Les noms de lieux sont précis sur la pancarte.",anecdote:"Bagatelle et Menciole sont situées dans les hauts du Sud de La Réunion, à plus de 1000 mètres d'altitude. Ce climat frais et humide, très proche des grandes régions théicoles asiatiques, explique pourquoi ces sites furent choisis."},
  {id:3,section:"Début de l'aventure du Thé",pancarte:"En novembre 1957, un expert national fut dépêché à La Réunion pour évaluer le potentiel de la culture du thé. Après analyse des plantations expérimentales, il rendit un avis qui allait encourager le développement de cette filière.",question:"Quelle est la conclusion qui ressort après examen de l'expert national en 1957 ?",options:[{letter:"T",text:"Thé de qualité et potentiel d'avenir",correct:true},{letter:"G",text:"Grand rendement et facilité de culture",correct:false}],hint:"L'expert a rédigé ses conclusions en novembre 1957.",anecdote:"L'expert envoyé en 1957 était spécialisé dans les cultures tropicales. Son rapport enthousiaste allait déclencher un programme de développement agricole ambitieux avec des objectifs jamais atteints auparavant dans les DOM-TOM français."},
  {id:4,section:"Développement de l'aventure",pancarte:"Suite au rapport de 1957, la Direction des Services Agricoles de La Réunion élabora un programme ambitieux avec un objectif précis à long terme pour transformer le paysage agricole des hauts de l'île.",question:"Quels étaient les objectifs de la Direction des Services Agricoles à plus long terme ?",options:[{letter:"R",text:"Mise en culture de 2 000 hectares",correct:true},{letter:"S",text:"Favoriser l'exportation",correct:false}],hint:"Le programme prévoyait un chiffre précis d'hectares.",anecdote:"2 000 hectares de théiers auraient représenté une révolution agricole pour La Réunion. À titre de comparaison, les plus grandes plantations de thé en Europe n'atteignent pas ce chiffre aujourd'hui."},
  {id:5,section:"Développement (suite)",pancarte:"En 1959, deux agriculteurs de Grand-Coude décidèrent de se lancer dans la culture du thé dans leur village perché dans les hauts du Sud. Leurs noms sont restés dans l'histoire locale comme les pionniers de cette aventure.",question:"En 1959, quels étaient les deux planteurs qui entreprirent la culture du thé sur le village de Grand-Coude ?",options:[{letter:"U",text:"Benoît Mondon et Harles Henri",correct:false},{letter:"I",text:"Charles Payet et Yves Mondon",correct:true}],hint:"Deux noms de familles emblématiques de Grand Coude.",anecdote:"Les familles Payet et Mondon sont encore aujourd'hui des noms bien connus à Grand-Coude. Leur pari sur le thé en 1959 était audacieux — ils misaient sur une culture quasi inconnue dans un village isolé à plus de 1 400 mètres d'altitude."},
  {id:6,section:"Commercialisation du thé",pancarte:"Dès 1960, le thé produit à La Réunion sous l'appellation 'Thé de Bourbon' fut introduit sur le marché international. Sa qualité lui permit d'accéder à la plus prestigieuse place de marché mondiale pour le thé.",question:"Où était valorisé le thé de Bourbon en 1960 ?",options:[{letter:"Y",text:"La Réunion",correct:false},{letter:"M",text:"Londres",correct:true}],hint:"Grande capitale européenne, siège d'une bourse de matières premières.",anecdote:"La Bourse du thé de Londres, fondée au XVIIe siècle, était le centre mondial du commerce du thé. Que le 'Thé de Bourbon' y soit coté dès 1960 est une reconnaissance extraordinaire pour une île française de l'océan Indien."},
  {id:7,section:"Restructuration à Grand Coude",pancarte:"Après quelques années de développement, Grand-Coude s'imposa comme le centre névralgique de la culture du thé réunionnais. En 1969, le village comptait 27 planteurs actifs qui réalisaient des performances remarquables.",question:"Quels sont les rendements des 27 planteurs de Grand-Coude ?",options:[{letter:"O",text:"5 tonnes/hectare",correct:true},{letter:"B",text:"6 tonnes/hectare",correct:false}],hint:"En 1969, ce chiffre représentait le meilleur rendement de l'île.",anecdote:"5 tonnes de feuilles fraîches par hectare est comparable aux plantations asiatiques. Pour obtenir 1 kg de thé sec, il faut environ 4 à 5 kg de feuilles fraîches. Les planteurs de Grand-Coude avaient maîtrisé leur culture en une dizaine d'années seulement."},
  {id:8,section:"Déclin et fin de l'aventure",pancarte:"Malgré la qualité reconnue du thé réunionnais, des difficultés économiques structurelles accumulées tout au long des années 1960 menèrent à une décision politique majeure qui sonna le glas de cette culture prometteuse.",question:"Quelle date signe la fin de l'aventure du thé de La Réunion par vote du Conseil Général ?",options:[{letter:"I",text:"Le 4 janvier 1972",correct:true},{letter:"R",text:"Le 1er janvier 1970",correct:false}],hint:"Une date précise est mentionnée sur la pancarte.",anecdote:"Le vote du 4 janvier 1972 fut un tournant dramatique pour les planteurs de Grand-Coude. Il faudra attendre 2005 pour que le thé renaisse à Grand-Coude, soit 33 ans plus tard."},
  {id:9,section:"Raisons de l'échec",pancarte:"L'arrêt de la culture du thé à La Réunion n'était pas dû à un manque de qualité du produit, mais à un problème économique fondamental : le coût de production était structurellement trop élevé face à la concurrence internationale.",question:"Quel est le coût de revient du thé de La Réunion en 1960 et 1970 ?",options:[{letter:"N",text:"3,82 francs en 1960 / 5,62 francs en 1970",correct:true},{letter:"C",text:"3,82 euros en 1960 / 5,62 euros en 1970",correct:false}],hint:"Attention à la monnaie : nous sommes avant l'euro !",anecdote:"La France n'est passée à l'euro qu'en 2002. Le coût de production élevé du thé réunionnais s'expliquait principalement par le coût de la main-d'œuvre locale, bien supérieur à celui des pays asiatiques producteurs."},
  {id:10,section:"Le Thé dans le monde",pancarte:"Le théier (Camellia sinensis) existe sous plusieurs variétés botaniques. La souche présente à La Réunion est l'Assamica, qui se distingue par ses grandes feuilles et sa robustesse. Son nom révèle son origine géographique.",question:"De quel pays provient la souche de thé présente à La Réunion, soit l'Assamica ?",options:[{letter:"A",text:"Chine",correct:false},{letter:"E",text:"Inde",correct:true}],hint:"'Assamica' fait référence à une région célèbre productrice de thé.",anecdote:"L'Assam est un État du nord-est de l'Inde. La variété Assamica produit un thé robuste avec des notes maltées. C'est grâce à cette variété robuste que le thé a pu s'adapter au climat de La Réunion."},
  {id:11,section:"Le thé au naturel",pancarte:"À l'état sauvage, le théier est un arbre imposant. Dans le labyrinthe, vous pouvez observer des spécimens qui ont retrouvé leur taille naturelle, bien différente des buissons taillés que l'on voit dans les plantations commerciales.",question:"Les théiers présents dans le labyrinthe peuvent-ils atteindre combien de mètres ?",options:[{letter:"V",text:"10 à 12 mètres",correct:false},{letter:"T",text:"15 à 20 mètres",correct:true}],hint:"La pancarte précise la hauteur de la souche indienne.",anecdote:"Dans les plantations commerciales, les théiers sont taillés à 1 mètre pour faciliter la cueillette. Livrés à eux-mêmes dans le labyrinthe d'En-Champ-Thé, les Assamica peuvent atteindre des hauteurs vertigineuses. Certains arbres ont plus de 50 ans !"},
  {id:12,section:"Le thé cultivé",pancarte:"La culture du thé demande beaucoup de patience. Contrairement à certaines cultures maraîchères qui produisent en quelques semaines, le théier requiert plusieurs années avant de livrer sa première récolte de qualité.",question:"Au bout de combien d'années un théier devient-il productif ?",options:[{letter:"D",text:"2 à 3 ans",correct:false},{letter:"E",text:"4 à 5 ans",correct:true}],hint:"La pancarte sur le thé cultivé donne cette information.",anecdote:"Un théier bien entretenu peut vivre et produire pendant plus de 100 ans. À En-Champ-Thé, certains théiers datent de la première période de culture des années 1960 — ils ont donc plus de 60 ans !"},
  {id:13,section:"Cueillir le thé",pancarte:"La qualité d'un thé commence dans la main de celui qui cueille. Selon le degré d'exigence, la cueillette sélectionne différentes parties du bourgeon terminal, ce qui détermine en grande partie le niveau de qualité du thé produit.",question:"Quelles sont les trois types de cueillettes existantes ?",options:[{letter:"R",text:"Impériale ; fine ; classique",correct:true},{letter:"W",text:"Royal ; fine ; basic",correct:false}],hint:"L'une était autrefois réservée aux empereurs...",anecdote:"La cueillette impériale ne prélève que le tout premier bourgeon de la tige. En Chine ancienne, cette récolte était réservée exclusivement à l'Empereur. Aujourd'hui, les thés issus de cueillette impériale atteignent plusieurs milliers d'euros le kilo."},
  {id:14,section:"Les différentes sortes de thé",pancarte:"Toutes les variétés de thé — blanc, vert, oolong, noir — proviennent de la même plante : le Camellia sinensis. C'est le processus de transformation après la cueillette qui détermine le type de thé obtenu.",question:"Auparavant, quelle sorte de thé était produite par nos anciens ?",options:[{letter:"L",text:"Thé blanc et noir",correct:false},{letter:"R",text:"Thé noir",correct:true}],hint:"La note en bas de la pancarte sur les sortes de thé.",anecdote:"Le thé noir représente environ 75% de la production mondiale. Sa fabrication implique une étape de fermentation complète qui lui donne sa couleur sombre et ses arômes puissants. C'est ce type que produisaient les planteurs de Grand-Coude dans les années 1960."},
  {id:15,section:"La culture du Thé relancée",pancarte:"Après 33 ans d'abandon, la culture du thé a été relancée à Grand-Coude en 2005. C'est dans ce contexte de renaissance que le Labyrinthe En-Champ-Thé a été créé, combinant production, tourisme et pédagogie.",question:"Quelles surfaces occupent aujourd'hui les tables de récolte aménagées au labyrinthe ?",options:[{letter:"O",text:"5 hectares",correct:true},{letter:"I",text:"10 hectares",correct:false}],hint:"La superficie est mentionnée en lien avec la relance de 2005.",anecdote:"5 hectares de théiers représentent environ 7 terrains de football. La relance de 2005 a fait du Labyrinthe En-Champ-Thé le plus important producteur de thé français, titre qu'il détient encore aujourd'hui."},
  {id:16,section:"L'avenir de la culture",pancarte:"La reconnaissance administrative de la culture du thé à La Réunion a constitué une étape importante pour la filière. Cette classification officielle a ouvert de nouvelles perspectives économiques pour les producteurs.",question:"En quelle année la culture du thé a-t-elle été reconnue comme 'plante aromatique et médicinale' ?",options:[{letter:"I",text:"2014",correct:true},{letter:"H",text:"2005",correct:false}],hint:"Ce n'est pas l'année de la relance, mais une reconnaissance ultérieure.",anecdote:"La classification du thé comme 'plante aromatique et médicinale' en 2014 a eu des conséquences concrètes sur la fiscalité et les aides agricoles. Elle a aussi permis de développer la gamme de thés médicinaux proposée à la boutique."},
  {id:17,section:"2022 : année des Médailles",pancarte:"L'année 2022 a été une année exceptionnelle pour le Labyrinthe En-Champ-Thé, avec une reconnaissance internationale de la qualité de ses productions lors d'un concours mondial prestigieux.",question:"Comment se nomme l'agence qui récompense 'les thés du monde', dont on a été primé en 2022 ?",options:[{letter:"E",text:"CITM — Concours International des Thés du Monde",correct:false},{letter:"R",text:"AVPA — Agence pour la Valorisation des Productions Agricoles",correct:true}],hint:"Le nom complet de l'agence est écrit sur la dernière pancarte.",anecdote:"L'AVPA est reconnue internationalement pour la rigueur de ses dégustations à l'aveugle. Être récompensé place le thé d'En-Champ-Thé parmi les meilleurs thés du monde, rivalisant avec les grands crus asiatiques et africains."}
];

// ============================================================
// STATE
// ============================================================
const KEY = 'ect_final';
let S = { answers:{}, unlocked:{}, started:false };

const save  = () => { try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){} };
const load  = () => { try{const r=localStorage.getItem(KEY);if(r)S={...S,...JSON.parse(r)};}catch(e){} };
const clear = () => { try{localStorage.removeItem(KEY);}catch(e){}; S={answers:{},unlocked:{},started:false}; };

const answered  = id => S.answers[id] !== undefined;
const unlocked  = id => !!S.unlocked[id];
const correct   = id => { const q=Q(id); return q && q.options.find(o=>o.correct)?.letter === S.answers[id]; };
const Q         = id => QUESTIONS.find(x=>x.id===id);
const doneCount = () => Object.keys(S.answers).length;

// ============================================================
// NAVIGATION
// ============================================================
const show = id => {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const el = document.getElementById(id);
  if(el){ el.classList.add('active'); window.scrollTo(0,0); }
};

const resolveAccess = () => {
  const p = new URLSearchParams(window.location.search);
  const t=p.get('t'), a=p.get('access'), c=p.get('correction');
  if(c===CORRECTION_TOKEN) return {type:'correction'};
  if(a===ACCESS_TOKEN)     return {type:'welcome'};
  if(t && QR_TOKENS[t])   return {type:'question', qid:QR_TOKENS[t]};
  return {type:'denied'};
};

// ============================================================
// LETTER BANDS
// ============================================================
const buildBand = (container, wi) => {
  container.innerHTML = '';
  LAYOUT.filter(l=>l.wi===wi).sort((a,b)=>a.pos-b.pos).forEach(l=>{
    const b = document.createElement('div');
    b.className = 'lbox';
    b.dataset.qid = l.qid;
    b.dataset.ch  = l.char;
    if(correct(l.qid)){ b.textContent=l.char; b.classList.add('on'); }
    container.appendChild(b);
  });
};

const refreshBands = () => {
  ['kw-row-0','strip-0'].forEach(id=>{const el=document.getElementById(id);if(el)buildBand(el,0);});
  ['kw-row-1','strip-1'].forEach(id=>{const el=document.getElementById(id);if(el)buildBand(el,1);});
};

const revealBand = qid => {
  document.querySelectorAll(`.lbox[data-qid="${qid}"]`).forEach(b=>{
    b.textContent=b.dataset.ch; b.classList.add('on');
  });
};

// ============================================================
// GRID
// ============================================================
const buildGrid = () => {
  const grid = document.getElementById('grid');
  if(!grid) return;
  grid.innerHTML = '';
  QUESTIONS.forEach(q => {
    const card = document.createElement('button');
    card.className = 'qcard';
    card.dataset.id = q.id;
    if(answered(q.id)){
      card.classList.add('qdone');
      card.innerHTML = `<span class="qnum">${String(q.id).padStart(2,'0')}</span><span class="qsect">${q.section}</span><span class="qcheck">✓</span>`;
      card.disabled = true;
    } else if(unlocked(q.id)){
      card.innerHTML = `<span class="qnum">${String(q.id).padStart(2,'0')}</span><span class="qsect">${q.section}</span>`;
      card.addEventListener('click', () => openModal(q.id));
    } else {
      card.classList.add('qlocked');
      card.innerHTML = `<span class="qnum">${String(q.id).padStart(2,'0')}</span><span class="qsect">${q.section}</span><span class="qscan">Scannez la pancarte<br/>pour débloquer</span>`;
      card.disabled = true;
    }
    grid.appendChild(card);
  });
};

const updateProg = () => {
  const n = doneCount();
  const pt = document.getElementById('prog-text');
  const pf = document.getElementById('prog-fill');
  if(pt) pt.textContent = `${n} / 17`;
  if(pf) pf.style.width = `${Math.round(n/17*100)}%`;
};

const updateCard = qid => {
  const card = document.querySelector(`.qcard[data-id="${qid}"]`);
  if(!card) return;
  card.classList.remove('qlocked'); card.classList.add('qdone'); card.disabled = true;
  card.innerHTML = `<span class="qnum">${String(qid).padStart(2,'0')}</span><span class="qsect">${Q(qid).section}</span><span class="qcheck">✓</span>`;
};

// ============================================================
// MODAL
// ============================================================
let curQid = null, selLetter = null;

const openModal = qid => {
  const q = Q(qid);
  if(!q) return;
  curQid = qid; selLetter = null;

  document.getElementById('modal-num').textContent = String(q.id).padStart(2,'0');
  document.getElementById('modal-section').textContent = q.section;
  document.getElementById('modal-pancarte').textContent = q.pancarte;
  document.getElementById('modal-question').textContent = q.question;

  const illus = document.getElementById('modal-illus');
  illus.innerHTML = ILLUS[q.id] || '';

  document.getElementById('btn-hint').classList.add('hidden');
  const ht = document.getElementById('hint-text');
  ht.classList.add('hidden'); ht.textContent = '';
  document.getElementById('modal-confirm').classList.add('hidden');

  const opts = document.getElementById('modal-opts');
  opts.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.dataset.letter = opt.letter;
    btn.innerHTML = `<span class="opt-letter">${opt.letter}</span><span class="opt-sep">/</span><span class="opt-text">${opt.text}</span>`;
    btn.addEventListener('click', () => selectOpt(btn, opt));
    opts.appendChild(btn);
  });

  document.getElementById('modal').classList.remove('hidden');
  setTimeout(() => document.getElementById('btn-modal-close').focus(), 80);
};

const selectOpt = (btn, opt) => {
  document.querySelectorAll('.opt-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  selLetter = opt.letter;
  const q = Q(curQid);
  document.getElementById('confirm-txt').innerHTML = `Vous avez choisi : <strong>${opt.letter} / ${opt.text}</strong> — Confirmer ?`;
  document.getElementById('modal-confirm').classList.remove('hidden');
  document.getElementById('btn-hint').classList.remove('hidden');
};

const validateAnswer = () => {
  if(!selLetter || !curQid) return;
  S.answers[curQid] = selLetter;
  save();
  if(correct(curQid)) revealBand(curQid);
  updateCard(curQid);
  updateProg();
  closeModal();
};

const closeModal = () => {
  document.getElementById('modal').classList.add('hidden');
  curQid = null; selLetter = null;
};

// ============================================================
// RESET
// ============================================================
const resetGame = () => {
  if(!confirm('Réinitialiser toute votre progression ?')) return;
  clear(); refreshBands(); buildGrid(); updateProg(); show('screen-welcome');
};

// ============================================================
// RÉSULTATS
// ============================================================
const getMention = s => {
  if(s===17) return "Expert absolu du Labyrinthe En-Champ-Thé ! 🏅";
  if(s>=15)  return "Excellent ! Vous maîtrisez l'histoire du thé réunionnais.";
  if(s>=12)  return "Très bien ! Quelques secrets du labyrinthe vous ont résisté...";
  if(s>=8)   return "Bien ! Continuez pour découvrir tous les secrets.";
  return "Le labyrinthe garde encore bien ses secrets...";
};

const showResults = () => {
  let score = 0;
  QUESTIONS.forEach(q => { if(correct(q.id)) score++; });
  document.getElementById('score-val').textContent = score;
  document.getElementById('score-mention').textContent = getMention(score);

  const list = document.getElementById('results-list');
  list.innerHTML = '';
  QUESTIONS.forEach(q => {
    const given      = S.answers[q.id];
    const correctOpt = q.options.find(o=>o.correct);
    const givenOpt   = q.options.find(o=>o.letter===given);
    const isOk       = given && correctOpt?.letter===given;
    const skipped    = !given;

    const item = document.createElement('div');
    item.className = `ritem ${skipped?'rskipped':isOk?'rcorrect':'rwrong'}`;
    item.innerHTML = `
      <div class="ritem-top">
        <span class="ritem-num">Pancarte ${String(q.id).padStart(2,'0')}</span>
        <span class="ritem-icon">${skipped?'⬜':isOk?'✅':'❌'}</span>
      </div>
      <div class="ritem-q">${q.question}</div>
      <div class="ritem-ans">
        <span class="rletter ${isOk||skipped?'':'bad'}">${skipped?'?':correctOpt.letter}</span>
        ${skipped?'<em style="color:rgba(255,255,255,.4)">Non répondue</em>':correctOpt.text}
      </div>
      ${!isOk&&!skipped?`<div style="font-size:.75rem;color:#C0392B;margin-top:.2rem;">Votre réponse : ${givenOpt?.letter} / ${givenOpt?.text}</div>`:''}
      <button class="btn-anec">💡 Le saviez-vous ?</button>
      <div class="ritem-anec hidden">${q.anecdote}</div>`;
    const toggle = item.querySelector('.btn-anec');
    const anec   = item.querySelector('.ritem-anec');
    toggle.addEventListener('click', () => {
      anec.classList.toggle('hidden');
      toggle.textContent = anec.classList.contains('hidden') ? '💡 Le saviez-vous ?' : '▲ Réduire';
    });
    list.appendChild(item);
  });

  buildDD(score);
  show('screen-results');
};

// ============================================================
// DRAG & DROP
// ============================================================
const WORDS = ['PATRIMOINE','TERROIR'];
let dragEl = null;

const buildDD = score => {
  const pool    = document.getElementById('dd-pool');
  const targets = document.getElementById('dd-targets');
  const sub     = document.getElementById('dd-sub');
  pool.innerHTML = ''; targets.innerHTML = '';

  const earned = LAYOUT.filter(l=>correct(l.qid));
  if(!earned.length){
    pool.innerHTML = `<p style="color:var(--sprout);font-size:.84rem;font-style:italic;text-align:center;width:100%;padding:.5rem;">Répondez correctement aux questions pour débloquer des lettres !</p>`;
    sub.textContent = '';
    return;
  }
  sub.textContent = `${earned.length} lettre${earned.length>1?'s':''} débloquée${earned.length>1?'s':''}. Glissez-les dans les cases !`;

  [...earned].sort(()=>Math.random()-.5).forEach((l,i) => {
    const el = document.createElement('div');
    el.className = 'dl';
    el.textContent = l.char; el.dataset.ch = l.char; el.dataset.i = i;
    el.draggable = true;
    el.addEventListener('dragstart', e=>{ dragEl=el; e.dataTransfer.setData('text',l.char); setTimeout(()=>el.classList.add('dragging'),0); });
    el.addEventListener('dragend',   ()=>{ el.classList.remove('dragging'); dragEl=null; });
    el.addEventListener('touchstart', onTS, {passive:false});
    el.addEventListener('touchmove',  onTM, {passive:false});
    el.addEventListener('touchend',   onTE);
    pool.appendChild(el);
  });

  WORDS.forEach((word,wi) => {
    const row = document.createElement('div'); row.className = 'dd-row';
    const lbl = document.createElement('div'); lbl.className = 'dd-row-label';
    lbl.textContent = wi===0 ? 'Premier mot (10 lettres)' : 'Deuxième mot (7 lettres)';
    const slots = document.createElement('div'); slots.className = 'dd-slots'; slots.dataset.wi = wi;
    for(let i=0;i<word.length;i++){
      const s = document.createElement('div'); s.className = 'ds';
      s.dataset.wi=wi; s.dataset.pos=i;
      s.addEventListener('dragover',  e=>{ e.preventDefault(); if(!s.classList.contains('filled')) s.classList.add('over'); });
      s.addEventListener('dragleave', ()=>s.classList.remove('over'));
      s.addEventListener('drop',      e=>{ e.preventDefault(); s.classList.remove('over'); if(dragEl&&!s.classList.contains('filled')) place(dragEl,s); });
      s.addEventListener('click',     ()=>{ if(s.classList.contains('filled')) unplace(s); });
      slots.appendChild(s);
    }
    row.appendChild(lbl); row.appendChild(slots); targets.appendChild(row);
  });
};

const place = (letterEl,slot) => {
  slot.textContent=letterEl.dataset.ch; slot.classList.add('filled');
  slot.dataset.placed=letterEl.dataset.ch; slot.classList.remove('ok','bad','over');
  letterEl.classList.add('placed');
};

const unplace = slot => {
  const ch = slot.dataset.placed;
  const found = Array.from(document.querySelectorAll('.dl.placed')).find(el=>el.dataset.ch===ch&&el.classList.contains('placed'));
  if(found) found.classList.remove('placed');
  slot.textContent=''; slot.classList.remove('filled','ok','bad'); delete slot.dataset.placed;
};

// Touch
let tEl=null, tClone=null, tOX=0, tOY=0;
const onTS = e => {
  e.preventDefault(); tEl=e.currentTarget;
  const t=e.touches[0], r=tEl.getBoundingClientRect();
  tOX=t.clientX-r.left; tOY=t.clientY-r.top;
  tClone=tEl.cloneNode(true);
  tClone.style.cssText=`position:fixed;z-index:9999;opacity:.85;pointer-events:none;width:${r.width}px;height:${r.height}px;left:${r.left}px;top:${r.top}px;`;
  document.body.appendChild(tClone); tEl.classList.add('dragging');
};
const onTM = e => {
  e.preventDefault(); if(!tClone) return;
  const t=e.touches[0];
  tClone.style.left=`${t.clientX-tOX}px`; tClone.style.top=`${t.clientY-tOY}px`;
  document.querySelectorAll('.ds').forEach(s=>s.classList.remove('over'));
  tClone.style.display='none';
  const el=document.elementFromPoint(t.clientX,t.clientY);
  tClone.style.display='';
  if(el?.classList.contains('ds')&&!el.classList.contains('filled')) el.classList.add('over');
};
const onTE = e => {
  if(!tEl||!tClone) return;
  const t=e.changedTouches[0];
  tClone.style.display='none';
  const el=document.elementFromPoint(t.clientX,t.clientY);
  document.querySelectorAll('.ds').forEach(s=>s.classList.remove('over'));
  if(el?.classList.contains('ds')&&!el.classList.contains('filled')) place(tEl,el);
  tEl.classList.remove('dragging'); tClone.remove(); tClone=null; tEl=null;
};

const checkWords = () => {
  const res = document.getElementById('dd-result');
  let allOk=true, allFilled=true;
  WORDS.forEach((word,wi) => {
    const slots = document.querySelectorAll(`.ds[data-wi="${wi}"]`);
    let str='';
    slots.forEach(s=>{ if(!s.classList.contains('filled')){allFilled=false;}else{str+=s.dataset.placed;} });
    if(str.length===word.length){
      slots.forEach((s,i)=>{ const ok=s.dataset.placed===word[i]; s.classList.toggle('ok',ok); s.classList.toggle('bad',!ok); if(!ok)allOk=false; });
    } else allOk=false;
  });
  if(!allFilled){ res.textContent='Placez toutes vos lettres avant de vérifier !'; res.className='dd-result bad'; return; }
  if(allOk){
    res.textContent='🎉 Bravo ! Vous avez trouvé les mots secrets !'; res.className='dd-result ok';
    document.getElementById('btn-go-victory').classList.remove('hidden');
  } else {
    res.textContent='Certaines lettres ne sont pas à la bonne place... Réessayez !'; res.className='dd-result bad';
  }
};

const resetDD = () => {
  document.querySelectorAll('.dl').forEach(el=>el.classList.remove('placed'));
  document.querySelectorAll('.ds').forEach(s=>{ s.textContent=''; s.classList.remove('filled','ok','bad','over'); delete s.dataset.placed; });
  const r=document.getElementById('dd-result'); if(r){r.textContent='';r.className='dd-result';}
  document.getElementById('btn-go-victory')?.classList.add('hidden');
};

// ============================================================
// VICTOIRE
// ============================================================
const showVictory = () => {
  const score = QUESTIONS.filter(q=>correct(q.id)).length;
  const el = document.getElementById('victory-score');
  if(el) el.textContent = `Score final : ${score} / 17`;
  show('screen-victory');
  if(typeof confetti==='function'){
    const end=Date.now()+4500, colors=['#D4AF37','#4A8C5C','#8FBA9F','#F7F4EE'];
    (function frame(){
      confetti({particleCount:3,angle:60,spread:55,origin:{x:0},colors});
      confetti({particleCount:3,angle:120,spread:55,origin:{x:1},colors});
      if(Date.now()<end) requestAnimationFrame(frame);
    })();
  }
};

// ============================================================
// PARTAGE
// ============================================================
const shareScore = async () => {
  const score = QUESTIONS.filter(q=>correct(q.id)).length;
  const text  = `🍃 Je viens de terminer le Challenge des Experts du Labyrinthe En-Champ-Thé à La Réunion !\n\nScore : ${score}/17 questions réussies ✓\n\nEt toi, tu relèves le défi ? Viens découvrir les mots secrets... On t'attend ! 🍃\n\n📍 Grand-Coude · La Réunion`;
  try { if(navigator.share){ await navigator.share({text}); return; } } catch(e){}
  // Fallback modal
  const modal = document.createElement('div');
  modal.style.cssText='position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.82);display:flex;align-items:center;justify-content:center;padding:1rem;';
  modal.innerHTML=`<div style="background:#F7F4EE;border-radius:14px;padding:1.5rem;max-width:380px;width:100%;color:#1A3A2A;text-align:center;"><h3 style="font-family:Georgia,serif;margin-bottom:.75rem;">Partager ma réussite</h3><p style="font-size:.82rem;color:#4A8C5C;margin-bottom:.75rem;">Copiez ce texte pour le partager !</p><textarea readonly style="width:100%;height:105px;border:1px solid #2D5A3D;border-radius:8px;padding:.6rem;font-size:.78rem;resize:none;background:#f5f5f0;">${text}</textarea><div style="display:flex;gap:.6rem;margin-top:.85rem;justify-content:center;flex-wrap:wrap;"><button id="_cp" style="background:#D4AF37;color:#1A3A2A;border:none;border-radius:50px;padding:.52rem 1.2rem;font-weight:700;cursor:pointer;">📋 Copier</button><a href="https://www.facebook.com/sharer/" target="_blank" style="background:#1877F2;color:#fff;border-radius:50px;padding:.52rem 1.2rem;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;">Facebook</a><button id="_cl" style="background:transparent;color:#4A8C5C;border:1px solid #4A8C5C;border-radius:50px;padding:.52rem 1rem;cursor:pointer;">Fermer</button></div></div>`;
  document.body.appendChild(modal);
  modal.querySelector('#_cp').addEventListener('click',()=>{ navigator.clipboard?.writeText(text).then(()=>{ modal.querySelector('#_cp').textContent='✓ Copié !'; }); });
  modal.querySelector('#_cl').addEventListener('click',()=>modal.remove());
  modal.addEventListener('click',e=>{ if(e.target===modal) modal.remove(); });
};

// ============================================================
// SCANNER
// ============================================================
let scanStream=null, scanActive=false;

const openScanner = () => { document.getElementById('scanner-modal').classList.remove('hidden'); startCam(); };
const closeScanner = () => { stopCam(); document.getElementById('scanner-modal').classList.add('hidden'); };

const startCam = async () => {
  try {
    scanStream = await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment',width:{ideal:640},height:{ideal:480}}});
    const v = document.getElementById('scan-video');
    v.srcObject=scanStream; await v.play();
    scanActive=true; requestAnimationFrame(scanFrame);
  } catch(e){ showScanErr("Impossible d'accéder à la caméra. Vérifiez les autorisations dans votre navigateur."); }
};

const stopCam = () => {
  scanActive=false;
  if(scanStream){ scanStream.getTracks().forEach(t=>t.stop()); scanStream=null; }
};

const scanFrame = () => {
  if(!scanActive) return;
  const v=document.getElementById('scan-video');
  if(!v||v.readyState!==v.HAVE_ENOUGH_DATA){ requestAnimationFrame(scanFrame); return; }
  const c=document.createElement('canvas'); c.width=v.videoWidth; c.height=v.videoHeight;
  const ctx=c.getContext('2d'); ctx.drawImage(v,0,0);
  try {
    if(typeof jsQR!=='undefined'){
      const code=jsQR(ctx.getImageData(0,0,c.width,c.height).data,c.width,c.height);
      if(code?.data){ handleScan(code.data); return; }
    }
  } catch(e){}
  if(scanActive) requestAnimationFrame(scanFrame);
};

const handleScan = url => {
  stopCam(); closeScanner();
  try {
    const p=new URL(url);
    const t=p.searchParams.get('t'), a=p.searchParams.get('access');
    if(a===ACCESS_TOKEN){ show('screen-welcome'); return; }
    if(t&&QR_TOKENS[t]){
      const qid=QR_TOKENS[t];
      S.unlocked[qid]=true; S.started=true; save();
      buildGrid(); updateProg(); show('screen-game');
      if(!answered(qid)) setTimeout(()=>openModal(qid),350);
    } else showScanErr('QR code non reconnu. Scannez une pancarte du labyrinthe.');
  } catch(e){ showScanErr('QR code invalide.'); }
};

const showScanErr = msg => {
  const el=document.getElementById('scan-error');
  if(el){ el.textContent=msg; el.classList.remove('hidden'); }
};

// ============================================================
// CORRECTION
// ============================================================
const buildCorrection = () => {
  const list=document.getElementById('correction-list');
  if(!list) return; list.innerHTML='';
  QUESTIONS.forEach(q=>{
    const co=q.options.find(o=>o.correct);
    const item=document.createElement('div');
    item.style.cssText='background:#2D5A3D;border-radius:10px;padding:.75rem .9rem;display:flex;align-items:flex-start;gap:.6rem;';
    item.innerHTML=`<div style="font-family:var(--mono);font-size:.95rem;font-weight:500;color:var(--gold);min-width:26px;">${String(q.id).padStart(2,'0')}</div><div><div style="font-size:.78rem;color:rgba(255,255,255,.6);margin-bottom:.22rem;">${q.question}</div><div style="font-size:.9rem;font-weight:700;color:#fff;display:flex;align-items:center;gap:.4rem;"><span style="background:var(--gold);color:var(--forest);font-family:var(--serif);font-weight:600;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.78rem;flex-shrink:0;">${co.letter}</span>${co.text}</div></div>`;
    list.appendChild(item);
  });
};

// ============================================================
// INIT — TOUJOURS EN PREMIER
// ============================================================
const attachAll = () => {
  // Modal question
  document.getElementById('btn-modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal')?.addEventListener('click', e=>{ if(e.target.id==='modal') closeModal(); });
  document.getElementById('btn-valider')?.addEventListener('click', validateAnswer);
  document.getElementById('btn-hint')?.addEventListener('click', () => {
    const q=Q(curQid); if(!q) return;
    const ht=document.getElementById('hint-text'); ht.textContent=q.hint; ht.classList.remove('hidden');
    document.getElementById('btn-hint').classList.add('hidden');
  });

  // Header jeu
  document.getElementById('btn-finish')?.addEventListener('click', showResults);
  document.getElementById('btn-reset')?.addEventListener('click', resetGame);
  document.getElementById('btn-scan')?.addEventListener('click', openScanner);

  // Scanner
  document.getElementById('btn-scanner-close')?.addEventListener('click', closeScanner);
  document.getElementById('scanner-modal')?.addEventListener('click', e=>{ if(e.target.id==='scanner-modal') closeScanner(); });

  // Résultats
  document.getElementById('btn-check')?.addEventListener('click', checkWords);
  document.getElementById('btn-reset-dd')?.addEventListener('click', resetDD);
  document.getElementById('btn-go-victory')?.addEventListener('click', showVictory);
  document.getElementById('btn-resume')?.addEventListener('click', () => {
    QUESTIONS.forEach(q=>{ if(answered(q.id)&&!correct(q.id)) delete S.answers[q.id]; });
    save(); buildGrid(); updateProg(); show('screen-game');
  });
  document.getElementById('btn-share')?.addEventListener('click', shareScore);
  document.getElementById('btn-restart-results')?.addEventListener('click', resetGame);

  // Victoire
  document.getElementById('btn-share-victory')?.addEventListener('click', shareScore);
  document.getElementById('btn-restart-victory')?.addEventListener('click', resetGame);

  // Clavier
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
};

const init = () => {
  load();
  attachAll(); // ← TOUJOURS EN PREMIER — tous les événements sont actifs quelle que soit l'entrée

  const access = resolveAccess();

  if(access.type==='denied'){
    show('screen-denied');
    return;
  }

  if(access.type==='correction'){
    buildCorrection();
    show('screen-correction');
    return;
  }

  refreshBands();
  buildGrid();
  updateProg();

  if(access.type==='question'){
    const qid = access.qid;
    S.unlocked[qid]=true; S.started=true; save();
    show('screen-game');
    if(!answered(qid)) setTimeout(()=>openModal(qid), 350);
    return;
  }

  // welcome
  show(S.started && doneCount()>0 ? 'screen-game' : 'screen-welcome');
};

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
else init();
