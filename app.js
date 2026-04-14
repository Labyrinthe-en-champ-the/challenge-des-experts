'use strict';
// ============================================================
// APP.JS — Tout en un · Challenge des Experts v3
// Labyrinthe En-Champ-Thé · Grand-Coude · La Réunion
// ============================================================

// ============================================================
// TOKENS
// ============================================================
const ACCESS_TOKEN     = 'ECT2025-GRANDCOUDE';
const CORRECTION_TOKEN = 'CORR-ECT-STAFF-2025';

const QR_TOKENS = {
  '7x9mK2pLqR': 1,  'Qr4nW8vZbT': 2,  'Hj2sY6cNwX': 3,
  'Pf5tA3mKdL': 4,  'Zc8rV1nJyQ': 5,  'Wm3hB9sEkU': 6,
  'Tn6xC4pGfI': 7,  'Lb7uD2wMrO': 8,  'Xk1vF8jHnS': 9,
  'Gy4oE5cPtA': 10, 'Rf9iN3bQlW': 11, 'Vd2yM7kZeX': 12,
  'Jn5pT1sRoC': 13, 'Uh8wK6mFqB': 14, 'Ec3bL9nGvY': 15,
  'Aw6jP4hXiD': 16, 'Sq1mR7tNkF': 17
};

// ============================================================
// DISPOSITION DES LETTRES
// ============================================================
const WORD_LAYOUT = [
  { questionId: 1,  char: 'P', wordIndex: 0, posInWord: 0 },
  { questionId: 2,  char: 'A', wordIndex: 0, posInWord: 1 },
  { questionId: 3,  char: 'T', wordIndex: 0, posInWord: 2 },
  { questionId: 4,  char: 'R', wordIndex: 0, posInWord: 3 },
  { questionId: 5,  char: 'I', wordIndex: 0, posInWord: 4 },
  { questionId: 6,  char: 'M', wordIndex: 0, posInWord: 5 },
  { questionId: 7,  char: 'O', wordIndex: 0, posInWord: 6 },
  { questionId: 8,  char: 'I', wordIndex: 0, posInWord: 7 },
  { questionId: 9,  char: 'N', wordIndex: 0, posInWord: 8 },
  { questionId: 10, char: 'E', wordIndex: 0, posInWord: 9 },
  { questionId: 11, char: 'T', wordIndex: 1, posInWord: 0 },
  { questionId: 12, char: 'E', wordIndex: 1, posInWord: 1 },
  { questionId: 13, char: 'R', wordIndex: 1, posInWord: 2 },
  { questionId: 14, char: 'R', wordIndex: 1, posInWord: 3 },
  { questionId: 15, char: 'O', wordIndex: 1, posInWord: 4 },
  { questionId: 16, char: 'I', wordIndex: 1, posInWord: 5 },
  { questionId: 17, char: 'R', wordIndex: 1, posInWord: 6 }
];

