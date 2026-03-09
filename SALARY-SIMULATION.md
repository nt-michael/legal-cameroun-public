# Salary Simulation — Methodology & Examples

> Based on CGI 2024 (Code Général des Impôts) — DGI/CNPS rates in force
> Reference: IRPP REVUE CALCUL.xlsx (authoritative spreadsheet)
> Legal Cameroun / RODEC Conseils
> File: `lib/simulateurs-data.ts`

---

## Table of Contents

1. [Overview](#1-overview)
2. [Constants & Rates](#2-constants--rates)
3. [Step-by-Step Calculation (Gross → Net)](#3-step-by-step-calculation-gross--net)
4. [IRPP Net Imposable Determination](#4-irpp-net-imposable-determination)
5. [Tax & Contribution Schedules](#5-tax--contribution-schedules)
6. [Reverse Calculation (Net → Gross)](#6-reverse-calculation-net--gross)
7. [Worked Examples](#7-worked-examples)
8. [Summary Comparison Table](#8-summary-comparison-table)

---

## 1. Overview

The simulator computes, from a **monthly gross salary** (brut mensuel), the following:

| Side | What is computed |
|------|-----------------|
| **Employee** | CNPS pension contribution, IRPP, CAC, TDL, RAV, Crédit Foncier → **Net salary** |
| **Employer** | CNPS (family allowance, work accident, pension), FNE, Crédit Foncier → **Total cost** |

**Formula:**

```
Net Salary = Gross − Employee CNPS − Employee Taxes
Total Cost  = Gross + Employer CNPS + Employer Taxes
```

---

## 2. Constants & Rates

### CNPS (Caisse Nationale de Prévoyance Sociale)

| Item | Rate | Base | Paid by |
|------|------|------|---------|
| Pension vieillesse (PVID) | 4.2% | Capped salary (plafond 750 000) | Employee |
| Pension vieillesse (PVID) | 4.2% | Capped salary (plafond 750 000) | Employer |
| Prestation familiale | 7.0% | Capped salary (plafond 750 000) | Employer |
| Accident du travail | **1.75%** | **Full gross** (not capped) | Employer |

**CNPS plafond:** 750 000 FCFA/month — contributions on pension and family allowance are calculated on `min(gross, 750,000)`. Accident du travail has no cap.

### Salary Taxes

| Tax | Rate / Base | Paid by |
|-----|-------------|---------|
| IRPP | Progressive brackets on **monthly** net imposable | Employee |
| Centimes Additionnels (CAC) | 10% of IRPP | Employee |
| TDL | Fixed annual amount by bracket (÷12 for monthly) | Employee |
| RAV | Fixed monthly amount by bracket | Employee |
| Crédit Foncier | 1% of gross | Employee |
| FNE | 1% of gross | Employer |
| Crédit Foncier | 1.5% of gross | Employer |

---

## 3. Step-by-Step Calculation (Gross → Net)

Given a monthly gross salary `G`, the calculation proceeds as follows:

### Step 1: CNPS Employee Contribution

```
Base plafonnée = min(G, 750,000)
PVID salariale = Base plafonnée × 4.2%
```

### Step 2: Determine Monthly Net Imposable (for IRPP)

```
Net Imposable = max(0, G × 70% − PVID salariale − 41,667)
```

Where 41,667 = 500,000 ÷ 12 (standard annual deduction, split monthly).

### Step 3: Calculate IRPP (Progressive Monthly Brackets)

Apply IRPP brackets directly to `Net Imposable`:

| Bracket (FCFA/month) | Rate |
|----------------------|------|
| 0 — 62 000 | 0% |
| 62 001 — 310 000 | 10% |
| 310 001 — 429 000 | 15% |
| 429 001 — 667 000 | 25% |
| 667 001 + | 35% |

```
IRPP = sum of (taxable amount in each bracket × rate)
```

### Step 4: Other Employee Taxes

```
CAC (Centimes Additionnels) = IRPP × 10%
TDL (monthly) = Annual TDL amount ÷ 12     (see TDL brackets below)
RAV = monthly amount from RAV brackets      (see RAV brackets below)
Crédit Foncier = G × 1%
```

### Step 5: Total Employee Deductions

```
Total Deductions = PVID salariale + IRPP + CAC + TDL + RAV + Crédit Foncier
Net Salary = G − Total Deductions
```

### Step 6: Employer Charges

```
Prestation Familiale = Base plafonnée × 7%
Accident du Travail  = G × 1.75%          (on full gross, NOT capped)
Pension Patronale    = Base plafonnée × 4.2%
FNE                  = G × 1%
Crédit Foncier       = G × 1.5%

Total Cost = G + all employer charges above
```

---

## 4. IRPP Net Imposable Determination

This is the most critical part of the calculation. The IRPP is **NOT** applied to raw gross salary. The CGI prescribes a monthly net imposable formula:

```
          Monthly Gross: G
               × 70%
          ─────────────────
          G × 0.70
          − PVID (4.2% of min(G, 750,000))
          − 41,667  (500,000 ÷ 12)
          ─────────────────
          MONTHLY NET IMPOSABLE
               ↓
         Apply monthly IRPP brackets
               ↓
             Monthly IRPP
```

### Key threshold

IRPP is zero when Net Imposable ≤ 62,000 FCFA. This means:

```
G × 0.658 − 41,667 ≤ 62,000
G ≤ ~157,500 FCFA/month  (below CNPS cap)
```

Employees earning less than ~157,500 FCFA/month pay **no IRPP**.

---

## 5. Tax & Contribution Schedules

### TDL — Taxe de Développement Local

Annual fixed amounts based on monthly gross salary:

| Monthly Gross Range (FCFA) | Annual TDL | Monthly TDL |
|---------------------------|------------|-------------|
| 0 — 62 000 | 0 | 0 |
| 62 001 — 75 000 | 3 000 | 250 |
| 75 001 — 100 000 | 6 000 | 500 |
| 100 001 — 125 000 | 9 000 | 750 |
| 125 001 — 150 000 | 12 000 | 1 000 |
| 150 001 — 200 000 | 15 000 | 1 250 |
| 200 001 — 250 000 | 18 000 | 1 500 |
| 250 001 — 300 000 | 24 000 | 2 000 |
| 300 001 — 500 000 | 27 000 | 2 250 |
| 500 001 + | 30 000 | 2 500 |

### RAV — Redevance Audio-Visuelle

Monthly fixed amounts based on monthly gross salary:

| Monthly Gross Range (FCFA) | Monthly RAV |
|---------------------------|-------------|
| 0 — 50 000 | 0 |
| 50 001 — 100 000 | 750 |
| 100 001 — 200 000 | 1 950 |
| 200 001 — 300 000 | 3 250 |
| 300 001 — 400 000 | 4 550 |
| 400 001 — 500 000 | 5 850 |
| 500 001 — 600 000 | 7 150 |
| 600 001 — 700 000 | 8 450 |
| 700 001 — 800 000 | 9 750 |
| 800 001 — 900 000 | 11 050 |
| 900 001 — 1 000 000 | 12 350 |
| 1 000 001 + | 13 000 |

### IRPP — Monthly Progressive Brackets

Applied to **monthly net imposable** (not raw gross):

| Monthly Net Imposable (FCFA) | Marginal Rate |
|-----------------------------|---------------|
| 0 — 62 000 | 0% |
| 62 001 — 310 000 | 10% |
| 310 001 — 429 000 | 15% |
| 429 001 — 667 000 | 25% |
| 667 001 + | 35% |

---

## 6. Reverse Calculation (Net → Gross)

The reverse calculation (given a desired net salary, find the required gross) uses a **binary search algorithm**:

1. Set search range: `low = target net`, `high = target net × 3`
2. Pick midpoint, compute `calculateSalaire(mid).netSalaire`
3. If computed net ≈ target net (±100 FCFA), return result
4. If computed net < target, search higher; otherwise search lower
5. Maximum 100 iterations

This approach is mathematically sound because `calculateSalaire()` is monotonically increasing (higher gross always yields higher net). The binary search converges to within 100 FCFA accuracy.

---

## 7. Worked Examples

### Example 1: Gross 40 000 FCFA/month (SMIC-level — No IRPP)

**CNPS Employee:**
- Base plafonnée: 40 000
- PVID (4.2%): **1 680**

**Net Imposable Calculation:**
- G × 70% = 28 000
- − PVID = −1 680
- − 41 667 = −41 667
- Net Imposable: **0** ← negative, clamped to zero

**Employee Taxes:**
- IRPP: 0 | CAC: 0 | TDL: 0 | RAV: 0 | CF (1%): 400
- Total taxes: **400**

**Results:**
| | Amount |
|--|--------|
| Total Deductions | 2 080 |
| **Net Salary** | **37 920** |
| Retention rate | 5.2% |

**Employer:**

| Contribution / Tax | Amount |
|-------------------|--------|
| Prestation Familiale (7%) | 2 800 |
| Accident du Travail (1.75%) | 700 |
| Pension (4.2%) | 1 680 |
| FNE (1%) | 400 |
| Crédit Foncier (1.5%) | 600 |
| **Total Employer Charges** | **6 180** |
| **Total Cost (Employer)** | **46 180** |

---

### Example 2: Gross 50 000 FCFA/month (Low salary — No IRPP)

**CNPS Employee:**
- Base plafonnée: 50 000
- PVID (4.2%): **2 100**

**Net Imposable Calculation:**
- G × 70% = 35 000
- − PVID = −2 100
- − 41 667 = −41 667
- Net Imposable: **0** ← below zero

**Employee Taxes:**
- IRPP: 0 | CAC: 0 | TDL: 0 | RAV: 0 | CF: 500
- Total taxes: **500**

**Results:**
| | Amount |
|--|--------|
| Total Deductions | 2 600 |
| **Net Salary** | **47 400** |
| Retention rate | 5.2% |

**Employer:**

| Contribution / Tax | Amount |
|-------------------|--------|
| Prestation Familiale (7%) | 3 500 |
| Accident du Travail (1.75%) | 875 |
| Pension (4.2%) | 2 100 |
| FNE (1%) | 500 |
| Crédit Foncier (1.5%) | 750 |
| **Total Employer Charges** | **7 725** |
| **Total Cost (Employer)** | **57 725** |

---

### Example 3: Gross 100 000 FCFA/month (No IRPP — below threshold)

**CNPS Employee:**
- Base plafonnée: 100 000
- PVID (4.2%): **4 200**

**Net Imposable Calculation:**
- G × 70% = 70 000
- − PVID = −4 200
- − 41 667 = −41 667
- Net Imposable: **24 133** (below 62 000 → IRPP = 0)

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 0 |
| CAC | 0 |
| TDL | 500 |
| RAV | 750 |
| Crédit Foncier (1%) | 1 000 |
| **Total** | **2 250** |

**Employer CNPS:**

| Contribution | Amount |
|-------------|--------|
| Prestation Familiale (7%) | 7 000 |
| Accident du Travail (1.75%) | 1 750 |
| Pension (4.2%) | 4 200 |
| **Total** | **12 950** |

**Employer Taxes:**

| Tax | Amount |
|-----|--------|
| FNE (1%) | 1 000 |
| Crédit Foncier (1.5%) | 1 500 |
| **Total** | **2 500** |

**Results:**
| | Amount |
|--|--------|
| Gross | 100 000 |
| Total Employee Deductions | 6 450 |
| **Net Salary** | **93 550** |
| Employer Charges | 15 450 |
| **Total Cost (Employer)** | **115 450** |
| Retention rate | 6.5% |

---

### Example 4: Gross 200 000 FCFA/month (IRPP begins)

**CNPS Employee:**
- Base plafonnée: 200 000
- PVID (4.2%): **8 400**

**Net Imposable Calculation:**
- G × 70% = 140 000
- − PVID = −8 400
- − 41 667 = −41 667
- Net Imposable: **89 933**

**IRPP Breakdown:**
- 0–62 000 @ 0%: 0
- 62 000–89 933 @ 10%: 27 933 × 10% = **2 793**

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 2 793 |
| CAC (10%) | 279 |
| TDL | 1 250 |
| RAV | 1 950 |
| Crédit Foncier (1%) | 2 000 |
| **Total** | **8 272** |

**Employer CNPS:**

| Contribution | Amount |
|-------------|--------|
| Prestation Familiale (7%) | 14 000 |
| Accident du Travail (1.75%) | 3 500 |
| Pension (4.2%) | 8 400 |
| **Total** | **25 900** |

**Employer Taxes:**

| Tax | Amount |
|-----|--------|
| FNE (1%) | 2 000 |
| Crédit Foncier (1.5%) | 3 000 |
| **Total** | **5 000** |

**Results:**
| | Amount |
|--|--------|
| Gross | 200 000 |
| Total Employee Deductions | 16 672 |
| **Net Salary** | **183 328** |
| Employer Charges | 30 900 |
| **Total Cost (Employer)** | **230 900** |
| Retention rate | 8.3% |

---

### Example 5: Gross 350 000 FCFA/month

**CNPS Employee:**
- Base plafonnée: 350 000
- PVID (4.2%): **14 700**

**Net Imposable Calculation:**
- G × 70% = 245 000
- − PVID = −14 700
- − 41 667 = −41 667
- Net Imposable: **188 633**

**IRPP Breakdown:**
- 0–62 000 @ 0%: 0
- 62 000–188 633 @ 10%: 126 633 × 10% = **12 663**

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 12 663 |
| CAC (10%) | 1 266 |
| TDL | 2 250 |
| RAV | 4 550 |
| Crédit Foncier (1%) | 3 500 |
| **Total** | **24 229** |

**Employer CNPS:**

| Contribution | Amount |
|-------------|--------|
| Prestation Familiale (7%) | 24 500 |
| Accident du Travail (1.75%) | 6 125 |
| Pension (4.2%) | 14 700 |
| **Total** | **45 325** |

**Employer Taxes:**

| Tax | Amount |
|-----|--------|
| FNE (1%) | 3 500 |
| Crédit Foncier (1.5%) | 5 250 |
| **Total** | **8 750** |

**Results:**
| | Amount |
|--|--------|
| Gross | 350 000 |
| Total Employee Deductions | 38 929 |
| **Net Salary** | **311 071** |
| Employer Charges | 54 075 |
| **Total Cost (Employer)** | **404 075** |
| Retention rate | 11.1% |

---

### Example 6: Gross 500 000 FCFA/month

**CNPS Employee:**
- Base plafonnée: 500 000
- PVID (4.2%): **21 000**

**Net Imposable Calculation:**
- G × 70% = 350 000
- − PVID = −21 000
- − 41 667 = −41 667
- Net Imposable: **287 333**

**IRPP Breakdown:**
- 0–62 000 @ 0%: 0
- 62 000–287 333 @ 10%: 225 333 × 10% = **22 533**

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 22 533 |
| CAC (10%) | 2 253 |
| TDL | 2 250 |
| RAV | 5 850 |
| Crédit Foncier (1%) | 5 000 |
| **Total** | **37 886** |

**Employer CNPS:**

| Contribution | Amount |
|-------------|--------|
| Prestation Familiale (7%) | 35 000 |
| Accident du Travail (1.75%) | 8 750 |
| Pension (4.2%) | 21 000 |
| **Total** | **64 750** |

**Employer Taxes:**

| Tax | Amount |
|-----|--------|
| FNE (1%) | 5 000 |
| Crédit Foncier (1.5%) | 7 500 |
| **Total** | **12 500** |

**Results:**
| | Amount |
|--|--------|
| Gross | 500 000 |
| Total Employee Deductions | 58 886 |
| **Net Salary** | **441 114** |
| Employer Charges | 77 250 |
| **Total Cost (Employer)** | **577 250** |
| Retention rate | 11.8% |

---

### Example 7: Gross 750 000 FCFA/month (At CNPS cap, crosses 3rd bracket)

**CNPS Employee:**
- Base plafonnée: **750 000** (= plafond, CNPS maxed)
- PVID (4.2%): **31 500**

**Net Imposable Calculation:**
- G × 70% = 525 000
- − PVID = −31 500
- − 41 667 = −41 667
- Net Imposable: **451 833**

**IRPP Breakdown:**
- 0–62 000 @ 0%: 0
- 62 000–310 000 @ 10%: 248 000 × 10% = 24 800
- 310 000–429 000 @ 15%: 119 000 × 15% = 17 850
- 429 000–451 833 @ 25%: 22 833 × 25% = 5 708
- **Total IRPP: 48 358**

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 48 358 |
| CAC (10%) | 4 836 |
| TDL | 2 500 |
| RAV | 9 750 |
| Crédit Foncier (1%) | 7 500 |
| **Total** | **72 944** |

**Employer CNPS:**

| Contribution | Amount |
|-------------|--------|
| Prestation Familiale (7%) | 52 500 |
| Accident du Travail (1.75%) | 13 125 |
| Pension (4.2%) | 31 500 |
| **Total** | **97 125** |

**Employer Taxes:**

| Tax | Amount |
|-----|--------|
| FNE (1%) | 7 500 |
| Crédit Foncier (1.5%) | 11 250 |
| **Total** | **18 750** |

**Results:**
| | Amount |
|--|--------|
| Gross | 750 000 |
| Total Employee Deductions | 104 444 |
| **Net Salary** | **645 556** |
| Employer Charges | 115 875 |
| **Total Cost (Employer)** | **865 875** |
| Retention rate | 13.9% |

> Note: At 750 000, the CNPS plafond is reached. For any gross above this, pension and family contributions remain fixed. Only accident du travail (1.75% on full gross) continues to scale.

---

### Example 8: Gross 1 020 000 FCFA/month (Excel reference case)

This is the exact case verified against the authoritative spreadsheet (IRPP REVUE CALCUL.xlsx).

**CNPS Employee:**
- Base plafonnée: **750 000** (capped)
- PVID (4.2%): **31 500**

**Net Imposable Calculation:**
- G × 70% = 714 000
- − PVID = −31 500
- − 41 667 = −41 667
- Net Imposable: **640 833**

**IRPP Breakdown:**
- 0–62 000 @ 0%: 0
- 62 000–310 000 @ 10%: 248 000 × 10% = 24 800
- 310 000–429 000 @ 15%: 119 000 × 15% = 17 850
- 429 000–640 833 @ 25%: 211 833 × 25% = 52 958
- **Total IRPP: 95 608**

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 95 608 |
| CAC (10%) | 9 561 |
| TDL | 2 500 |
| RAV | 13 000 |
| Crédit Foncier (1%) | 10 200 |
| **Total** | **130 869** |

**Employer CNPS:**

| Contribution | Amount |
|-------------|--------|
| Prestation Familiale (7%) | 52 500 |
| Accident du Travail (1.75%) | 17 850 |
| Pension (4.2%) | 31 500 |
| **Total** | **101 850** |

**Employer Taxes:**

| Tax | Amount |
|-----|--------|
| FNE (1%) | 10 200 |
| Crédit Foncier (1.5%) | 15 300 |
| **Total** | **25 500** |

**Results:**
| | Amount |
|--|--------|
| Gross | 1 020 000 |
| PVID (employee) | 31 500 |
| Net Imposable | 640 833 |
| IRPP | 95 608 |
| Total Employee Deductions | 162 369 |
| **Net Salary** | **857 631** |
| Total Employer Charges | 127 350 |
| **Total Cost (Employer)** | **1 147 350** |
| Retention rate | 15.9% |

---

### Example 9: Gross 1 000 000 FCFA/month

**CNPS Employee:**
- Base plafonnée: **750 000** (capped)
- PVID (4.2%): **31 500**

**Net Imposable Calculation:**
- G × 70% = 700 000
- − PVID = −31 500
- − 41 667 = −41 667
- Net Imposable: **626 833**

**IRPP Breakdown:**
- 0–62 000 @ 0%: 0
- 62 000–310 000 @ 10%: 24 800
- 310 000–429 000 @ 15%: 17 850
- 429 000–626 833 @ 25%: 197 833 × 25% = 49 458
- **Total IRPP: 92 108**

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 92 108 |
| CAC (10%) | 9 211 |
| TDL | 2 500 |
| RAV | 12 350 |
| Crédit Foncier (1%) | 10 000 |
| **Total** | **126 169** |

**Results:**
| | Amount |
|--|--------|
| Gross | 1 000 000 |
| Total Employee Deductions | 157 669 |
| **Net Salary** | **842 331** |
| Employer Charges | 126 500 |
| **Total Cost (Employer)** | **1 126 500** |
| Retention rate | 15.8% |

---

### Example 10: Gross 1 500 000 FCFA/month (High salary — 35% bracket)

**CNPS Employee:**
- Base plafonnée: **750 000** (capped)
- PVID (4.2%): **31 500**

**Net Imposable Calculation:**
- G × 70% = 1 050 000
- − PVID = −31 500
- − 41 667 = −41 667
- Net Imposable: **976 833**

**IRPP Breakdown:**
- 0–62 000 @ 0%: 0
- 62 000–310 000 @ 10%: 24 800
- 310 000–429 000 @ 15%: 17 850
- 429 000–667 000 @ 25%: 238 000 × 25% = 59 500
- 667 000–976 833 @ 35%: 309 833 × 35% = 108 442
- **Total IRPP: 210 592**

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 210 592 |
| CAC (10%) | 21 059 |
| TDL | 2 500 |
| RAV | 13 000 |
| Crédit Foncier (1%) | 15 000 |
| **Total** | **262 151** |

**Employer CNPS:**

| Contribution | Amount |
|-------------|--------|
| Prestation Familiale (7%) | 52 500 |
| Accident du Travail (1.75%) | 26 250 |
| Pension (4.2%) | 31 500 |
| **Total** | **110 250** |

**Employer Taxes:**

| Tax | Amount |
|-----|--------|
| FNE (1%) | 15 000 |
| Crédit Foncier (1.5%) | 22 500 |
| **Total** | **37 500** |

**Results:**
| | Amount |
|--|--------|
| Gross | 1 500 000 |
| Total Employee Deductions | 293 651 |
| **Net Salary** | **1 206 349** |
| Employer Charges | 147 750 |
| **Total Cost (Employer)** | **1 647 750** |
| Retention rate | 19.6% |

---

## 8. Summary Comparison Table

| Monthly Gross | PVID (Empl.) | IRPP | CAC | TDL | RAV | CF | Total Deductions | **Net Salary** | Employer Cost | Retention % |
|--------------|-------------|------|-----|-----|-----|-----|-----------------|---------------|--------------|-------------|
| 40 000 | 1 680 | 0 | 0 | 0 | 0 | 400 | 2 080 | **37 920** | 46 180 | 5.2% |
| 50 000 | 2 100 | 0 | 0 | 0 | 0 | 500 | 2 600 | **47 400** | 57 725 | 5.2% |
| 100 000 | 4 200 | 0 | 0 | 500 | 750 | 1 000 | 6 450 | **93 550** | 115 450 | 6.5% |
| 200 000 | 8 400 | 2 793 | 279 | 1 250 | 1 950 | 2 000 | 16 672 | **183 328** | 230 900 | 8.3% |
| 350 000 | 14 700 | 12 663 | 1 266 | 2 250 | 4 550 | 3 500 | 38 929 | **311 071** | 404 075 | 11.1% |
| 500 000 | 21 000 | 22 533 | 2 253 | 2 250 | 5 850 | 5 000 | 58 886 | **441 114** | 577 250 | 11.8% |
| 750 000 | 31 500 | 48 358 | 4 836 | 2 500 | 9 750 | 7 500 | 104 444 | **645 556** | 865 875 | 13.9% |
| 1 000 000 | 31 500 | 92 108 | 9 211 | 2 500 | 12 350 | 10 000 | 157 669 | **842 331** | 1 126 500 | 15.8% |
| 1 020 000 | 31 500 | 95 608 | 9 561 | 2 500 | 13 000 | 10 200 | 162 369 | **857 631** | 1 147 350 | 15.9% |
| 1 500 000 | 31 500 | 210 592 | 21 059 | 2 500 | 13 000 | 15 000 | 293 651 | **1 206 349** | 1 647 750 | 19.6% |

### Key Observations

1. **Below ~157 500 FCFA/month**: Net imposable is below the 62 000 FCFA IRPP threshold, so **no IRPP** is due. Only CNPS pension, TDL, RAV, and Crédit Foncier apply.

2. **CNPS cap at 750 000**: Above this gross, pension and family contributions stop growing. Only accident du travail (1.75%) scales with gross.

3. **Progressive taxation**: The effective retention rate increases from ~5% at very low salaries to ~20% at 1.5M, driven primarily by progressive IRPP.

4. **Employer cost premium**: Ranges from ~15% above gross (low salaries) to ~10% (high salaries) as the CNPS cap limits employer contributions.

5. **Gross-to-net consistency**: The reverse calculation (net → gross via binary search) produces consistent results. Entering the net from any forward calculation returns the original gross within ±100 FCFA.

---

*All amounts in FCFA. Calculations based on CGI 2024 rates and verified against IRPP REVUE CALCUL.xlsx. This document is for informational purposes only — consult a qualified tax professional for actual filings.*
