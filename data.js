'use strict';
// ============================================================
// DATA.JS — Questions, réponses, anecdotes, tokens, illustrations
// Labyrinthe En-Champ-Thé · Challenge des Experts v2
// ============================================================

const ACCESS_TOKEN      = 'ECT2025-GRANDCOUDE';
const CORRECTION_TOKEN  = 'CORR-ECT-STAFF-2025';

const QR_TOKENS = {
  '7x9mK2pLqR': 1,  'Qr4nW8vZbT': 2,  'Hj2sY6cNwX': 3,
  'Pf5tA3mKdL': 4,  'Zc8rV1nJyQ': 5,  'Wm3hB9sEkU': 6,
  'Tn6xC4pGfI': 7,  'Lb7uD2wMrO': 8,  'Xk1vF8jHnS': 9,
  'Gy4oE5cPtA': 10, 'Rf9iN3bQlW': 11, 'Vd2yM7kZeX': 12,
  'Jn5pT1sRoC': 13, 'Uh8wK6mFqB': 14, 'Ec3bL9nGvY': 15,
  'Aw6jP4hXiD': 16, 'Sq1mR7tNkF': 17
};

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

// Illustrations SVG inline par question
const SVG_ILLUSTRATIONS = {
  1: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <circle cx="150" cy="70" r="45" fill="#2D5A3D" stroke="#D4AF37" stroke-width="2"/>
    <circle cx="150" cy="58" r="22" fill="#4A8C5C"/>
    <rect x="128" y="80" width="44" height="30" rx="4" fill="#4A8C5C"/>
    <line x1="100" y1="110" x2="200" y2="110" stroke="#D4AF37" stroke-width="1.5"/>
    <text x="150" y="140" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia">Henri Boisjoli-Potier</text>
    <text x="150" y="158" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Pionnier du géranium · La Réunion</text>
    <ellipse cx="80" cy="90" rx="18" ry="10" fill="#2D5A3D" opacity="0.6"/>
    <ellipse cx="220" cy="85" rx="22" ry="12" fill="#2D5A3D" opacity="0.6"/>
  </svg>`,

  2: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <path d="M0 120 Q75 80 150 100 Q225 120 300 90 L300 180 L0 180 Z" fill="#2D5A3D"/>
    <path d="M0 140 Q75 110 150 125 Q225 140 300 115 L300 180 L0 180 Z" fill="#4A8C5C" opacity="0.5"/>
    <circle cx="80" cy="95" r="8" fill="#D4AF37" opacity="0.8"/>
    <circle cx="160" cy="85" r="6" fill="#D4AF37" opacity="0.6"/>
    <circle cx="230" cy="75" r="7" fill="#D4AF37" opacity="0.7"/>
    <text x="150" y="152" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia">Bagatelle et Menciole</text>
    <text x="150" y="168" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Premières terres d'expérimentation</text>
    <path d="M70 95 Q80 70 90 95" fill="#4A8C5C" stroke="#8FBA9F" stroke-width="1"/>
    <path d="M150 85 Q160 60 170 85" fill="#4A8C5C" stroke="#8FBA9F" stroke-width="1"/>
    <path d="M220 75 Q230 50 240 75" fill="#4A8C5C" stroke="#8FBA9F" stroke-width="1"/>
  </svg>`,

  3: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <rect x="60" y="25" width="180" height="120" rx="4" fill="#F7F4EE" opacity="0.95"/>
    <rect x="60" y="25" width="180" height="22" rx="4" fill="#2D5A3D"/>
    <text x="150" y="41" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia">RAPPORT EXPERT · 1957</text>
    <line x1="75" y1="60" x2="225" y2="60" stroke="#2D5A3D" stroke-width="1" opacity="0.4"/>
    <line x1="75" y1="72" x2="200" y2="72" stroke="#2D5A3D" stroke-width="1" opacity="0.3"/>
    <line x1="75" y1="84" x2="210" y2="84" stroke="#2D5A3D" stroke-width="1" opacity="0.3"/>
    <line x1="75" y1="96" x2="195" y2="96" stroke="#2D5A3D" stroke-width="1" opacity="0.3"/>
    <line x1="75" y1="108" x2="205" y2="108" stroke="#2D5A3D" stroke-width="1" opacity="0.3"/>
    <text x="150" y="128" text-anchor="middle" fill="#2D5A3D" font-size="9" font-family="Georgia" font-style="italic">"Thé de qualité et potentiel d'avenir"</text>
    <text x="150" y="162" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Novembre 1957 · Expert national</text>
  </svg>`,

  4: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <rect x="20" y="100" width="260" height="60" fill="#2D5A3D" rx="2"/>
    <rect x="20" y="85" width="40" height="75" fill="#4A8C5C" rx="2"/>
    <rect x="70" y="70" width="40" height="90" fill="#4A8C5C" rx="2"/>
    <rect x="120" y="90" width="40" height="70" fill="#4A8C5C" rx="2"/>
    <rect x="170" y="60" width="40" height="100" fill="#D4AF37" rx="2" opacity="0.8"/>
    <rect x="220" y="75" width="40" height="85" fill="#4A8C5C" rx="2"/>
    <text x="190" y="55" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia">2 000 ha</text>
    <line x1="20" y1="160" x2="280" y2="160" stroke="#8FBA9F" stroke-width="1" opacity="0.5"/>
    <text x="150" y="172" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Objectif · Direction Services Agricoles</text>
  </svg>`,

  5: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <circle cx="105" cy="65" r="32" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/>
    <circle cx="105" cy="55" r="16" fill="#4A8C5C"/>
    <rect x="88" y="72" width="34" height="22" rx="3" fill="#4A8C5C"/>
    <circle cx="195" cy="65" r="32" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/>
    <circle cx="195" cy="55" r="16" fill="#4A8C5C"/>
    <rect x="178" y="72" width="34" height="22" rx="3" fill="#4A8C5C"/>
    <path d="M137 75 L163 75" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="3,2"/>
    <text x="105" y="118" text-anchor="middle" fill="#D4AF37" font-size="9" font-family="Georgia">Charles Payet</text>
    <text x="195" y="118" text-anchor="middle" fill="#D4AF37" font-size="9" font-family="Georgia">Yves Mondon</text>
    <text x="150" y="145" text-anchor="middle" fill="#8FBA9F" font-size="10" font-family="Georgia">Pionniers du thé · Grand-Coude 1959</text>
  </svg>`,

  6: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <rect x="30" y="40" width="100" height="80" rx="3" fill="#2D5A3D" stroke="#8FBA9F" stroke-width="1"/>
    <text x="80" y="85" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">La Réunion</text>
    <rect x="170" y="40" width="100" height="80" rx="3" fill="#2D5A3D" stroke="#D4AF37" stroke-width="2"/>
    <text x="220" y="75" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia">Londres</text>
    <text x="220" y="92" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">Bourse du thé</text>
    <path d="M130 80 L170 80" stroke="#D4AF37" stroke-width="2" marker-end="url(#arr)"/>
    <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#D4AF37"/></marker></defs>
    <text x="150" y="148" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia">Valorisé à Londres · 1960</text>
    <text x="150" y="164" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Thé de Bourbon sur le marché mondial</text>
  </svg>`,

  7: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <text x="150" y="55" text-anchor="middle" fill="#D4AF37" font-size="36" font-family="Georgia" font-weight="bold">27</text>
    <text x="150" y="78" text-anchor="middle" fill="#8FBA9F" font-size="11" font-family="Georgia">planteurs de Grand-Coude</text>
    <line x1="50" y1="90" x2="250" y2="90" stroke="#2D5A3D" stroke-width="1"/>
    <text x="150" y="115" text-anchor="middle" fill="#D4AF37" font-size="28" font-family="Georgia" font-weight="bold">5 t/ha</text>
    <text x="150" y="135" text-anchor="middle" fill="#8FBA9F" font-size="10" font-family="Georgia">Meilleur rendement de l'île · 1969</text>
    <circle cx="60" cy="152" r="5" fill="#4A8C5C"/>
    <circle cx="80" cy="152" r="5" fill="#4A8C5C"/>
    <circle cx="100" cy="152" r="5" fill="#4A8C5C"/>
    <circle cx="120" cy="152" r="5" fill="#4A8C5C"/>
    <circle cx="140" cy="152" r="5" fill="#4A8C5C"/>
    <circle cx="160" cy="152" r="5" fill="#D4AF37"/>
    <text x="180" y="156" fill="#8FBA9F" font-size="8" font-family="Georgia">= 1 tonne</text>
  </svg>`,

  8: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <rect x="50" y="20" width="200" height="110" rx="6" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/>
    <rect x="50" y="20" width="200" height="28" rx="6" fill="#1A3A2A"/>
    <text x="150" y="39" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia">CONSEIL GÉNÉRAL</text>
    <text x="150" y="65" text-anchor="middle" fill="#F7F4EE" font-size="13" font-family="Georgia" font-weight="bold">4 janvier 1972</text>
    <line x1="70" y1="75" x2="230" y2="75" stroke="#8FBA9F" stroke-width="0.5" opacity="0.5"/>
    <text x="150" y="92" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia" font-style="italic">Vote de l'arrêt de la culture</text>
    <text x="150" y="108" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia" font-style="italic">du thé à La Réunion</text>
    <path d="M130 118 L150 140 L170 118 Z" fill="#C0392B" opacity="0.7"/>
    <text x="150" y="162" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Fin d'une époque · 1972</text>
  </svg>`,

  9: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <rect x="40" y="30" width="100" height="90" rx="6" fill="#2D5A3D" stroke="#8FBA9F" stroke-width="1"/>
    <text x="90" y="55" text-anchor="middle" fill="#8FBA9F" font-size="10" font-family="Georgia">1960</text>
    <text x="90" y="78" text-anchor="middle" fill="#D4AF37" font-size="16" font-family="Georgia" font-weight="bold">3,82</text>
    <text x="90" y="96" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">francs</text>
    <rect x="160" y="30" width="100" height="90" rx="6" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/>
    <text x="210" y="55" text-anchor="middle" fill="#8FBA9F" font-size="10" font-family="Georgia">1970</text>
    <text x="210" y="78" text-anchor="middle" fill="#D4AF37" font-size="16" font-family="Georgia" font-weight="bold">5,62</text>
    <text x="210" y="96" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">francs</text>
    <path d="M140 75 L160 75" stroke="#C0392B" stroke-width="2" marker-end="url(#arr2)"/>
    <defs><marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#C0392B"/></marker></defs>
    <text x="150" y="148" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Coût de revient · avant l'euro</text>
  </svg>`,

  10: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <ellipse cx="150" cy="85" rx="70" ry="45" fill="#2D5A3D" stroke="#4A8C5C" stroke-width="1"/>
    <ellipse cx="150" cy="85" rx="50" ry="30" fill="#1A3A2A" stroke="#2D5A3D" stroke-width="1"/>
    <circle cx="185" cy="72" r="12" fill="#D4AF37" opacity="0.85"/>
    <text x="185" y="76" text-anchor="middle" fill="#1A3A2A" font-size="7" font-family="Georgia" font-weight="bold">Assam</text>
    <path d="M185 84 L185 105 L150 105" stroke="#D4AF37" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="150" y="135" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia">Camellia sinensis Assamica</text>
    <text x="150" y="152" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Originaire d'Inde · Région d'Assam</text>
    <text x="150" y="166" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">Souche présente à La Réunion</text>
  </svg>`,

  11: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <rect x="88" y="20" width="8" height="120" fill="#4A8C5C" rx="2"/>
    <rect x="138" y="10" width="8" height="130" fill="#2D5A3D" rx="2"/>
    <rect x="188" y="25" width="8" height="115" fill="#4A8C5C" rx="2"/>
    <ellipse cx="92" cy="25" rx="22" ry="14" fill="#4A8C5C"/>
    <ellipse cx="142" cy="14" rx="26" ry="16" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1"/>
    <ellipse cx="192" cy="30" rx="20" ry="13" fill="#4A8C5C"/>
    <line x1="30" y1="140" x2="40" y2="140" stroke="#D4AF37" stroke-width="1.5"/>
    <line x1="35" y1="20" x2="35" y2="140" stroke="#D4AF37" stroke-width="1" stroke-dasharray="3,2"/>
    <text x="18" y="25" fill="#D4AF37" font-size="8" font-family="Georgia">20m</text>
    <text x="18" y="140" fill="#D4AF37" font-size="8" font-family="Georgia">0m</text>
    <text x="150" y="162" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia">15 à 20 mètres de hauteur</text>
  </svg>`,

  12: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <line x1="50" y1="155" x2="250" y2="155" stroke="#4A8C5C" stroke-width="1.5"/>
    <circle cx="80" cy="150" r="5" fill="#8FBA9F"/>
    <text x="80" y="168" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">An 1</text>
    <circle cx="130" cy="145" r="6" fill="#8FBA9F"/>
    <text x="130" y="168" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">An 2</text>
    <circle cx="180" cy="130" r="8" fill="#4A8C5C"/>
    <text x="180" y="168" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">An 3</text>
    <circle cx="230" cy="100" r="14" fill="#D4AF37" stroke="#F0D060" stroke-width="2"/>
    <text x="230" y="168" text-anchor="middle" fill="#D4AF37" font-size="8" font-family="Georgia">An 4-5</text>
    <text x="230" y="104" text-anchor="middle" fill="#1A3A2A" font-size="8" font-family="Georgia" font-weight="bold">✓</text>
    <text x="150" y="35" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia">4 à 5 ans</text>
    <text x="150" y="52" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">avant la première récolte</text>
    <path d="M80 148 Q130 100 180 122 Q205 110 230 86" fill="none" stroke="#4A8C5C" stroke-width="1.5" stroke-dasharray="3,2"/>
  </svg>`,

  13: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <rect x="20" y="35" width="75" height="95" rx="6" fill="#2D5A3D" stroke="#D4AF37" stroke-width="2"/>
    <text x="57" y="62" text-anchor="middle" fill="#D4AF37" font-size="8" font-family="Georgia" font-weight="bold">IMPÉRIALE</text>
    <text x="57" y="78" text-anchor="middle" fill="#F7F4EE" font-size="20">👑</text>
    <text x="57" y="110" text-anchor="middle" fill="#8FBA9F" font-size="7" font-family="Georgia">1 bourgeon</text>
    <rect x="113" y="50" width="75" height="80" rx="6" fill="#2D5A3D" stroke="#8FBA9F" stroke-width="1"/>
    <text x="150" y="73" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">FINE</text>
    <text x="150" y="92" text-anchor="middle" fill="#F7F4EE" font-size="18">🌿</text>
    <text x="150" y="118" text-anchor="middle" fill="#8FBA9F" font-size="7" font-family="Georgia">1 bourg. + 1 f.</text>
    <rect x="205" y="65" width="75" height="65" rx="6" fill="#2D5A3D" stroke="#8FBA9F" stroke-width="1" opacity="0.8"/>
    <text x="242" y="85" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">CLASSIQUE</text>
    <text x="242" y="105" text-anchor="middle" fill="#F7F4EE" font-size="16">🍃</text>
    <text x="150" y="160" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Les 3 types de cueillette du thé</text>
  </svg>`,

  14: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <ellipse cx="150" cy="75" rx="55" ry="35" fill="#2D5A3D" stroke="#D4AF37" stroke-width="1.5"/>
    <ellipse cx="150" cy="75" rx="40" ry="22" fill="#4A8C5C"/>
    <path d="M120 65 Q150 45 180 65 Q165 85 150 90 Q135 85 120 65 Z" fill="#1A3A2A" opacity="0.4"/>
    <text x="150" y="80" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia" font-weight="bold">THÉ NOIR</text>
    <rect x="115" y="108" width="70" height="35" rx="4" fill="#2D5A3D"/>
    <ellipse cx="150" cy="108" rx="35" ry="6" fill="#4A8C5C"/>
    <text x="150" y="131" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">Production historique</text>
    <text x="150" y="160" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Seul thé produit par nos anciens</text>
  </svg>`,

  15: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <path d="M30 130 Q80 80 150 90 Q220 100 270 60 L270 155 L30 155 Z" fill="#2D5A3D" opacity="0.7"/>
    <path d="M30 145 Q80 110 150 118 Q220 126 270 100 L270 155 L30 155 Z" fill="#4A8C5C" opacity="0.5"/>
    <rect x="125" y="35" width="50" height="30" rx="3" fill="#D4AF37" opacity="0.9"/>
    <text x="150" y="55" text-anchor="middle" fill="#1A3A2A" font-size="11" font-family="Georgia" font-weight="bold">5 ha</text>
    <line x1="150" y1="65" x2="150" y2="88" stroke="#D4AF37" stroke-width="1.5"/>
    <text x="150" y="162" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia">5 hectares · Tables de récolte</text>
    <text x="150" y="174" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">Relance de la culture · 2005</text>
  </svg>`,

  16: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <rect x="55" y="25" width="190" height="110" rx="6" fill="#F7F4EE" opacity="0.95"/>
    <rect x="55" y="25" width="190" height="25" rx="6" fill="#2D5A3D"/>
    <text x="150" y="42" text-anchor="middle" fill="#D4AF37" font-size="9" font-family="Georgia">RECONNAISSANCE OFFICIELLE</text>
    <text x="150" y="72" text-anchor="middle" fill="#2D5A3D" font-size="22" font-family="Georgia" font-weight="bold">2014</text>
    <text x="150" y="92" text-anchor="middle" fill="#4A8C5C" font-size="8" font-family="Georgia">"Plante aromatique</text>
    <text x="150" y="106" text-anchor="middle" fill="#4A8C5C" font-size="8" font-family="Georgia">et médicinale"</text>
    <path d="M90 118 L120 118 L150 110 L180 118 L210 118" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
    <text x="150" y="155" text-anchor="middle" fill="#8FBA9F" font-size="9" font-family="Georgia">Classification administrative · 2014</text>
  </svg>`,

  17: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#1A3A2A"/>
    <circle cx="150" cy="75" r="50" fill="#2D5A3D" stroke="#D4AF37" stroke-width="3"/>
    <circle cx="150" cy="75" r="38" fill="#1A3A2A" stroke="#D4AF37" stroke-width="1"/>
    <text x="150" y="65" text-anchor="middle" fill="#D4AF37" font-size="11" font-family="Georgia" font-weight="bold">AVPA</text>
    <text x="150" y="82" text-anchor="middle" fill="#F7F4EE" font-size="9" font-family="Georgia">Médaille</text>
    <text x="150" y="95" text-anchor="middle" fill="#D4AF37" font-size="10" font-family="Georgia">2022</text>
    <path d="M130 125 L150 145 L170 125" fill="#D4AF37"/>
    <rect x="140" y="124" width="20" height="8" fill="#D4AF37"/>
    <text x="150" y="162" text-anchor="middle" fill="#D4AF37" font-size="9" font-family="Georgia">Agence pour la Valorisation</text>
    <text x="150" y="174" text-anchor="middle" fill="#8FBA9F" font-size="8" font-family="Georgia">des Productions Agricoles</text>
  </svg>`
};

const QUESTIONS = [
  {
    id: 1, section: "Naissance du village",
    pancarte: "En 1887, Henri Boisjoli-Potier fut le premier à cultiver le géranium sur ses terres du Tampon, à La Réunion. Cette culture parfumée allait transformer l'économie locale et préparer le terrain pour l'aventure du thé.",
    question: "Qui fut l'acteur principal de la culture du géranium à La Réunion ?",
    options: [
      { letter: "P", text: "MR Henri Boisjoli-Potier", correct: true },
      { letter: "B", text: "MR Charles Payet",         correct: false }
    ],
    hint: "Cherchez qui a initié cette culture sur ses terres au Tampon dès 1887.",
    anecdote: "Henri Boisjoli-Potier a introduit le géranium rosat à La Réunion depuis l'Algérie. L'huile essentielle de géranium réunionnais était alors surnommée 'l'or vert' de l'île et exportée dans le monde entier pour parfumer les plus grands noms de la haute parfumerie française."
  },
  {
    id: 2, section: "Transition Géranium / Thé",
    pancarte: "Après la crise du géranium dans les années 1950, les autorités agricoles cherchèrent une culture de substitution. Les premières expérimentations du thé furent menées à Bagatelle et à Menciole, deux lieux emblématiques des hauts de La Réunion.",
    question: "Dans quelles régions furent entreprises les premières expérimentations du thé à La Réunion ?",
    options: [
      { letter: "C", text: "Plaines des Palmiste et Grand Coude", correct: false },
      { letter: "A", text: "Bagatelle et Menciole",               correct: true }
    ],
    hint: "Lisez attentivement la pancarte — les noms de lieux sont précis.",
    anecdote: "Bagatelle et Menciole sont situées dans les hauts du Sud de La Réunion, à plus de 1000 mètres d'altitude. Ce climat frais et humide, très proche des grandes régions théicoles asiatiques, explique pourquoi ces sites furent choisis pour les premières expérimentations."
  },
  {
    id: 3, section: "Début de l'aventure du Thé",
    pancarte: "En novembre 1957, un expert national fut dépêché à La Réunion pour évaluer le potentiel de la culture du thé. Après analyse des plantations expérimentales, il rendit un avis qui allait encourager le développement de cette filière prometteuse.",
    question: "Quelle est la conclusion qui ressort après examen de l'expert national en 1957 ?",
    options: [
      { letter: "T", text: "Thé de qualité et potentiel d'avenir",   correct: true },
      { letter: "G", text: "Grand rendement et facilité de culture", correct: false }
    ],
    hint: "L'expert a rédigé ses conclusions en novembre 1957.",
    anecdote: "L'expert envoyé en 1957 était spécialisé dans les cultures tropicales. Son rapport enthousiaste sur la qualité du thé réunionnais allait déclencher un véritable programme de développement agricole, avec des objectifs ambitieux jamais atteints auparavant dans les DOM-TOM français."
  },
  {
    id: 4, section: "Développement de l'aventure",
    pancarte: "Suite au rapport de 1957, la Direction des Services Agricoles de La Réunion élabora un programme ambitieux de développement de la culture du thé. L'objectif à long terme était de transformer radicalement le paysage agricole des hauts de l'île.",
    question: "Quels étaient les objectifs de la Direction des Services Agricoles à plus long terme ?",
    options: [
      { letter: "R", text: "Mise en culture de 2 000 hectares", correct: true },
      { letter: "S", text: "Favoriser l'exportation",           correct: false }
    ],
    hint: "Le programme prévoyait un chiffre précis d'hectares.",
    anecdote: "2 000 hectares de théiers auraient représenté une révolution agricole pour La Réunion. À titre de comparaison, les plus grandes plantations de thé en Europe n'atteignent pas ce chiffre aujourd'hui. Cet objectif ambitieux témoigne de l'enthousiasme qui régnait alors autour de cette culture."
  },
  {
    id: 5, section: "Développement (suite)",
    pancarte: "En 1959, deux agriculteurs de Grand-Coude décidèrent de se lancer dans la culture du thé sur leur village perché dans les hauts du Sud. Leurs noms sont restés gravés dans l'histoire locale comme les pionniers de cette aventure.",
    question: "En 1959, quels étaient les deux planteurs qui entreprirent la culture du thé sur le village de Grand-Coude ?",
    options: [
      { letter: "U", text: "Benoît Mondon et Harles Henri",  correct: false },
      { letter: "I", text: "Charles Payet et Yves Mondon",  correct: true }
    ],
    hint: "Deux noms de familles emblématiques de Grand Coude.",
    anecdote: "Les familles Payet et Mondon sont encore aujourd'hui des noms bien connus à Grand-Coude. Leur pari sur le thé en 1959 était audacieux — ils misaient sur une culture quasi inconnue à La Réunion, dans un village isolé à plus de 1 400 mètres d'altitude."
  },
  {
    id: 6, section: "Commercialisation du thé",
    pancarte: "Dès 1960, le thé produit à La Réunion sous l'appellation 'Thé de Bourbon' fut introduit sur le marché international. Sa qualité lui permit d'accéder à la plus prestigieuse place de marché mondiale pour le thé.",
    question: "Où était valorisé le thé de Bourbon en 1960 ?",
    options: [
      { letter: "Y", text: "La Réunion", correct: false },
      { letter: "M", text: "Londres",    correct: true }
    ],
    hint: "Grande capitale européenne, siège d'une bourse de matières premières.",
    anecdote: "La Bourse du thé de Londres, fondée au XVIIe siècle, était le centre mondial du commerce du thé. Que le 'Thé de Bourbon' y soit coté dès 1960 est une reconnaissance extraordinaire pour une île française de l'océan Indien. Cette appellation 'Bourbon' fait référence à l'ancien nom de La Réunion."
  },
  {
    id: 7, section: "Restructuration à Grand Coude",
    pancarte: "Après quelques années de développement, Grand-Coude s'imposa comme le centre névralgique de la culture du thé réunionnais. En 1969, le village comptait 27 planteurs actifs qui réalisaient des performances remarquables.",
    question: "Quels sont les rendements des 27 planteurs de Grand-Coude ?",
    options: [
      { letter: "O", text: "5 tonnes/hectare", correct: true },
      { letter: "B", text: "6 tonnes/hectare", correct: false }
    ],
    hint: "En 1969, ce chiffre représentait le meilleur rendement de l'île.",
    anecdote: "5 tonnes de feuilles fraîches par hectare est un rendement tout à fait honorable, comparable aux plantations asiatiques. Pour obtenir 1 kg de thé sec, il faut environ 4 à 5 kg de feuilles fraîches. Les planteurs de Grand-Coude avaient donc maîtrisé leur culture en une dizaine d'années seulement."
  },
  {
    id: 8, section: "Déclin et fin de l'aventure",
    pancarte: "Malgré la qualité reconnue du thé réunionnais, des difficultés économiques structurelles accumulées tout au long des années 1960 menèrent à une décision politique majeure qui sonna le glas de cette culture prometteuse.",
    question: "Quelle date signe la fin de l'aventure du thé de La Réunion par vote du Conseil Général ?",
    options: [
      { letter: "I", text: "Le 4 janvier 1972",   correct: true },
      { letter: "R", text: "Le 1er janvier 1970", correct: false }
    ],
    hint: "Une date précise est mentionnée sur la pancarte sur le déclin.",
    anecdote: "Le vote du 4 janvier 1972 fut un tournant dramatique pour les planteurs de Grand-Coude. Du jour au lendemain, leur activité principale n'avait plus de débouché. Certains se reconvertirent dans d'autres cultures, d'autres quittèrent le village. Il faudra attendre 2005 pour que le thé renaisse à Grand-Coude."
  },
  {
    id: 9, section: "Raisons de l'échec",
    pancarte: "L'arrêt de la culture du thé à La Réunion n'était pas dû à un manque de qualité du produit, mais à un problème économique fondamental : le coût de production était structurellement trop élevé face à la concurrence internationale.",
    question: "Quel est le coût de revient du thé de La Réunion en 1960 et 1970 ?",
    options: [
      { letter: "N", text: "3,82 francs en 1960 / 5,62 francs en 1970", correct: true },
      { letter: "C", text: "3,82 euros en 1960 / 5,62 euros en 1970",   correct: false }
    ],
    hint: "Attention à la monnaie : nous sommes avant l'euro !",
    anecdote: "La France n'est passée à l'euro qu'en 2002. En 1960, le salaire minimum mensuel en France était d'environ 200 francs. Le coût de production élevé du thé réunionnais s'expliquait principalement par le coût de la main-d'œuvre locale, bien supérieur à celui des pays asiatiques producteurs."
  },
  {
    id: 10, section: "Le Thé dans le monde",
    pancarte: "Le théier (Camellia sinensis) existe sous plusieurs variétés botaniques. La souche présente à La Réunion est l'Assamica, qui se distingue par ses grandes feuilles et sa robustesse. Son nom révèle son origine géographique.",
    question: "De quel pays provient la souche de thé présente à La Réunion, soit l'Assamica ?",
    options: [
      { letter: "A", text: "Chine", correct: false },
      { letter: "E", text: "Inde",  correct: true }
    ],
    hint: "'Assamica' fait référence à une région célèbre productrice de thé.",
    anecdote: "L'Assam est un État du nord-est de l'Inde, traversé par le Brahmapoutre. C'est l'une des plus grandes régions productrices de thé au monde. La variété Assamica produit un thé robuste, corsé, avec des notes maltées. C'est grâce à cette variété robuste que le thé a pu s'adapter au climat de La Réunion."
  },
  {
    id: 11, section: "Le thé au naturel",
    pancarte: "À l'état sauvage, le théier est un arbre imposant. Dans le labyrinthe, vous pouvez observer des spécimens qui ont retrouvé leur taille naturelle, bien différente des buissons taillés que l'on voit dans les plantations commerciales.",
    question: "Les théiers présents dans le labyrinthe peuvent-ils atteindre combien de mètres ?",
    options: [
      { letter: "V", text: "10 à 12 mètres", correct: false },
      { letter: "T", text: "15 à 20 mètres", correct: true }
    ],
    hint: "La pancarte précise la hauteur de la souche indienne.",
    anecdote: "Dans les plantations commerciales, les théiers sont taillés à environ 1 mètre de hauteur pour faciliter la cueillette. Mais livrés à eux-mêmes, comme dans le labyrinthe d'En-Champ-Thé, les Assamica peuvent atteindre des hauteurs vertigineuses. Certains des arbres que vous voyez ont plus de 50 ans !"
  },
  {
    id: 12, section: "Le thé cultivé",
    pancarte: "La culture du thé demande beaucoup de patience. Contrairement à certaines cultures maraîchères qui produisent en quelques semaines, le théier requiert plusieurs années avant de livrer sa première récolte de qualité.",
    question: "Au bout de combien d'années un théier devient-il productif ?",
    options: [
      { letter: "D", text: "2 à 3 ans", correct: false },
      { letter: "E", text: "4 à 5 ans", correct: true }
    ],
    hint: "La pancarte sur le thé cultivé donne cette information.",
    anecdote: "Un théier bien entretenu peut vivre et produire pendant plus de 100 ans. Les plus vieilles plantations en activité en Chine comptent des théiers millénaires dont les feuilles atteignent des prix records aux enchères. À En-Champ-Thé, certains théiers datent de la première période de culture des années 1960 !"
  },
  {
    id: 13, section: "Cueillir le thé",
    pancarte: "La qualité d'un thé commence dans la main de celui qui cueille. Selon le degré d'exigence, la cueillette sélectionne différentes parties du bourgeon terminal, ce qui détermine en grande partie le niveau de qualité du thé produit.",
    question: "Quelles sont les trois types de cueillettes existantes ?",
    options: [
      { letter: "R", text: "Impériale ; fine ; classique", correct: true },
      { letter: "W", text: "Royal ; fine ; basic",         correct: false }
    ],
    hint: "L'une était autrefois réservée aux empereurs...",
    anecdote: "La cueillette impériale, aussi appelée 'bourgeon seul', ne prélève que le tout premier bourgeon de la tige. C'est la plus précieuse et la plus rare. En Chine ancienne, cette récolte était réservée exclusivement à l'Empereur et à sa cour. Aujourd'hui, les thés issus de cueillette impériale atteignent des prix de plusieurs milliers d'euros le kilo."
  },
  {
    id: 14, section: "Les différentes sortes de thé",
    pancarte: "Toutes les variétés de thé — blanc, vert, oolong, noir — proviennent de la même plante : le Camellia sinensis. C'est le processus de transformation après la cueillette qui détermine le type de thé obtenu. À La Réunion, une seule sorte était historiquement produite.",
    question: "Auparavant, quelle sorte de thé était produite par nos anciens ?",
    options: [
      { letter: "L", text: "Thé blanc et noir", correct: false },
      { letter: "R", text: "Thé noir",          correct: true }
    ],
    hint: "La note en bas de la pancarte sur les sortes de thé.",
    anecdote: "Le thé noir est le plus consommé dans le monde — il représente environ 75% de la production mondiale. Sa fabrication implique une étape de fermentation complète qui lui donne sa couleur sombre et ses arômes puissants. C'est ce type de thé que produisaient les planteurs de Grand-Coude dans les années 1960."
  },
  {
    id: 15, section: "La culture du Thé relancée",
    pancarte: "Après 33 ans d'abandon, la culture du thé a été relancée à Grand-Coude en 2005. C'est dans ce contexte de renaissance que le Labyrinthe En-Champ-Thé a été créé, combinant production, tourisme et pédagogie.",
    question: "Quelles surfaces occupent aujourd'hui les tables de récolte aménagées au labyrinthe ?",
    options: [
      { letter: "O", text: "5 hectares",  correct: true },
      { letter: "I", text: "10 hectares", correct: false }
    ],
    hint: "La superficie est mentionnée en lien avec la relance de 2005.",
    anecdote: "5 hectares de théiers représentent environ 7 terrains de football. Ce qui frappe le visiteur, c'est la densité des théiers plantés en rangées serrées formant un véritable labyrinthe végétal. La relance de 2005 a fait du Labyrinthe En-Champ-Thé le plus important producteur de thé français, titre qu'il détient encore aujourd'hui."
  },
  {
    id: 16, section: "L'avenir de la culture",
    pancarte: "La reconnaissance administrative de la culture du thé à La Réunion a constitué une étape importante pour la filière. Cette classification officielle a ouvert de nouvelles perspectives économiques pour les producteurs.",
    question: "En quelle année la culture du thé a-t-elle été reconnue comme 'plante aromatique et médicinale' ?",
    options: [
      { letter: "I", text: "2014", correct: true },
      { letter: "H", text: "2005", correct: false }
    ],
    hint: "Ce n'est pas l'année de la relance, mais une reconnaissance ultérieure.",
    anecdote: "La classification du thé comme 'plante aromatique et médicinale' en 2014 a eu des conséquences concrètes sur la fiscalité et les aides agricoles accordées aux producteurs. C'est aussi cette reconnaissance qui a permis de développer la gamme de thés médicinaux et de bien-être aujourd'hui proposée à la boutique."
  },
  {
    id: 17, section: "2022 : année des Médailles",
    pancarte: "L'année 2022 a été une année exceptionnelle pour le Labyrinthe En-Champ-Thé, avec une reconnaissance internationale de la qualité de ses productions lors d'un concours mondial prestigieux.",
    question: "Comment se nomme l'agence qui récompense 'les thés du monde', dont on a été primé en 2022 ?",
    options: [
      { letter: "E", text: "CITM — Concours International des Thés du Monde",       correct: false },
      { letter: "R", text: "AVPA — Agence pour la Valorisation des Productions Agricoles", correct: true }
    ],
    hint: "Le nom complet de l'agence est écrit sur la dernière pancarte.",
    anecdote: "L'AVPA est reconnue internationalement pour la rigueur de ses dégustations à l'aveugle. Être récompensé par cette agence place le thé d'En-Champ-Thé parmi les meilleurs thés du monde. C'est une consécration pour une production française qui rivalise désormais avec les grands crus asiatiques et africains."
  }
];