// ============================================================
// ILLUSTRATIONS SVG
// ============================================================
const SVG = {
  1:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><circle cx="150" cy="62" r="40" fill="#2D5A3D" stroke="#D4AF37" stroke-width="2"/><circle cx="150" cy="50" r="20" fill="#4A8C5C"/><rect x="130" y="70" width="40" height="28" rx="4" fill="#4A8C5C"/><line x1="100" y1="98" x2="200" y2="98" stroke="#D4AF37" stroke-width="1"/><text x="150" y="120" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia">Henri Boisjoli-Potier</text><text x="150" y="138" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Pionnier du géranium · 1887</text></svg>`,
  2:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><path d="M0 110 Q75 70 150 90 Q225 110 300 80 L300 160 L0 160 Z" fill="#2D5A3D"/><path d="M0 130 Q75 100 150 115 Q225 130 300 105 L300 160 L0 160 Z" fill="#4A8C5C" opacity="0.5"/><circle cx="80" cy="85" r="7" fill="#D4AF37" opacity="0.8"/><circle cx="165" cy="75" r="6" fill="#D4AF37" opacity="0.6"/><circle cx="235" cy="68" r="7" fill="#D4AF37" opacity="0.7"/><text x="150" y="142" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia">Bagatelle et Menciole</text><text x="150" y="156" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Premières expérimentations</text></svg>`,
  3:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><rect x="65" y="18" width="170" height="100" rx="4" fill="#F7F4EE" opacity="0.95"/><rect x="65" y="18" width="170" height="22" rx="4" fill="#2D5A3D"/><text x="150" y="34" text-anchor="middle" fill="#D4AF37" font-size="9" font-family="Georgia">RAPPORT EXPERT · 1957</text><line x1="80" y1="54" x2="220" y2="54" stroke="#2D5A3D" stroke-width="1" opacity="0.3"/><line x1="80" y1="66" x2="205" y2="66" stroke="#2D5A3D" stroke-width="1" opacity="0.3"/><line x1="80" y1="78" x2="210" y2="78" stroke="#2D5A3D" stroke-width="1" opacity="0.3"/><text x="150" y="108" text-anchor="middle" fill="#2D5A3D" font-size="8" font-family="Georgia" font-style="italic">"Thé de qualité et potentiel d'avenir"</text><text x="150" y="138" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Novembre 1957</text></svg>`,
  4:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><rect x="25" y="90" width="35" height="55" fill="#4A8C5C" rx="2"/><rect x="70" y="75" width="35" height="70" fill="#4A8C5C" rx="2"/><rect x="115" y="82" width="35" height="63" fill="#4A8C5C" rx="2"/><rect x="160" y="55" width="35" height="90" fill="#D4AF37" rx="2" opacity="0.85"/><rect x="205" y="68" width="35" height="77" fill="#4A8C5C" rx="2"/><text x="177" y="50" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia" font-weight="bold">2 000 ha</text><text x="150" y="155" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Objectif · Services Agricoles</text></svg>`,
  5:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><circle cx="100" cy="58" r="28" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/><circle cx="100" cy="48" r="14" fill="#4A8C5C"/><rect x="86" y="65" width="28" height="20" rx="3" fill="#4A8C5C"/><circle cx="200" cy="58" r="28" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/><circle cx="200" cy="48" r="14" fill="#4A8C5C"/><rect x="186" y="65" width="28" height="20" rx="3" fill="#4A8C5C"/><path d="M128 65 L172 65" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="3,2"/><text x="100" y="110" text-anchor="middle" fill="#D4AF37" font-size="9" font-family="Georgia">Charles Payet</text><text x="200" y="110" text-anchor="middle" fill="#D4AF37" font-size="9" font-family="Georgia">Yves Mondon</text><text x="150" y="138" text-anchor="middle" fill="#8FBA9F" font-size="10" font-family="Georgia">Pionniers · Grand-Coude 1959</text></svg>`,
  6:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><rect x="25" y="38" width="95" height="70" rx="3" fill="#2D5A3D" stroke="#8FBA9F" stroke-width="1"/><text x="72" y="75" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">La Réunion</text><rect x="180" y="38" width="95" height="70" rx="3" fill="#2D5A3D" stroke="#D4AF37" stroke-width="2"/><text x="228" y="68" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia">Londres</text><text x="228" y="84" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">Bourse du thé</text><path d="M120 73 L180 73" stroke="#D4AF37" stroke-width="2"/><polygon points="178,68 188,73 178,78" fill="#D4AF37"/><text x="150" y="135" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia">Thé de Bourbon valorisé · 1960</text></svg>`,
  7:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><text x="150" y="52" text-anchor="middle" fill="#D4AF37" font-size="34" font-family="Georgia" font-weight="bold">27</text><text x="150" y="72" text-anchor="middle" fill="#8FBA9F" font-size="10" font-family="Georgia">planteurs de Grand-Coude</text><line x1="55" y1="82" x2="245" y2="82" stroke="#2D5A3D" stroke-width="1"/><text x="150" y="108" text-anchor="middle" fill="#D4AF37" font-size="26" font-family="Georgia" font-weight="bold">5 t/ha</text><text x="150" y="126" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Meilleur rendement de l'île · 1969</text></svg>`,
  8:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><rect x="55" y="18" width="190" height="100" rx="6" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/><rect x="55" y="18" width="190" height="24" rx="6" fill="#1A3A2A"/><text x="150" y="35" text-anchor="middle" fill="#D4AF37" font-size="9" font-family="Georgia">CONSEIL GÉNÉRAL</text><text x="150" y="60" text-anchor="middle" fill="#F7F4EE" font-size="14" font-family="Georgia" font-weight="bold">4 janvier 1972</text><text x="150" y="82" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia" font-style="italic">Vote de l'arrêt de la culture du thé</text><path d="M130 100 L150 118 L170 100 Z" fill="#C0392B" opacity="0.7"/><text x="150" y="138" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Fin de la première aventure</text></svg>`,
  9:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><rect x="30" y="28" width="95" height="80" rx="6" fill="#2D5A3D" stroke="#8FBA9F" stroke-width="1"/><text x="77" y="52" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">1960</text><text x="77" y="74" text-anchor="middle" fill="#D4AF37" font-size="16" font-family="Georgia" font-weight="bold">3,82</text><text x="77" y="90" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">francs</text><rect x="175" y="28" width="95" height="80" rx="6" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/><text x="222" y="52" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">1970</text><text x="222" y="74" text-anchor="middle" fill="#D4AF37" font-size="16" font-family="Georgia" font-weight="bold">5,62</text><text x="222" y="90" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">francs</text><path d="M125 68 L175 68" stroke="#C0392B" stroke-width="2"/><polygon points="173,63 183,68 173,73" fill="#C0392B"/><text x="150" y="138" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Coût de revient avant l'euro</text></svg>`,
  10:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><ellipse cx="150" cy="75" rx="65" ry="42" fill="#2D5A3D" stroke="#4A8C5C" stroke-width="1"/><ellipse cx="150" cy="75" rx="45" ry="28" fill="#1A3A2A" stroke="#2D5A3D" stroke-width="1"/><circle cx="182" cy="62" r="11" fill="#D4AF37" opacity="0.9"/><text x="182" y="66" text-anchor="middle" fill="#1A3A2A" font-size="6" font-family="Georgia" font-weight="bold">Assam</text><text x="150" y="128" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia">Camellia sinensis Assamica</text><text x="150" y="146" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Originaire d'Inde · Région d'Assam</text></svg>`,
  11:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><rect x="90" y="18" width="8" height="108" fill="#4A8C5C" rx="2"/><rect x="143" y="8" width="8" height="118" fill="#2D5A3D" rx="2"/><rect x="196" y="22" width="8" height="104" fill="#4A8C5C" rx="2"/><ellipse cx="94" cy="22" rx="20" ry="12" fill="#4A8C5C"/><ellipse cx="147" cy="12" rx="24" ry="14" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1"/><ellipse cx="200" cy="26" rx="18" ry="11" fill="#4A8C5C"/><line x1="32" y1="126" x2="42" y2="126" stroke="#D4AF37" stroke-width="1.5"/><line x1="37" y1="18" x2="37" y2="126" stroke="#D4AF37" stroke-width="1" stroke-dasharray="3,2"/><text x="20" y="22" fill="#D4AF37" font-size="7" font-family="Georgia">20m</text><text x="22" y="130" fill="#D4AF37" font-size="7" font-family="Georgia">0m</text><text x="150" y="150" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia">15 à 20 mètres de hauteur</text></svg>`,
  12:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><line x1="45" y1="138" x2="255" y2="138" stroke="#4A8C5C" stroke-width="1.5"/><circle cx="78" cy="133" r="5" fill="#8FBA9F"/><text x="78" y="152" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">An 1</text><circle cx="128" cy="128" r="6" fill="#8FBA9F"/><text x="128" y="152" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">An 2</text><circle cx="178" cy="115" r="8" fill="#4A8C5C"/><text x="178" y="152" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">An 3</text><circle cx="228" cy="90" r="13" fill="#D4AF37" stroke="#F0D060" stroke-width="2"/><text x="228" y="152" text-anchor="middle" fill="#D4AF37" font-size="8" font-family="Georgia">An 4-5</text><text x="228" y="94" text-anchor="middle" fill="#1A3A2A" font-size="9" font-weight="bold" font-family="Georgia">✓</text><text x="150" y="32" text-anchor="middle" fill="#D4AF37" font-size="13" font-family="Georgia" font-weight="bold">4 à 5 ans</text><text x="150" y="50" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">avant la première récolte</text></svg>`,
  13:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><rect x="15" y="28" width="75" height="90" rx="6" fill="#2D5A3D" stroke="#D4AF37" stroke-width="2"/><text x="52" y="52" text-anchor="middle" fill="#D4AF37" font-size="7" font-family="Georgia" font-weight="bold">IMPÉRIALE</text><text x="52" y="72" text-anchor="middle" fill="#F7F4EE" font-size="22">👑</text><text x="52" y="102" text-anchor="middle" fill="#8FBA9F" font-size="7" font-family="Georgia">1 bourgeon seul</text><rect x="112" y="42" width="70" height="76" rx="6" fill="#2D5A3D" stroke="#8FBA9F" stroke-width="1"/><text x="147" y="62" text-anchor="middle" fill="#8FBA9F" font-size="7" font-family="Georgia">FINE</text><text x="147" y="82" text-anchor="middle" fill="#F7F4EE" font-size="20">🌿</text><text x="147" y="108" text-anchor="middle" fill="#8FBA9F" font-size="7" font-family="Georgia">1 bourg. + 1 f.</text><rect x="205" y="55" width="70" height="63" rx="6" fill="#2D5A3D" stroke="#8FBA9F" stroke-width="1" opacity="0.8"/><text x="240" y="74" text-anchor="middle" fill="#8FBA9F" font-size="7" font-family="Georgia">CLASSIQUE</text><text x="240" y="94" text-anchor="middle" fill="#F7F4EE" font-size="18">🍃</text><text x="150" y="148" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Les 3 types de cueillette</text></svg>`,
  14:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><ellipse cx="150" cy="68" rx="52" ry="32" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/><ellipse cx="150" cy="68" rx="38" ry="20" fill="#4A8C5C"/><text x="150" y="73" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia" font-weight="bold">THÉ NOIR</text><rect x="118" y="98" width="64" height="32" rx="4" fill="#2D5A3D"/><ellipse cx="150" cy="98" rx="32" ry="5" fill="#4A8C5C"/><text x="150" y="120" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">Production historique</text><text x="150" y="148" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Seul thé produit par nos anciens</text></svg>`,
  15:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><path d="M25 125 Q80 78 150 88 Q220 98 275 62 L275 148 L25 148 Z" fill="#2D5A3D" opacity="0.7"/><path d="M25 138 Q80 108 150 116 Q220 124 275 98 L275 148 L25 148 Z" fill="#4A8C5C" opacity="0.5"/><rect x="122" y="28" width="56" height="30" rx="3" fill="#D4AF37" opacity="0.9"/><text x="150" y="48" text-anchor="middle" fill="#1A3A2A" font-size="12" font-family="Georgia" font-weight="bold">5 ha</text><line x1="150" y1="58" x2="150" y2="82" stroke="#D4AF37" stroke-width="1.5"/><text x="150" y="152" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia">5 hectares · Tables de récolte · 2005</text></svg>`,
  16:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><rect x="58" y="18" width="184" height="100" rx="6" fill="#F7F4EE" opacity="0.95"/><rect x="58" y="18" width="184" height="24" rx="6" fill="#2D5A3D"/><text x="150" y="35" text-anchor="middle" fill="#D4AF37" font-size="8" font-family="Georgia">RECONNAISSANCE OFFICIELLE</text><text x="150" y="70" text-anchor="middle" fill="#2D5A3D" font-size="24" font-family="Georgia" font-weight="bold">2014</text><text x="150" y="90" text-anchor="middle" fill="#4A8C5C" font-size="8" font-family="Georgia">"Plante aromatique et médicinale"</text><text x="150" y="138" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Classification administrative</text></svg>`,
  17:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="160" fill="#1A3A2A"/><circle cx="150" cy="68" r="46" fill="#2D5A3D" stroke="#D4AF37" stroke-width="3"/><circle cx="150" cy="68" r="34" fill="#1A3A2A" stroke="#D4AF37" stroke-width="1"/><text x="150" y="58" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia" font-weight="bold">AVPA</text><text x="150" y="74" text-anchor="middle" fill="#F7F4EE" font-size="8" font-family="Georgia">Médaille</text><text x="150" y="88" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia">2022</text><path d="M132 114 L150 132 L168 114" fill="#D4AF37"/><rect x="141" y="113" width="18" height="7" fill="#D4AF37"/><text x="150" y="150" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Agence pour la Valorisation des Productions Agricoles</text></svg>`
};

