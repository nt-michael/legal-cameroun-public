# Salary Simulation — Methodology & Examples

> Based on CGI 2024 (Code Général des Impôts) — DGI/CNPS rates in force
> Legal Cameroun / RODEC Conseils
> File: `lib/simulateurs-data.ts`

---

## Table of Contents

1. [Overview](#1-overview)
2. [Constants & Rates](#2-constants--rates)
3. [Step-by-Step Calculation (Gross → Net)](#3-step-by-step-calculation-gross--net)
4. [IRPP Taxable Income Determination](#4-irpp-taxable-income-determination)
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
| Pension vieillesse | 4.2% | Capped salary (plafond 750 000) | Employee |
| Pension vieillesse | 4.2% | Capped salary (plafond 750 000) | Employer |
| Prestation familiale | 7.0% | Capped salary (plafond 750 000) | Employer |
| Accident du travail | 2.5% | **Full gross** (not capped) | Employer |

**CNPS plafond:** 750 000 FCFA/month — contributions on pension and family allowance are calculated on `min(gross, 750,000)`.

### Salary Taxes

| Tax | Rate / Base | Paid by |
|-----|-------------|---------|
| IRPP | Progressive brackets on annual taxable income | Employee |
| Centimes Additionnels (CAC) | 10% of IRPP | Employee |
| TDL | Fixed annual amount by bracket | Employee |
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
Pension salariale = Base plafonnée × 4.2%
```

### Step 2: Determine Annual Taxable Income (for IRPP)

```
Annual Gross         = G × 12
After Abatement      = max(0, Annual Gross − 500,000)
After Prof. Expenses = After Abatement × 0.80        (20% deduction)
Annual CNPS          = Pension salariale × 12
Annual Taxable Income = max(0, After Prof. Expenses − Annual CNPS)
```

### Step 3: Calculate IRPP (Progressive Brackets)

Apply IRPP brackets to `Annual Taxable Income`:

| Bracket (FCFA/year) | Rate |
|---------------------|------|
| 0 — 2 000 000 | 10% |
| 2 000 001 — 3 000 000 | 15% |
| 3 000 001 — 5 000 000 | 25% |
| 5 000 001 + | 35% |

```
Annual IRPP = sum of (taxable amount in each bracket × rate)
Monthly IRPP = Annual IRPP ÷ 12
```

### Step 4: Other Employee Taxes

```
CAC (Centimes Additionnels) = Monthly IRPP × 10%
TDL (monthly) = Annual TDL amount ÷ 12     (see TDL brackets below)
RAV = monthly amount from RAV brackets      (see RAV brackets below)
Crédit Foncier = G × 1%
```

### Step 5: Total Employee Deductions

```
Total Deductions = Pension salariale + Monthly IRPP + CAC + TDL + RAV + Crédit Foncier
Net Salary = G − Total Deductions
```

### Step 6: Employer Charges

```
Prestation Familiale = Base plafonnée × 7%
Accident du Travail  = G × 2.5%           (on full gross, NOT capped)
Pension Patronale    = Base plafonnée × 4.2%
FNE                  = G × 1%
Crédit Foncier       = G × 1.5%

Total Cost = G + all employer charges above
```

---

## 4. IRPP Taxable Income Determination

This is the most critical part of the calculation. The IRPP is **NOT** applied to raw gross salary. Instead, the CGI prescribes a series of deductions to arrive at the taxable base:

```
                   Monthly Gross: G
                         × 12
                  ─────────────────
                  Annual Gross: G×12
                     − 500,000
                  ─────────────────
                  After Abatement
                     × 0.80
                  ─────────────────
               After Professional Expenses
               − Annual CNPS Employee Contrib.
                  ─────────────────
               ANNUAL TAXABLE INCOME
                  ↓
             Apply IRPP Brackets
                  ↓
              Annual IRPP ÷ 12
                  ↓
              Monthly IRPP
```

### Why this matters

For a gross of 500,000 FCFA/month:
- **Wrong** (old code): IRPP on 6,000,000 → Annual IRPP = 1,050,000
- **Correct** (fixed code): IRPP on 4,148,000 → Annual IRPP = 637,000

That's a **413,000 FCFA/year** (34,417/month) difference in the employee's favor.

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

### IRPP — Progressive Brackets

Applied to **annual taxable income** (not raw gross):

| Annual Taxable Income (FCFA) | Marginal Rate |
|-----------------------------|---------------|
| 0 — 2 000 000 | 10% |
| 2 000 001 — 3 000 000 | 15% |
| 3 000 001 — 5 000 000 | 25% |
| 5 000 001 + | 35% |

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
- Pension (4.2%): **1 680**

**Taxable Income Calculation:**
- Annual Gross: 480 000
- After Abatement (−500 000): **0** ← below threshold, no tax
- Annual Taxable Income: **0**
- Annual IRPP: **0**

**Employee Taxes:**
- IRPP: 0 | CAC: 0 | TDL: 0 | RAV: 0 | CF (1%): 400
- Total taxes: **400**

**Results:**
| | Amount |
|--|--------|
| Total Deductions | 2 080 |
| **Net Salary** | **37 920** |
| Retention rate | 5.2% |

> At this salary level, annual gross (480 000) is below the 500 000 abatement threshold, so **zero IRPP is due**. Only CNPS pension and Crédit Foncier apply.

---

### Example 2: Gross 50 000 FCFA/month (Low salary — Minimal IRPP)

**CNPS Employee:**
- Base plafonnée: 50 000
- Pension (4.2%): **2 100**

**Taxable Income Calculation:**
- Annual Gross: 600 000
- After Abatement (−500 000): 100 000
- After Professional Expenses (×0.80): 80 000
- Annual CNPS: 25 200
- Annual Taxable Income: **54 800**
- Annual IRPP (54 800 × 10%): **5 480**

**Employee Taxes:**
- IRPP: 457 | CAC: 46 | TDL: 0 | RAV: 0 | CF: 500
- Total taxes: **1 002**

**Results:**
| | Amount |
|--|--------|
| Total Deductions | 3 102 |
| **Net Salary** | **46 898** |
| Retention rate | 6.2% |

---

### Example 3: Gross 100 000 FCFA/month

**CNPS Employee:**
- Base plafonnée: 100 000
- Pension (4.2%): **4 200**

**Taxable Income Calculation:**
- Annual Gross: 1 200 000
- After Abatement (−500 000): 700 000
- After Professional Expenses (×0.80): 560 000
- Annual CNPS: 50 400
- Annual Taxable Income: **509 600**
- IRPP: 509 600 × 10% = **50 960**

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 4 247 |
| CAC (10% of IRPP) | 425 |
| TDL | 500 |
| RAV | 750 |
| Crédit Foncier (1%) | 1 000 |
| **Total** | **6 921** |

**Employer CNPS:**

| Contribution | Amount |
|-------------|--------|
| Prestation Familiale (7%) | 7 000 |
| Accident du Travail (2.5%) | 2 500 |
| Pension (4.2%) | 4 200 |
| **Total** | **13 700** |

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
| Total Employee Deductions | 11 121 |
| **Net Salary** | **88 879** |
| Employer Charges | 16 200 |
| **Total Cost (Employer)** | **116 200** |
| Retention rate | 11.1% |

---

### Example 4: Gross 200 000 FCFA/month

**CNPS Employee:**
- Base plafonnée: 200 000
- Pension (4.2%): **8 400**

**Taxable Income Calculation:**
- Annual Gross: 2 400 000
- After Abatement: 1 900 000
- After Professional Expenses: 1 520 000
- Annual CNPS: 100 800
- Annual Taxable Income: **1 419 200**
- IRPP: 1 419 200 × 10% = **141 920**

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 11 827 |
| CAC | 1 183 |
| TDL | 1 250 |
| RAV | 1 950 |
| Crédit Foncier | 2 000 |
| **Total** | **18 209** |

**Employer CNPS:**

| Contribution | Amount |
|-------------|--------|
| Prestation Familiale | 14 000 |
| Accident du Travail | 5 000 |
| Pension | 8 400 |
| **Total** | **27 400** |

**Employer Taxes:**

| Tax | Amount |
|-----|--------|
| FNE | 2 000 |
| Crédit Foncier | 3 000 |
| **Total** | **5 000** |

**Results:**
| | Amount |
|--|--------|
| Gross | 200 000 |
| Total Employee Deductions | 26 609 |
| **Net Salary** | **173 391** |
| Employer Charges | 32 400 |
| **Total Cost (Employer)** | **232 400** |
| Retention rate | 13.3% |

---

### Example 5: Gross 350 000 FCFA/month (Crosses 2nd IRPP bracket)

**CNPS Employee:**
- Base plafonnée: 350 000
- Pension (4.2%): **14 700**

**Taxable Income Calculation:**
- Annual Gross: 4 200 000
- After Abatement: 3 700 000
- After Professional Expenses: 2 960 000
- Annual CNPS: 176 400
- Annual Taxable Income: **2 783 600**
- IRPP breakdown:
  - First 2 000 000 × 10% = 200 000
  - Remaining 783 600 × 15% = 117 540
  - **Total: 317 540**

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 26 462 |
| CAC | 2 646 |
| TDL | 2 250 |
| RAV | 4 550 |
| Crédit Foncier | 3 500 |
| **Total** | **39 408** |

**Employer CNPS:**

| Contribution | Amount |
|-------------|--------|
| Prestation Familiale | 24 500 |
| Accident du Travail | 8 750 |
| Pension | 14 700 |
| **Total** | **47 950** |

**Employer Taxes:**

| Tax | Amount |
|-----|--------|
| FNE | 3 500 |
| Crédit Foncier | 5 250 |
| **Total** | **8 750** |

**Results:**
| | Amount |
|--|--------|
| Gross | 350 000 |
| Total Employee Deductions | 54 108 |
| **Net Salary** | **295 892** |
| Employer Charges | 56 700 |
| **Total Cost (Employer)** | **406 700** |
| Retention rate | 15.5% |

---

### Example 6: Gross 500 000 FCFA/month (Crosses 3rd IRPP bracket)

**CNPS Employee:**
- Base plafonnée: 500 000
- Pension (4.2%): **21 000**

**Taxable Income Calculation:**
- Annual Gross: 6 000 000
- After Abatement: 5 500 000
- After Professional Expenses: 4 400 000
- Annual CNPS: 252 000
- Annual Taxable Income: **4 148 000**
- IRPP breakdown:
  - First 2 000 000 × 10% = 200 000
  - Next 1 000 000 × 15% = 150 000
  - Remaining 1 148 000 × 25% = 287 000
  - **Total: 637 000**

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 53 083 |
| CAC | 5 308 |
| TDL | 2 250 |
| RAV | 5 850 |
| Crédit Foncier | 5 000 |
| **Total** | **71 492** |

**Employer CNPS:**

| Contribution | Amount |
|-------------|--------|
| Prestation Familiale | 35 000 |
| Accident du Travail | 12 500 |
| Pension | 21 000 |
| **Total** | **68 500** |

**Employer Taxes:**

| Tax | Amount |
|-----|--------|
| FNE | 5 000 |
| Crédit Foncier | 7 500 |
| **Total** | **12 500** |

**Results:**
| | Amount |
|--|--------|
| Gross | 500 000 |
| Total Employee Deductions | 92 492 |
| **Net Salary** | **407 508** |
| Employer Charges | 81 000 |
| **Total Cost (Employer)** | **581 000** |
| Retention rate | 18.5% |

---

### Example 7: Gross 750 000 FCFA/month (At CNPS cap, crosses 4th IRPP bracket)

**CNPS Employee:**
- Base plafonnée: **750 000** (= plafond, so CNPS is maxed out)
- Pension (4.2%): **31 500**

**Taxable Income Calculation:**
- Annual Gross: 9 000 000
- After Abatement: 8 500 000
- After Professional Expenses: 6 800 000
- Annual CNPS: 378 000
- Annual Taxable Income: **6 422 000**
- IRPP breakdown:
  - First 2 000 000 × 10% = 200 000
  - Next 1 000 000 × 15% = 150 000
  - Next 2 000 000 × 25% = 500 000
  - Remaining 1 422 000 × 35% = 497 700
  - **Total: 1 347 700**

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 112 308 |
| CAC | 11 231 |
| TDL | 2 500 |
| RAV | 9 750 |
| Crédit Foncier | 7 500 |
| **Total** | **143 289** |

**Employer CNPS:**

| Contribution | Amount |
|-------------|--------|
| Prestation Familiale | 52 500 |
| Accident du Travail | 18 750 |
| Pension | 31 500 |
| **Total** | **102 750** |

**Employer Taxes:**

| Tax | Amount |
|-----|--------|
| FNE | 7 500 |
| Crédit Foncier | 11 250 |
| **Total** | **18 750** |

**Results:**
| | Amount |
|--|--------|
| Gross | 750 000 |
| Total Employee Deductions | 174 789 |
| **Net Salary** | **575 211** |
| Employer Charges | 121 500 |
| **Total Cost (Employer)** | **871 500** |
| Retention rate | 23.3% |

> Note: At 750 000, the CNPS plafond is reached. For any gross above this, CNPS pension and family contributions remain fixed at 31 500 and 52 500 respectively. Only accident du travail (2.5% on full gross) continues to scale.

---

### Example 8: Gross 1 000 000 FCFA/month (Above CNPS cap)

**CNPS Employee:**
- Base plafonnée: **750 000** (capped — gross exceeds plafond)
- Pension (4.2%): **31 500** (same as 750k)

**Taxable Income Calculation:**
- Annual Gross: 12 000 000
- After Abatement: 11 500 000
- After Professional Expenses: 9 200 000
- Annual CNPS: 378 000
- Annual Taxable Income: **8 822 000**
- IRPP breakdown:
  - First 2 000 000 × 10% = 200 000
  - Next 1 000 000 × 15% = 150 000
  - Next 2 000 000 × 25% = 500 000
  - Remaining 3 822 000 × 35% = 1 337 700
  - **Total: 2 187 700**

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 182 308 |
| CAC | 18 231 |
| TDL | 2 500 |
| RAV | 12 350 |
| Crédit Foncier | 10 000 |
| **Total** | **225 389** |

**Results:**
| | Amount |
|--|--------|
| Gross | 1 000 000 |
| Total Employee Deductions | 256 889 |
| **Net Salary** | **743 111** |
| Employer Charges | 134 000 |
| **Total Cost (Employer)** | **1 134 000** |
| Retention rate | 25.7% |

---

### Example 9: Gross 1 500 000 FCFA/month (High salary)

**CNPS Employee:**
- Base plafonnée: **750 000** (capped)
- Pension (4.2%): **31 500**

**Taxable Income Calculation:**
- Annual Gross: 18 000 000
- After Abatement: 17 500 000
- After Professional Expenses: 14 000 000
- Annual CNPS: 378 000
- Annual Taxable Income: **13 622 000**
- IRPP breakdown:
  - First 2 000 000 × 10% = 200 000
  - Next 1 000 000 × 15% = 150 000
  - Next 2 000 000 × 25% = 500 000
  - Remaining 8 622 000 × 35% = 3 017 700
  - **Total: 3 867 700**

**Employee Taxes (monthly):**

| Tax | Amount |
|-----|--------|
| IRPP | 322 308 |
| CAC | 32 231 |
| TDL | 2 500 |
| RAV | 13 000 |
| Crédit Foncier | 15 000 |
| **Total** | **385 039** |

**Employer CNPS:**

| Contribution | Amount |
|-------------|--------|
| Prestation Familiale | 52 500 |
| Accident du Travail | 37 500 |
| Pension | 31 500 |
| **Total** | **121 500** |

**Employer Taxes:**

| Tax | Amount |
|-----|--------|
| FNE | 15 000 |
| Crédit Foncier | 22 500 |
| **Total** | **37 500** |

**Results:**
| | Amount |
|--|--------|
| Gross | 1 500 000 |
| Total Employee Deductions | 416 539 |
| **Net Salary** | **1 083 461** |
| Employer Charges | 159 000 |
| **Total Cost (Employer)** | **1 659 000** |
| Retention rate | 27.8% |

---

## 8. Summary Comparison Table

| Monthly Gross | CNPS (Empl.) | IRPP | CAC | TDL | RAV | CF | Total Deductions | **Net Salary** | Employer Cost | Retention % |
|--------------|-------------|------|-----|-----|-----|-----|-----------------|---------------|--------------|-------------|
| 40 000 | 1 680 | 0 | 0 | 0 | 0 | 400 | 2 080 | **37 920** | 47 320 | 5.2% |
| 50 000 | 2 100 | 457 | 46 | 0 | 0 | 500 | 3 102 | **46 898** | 59 400 | 6.2% |
| 100 000 | 4 200 | 4 247 | 425 | 500 | 750 | 1 000 | 11 121 | **88 879** | 116 200 | 11.1% |
| 200 000 | 8 400 | 11 827 | 1 183 | 1 250 | 1 950 | 2 000 | 26 609 | **173 391** | 232 400 | 13.3% |
| 350 000 | 14 700 | 26 462 | 2 646 | 2 250 | 4 550 | 3 500 | 54 108 | **295 892** | 406 700 | 15.5% |
| 500 000 | 21 000 | 53 083 | 5 308 | 2 250 | 5 850 | 5 000 | 92 492 | **407 508** | 581 000 | 18.5% |
| 750 000 | 31 500 | 112 308 | 11 231 | 2 500 | 9 750 | 7 500 | 174 789 | **575 211** | 871 500 | 23.3% |
| 1 000 000 | 31 500 | 182 308 | 18 231 | 2 500 | 12 350 | 10 000 | 256 889 | **743 111** | 1 134 000 | 25.7% |
| 1 500 000 | 31 500 | 322 308 | 32 231 | 2 500 | 13 000 | 15 000 | 416 539 | **1 083 461** | 1 659 000 | 27.8% |

### Key Observations

1. **Below ~42 000 FCFA/month**: Annual gross is below the 500 000 abatement, so **no IRPP** is due. Only CNPS and Crédit Foncier apply (~5% retention).

2. **CNPS cap at 750 000**: Above this gross, pension and family allowance contributions stop growing. Only accident du travail (2.5%) scales with gross.

3. **Progressive taxation**: The effective retention rate increases from ~5% at very low salaries to ~28% at 1.5M, driven primarily by progressive IRPP.

4. **Employer cost premium**: Ranges from ~18% above gross (low salaries) to ~11% (high salaries) as the CNPS cap limits employer contributions.

5. **Gross-to-net consistency**: The reverse calculation (net → gross via binary search) now produces consistent results. Entering the net from any forward calculation will return the original gross within ±100 FCFA.

---

*All amounts in FCFA. Calculations based on CGI 2024 rates. This document is for informational purposes only — consult a qualified tax professional for actual filings.*
