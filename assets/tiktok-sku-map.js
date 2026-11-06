/*
Best-effort TikTok Shop product_id → Bloop catalog SKU map.

TikTok product IDs are not in the Bloop catalog, and this repo has no stronger
TikTok↔SKU source. Assignments were inferred from review wording:
  numbing cream → Lido Creams D26 / D30 / D33 / D46 / D47
  eye patches   → D3 / D8
  face mask     → D12
  nebulizer/saline mention → D25
Confidence is medium or low for most cream IDs. Edit a product's "sku" here
to move every review for that TikTok product_id. Keep assets/tiktok-sku-map.json
in sync (same sku values). This file is what the storefront loads.
Do not drop product ids (301 reviews depend on them). Do not invent review text.
*/
window.TIKTOK_SKU_MAP = {
  "1731834597131719035": {
    "sku": "D47",
    "name_hint": "SM LIDO CREAM 30G / small tube numbing cream",
    "confidence": "medium"
  },
  "1731824446727688571": {
    "sku": "D46",
    "name_hint": "SM CREAM 500g / larger tub numbing",
    "confidence": "medium"
  },
  "1732436655833256315": {
    "sku": "D30",
    "name_hint": "MK NUMBING CREAM 500G",
    "confidence": "medium"
  },
  "1731834657729974651": {
    "sku": "D26",
    "name_hint": "J-Cain Numbing Cream",
    "confidence": "medium"
  },
  "1732046675131142523": {
    "sku": "D33",
    "name_hint": "NEO-CAIN 30 g 10.56%",
    "confidence": "medium"
  },
  "1732040669772681595": {
    "sku": "D25",
    "name_hint": "saline / nebulizer mention → ISOTONIC SODIUM SOLUTION SALINE 5PCS",
    "confidence": "low"
  },
  "1732377215985750395": {
    "sku": "D47",
    "name_hint": "shared item, likely lido 30g; only 1 text review",
    "confidence": "low"
  },
  "1732088384823660923": {
    "sku": "D33",
    "name_hint": "no text; park with Neo-Cain",
    "confidence": "low"
  },
  "1731793246194405755": {
    "sku": "D12",
    "name_hint": "face mask → CURENEX REJUVENATING MASK",
    "confidence": "medium"
  },
  "1729494472111789435": {
    "sku": "D8",
    "name_hint": "eye patches overnight → COLLAGEN GEL EYE MASK",
    "confidence": "high"
  },
  "1732023424280072571": {
    "sku": "D3",
    "name_hint": "covers top of eyes / eyelids → 3D COLLAGEN EYE MASK",
    "confidence": "high"
  },
  "1731784219732971899": {
    "sku": "D26",
    "name_hint": "numbing; 1 review",
    "confidence": "low"
  }
};