// ============================================================
// QUESTIONS + ANECDOTES
// ============================================================
const QUESTIONS = [
  { id:1, section:"Naissance du village", pancarte:"En 1887, Henri Boisjoli-Potier fut le premier à cultiver le géranium sur ses terres du Tampon. Cette culture parfumée allait transformer l'économie locale et préparer le terrain pour l'aventure du thé.", question:"Qui fut l'acteur principal de la culture du géranium à La Réunion ?", options:[{letter:"P",text:"MR Henri Boisjoli-Potier",correct:true},{letter:"B",text:"MR Charles Payet",correct:false}], hint:"Cherchez qui a initié cette culture sur ses terres au Tampon dès 1887.", anecdote:"Henri Boisjoli-Potier a introduit le géranium rosat à La Réunion depuis l'Algérie. L'huile essentielle de géranium réunionnais était surnommée 'l'or vert' de l'île et exportée pour parfumer les plus grands noms de la haute parfumerie française." },
  { id:2, section:"Transition Géranium / Thé", pancarte:"Après la crise du géranium dans les années 1950, les autorités agricoles cherchèrent une culture de substitution. Les premières expérimentations du thé furent menées à Bagatelle et à Menciole, deux lieux emblématiques des hauts de La Réunion.", question:"Dans quelles régions furent entreprises les premières expérimentations du thé à La Réunion ?", options:[{letter:"C",text:"Plaines des Palmiste et Grand Coude",correct:false},{letter:"A",text:"Bagatelle et Menciole",correct:true}], hint:"Les noms de lieux sont précis sur la pancarte.", anecdote:"Bagatelle et Menciole sont situées dans les hauts du Sud de La Réunion, à plus de 1000 mètres d'altitude. Ce climat frais et humide, très proche des grandes régions théicoles asiatiques, explique pourquoi ces sites furent choisis." },
  { id:3, section:"Début de l'aventure du Thé", pancarte:"En novembre 1957, un expert national fut dépêché à La Réunion pour évaluer le potentiel de la culture du thé. Après analyse des plantations expérimentales, il rendit un avis encourageant.", question:"Quelle est la conclusion qui ressort après examen de l'expert national en 1957 ?", options:[{letter:"T",text:"Thé de qualité et potentiel d'avenir",correct:true},{letter:"G",text:"Grand rendement et facilité de culture",correct:false}], hint:"L'expert a rédigé ses conclusions en novembre 1957.", anecdote:"L'expert envoyé en 1957 était spécialisé dans les cultures tropicales. Son rapport enthousiaste allait déclencher un programme de développement agricole ambitieux, avec des objectifs jamais atteints auparavant dans les DOM-TOM français." },
  { id:4, section:"Développement de l'aventure", pancarte:"Suite au rapport de 1957, la Direction des Services Agricoles de La Réunion élabora un programme ambitieux de développement de la culture du thé avec un objectif précis à long terme.", question:"Quels étaient les objectifs de la Direction des Services Agricoles à plus long terme ?", options:[{letter:"R",text:"Mise en culture de 2 000 hectares",correct:true},{letter:"S",text:"Favoriser l'exportation",correct:false}], hint:"Le programme prévoyait un chiffre précis d'hectares.", anecdote:"2 000 hectares de théiers auraient représenté une révolution agricole pour La Réunion. À titre de comparaison, les plus grandes plantations de thé en Europe n'atteignent pas ce chiffre aujourd'hui." },
  { id:5, section:"Développement (suite)", pancarte:"En 1959, deux agriculteurs de Grand-Coude décidèrent de se lancer dans la culture du thé dans leur village perché dans les hauts du Sud. Leurs noms sont restés dans l'histoire locale.", question:"En 1959, quels étaient les deux planteurs qui entreprirent la culture du thé sur le village de Grand-Coude ?", options:[{letter:"U",text:"Benoît Mondon et Harles Henri",correct:false},{letter:"I",text:"Charles Payet et Yves Mondon",correct:true}], hint:"Deux noms de familles emblématiques de Grand Coude.", anecdote:"Les familles Payet et Mondon sont encore aujourd'hui des noms bien connus à Grand-Coude. Leur pari sur le thé en 1959 était audacieux — ils misaient sur une culture quasi inconnue dans un village isolé à plus de 1 400 mètres d'altitude." },
  { id:6, section:"Commercialisation du thé", pancarte:"Dès 1960, le thé produit à La Réunion sous l'appellation 'Thé de Bourbon' fut introduit sur le marché international. Sa qualité lui permit d'accéder à la plus prestigieuse place de marché mondiale pour le thé.", question:"Où était valorisé le thé de Bourbon en 1960 ?", options:[{letter:"Y",text:"La Réunion",correct:false},{letter:"M",text:"Londres",correct:true}], hint:"Grande capitale européenne, siège d'une bourse de matières premières.", anecdote:"La Bourse du thé de Londres, fondée au XVIIe siècle, était le centre mondial du commerce du thé. Que le 'Thé de Bourbon' y soit coté dès 1960 est une reconnaissance extraordinaire pour une île française de l'océan Indien." },
  { id:7, section:"Restructuration à Grand Coude", pancarte:"Après quelques années de développement, Grand-Coude s'imposa comme le centre névralgique de la culture du thé réunionnais. En 1969, le village comptait 27 planteurs actifs qui réalisaient des performances remarquables.", question:"Quels sont les rendements des 27 planteurs de Grand-Coude ?", options:[{letter:"O",text:"5 tonnes/hectare",correct:true},{letter:"B",text:"6 tonnes/hectare",correct:false}], hint:"En 1969, ce chiffre représentait le meilleur rendement de l'île.", anecdote:"5 tonnes de feuilles fraîches par hectare est comparable aux plantations asiatiques. Pour obtenir 1 kg de thé sec, il faut environ 4 à 5 kg de feuilles fraîches. Les planteurs de Grand-Coude avaient maîtrisé leur culture en une dizaine d'années seulement." },
  { id:8, section:"Déclin et fin de l'aventure", pancarte:"Malgré la qualité reconnue du thé réunionnais, des difficultés économiques structurelles menèrent à une décision politique majeure qui sonna le glas de cette culture prometteuse.", question:"Quelle date signe la fin de l'aventure du thé de La Réunion par vote du Conseil Général ?", options:[{letter:"I",text:"Le 4 janvier 1972",correct:true},{letter:"R",text:"Le 1er janvier 1970",correct:false}], hint:"Une date précise est mentionnée sur la pancarte.", anecdote:"Le vote du 4 janvier 1972 fut un tournant dramatique pour les planteurs de Grand-Coude. Il faudra attendre 2005 pour que le thé renaisse à Grand-Coude, soit 33 ans plus tard." },
  { id:9, section:"Raisons de l'échec", pancarte:"L'arrêt de la culture du thé à La Réunion n'était pas dû à un manque de qualité du produit, mais à un problème économique fondamental : le coût de production était trop élevé face à la concurrence internationale.", question:"Quel est le coût de revient du thé de La Réunion en 1960 et 1970 ?", options:[{letter:"N",text:"3,82 francs en 1960 / 5,62 francs en 1970",correct:true},{letter:"C",text:"3,82 euros en 1960 / 5,62 euros en 1970",correct:false}], hint:"Attention à la monnaie : nous sommes avant l'euro !", anecdote:"La France n'est passée à l'euro qu'en 2002. Le coût de production élevé du thé réunionnais s'expliquait principalement par le coût de la main-d'œuvre locale, bien supérieur à celui des pays asiatiques producteurs." },
  { id:10, section:"Le Thé dans le monde", pancarte:"Le théier (Camellia sinensis) existe sous plusieurs variétés botaniques. La souche présente à La Réunion est l'Assamica, qui se distingue par ses grandes feuilles et sa robustesse.", question:"De quel pays provient la souche de thé présente à La Réunion, soit l'Assamica ?", options:[{letter:"A",text:"Chine",correct:false},{letter:"E",text:"Inde",correct:true}], hint:"'Assamica' fait référence à une région célèbre productrice de thé.", anecdote:"L'Assam est un État du nord-est de l'Inde, traversé par le Brahmapoutre. La variété Assamica produit un thé robuste avec des notes maltées. C'est grâce à cette variété que le thé a pu s'adapter au climat de La Réunion." },
  { id:11, section:"Le thé au naturel", pancarte:"À l'état sauvage, le théier est un arbre imposant. Dans le labyrinthe, vous pouvez observer des spécimens qui ont retrouvé leur taille naturelle, bien différente des buissons taillés des plantations commerciales.", question:"Les théiers présents dans le labyrinthe peuvent-ils atteindre combien de mètres ?", options:[{letter:"V",text:"10 à 12 mètres",correct:false},{letter:"T",text:"15 à 20 mètres",correct:true}], hint:"La pancarte précise la hauteur de la souche indienne.", anecdote:"Dans les plantations commerciales, les théiers sont taillés à 1 mètre pour faciliter la cueillette. Livrés à eux-mêmes comme dans le labyrinthe d'En-Champ-Thé, les Assamica peuvent atteindre des hauteurs vertigineuses. Certains arbres ont plus de 50 ans !" },
  { id:12, section:"Le thé cultivé", pancarte:"La culture du thé demande beaucoup de patience. Contrairement à certaines cultures maraîchères, le théier requiert plusieurs années avant de livrer sa première récolte de qualité.", question:"Au bout de combien d'années un théier devient-il productif ?", options:[{letter:"D",text:"2 à 3 ans",correct:false},{letter:"E",text:"4 à 5 ans",correct:true}], hint:"La pancarte sur le thé cultivé donne cette information.", anecdote:"Un théier bien entretenu peut vivre et produire pendant plus de 100 ans. À En-Champ-Thé, certains théiers datent de la première période de culture des années 1960 — ils ont donc plus de 60 ans !" },
  { id:13, section:"Cueillir le thé", pancarte:"La qualité d'un thé commence dans la main de celui qui cueille. Selon le degré d'exigence, la cueillette sélectionne différentes parties du bourgeon terminal.", question:"Quelles sont les trois types de cueillettes existantes ?", options:[{letter:"R",text:"Impériale ; fine ; classique",correct:true},{letter:"W",text:"Royal ; fine ; basic",correct:false}], hint:"L'une était autrefois réservée aux empereurs...", anecdote:"La cueillette impériale ne prélève que le tout premier bourgeon de la tige. En Chine ancienne, cette récolte était réservée exclusivement à l'Empereur. Aujourd'hui, les thés issus de cueillette impériale atteignent plusieurs milliers d'euros le kilo." },
  { id:14, section:"Les différentes sortes de thé", pancarte:"Toutes les variétés de thé — blanc, vert, oolong, noir — proviennent de la même plante : le Camellia sinensis. C'est le processus de transformation après la cueillette qui détermine le type de thé obtenu.", question:"Auparavant, quelle sorte de thé était produite par nos anciens ?", options:[{letter:"L",text:"Thé blanc et noir",correct:false},{letter:"R",text:"Thé noir",correct:true}], hint:"La note en bas de la pancarte sur les sortes de thé.", anecdote:"Le thé noir représente environ 75% de la production mondiale. Sa fabrication implique une étape de fermentation complète qui lui donne sa couleur sombre et ses arômes puissants. C'est ce type que produisaient les planteurs de Grand-Coude." },
  { id:15, section:"La culture du Thé relancée", pancarte:"Après 33 ans d'abandon, la culture du thé a été relancée à Grand-Coude en 2005. C'est dans ce contexte de renaissance que le Labyrinthe En-Champ-Thé a été créé.", question:"Quelles surfaces occupent aujourd'hui les tables de récolte aménagées au labyrinthe ?", options:[{letter:"O",text:"5 hectares",correct:true},{letter:"I",text:"10 hectares",correct:false}], hint:"La superficie est mentionnée en lien avec la relance de 2005.", anecdote:"5 hectares de théiers représentent environ 7 terrains de football. La relance de 2005 a fait du Labyrinthe En-Champ-Thé le plus important producteur de thé français, titre qu'il détient encore aujourd'hui." },
  { id:16, section:"L'avenir de la culture", pancarte:"La reconnaissance administrative de la culture du thé à La Réunion a constitué une étape importante pour la filière. Cette classification officielle a ouvert de nouvelles perspectives économiques.", question:"En quelle année la culture du thé a-t-elle été reconnue comme 'plante aromatique et médicinale' ?", options:[{letter:"I",text:"2014",correct:true},{letter:"H",text:"2005",correct:false}], hint:"Ce n'est pas l'année de la relance, mais une reconnaissance ultérieure.", anecdote:"La classification du thé comme 'plante aromatique et médicinale' en 2014 a eu des conséquences concrètes sur la fiscalité et les aides agricoles. Elle a aussi permis de développer la gamme de thés médicinaux proposée à la boutique." },
  { id:17, section:"2022 : année des Médailles", pancarte:"L'année 2022 a été exceptionnelle pour le Labyrinthe En-Champ-Thé, avec une reconnaissance internationale de la qualité de ses productions lors d'un concours mondial prestigieux.", question:"Comment se nomme l'agence qui récompense 'les thés du monde', dont on a été primé en 2022 ?", options:[{letter:"E",text:"CITM — Concours International des Thés du Monde",correct:false},{letter:"R",text:"AVPA — Agence pour la Valorisation des Productions Agricoles",correct:true}], hint:"Le nom complet de l'agence est écrit sur la dernière pancarte.", anecdote:"L'AVPA est reconnue internationalement pour la rigueur de ses dégustations à l'aveugle. Être récompensé place le thé d'En-Champ-Thé parmi les meilleurs thés du monde, rivalisant avec les grands crus asiatiques et africains." }
];

// ============================================================
// ÉTAT + PERSISTANCE
// ============================================================
const STORAGE_KEY = 'ect_v3';
let gameState = { answers:{}, unlocked:{}, started:false };

function saveState()  { try{localStorage.setItem(STORAGE_KEY,JSON.stringify(gameState));}catch(e){} }
function loadState()  { try{const r=localStorage.getItem(STORAGE_KEY);if(r)gameState={...gameState,...JSON.parse(r)};}catch(e){} }
function clearState() { try{localStorage.removeItem(STORAGE_KEY);}catch(e){}; gameState={answers:{},unlocked:{},started:false}; }
function isUnlocked(id)  { return !!gameState.unlocked[id]; }
function hasAnswered(id) { return gameState.answers[id]!==undefined; }
function isCorrect(id)   { const q=QUESTIONS.find(x=>x.id===id); if(!q)return false; return q.options.find(o=>o.correct)?.letter===gameState.answers[id]; }
function answeredCount() { return Object.keys(gameState.answers).length; }

// ============================================================
// NAVIGATION
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const el=document.getElementById(id);
  if(el){el.classList.add('active');window.scrollTo(0,0);}
}

function resolveAccess() {
  const p=new URLSearchParams(window.location.search);
  const access=p.get('access'), token=p.get('t'), corr=p.get('correction');
  if(corr===CORRECTION_TOKEN) return {screen:'correction'};
  if(access===ACCESS_TOKEN)   return {screen:'welcome'};
  if(token&&QR_TOKENS[token]) return {screen:'question',questionId:QR_TOKENS[token]};
  return {screen:'denied'};
}

// ============================================================
// BANDES DE LETTRES
// ============================================================
function buildLetterRow(container, wordIndex) {
  container.innerHTML='';
  WORD_LAYOUT.filter(l=>l.wordIndex===wordIndex)
    .sort((a,b)=>a.posInWord-b.posInWord)
    .forEach(l=>{
      const box=document.createElement('div');
      box.classList.add('letter-box');
      box.dataset.questionId=l.questionId;
      box.dataset.char=l.char;
      container.appendChild(box);
    });
}

function refreshLetterBands() {
  ['welcome-word1','strip-word1'].forEach(id=>{const el=document.getElementById(id);if(el)buildLetterRow(el,0);});
  ['welcome-word2','strip-word2'].forEach(id=>{const el=document.getElementById(id);if(el)buildLetterRow(el,1);});
}

// ============================================================
// GRILLE
// ============================================================
function buildQuestionGrid() {
  const grid=document.getElementById('questions-grid');
  if(!grid)return;
  grid.innerHTML='';
  QUESTIONS.forEach(q=>{
    const card=document.createElement('button');
    card.classList.add('question-card');
    card.dataset.id=q.id;
    if(hasAnswered(q.id)){
      card.classList.add('answered');
      card.innerHTML=`<span class="card-num">${String(q.id).padStart(2,'0')}</span><span class="card-section">${q.section}</span><span class="card-check">✓</span>`;
      card.disabled=true;
    } else if(isUnlocked(q.id)){
      card.innerHTML=`<span class="card-num">${String(q.id).padStart(2,'0')}</span><span class="card-section">${q.section}</span>`;
      card.addEventListener('click',()=>openModal(q.id));
    } else {
      card.classList.add('locked');
      card.innerHTML=`<span class="card-num">${String(q.id).padStart(2,'0')}</span><span class="card-section">${q.section}</span><span class="card-scan-msg">Scannez la pancarte<br/>pour débloquer</span>`;
      card.disabled=true;
    }
    grid.appendChild(card);
  });
}

function updateProgress() {
  const count=answeredCount();
  const el=document.getElementById('progress-text');
  const fill=document.getElementById('progress-fill');
  const bar=document.querySelector('.progress-bar');
  if(el)   el.textContent=`${count} / 17`;
  if(fill) fill.style.width=`${Math.round(count/17*100)}%`;
  if(bar)  bar.setAttribute('aria-valuenow',count);
}

// ============================================================
// MODAL
// ============================================================
let currentQId=null, selectedLetter=null;

function openModal(questionId) {
  const q=QUESTIONS.find(x=>x.id===questionId);
  if(!q)return;
  currentQId=questionId; selectedLetter=null;
  document.getElementById('modal-num').textContent=String(q.id).padStart(2,'0');
  document.getElementById('modal-title').textContent=q.section;
  document.getElementById('modal-pancarte').textContent=q.pancarte;
  document.getElementById('modal-question').textContent=q.question;
  const illus=document.getElementById('modal-illustration');
  if(illus&&SVG[q.id])illus.innerHTML=SVG[q.id];
  document.getElementById('btn-hint').classList.add('hidden');
  const hb=document.getElementById('hint-box');hb.classList.add('hidden');hb.textContent='';
  document.getElementById('answer-confirm').classList.add('hidden');
  const opts=document.getElementById('modal-options');opts.innerHTML='';
  q.options.forEach(opt=>{
    const btn=document.createElement('button');
    btn.classList.add('option-btn');
    btn.dataset.letter=opt.letter;
    btn.innerHTML=`<span class="option-letter">${opt.letter}</span><span class="option-sep">/</span><span class="option-text">${opt.text}</span>`;
    btn.addEventListener('click',()=>selectOption(btn,opt.letter));
    opts.appendChild(btn);
  });
  const overlay=document.getElementById('modal-overlay');
  overlay.classList.remove('hidden');
  setTimeout(()=>document.getElementById('btn-close-modal').focus(),100);
}

function selectOption(btn,letter) {
  document.querySelectorAll('.option-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedLetter=letter;
  const q=QUESTIONS.find(x=>x.id===currentQId);
  const confirm=document.getElementById('answer-confirm');
  document.getElementById('confirm-text').innerHTML=`Vous avez choisi : <strong>${letter} / ${q.options.find(o=>o.letter===letter)?.text}</strong> — Confirmer ?`;
  confirm.classList.remove('hidden');
}

function validateAnswer() {
  if(!selectedLetter||!currentQId)return;
  gameState.answers[currentQId]=selectedLetter;
  saveState();
  updateGridCard(currentQId);
  updateProgress();
  setTimeout(closeModal,300);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  currentQId=null; selectedLetter=null;
}

function updateGridCard(qid) {
  const card=document.querySelector(`.question-card[data-id="${qid}"]`);
  if(!card)return;
  const q=QUESTIONS.find(x=>x.id===qid);
  card.classList.remove('locked'); card.classList.add('answered'); card.disabled=true;
  card.innerHTML=`<span class="card-num">${String(qid).padStart(2,'0')}</span><span class="card-section">${q.section}</span><span class="card-check">✓</span>`;
}

function resetGame() {
  if(!confirm('Réinitialiser toute votre progression ?'))return;
  clearState(); refreshLetterBands(); buildQuestionGrid(); updateProgress();
  showScreen('screen-welcome');
}

// ============================================================
// RÉSULTATS
// ============================================================
function getMention(s) {
  if(s===17) return "Expert absolu du Labyrinthe En-Champ-Thé ! 🏅";
  if(s>=15)  return "Excellent ! Vous maîtrisez l'histoire du thé réunionnais.";
  if(s>=12)  return "Très bien ! Quelques secrets du labyrinthe vous ont résisté...";
  if(s>=8)   return "Bien ! Continuez l'exploration pour découvrir tous les secrets.";
  if(s>=5)   return "Vous débutez votre exploration — il reste tant à découvrir !";
  return "Le labyrinthe garde encore bien ses secrets...";
}

function showResults() {
  let correct=0;
  QUESTIONS.forEach(q=>{if(isCorrect(q.id))correct++;});
  document.getElementById('score-value').textContent=correct;
  document.getElementById('score-mention').textContent=getMention(correct);
  const list=document.getElementById('results-list');
  list.innerHTML='';
  QUESTIONS.forEach(q=>{
    const given=gameState.answers[q.id];
    const correctOpt=q.options.find(o=>o.correct);
    const givenOpt=q.options.find(o=>o.letter===given);
    const isRight=given&&correctOpt?.letter===given;
    const skipped=!given;
    const item=document.createElement('div');
    item.className=`result-item ${skipped?'skipped':isRight?'correct':'incorrect'}`;
    item.innerHTML=`
      <div class="result-top">
        <span class="result-num">Pancarte ${String(q.id).padStart(2,'0')}</span>
        <span class="result-status">${skipped?'⬜':isRight?'✅':'❌'}</span>
      </div>
      <div class="result-question">${q.question}</div>
      <div class="result-answer">
        <span class="result-letter ${isRight||skipped?'':'wrong'}">${skipped?'?':correctOpt.letter}</span>
        ${skipped?'<em style="color:rgba(255,255,255,0.4)">Non répondue</em>':correctOpt.text}
      </div>
      ${!isRight&&!skipped?`<div style="font-size:0.76rem;color:var(--error);margin-top:0.2rem;">Votre réponse : ${givenOpt?.letter} / ${givenOpt?.text}</div>`:''}
      <button class="anecdote-toggle">💡 Le saviez-vous ?</button>
      <div class="result-anecdote hidden">${q.anecdote}</div>`;
    const toggle=item.querySelector('.anecdote-toggle');
    const anec=item.querySelector('.result-anecdote');
    toggle.addEventListener('click',()=>{
      anec.classList.toggle('hidden');
      toggle.textContent=anec.classList.contains('hidden')?'💡 Le saviez-vous ?':'▲ Réduire';
    });
    list.appendChild(item);
  });
  buildDragDrop(correct);
  showScreen('screen-results');
}

// ============================================================
// DRAG & DROP
// ============================================================
const WORDS=['PATRIMOINE','TERROIR'];
let draggedEl=null;

function buildDragDrop(correct) {
  const pool=document.getElementById('letters-pool');
  const targets=document.getElementById('words-targets');
  const subtitle=document.getElementById('dragdrop-subtitle');
  pool.innerHTML=''; targets.innerHTML='';
  const earned=WORD_LAYOUT.filter(l=>isCorrect(l.questionId));
  if(earned.length===0){
    pool.innerHTML=`<p style="color:var(--sprout);font-size:0.85rem;font-style:italic;text-align:center;width:100%;">Répondez correctement aux questions pour débloquer des lettres !</p>`;
    return;
  }
  subtitle.textContent=`${earned.length} lettre${earned.length>1?'s':''} débloquée${earned.length>1?'s':''}. Glissez-les dans les cases !`;
  const shuffled=[...earned].sort(()=>Math.random()-0.5);
  shuffled.forEach((l,i)=>{
    const el=document.createElement('div');
    el.classList.add('drag-letter');
    el.textContent=l.char; el.dataset.char=l.char; el.dataset.idx=i;
    el.setAttribute('draggable','true');
    el.addEventListener('dragstart',e=>{draggedEl=el;e.dataTransfer.setData('text',l.char);setTimeout(()=>el.classList.add('dragging'),0);});
    el.addEventListener('dragend',()=>{el.classList.remove('dragging');draggedEl=null;});
    el.addEventListener('touchstart',onTouchStart,{passive:false});
    el.addEventListener('touchmove',onTouchMove,{passive:false});
    el.addEventListener('touchend',onTouchEnd);
    pool.appendChild(el);
  });
  WORDS.forEach((word,wi)=>{
    const row=document.createElement('div'); row.className='word-target-row';
    const lbl=document.createElement('div'); lbl.className='word-target-label';
    lbl.textContent=wi===0?'Premier mot (10 lettres)':'Deuxième mot (7 lettres)';
    const slots=document.createElement('div'); slots.className='word-slots'; slots.dataset.wi=wi;
    for(let i=0;i<word.length;i++){
      const slot=document.createElement('div'); slot.classList.add('drop-slot');
      slot.dataset.wi=wi; slot.dataset.pos=i;
      slot.addEventListener('dragover',e=>{e.preventDefault();if(!slot.classList.contains('filled'))slot.classList.add('drag-over');});
      slot.addEventListener('dragleave',()=>slot.classList.remove('drag-over'));
      slot.addEventListener('drop',e=>{e.preventDefault();slot.classList.remove('drag-over');if(draggedEl&&!slot.classList.contains('filled'))placeInSlot(draggedEl,slot);});
      slot.addEventListener('click',()=>{if(!slot.classList.contains('filled'))return;returnToPool(slot);});
      slots.appendChild(slot);
    }
    row.appendChild(lbl); row.appendChild(slots); targets.appendChild(row);
  });
}

function placeInSlot(letterEl,slot) {
  slot.textContent=letterEl.dataset.char; slot.classList.add('filled');
  slot.dataset.placed=letterEl.dataset.char; slot.classList.remove('correct-slot','wrong-slot');
  letterEl.classList.add('placed');
}

function returnToPool(slot) {
  const ch=slot.dataset.placed;
  const pool=document.getElementById('letters-pool');
  const found=Array.from(pool.querySelectorAll('.drag-letter.placed')).find(el=>el.dataset.char===ch&&el.classList.contains('placed'));
  if(found)found.classList.remove('placed');
  slot.textContent=''; slot.classList.remove('filled','correct-slot','wrong-slot'); delete slot.dataset.placed;
}

// Touch drag
let touchEl=null,touchClone=null,touchOX=0,touchOY=0;
function onTouchStart(e){
  e.preventDefault(); touchEl=e.currentTarget;
  const t=e.touches[0],r=touchEl.getBoundingClientRect();
  touchOX=t.clientX-r.left; touchOY=t.clientY-r.top;
  touchClone=touchEl.cloneNode(true);
  touchClone.style.cssText=`position:fixed;z-index:9999;opacity:0.85;pointer-events:none;width:${r.width}px;height:${r.height}px;left:${r.left}px;top:${r.top}px;`;
  document.body.appendChild(touchClone); touchEl.classList.add('dragging');
}
function onTouchMove(e){
  e.preventDefault();if(!touchClone)return;
  const t=e.touches[0];
  touchClone.style.left=`${t.clientX-touchOX}px`; touchClone.style.top=`${t.clientY-touchOY}px`;
  document.querySelectorAll('.drop-slot').forEach(s=>s.classList.remove('drag-over'));
  touchClone.style.display='none';
  const el=document.elementFromPoint(t.clientX,t.clientY);
  touchClone.style.display='';
  if(el?.classList.contains('drop-slot')&&!el.classList.contains('filled'))el.classList.add('drag-over');
}
function onTouchEnd(e){
  if(!touchEl||!touchClone)return;
  const t=e.changedTouches[0];
  touchClone.style.display='none';
  const el=document.elementFromPoint(t.clientX,t.clientY);
  touchClone.style.display='';
  document.querySelectorAll('.drop-slot').forEach(s=>s.classList.remove('drag-over'));
  if(el?.classList.contains('drop-slot')&&!el.classList.contains('filled'))placeInSlot(touchEl,el);
  touchEl.classList.remove('dragging'); touchClone.remove(); touchClone=null; touchEl=null;
}

function checkWords() {
  const res=document.getElementById('dragdrop-result');
  let allOk=true,allFilled=true;
  WORDS.forEach((word,wi)=>{
    const slots=document.querySelectorAll(`.drop-slot[data-wi="${wi}"]`);
    let str='';
    slots.forEach(s=>{if(!s.classList.contains('filled')){allFilled=false;}else{str+=s.dataset.placed;}});
    if(str.length===word.length){
      slots.forEach((s,i)=>{
        const ok=s.dataset.placed===word[i];
        s.classList.toggle('correct-slot',ok); s.classList.toggle('wrong-slot',!ok);
        if(!ok)allOk=false;
      });
    } else allOk=false;
  });
  if(!allFilled){res.textContent='Placez toutes vos lettres avant de vérifier !';res.className='dragdrop-result error';return;}
  if(allOk){
    res.textContent='🎉 Bravo ! Vous avez trouvé les mots secrets !';res.className='dragdrop-result success';
    document.getElementById('btn-victory-go')?.classList.remove('hidden');
  } else {
    res.textContent='Certaines lettres ne sont pas à la bonne place... Réessayez !';res.className='dragdrop-result error';
  }
}

function resetDragDrop() {
  document.querySelectorAll('.drag-letter').forEach(el=>el.classList.remove('placed'));
  document.querySelectorAll('.drop-slot').forEach(s=>{s.textContent='';s.classList.remove('filled','correct-slot','wrong-slot','drag-over');delete s.dataset.placed;});
  const r=document.getElementById('dragdrop-result');
  if(r){r.textContent='';r.className='dragdrop-result';}
  document.getElementById('btn-victory-go')?.classList.add('hidden');
}

// ============================================================
// VICTOIRE
// ============================================================
function showVictory() {
  const score=QUESTIONS.filter(q=>isCorrect(q.id)).length;
  const el=document.getElementById('victory-score');
  if(el)el.textContent=`Score : ${score} / 17`;
  showScreen('screen-victory');
  if(typeof confetti==='function'){
    const end=Date.now()+4000,colors=['#D4AF37','#4A8C5C','#8FBA9F','#F7F4EE'];
    (function frame(){
      confetti({particleCount:3,angle:60,spread:55,origin:{x:0},colors});
      confetti({particleCount:3,angle:120,spread:55,origin:{x:1},colors});
      if(Date.now()<end)requestAnimationFrame(frame);
    })();
  }
}

// ============================================================
// PARTAGE
// ============================================================
async function shareResult() {
  const score=QUESTIONS.filter(q=>isCorrect(q.id)).length;
  const text=`🍃 Je viens de terminer le Challenge des Experts du Labyrinthe En-Champ-Thé à La Réunion !\n\nScore : ${score}/17 questions réussies ✓\n\nEt toi, tu relèves le défi ? Viens découvrir les mots secrets... On t'attend ! 🍃\n\n📍 Grand-Coude · La Réunion`;
  try {
    if(navigator.share){await navigator.share({text});return;}
  } catch(e){}
  // Fallback
  const modal=document.createElement('div');
  modal.style.cssText='position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;padding:1rem;';
  modal.innerHTML=`<div style="background:#F7F4EE;border-radius:12px;padding:1.5rem;max-width:380px;width:100%;color:#1A3A2A;text-align:center;"><h3 style="font-family:Georgia,serif;margin-bottom:0.75rem;">Partager ma réussite</h3><textarea readonly style="width:100%;height:110px;border:1px solid #2D5A3D;border-radius:8px;padding:0.65rem;font-size:0.8rem;resize:none;">${text}</textarea><div style="display:flex;gap:0.65rem;margin-top:0.85rem;justify-content:center;flex-wrap:wrap;"><button id="btn-cp" style="background:#D4AF37;color:#1A3A2A;border:none;border-radius:50px;padding:0.55rem 1.25rem;font-weight:700;cursor:pointer;">📋 Copier</button><a href="https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}" target="_blank" style="background:#1877F2;color:white;border-radius:50px;padding:0.55rem 1.25rem;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;">Facebook</a><button id="btn-cls" style="background:transparent;color:#4A8C5C;border:1px solid #4A8C5C;border-radius:50px;padding:0.55rem 1rem;cursor:pointer;">Fermer</button></div></div>`;
  document.body.appendChild(modal);
  modal.querySelector('#btn-cp').addEventListener('click',()=>{navigator.clipboard?.writeText(text).then(()=>{modal.querySelector('#btn-cp').textContent='✓ Copié!';});});
  modal.querySelector('#btn-cls').addEventListener('click',()=>modal.remove());
  modal.addEventListener('click',e=>{if(e.target===modal)modal.remove();});
}

// ============================================================
// SCANNER
// ============================================================
let scanStream=null,scanActive=false;

function openScanner() {document.getElementById('scanner-overlay').classList.remove('hidden');startCamera();}
function closeScanner() {stopCamera();document.getElementById('scanner-overlay').classList.add('hidden');}

async function startCamera(){
  try {
    scanStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment',width:{ideal:640},height:{ideal:480}}});
    const video=document.getElementById('scanner-video');
    video.srcObject=scanStream; await video.play();
    scanActive=true; requestAnimationFrame(scanFrame);
  } catch(e){showScanErr();}
}

function stopCamera(){
  scanActive=false;
  if(scanStream){scanStream.getTracks().forEach(t=>t.stop());scanStream=null;}
}

function scanFrame(){
  if(!scanActive)return;
  const video=document.getElementById('scanner-video');
  if(!video||video.readyState!==video.HAVE_ENOUGH_DATA){requestAnimationFrame(scanFrame);return;}
  const canvas=document.createElement('canvas');
  canvas.width=video.videoWidth; canvas.height=video.videoHeight;
  const ctx=canvas.getContext('2d'); ctx.drawImage(video,0,0);
  try {
    if(typeof jsQR!=='undefined'){
      const code=jsQR(ctx.getImageData(0,0,canvas.width,canvas.height).data,canvas.width,canvas.height);
      if(code?.data){handleScannedUrl(code.data);return;}
    }
  } catch(e){}
  if(scanActive)requestAnimationFrame(scanFrame);
}

function handleScannedUrl(url){
  stopCamera(); closeScanner();
  try {
    const p=new URL(url);
    const token=p.searchParams.get('t'), access=p.searchParams.get('access');
    if(access===ACCESS_TOKEN){showScreen('screen-welcome');return;}
    if(token&&QR_TOKENS[token]){
      const qId=QR_TOKENS[token];
      gameState.unlocked[qId]=true; gameState.started=true; saveState();
      buildQuestionGrid(); updateProgress(); showScreen('screen-game');
      if(!hasAnswered(qId))setTimeout(()=>openModal(qId),400);
    } else showScanErr('QR code non reconnu.');
  } catch(e){showScanErr('QR code invalide.');}
}

function showScanErr(msg){
  const el=document.getElementById('scanner-error');
  if(el){el.textContent=msg||"Impossible d'accéder à la caméra. Vérifiez les autorisations.";el.classList.remove('hidden');}
}

// ============================================================
// CORRECTION
// ============================================================
function buildCorrectionScreen(){
  const grid=document.getElementById('correction-grid');if(!grid)return;grid.innerHTML='';
  QUESTIONS.forEach(q=>{
    const correct=q.options.find(o=>o.correct);
    const item=document.createElement('div');item.className='correction-item';
    item.innerHTML=`<div class="corr-num">${String(q.id).padStart(2,'0')}</div><div class="corr-body"><div class="corr-question">${q.question}</div><div class="corr-answer"><span class="corr-letter">${correct.letter}</span>${correct.text}</div></div>`;
    grid.appendChild(item);
  });
}

// ============================================================
// INIT
// ============================================================
function init(){
  loadState();
  const access=resolveAccess();
  if(access.screen==='denied'){showScreen('screen-denied');return;}
  if(access.screen==='correction'){buildCorrectionScreen();showScreen('screen-correction');return;}
  if(access.screen==='question'){
    const qId=access.questionId;
    gameState.unlocked[qId]=true; gameState.started=true; saveState();
    refreshLetterBands(); buildQuestionGrid(); updateProgress();
    showScreen('screen-game');
    if(!hasAnswered(qId))setTimeout(()=>openModal(qId),400);
    return;
  }
  // welcome
  refreshLetterBands(); buildQuestionGrid(); updateProgress();
  showScreen(gameState.started&&answeredCount()>0?'screen-game':'screen-welcome');

  // Événements
  document.getElementById('btn-close-modal')?.addEventListener('click',closeModal);
  document.getElementById('modal-overlay')?.addEventListener('click',e=>{if(e.target.id==='modal-overlay')closeModal();});
  document.getElementById('btn-validate-answer')?.addEventListener('click',validateAnswer);
  document.getElementById('btn-hint')?.addEventListener('click',()=>{
    const q=QUESTIONS.find(x=>x.id===currentQId);if(!q)return;
    const h=document.getElementById('hint-box');h.textContent=q.hint;h.classList.remove('hidden');
    document.getElementById('btn-hint').classList.add('hidden');
  });
  document.getElementById('btn-finish-header')?.addEventListener('click',showResults);
  document.getElementById('btn-restart-top')?.addEventListener('click',resetGame);
  document.getElementById('btn-check-word')?.addEventListener('click',checkWords);
  document.getElementById('btn-reset-drag')?.addEventListener('click',resetDragDrop);
  document.getElementById('btn-victory-go')?.addEventListener('click',showVictory);
  document.getElementById('btn-resume-game')?.addEventListener('click',()=>{
    QUESTIONS.forEach(q=>{if(hasAnswered(q.id)&&!isCorrect(q.id))delete gameState.answers[q.id];});
    saveState(); buildQuestionGrid(); updateProgress(); showScreen('screen-game');
  });
  document.getElementById('btn-share-result')?.addEventListener('click',shareResult);
  document.getElementById('btn-share-victory')?.addEventListener('click',shareResult);
  document.getElementById('btn-restart-results')?.addEventListener('click',resetGame);
  document.getElementById('btn-restart-victory')?.addEventListener('click',resetGame);
  document.getElementById('btn-scan-header')?.addEventListener('click',openScanner);
  document.getElementById('btn-close-scanner')?.addEventListener('click',closeScanner);
  document.getElementById('scanner-overlay')?.addEventListener('click',e=>{if(e.target.id==='scanner-overlay')closeScanner();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
