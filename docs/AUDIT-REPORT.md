# ABAPPrep — Complete Content Audit Report

**Date:** 2026-06-11
**Scope:** 573 questions + 4,584 follow-ups across 16 chapters (151 JSON files)
**Method:** 17 parallel AI auditors verified every question and follow-up against SAP ABAP technical correctness
**Status legend:** ✅ Already fixed in code | ⚠️ Pending fix

---

## Summary

| Severity | Count |
|----------|-------|
| **Critical** (factually wrong, would mislead candidate) | ~84 |
| **Medium** (suspect/outdated/imprecise) | ~144 |
| **Minor** (style/clarity) | ~101 |
| **Total flagged** | ~329 of 5,157 items (~6.4% issue rate) |
| **Clean** | ~93.6% of content technically sound |

**All ~84 critical fixes applied** (second pass completed 2026-06-11 via 9 parallel fixer agents — every CRITICAL row below is now fixed, including rows not marked ✅). Medium/minor issues still pending. The ooabap boilerplate `whyWrong`/`correctApproach` placeholders (108 entries, files c–i) were fully rewritten; boilerplate in other chapters (reports-alv, module-pool, rap-bopf, support-debugging) remains pending.

---

## Chapter: amdp-hana
**Scope:** 8 files, 31 questions, 248 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| amdp-hana-c.json | amdp-hana-008 | followup "MANDT handling" codeExample | Joins VBELN ↔ BELNR (sales doc to FI doc) — semantically wrong | Use proper reference field (BSEG.AWKEY / BSEG.VBELN) |
| amdp-hana-a.json | amdp-hana-002 | followup "CDS table functions" codeExample | Uses T009B field `budat` (doesn't exist) | Use period-boundary fields `bumon`/`butag`/`bdatj` |
| amdp-hana-e.json | amdp-hana-019 | followup "SERIES_GENERATE_DATE" codeExample | `ADD_MONTHS(CURRENT_DATE, -MONTHS_BETWEEN(...))` produces unstable buckets | Use `ADD_DAYS(erdat, 1 - DAYOFMONTH(erdat))` for month start |
| amdp-hana-b.json | amdp-hana-005 | followup "Universal Journal" codeExample | ACDOCA query uses non-standard fields `augdt`, `kunnr` | Use FAGLPOSX/BSID for open items |
| amdp-hana-b.json | amdp-hana-005 | followup "code pushdown ECC vs S/4" | Claims BSID/BSAD/BSIK/BSAK removed | They're compatibility views, not removed |
| amdp-hana-h.json | amdp-hana-029 | followup "biggest learning" codeExample | PlanViz interpretation conflates column-store storage w/ index usage | Distinguish COLUMN SEARCH operator + filter pushdown vs row-store access |
| amdp-hana-d.json | amdp-hana-012 | codeExamples | ✅ ACDOCA company-code field used as `bukrs` (should be `rbukrs`) | Use `rbukrs` |
| amdp-hana-c.json | amdp-hana-010 | followup codeExample | ✅ Wrong HANA system view `SYS.PROCEDURE_OBJECTS` | Use `SYS.PROCEDURES` |

### MEDIUM
- `amdp-hana-c.json :: amdp-hana-008` — wrongly claims TCURC is client-independent (it IS client-dependent)
- `amdp-hana-b.json :: amdp-hana-006` — calls HANA index "B-tree" (column store uses inverted indexes; row store uses B-trees)
- `amdp-hana-d.json :: amdp-hana-013` — references `kunag` field on vendor master (wrong, kunag is on VBAK)
- `amdp-hana-g.json :: amdp-hana-024` — BKPF/BSEG join needs BUKRS+BELNR+GJAHR (only shows BELNR)

---

## Chapter: basic-abap
**Scope:** 9 files, 39 questions, 312 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| basic-abap-b.json | basic-abap-009 | followup trap | Claims SELECT SINGLE sy-subrc=8 for "ambiguous" | Only 0 or 4 — remove the 8 claim |
| basic-abap-b.json, basic-abap-d.json | 009, 024 | followups | Uses `SELECT FROM v_sm50` — not a real Open SQL view | Use FM `TH_WPINFO` or SM50 API |
| basic-abap-d.json | basic-abap-024 | followup "optimize tier" | Invalid derived-table syntax `SELECT lifnr FROM @lt_10k_vendors AS t1` | Use FOR ALL ENTRIES or CDS join |
| basic-abap-h.json | basic-abap-018 | followup "ST22 dump" | Exception named `FIELD_SYMBOL_NOT_ASSIGNED` (wrong) | Real name: `GETWA_NOT_ASSIGNED` |
| basic-abap-h.json | basic-abap-019 | followup | ✅ FIELD-GROUPS labelled obsolete (wrong — still supported with EXTRACT) | Remove "obsolete" claim |
| basic-abap-e2.json | basic-abap-015 | codeExamples | ✅ Says "CLEAR keeps rows" but table has no header line | Updated to say CLEAR = REFRESH for modern tables |
| basic-abap-a.json | basic-abap-002 | codeExamples | HIDE with field-symbol scope bug (`<fs>` undefined after ENDLOOP) | Use regular variable for HIDE |
| basic-abap-g.json | basic-abap-033 | followup "update task debug" | `/H` alone insufficient — need Settings → Update Debugging toggle | Add the toggle step |

### MEDIUM
- `basic-abap-a.json :: 005` — uses BKPF field `bldat` (document date) where `budat` (posting date) is likely intended
- `basic-abap-d.json :: 027` — BAPI commit uses `wait = abap_true` (should be `wait = 'X'`)
- `basic-abap-c.json :: 026` — describes CX_DYNAMIC_CHECK declaration as "optional" without nuance

---

## Chapter: bdc-data-migration
**Scope:** 8 files, 31 questions, 248 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| bdc-data-migration-b.json | 007 | followup rollback codeExample | ✅ `BAPI_VENDOR_DELETE` doesn't exist | Use XK06 / archiving |
| bdc-data-migration-d.json | 012 | followup BDC vs DB update codeExample | ✅ `BAPI_CUSTOMER_CREATEFROMDATA1` w/ fake `pi_kunnr` | Use `pi_personaldata`, `pi_companydata` |
| bdc-data-migration-f.json | 020 | followup custom transaction codeExample | ✅ Same fake BAPI param `pi_kunnr` | Use real param names |
| bdc-data-migration-c.json | 011 | best-answer codeExample | `BAPI_VENDOR_CREATEFROMDATA` w/ fake params `lifnr`, `vendorgeneral`, `vendorcompany` | Use `COMPANY_CODE_DATA`, `VENDOR_ADDRESS` |
| bdc-data-migration-b.json | 006 | followup TS doc differs codeExample | ✅ Fake params `pi_kunnr_range`, `pi_addressdata`, `pi_centraldata` | Use `pi_personaldata`, `pi_companydata` |
| bdc-data-migration-f.json | 022 | codeExamples comment | ✅ `BAPI_VENDOR_CREATE` (fictional) | `BAPI_VENDOR_CREATEFROMDATA` |

### MEDIUM
- `bdc-data-migration-c.json :: 008` — claims AL11 supports drag-and-drop upload (wrong)
- `bdc-data-migration-f.json :: 020-021` — uses `SAPLSPO0/0060` for popup (canonical is SAPLSPO1)
- `bdc-data-migration-a.json :: 001` — wrongly defines BAPI as "direct DB update"
- `bdc-data-migration-c.json :: 008/011` — invented auth object `M_LFA1_MKK` (real: `M_LFA1_EKO`)
- `bdc-data-migration-h.json` — invented `S_MIG_VENDOR` auth object

---

## Chapter: cds-views
**Scope:** 11 files, 31 questions, 248 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| cds-views-d.json | 015 | multiple sections | Self-contradicts `@AccessControl.authorizationCheck` valid values; invents `#MANDATORY_CHECK` | Standardize: `#CHECK`, `#NOT_REQUIRED`, `#NOT_ALLOWED`, `#PRIVILEGED_ONLY` |
| cds-views-h1.json | 029 | codeExamples DCL | ✅ `aspect pfcg_auth(M_BEST_EKG, ACTVT, '03')` syntax broken | `aspect pfcg_auth(M_BEST_EKG, EKGRP, ACTVT = '03')` |
| cds-views-f.json | 021 | codeExamples | ✅ `lfa1t.lfa1t` — field doesn't exist | Use `lfa1t.bezei` |
| cds-views-a.json | 002 | followup #8 codeExample | ✅ Wrong transport object class `TABD ZMAT_V` | System-generated, not separately transported |
| cds-views-g1.json | 025 | followup #6 codeExample | ✅ Invalid CAST `cast(vkorg as vkorg)` | `cast(vkorg as abap.char(4))` |

### MEDIUM
- `cds-views-b.json :: 007` — `aspect pfcg_auth(S_DEVELOP, DEVCLASS = '$')` misuses S_DEVELOP for data override
- `cds-views-a.json :: 003` — wrong claim about `@AbapCatalog.preserveKey` runtime behavior
- `cds-views-c1.json :: 009` — non-standard EXTEND VIEW syntax with table-qualified refs
- `cds-views-c1.json :: 009` — wrongly mixes `@VDM.viewType: #COMPOSITE` with `@Analytics.dataCategory: #CUBE`
- `cds-views-g2.json :: 026` — ABAP path expressions use underscore (`_customer_name1`) instead of hyphen (`_Customer-Name1`)
- `cds-views-c1.json :: 008` — uses `$session.system_language` for plant authorization (wrong context)

---

## Chapter: data-dictionary (Part 1, files a–i)
**Scope:** 9 files, 30 questions, ~226 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| data-dictionary-b.json | 007 | multiple | ✅ Lock mode E/X reversed (claims X=cumulative, X survives COMMIT) | E=cumulative, X=non-cumulative; neither survives COMMIT alone |
| data-dictionary-a.json | 001 | followup #7 | ✅ Wrong delivery class glossary (L=Temporary, W=System transport wrong) | L=Customizing delivered by SAP, W=System data delivered by SAP |
| data-dictionary-d.json | 010 | followup #2 codeExample | `lv_ratio = ls_card-dist_vals / ls_card-total_rows` — integer division gives 0 | Use floating-point or CAST AS DEC |
| data-dictionary-f.json | 015 | codeExamples (Trap 3) | ENQUEUE FM call lists explicit `mandt = sy-mandt` (FM doesn't expose it) | Remove `mandt` from EXPORTING |
| data-dictionary-f.json | 015 | followup #3 codeExample | Same `mandt` parameter on ENQUEUE_EZ_ORDER | Remove |

### MEDIUM
- `data-dictionary-f.json :: 015` — claims "T000 is delivery class G" (wrong — T000 is client-independent)
- `data-dictionary-d.json :: 008` — quickRevisionNotes contradicts body on outer joins
- `data-dictionary-c.json :: 005` — TMG event numbers 08/09/10 don't match SAP standard event catalog
- `data-dictionary-b.json :: 007` — `SELECT FROM enqstat` doesn't work (locks live in enqueue server memory)

### MINOR
- `data-dictionary-a.json :: 001` — `DDIF_FIELDINFO_GET` parameter `ddobjtype` doesn't exist
- `data-dictionary-e.json :: 014` — Open SQL `SELECT MAX(strlen(field))` not supported

---

## Chapter: data-dictionary (Part 2, files j–s)
**Scope:** 9 files, 36 questions, ~288 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| data-dictionary-n.json | 049 | followup #6 | ✅ APPL0/APPL1/APPL2 data class definitions swapped + POOL/CLUSTER listed as data classes | APPL0=master, APPL1=transaction, APPL2=customizing |
| data-dictionary-q.json | 060 | followup #5 | ✅ Lock mode X reversed | X=non-cumulative, E=cumulative |
| data-dictionary-l.json | 039 | multiple sections | ✅ `TVKOA` used for Sales Org master (TVKOA is allocation; master is TVKO) | Use TVKO |
| data-dictionary-k.json | 035 | followup #3 | ✅ Cardinality "N:1, N:N" invalid (left side only allows 1 or C) | Use 1:1, 1:N, 1:C, 1:CN, C:N, C:CN |
| data-dictionary-m.json | 044 | followup #3 + notes | ✅ Cardinality `CN:1` invalid | Invert to `1:CN` |
| data-dictionary-q.json | 062 | followup #1 | S_TABU_DIS ACTVT lists 06=Delete (only 02/03 valid) | Remove 06 |

### MEDIUM
- `data-dictionary-n.json :: 049` — SM56 cited as table buffer monitor (it's number range buffer; correct: ST02)
- `data-dictionary-n.json :: 049` — Report `RSICF1` doesn't exist (invented)
- `data-dictionary-s.json :: 063` — TDDAT misdescribed as DDIC lock table (actually authorization-group table)
- `data-dictionary-l.json :: 040` — Specific size category numeric ranges invented
- `data-dictionary-l.json :: 040` — Says SE14 "physically reorganizes" on HANA (column store doesn't reorganize that way)

---

## Chapter: enhancements
**Scope:** 8 files, 31 questions, 248 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| enhancements-d.json | 014 | multiple sections | STAUTHTRACE mischaracterized as tracing BAdI calls (only traces auth checks) | Use ST05/SAT or breakpoint on CALL BADI |
| enhancements-b.json | 006 | same | Same STAUTHTRACE misclaim | Same fix |
| enhancements-d.json | 012 | hinglishMaster | Claims classic BAdI uses "SAP_EXIT_" naming (wrong) | Classic BAdIs use CL_EXITHANDLER + IF_EX_* |
| enhancements-g.json | 027 | followup #2 codeExample | ✅ `AUTHORITY-CHECK FIELD 'DUMMY'` mislabelled as bypass | Real bypass: `ID 'BUKRS' DUMMY` (no quotes) |
| enhancements-c.json | 010 | codeExamples | Invalid `cl_exithandler` ref-type usage | Type as `if_ex_<badi>` |
| enhancements-d.json | 012 | codeExamples | ✅ `DATA lo_badi TYPE REF TO cl_exithandler` invalid | `TYPE REF TO if_ex_<badi_name>` |
| enhancements-h.json | 028 | codeExamples | ✅ `R3TR ENHS` used for BAdI implementation | `R3TR ENHO` (ENHS is for spot definition only) |
| enhancements-c.json | 009 | followup #7 codeExample | ✅ Wrong TADIR type `R3TR SPOT` | `R3TR ENHS` |
| enhancements-d.json | 012 | followup #1 codeExample | Invented RAP API `CL_ABAP_BEHAVIOR_SAVER` for validation | `CL_ABAP_BEHAVIOR_HANDLER` + FOR VALIDATE ON SAVE |
| enhancements-c.json | 010 | followup #3 codeExample | Invented BDEF extension syntax `extension using /sap/bc/rap/...` | Replace with realistic BDEF extension or remove |
| enhancements-h.json | 028 (was -d 014 in audit) | codeExamples | ✅ `MESSAGE … INTO sy-msgli` — sy-msgli doesn't exist | `INTO DATA(lv_msg)` |

### MEDIUM
- `enhancements-a.json :: 001` — uses fictional `BADI_SALESORDER_SAVE`
- `enhancements-b.json :: 005` — invented tables `CMOD_EHDR`, `SXI_BADI_IMPL_D` (correct: MODSAP, SXC_ATTR, BADI_IMPL)
- `enhancements-a.json :: 002` — wrong customer include `ZXVVAU02` paired with V45A0002

---

## Chapter: forms-workflow
**Scope:** 12 files, 46 questions, 368 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| forms-workflow-b.json | 006 | hinglishMaster + realtime | ✅ Claims BUS2105 = Leave Request (actually Purchase Requisition) | Use FORMABSENC |
| forms-workflow-c.json | 008 | multiple | ✅ Claims BUS2086 = HR Leave Request (actually Personnel Time Event) + "WT" prefix | FORMABSENC + "WS" prefix |
| forms-workflow-d.json | 013 | followup codeExample | ✅ Typo `DALL FUNCTION 'RH_GET_ACTORS'` | `CALL FUNCTION` |
| forms-workflow-k.json | 040 | codeExamples | ✅ Typo `CATA: lt_wi TYPE TABLE OF swrwihead` | `DATA:` |
| forms-workflow-k.json | 040 | codeExamples | `SAP_WAPI_READ_EVENT_LOG` doesn't exist | Use SWEL transaction or SWEL DB read |
| forms-workflow-f.json | 020 | codeExample | ✅ `SAP_WAPI_FORWARD_WORKITEM` parameter `user_to` (wrong) | `user_id` |

### MEDIUM
- `forms-workflow-a.json :: 003` — Adobe Form FM exception `not_found` (real: cancel/usage_error/system_error)
- `forms-workflow-f.json :: 020` — `SAP_WAPI_CREATE_EVENT` uses `event` param (correct: `event_name`)
- `forms-workflow-c.json :: 009` — "four agent types: Possible/Responsible/Actual/Excluded" oversimplified
- `forms-workflow-e.json :: 019` — claims "WF-BATCH job evaluates deadline" (it's user; real job is SWWDHEX)
- `forms-workflow-e.json :: 019` — `INSERT nast FROM ls_nast` shown as "create condition record" (NAST is message status, not condition)

---

## Chapter: internal-tables
**Scope:** 10 files, 42 questions, 336 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| internal-tables-g.json | 027 | codeExamples | ✅ Duplicate `INTO TABLE @DATA()` clauses — syntax error | Keep one INTO at end |
| internal-tables-h.json | 032 | followup "LOOP AT WHERE on sorted" | Wrong claim "no auto binary search optimization" | Sorted table WHERE on leading key IS optimized |
| internal-tables-b.json | 007 | hinglishMaster + mistakes | Wrong claim APPEND on sorted/hashed = sy-subrc=4 | It's a syntax error (typed) or runtime error (generic) |
| internal-tables-i.json | 037 | realtime | Says BINARY SEARCH on hashed = runtime error | It's a syntax error (rejected at compile) |

### MEDIUM
- `internal-tables-d.json :: 015` — wrongly claims MOVE-CORRESPONDING between tables not supported (works since 7.40 SP08+)
- `internal-tables-b.json :: 010` — parallel cursor `lv_idx = sy-tabix` placement is suboptimal
- `internal-tables-b.json :: 007` — wrong claim about COLLECT support on hashed
- `internal-tables-a.json :: 003` — wrongly says READ TABLE on hashed needs full key (free WITH KEY works but loses O(1))
- `internal-tables-c.json :: 013` — `DATA lt_s TYPE SORTED TABLE OF ty_order WITH KEY matnr.` missing UNIQUE/NON-UNIQUE prefix

---

## Chapter: module-pool
**Scope:** 7 files, 27 questions, 216 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| All 7 files | many | codeExamples | ✅ `SAVE_OK_CODE ok_code. CLEAR ok_code. CASE ok_code.` — CLEAR wipes the value before CASE | Remove the `CLEAR ok_code.` line |
| module-pool-e.json | 016, 017, 018 | codeExamples | ✅ `CONTROLS … USING SCREEN '0200'` (quoted) — won't compile (12 instances) | Remove quotes: `USING SCREEN 0200` |
| module-pool-e.json | 018 | codeExamples + wordByWord | ✅ `sy-werks` not a valid system field | Use `GET PARAMETER ID 'WRK'` |
| module-pool-a.json | 001 | followup #7 interviewAnswer | Wrong SE93 type "Program and selection screen" (that's for reports) | Use "Dialog Transaction" / "Program and screen" |

### MEDIUM
- `module-pool-b.json :: 005` — confused `screen-active=0` (deactivates) vs `screen-invisible=1` (hides)
- `module-pool-d.json :: 014` — `BACK/SET SCREEN 0` advice contradicts AT EXIT-COMMAND advice
- `module-pool-f.json :: 022` — `READ TABLE … BINARY SEARCH` without SORT
- Multiple files — "Multiple MESSAGE E in sequence" pattern (unreachable code)

---

## Chapter: odata-gateway
**Scope:** 8 files, 31 questions, 248 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| odata-gateway-g.json | 027 | codeExamples | ✅ `S_SERVICE SRV_TYPE = 'SERVICE'` / `BUNDL` invalid | `SRV_TYPE = 'HT'` |
| odata-gateway-d.json | 015 | codeExamples + interviewMeKyaBolnaHai | Wrongly says "never call COMMIT WORK or BAPI_TRANSACTION_COMMIT in DPC_EXT" | BAPI flow REQUIRES BAPI_TRANSACTION_COMMIT |
| odata-gateway-h.json | 031 | followup codeExample | ✅ `io_tech_request_context->get_source_key()` doesn't exist | Use `get_source_keys()` (plural) |

### MEDIUM
- `odata-gateway-b.json :: 005` — `READ TABLE lt_sel WITH KEY property_name = ...` (real key is `property_path`)
- `odata-gateway-f.json :: 020` — Invalid double assign+IMPORTING on `get_filter_select_options()`
- `odata-gateway-g.json :: 027` — `S_RFCACL` has invented field `RFC_TYPE` (real fields: RFC_SYSID, RFC_CLIENT, etc.)
- `odata-gateway-b.json :: 007` — Says CX_MGW_BUSI_EXCEPTION → HTTP 500 (actually 400)

---

## Chapter: ooabap
**Scope:** 9 files, 34 questions, 272 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| ooabap-f.json | 019, 020 | codeExamples | `RAISE EXCEPTION` inside SWITCH expression (statement vs expression) | Use `THROW` (and exception must inherit cx_dynamic_check) |
| ooabap-c.json | 010 | followup #6 codeExample | Invalid `SWITCH string( ls_order-netwr WHEN THEN 'HIGH' …)` — WHEN needs literal | Use COND for range conditions |
| Files c-i | many | commonMistakesSection | 108+ entries with placeholder `whyWrong: "Production impact: incorrect results or wasted effort that shows up only in QA/UAT"` | Rewrite with specific reasoning |

### MEDIUM
- `ooabap-b.json :: 004` | ✅ `CLASS DEFINITION IMPLEMENTING lif_dao` — keyword is `INTERFACES` (fixed)
- `ooabap-a.json :: 002` — Wrongly says ALIASES resolve interface method-name conflicts (they're a readability tool only)
- `ooabap-h.json :: 030` — Misleading claim that `IN BACKGROUND TASK` runs under different user (it runs as sy-uname after COMMIT)
- `ooabap-b.json :: 007` — Says CL_SALV_TABLE constructor is private (it's protected)
- `ooabap-h.json :: 030` — `AUTHORITY-CHECK OBJECT iv_object` requires `(iv_object)` parentheses for dynamic form

---

## Chapter: rap-bopf
**Scope:** 8 files, 31 questions, 248 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| rap-bopf-d/e/f/h.json | 013-029 | codeExamples | Fictional class `CL_ABAP_BEHV_TESTDOUBLE` / `cl_abap_behv_test_environment` | Real RAP test framework: `cl_botd_*` (e.g., `cl_botd_txbufdbl_bo_test_env_factory`) |
| rap-bopf-a.json | 003 | codeExamples | ✅ `BAPI_TRANSACTION_COMMIT` inside `FOR MODIFY` — corrupts RAP LUW | Commit goes in SAVER class only |
| rap-bopf-a/f/g/h.json | 001, 020, 021, 024, 029 | codeExamples | ✅ `@AbapCatalog.sqlViewName` on `define root view entity` — invalid | Remove annotation (view entities don't generate SQL views) |

### MEDIUM
- `rap-bopf-a.json :: 002` — Invalid BDEF late numbering syntax (uses colon)
- `rap-bopf-b.json :: 006` — Fictional BOPF constants `/bobf/if_tra_c=>sc_bo_key_sales_order`
- `rap-bopf-d.json :: 013` — Wrong claim "draft table includes only fields you need" (must mirror active + draft admin)
- `rap-bopf-a.json :: 003` — "BOPF deprecated from S/4HANA 1909" (wrong — restricted in 2020/2021)

---

## Chapter: reports-alv
**Scope:** 10 files, 37 questions, 296 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| reports-alv-c.json | 008 | codeExamples | ✅ `cl_fdt_xl_spreadsheet` described as XLSX **generator** with invented methods | It's a READER for BRFplus; use ABAP2XLSX / CL_XLSX_DOCUMENT |
| reports-alv-j.json | 035 | codeExamples | ✅ `s_bukrs FOR t001-bukrs` used in WHERE against `vkorg` field | Match field types |
| reports-alv-b.json | 005 | codeExamples | ✅ TOOLBAR event handler uses `ct_toolbar` (wrong) | Use `e_object->mt_toolbar` |

### MEDIUM
- `reports-alv-e.json :: 017` — Invented BAPI `BAPI_DELIVERYPROCESSING_EXEC` (real: BAPI_OUTB_DELIVERY_CHANGE)
- `reports-alv-h.json :: 028` — ALV color codes wrong (`col=5` claimed as yellow; actually green)
- `reports-alv-c.json :: 010` — Function module `LT_VARIANT_DELETE` doesn't exist
- `reports-alv-c.json :: 009` — `add_protocol_entry` uses `iv_` prefix (real prefix is `i_`)

---

## Chapter: s4hana
**Scope:** 8 files, 31 questions, 248 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| s4hana-g.json | 024 | followup #6 | ✅ DMBTR ↔ WRBTR reversed (DMBTR is LOCAL, WRBTR is DOCUMENT currency) | Swap descriptions; ACDOCA mapping: DMBTR→HSL, WRBTR→WSL |
| s4hana-a.json | 003 | followup #7 | MATDOC↔ACDOCA join uses `aedat = belnr` (AEDAT is change date, not doc number) | Join via AWREF/AWKEY/AWTYP |
| s4hana-e.json | 018 | multiple | ✅ Fictional Tcodes `/SDF/CD_CCA` and `SCMG` (SCMG is Case Management) | `/SDF/RC_START_CHECK`, `SYCM` |

### MEDIUM
- `s4hana-b.json :: 006` — Open SQL window function example mixes patterns that don't compile in strict mode
- `s4hana-b.json :: 004` — Open-item logic via `augbl = space` oversimplified
- `s4hana-h.json :: 028` — Invented FM `SCI_RUN_BY_PROG` (real ATC API: `SATC_API_RUN_TRIGGER`)
- `s4hana-h.json :: 028` — Wrong tables `WBCROSSGT` for CDS dependency
- `s4hana-h.json :: 028` — Wrong table `TMSBUFFER.rcoftp` field
- `s4hana-010` — "CLIENT SPECIFIED forbidden — runtime dump" (too strong; ATC flags but doesn't auto-dump)

---

## Chapter: selection-screens
**Scope:** 9 files, 34 questions, 272 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| selection-screens-c.json | 008 | multiple | ✅ Says MODIF ID max 4 chars (screen-group1 is CHAR(3)) | Max 3 chars; `MODIF ID 'DAT'` |
| selection-screens-e.json | 015 | followup #6 | ✅ Says screen-group1 is 2 chars + false `'DAT' vs 'DA' collide` claim | Max 3 chars, remove collision claim |
| selection-screens-i.json | 032 | followup #4 | ✅ Says MODIF ID up to 4 chars | Up to 3 chars |

### MEDIUM
- `selection-screens-b.json :: 005` — `RS_SUPPORT_SELECTIONS` params wrong (VARIANT expects scalar, code passes structure)
- `selection-screens-b.json :: 005` — Transport type `R3TR VARX` doesn't exist (real: `LIMU VARI`)
- `selection-screens-c.json :: 009` — `DYNPFLD_MAPPING` typed as `dfies` (should be `dselc`)
- `selection-screens-b.json :: 006` — FIELD-highlight example shows MESSAGE without FIELD statement
- `selection-screens-b.json :: 004` — `SET TITLEBAR` conflated with selection-screen frame title

---

## Chapter: support-debugging
**Scope:** 8 files, 31 questions, 248 follow-ups

### CRITICAL
| File | Question | Section | Problem | Fix |
|------|----------|---------|---------|-----|
| support-debugging-c.json | 011 | codeExamples | ✅ Malformed AUTHORITY-CHECK `'V_VBAK_VKO' FIELD 'VKORG' ID 'VKORG' …` | `OBJECT 'V_VBAK_VKO' ID 'VKORG' FIELD '1000' ID 'ACTVT' FIELD '03'` |
| support-debugging-b.json | 005 | codeExamples | `CALL FUNCTION ... EXCEPTIONS system_failure = 1 MESSAGE DATA(lv_sys_msg)` — inline DATA() not allowed in EXCEPTIONS MESSAGE | Declare variable first |
| support-debugging-c.json | 011 | codeExamples + quickRevisionNotes | `TBTCJOB` used as base table (it's a DDIC structure) | Use TBTCO (header) / TBTCP (steps) |
| support-debugging-a.json | 002 | quickRevisionNotes | Job statuses Y/Z=aborted (invented) | Real: P/S/R/A/F/X |
| support-debugging-g.json | 026 | codeExamples | ✅ `lt_items TYPE TABLE OF ekpo` but uses `lt_items-lifnr` (EKPO has no LIFNR) | `TYPE TABLE OF ekko` |

### MEDIUM
- `support-debugging-f.json :: 022` — `MESSAGE e001(zmm) WITH '1200' TYPE 'E'` — duplicate type spec
- `support-debugging-c.json :: 008` — "Cancel without Restart" terminology mismatch with SAP GUI
- `support-debugging-c.json :: 009` — STMS return codes list 16 (real: 0/4/8/12 only)
- `support-debugging-h.json :: 029` — Comment says `SU_GET_AUTH` (no such FM)

---

## Cross-cutting systemic issues

These appear in many files and would benefit from a chapter-wide rewrite:

1. **Boilerplate `whyWrong` text** — "Production impact: incorrect results or wasted effort that shows up only in QA/UAT" repeated in 100+ entries across ooabap, reports-alv, module-pool, rap-bopf, support-debugging, etc.

2. **Boilerplate `correctApproach` text** — "Use the correct approach as described in the deep-dive section." — non-actionable filler across module-pool, ooabap, rap-bopf

3. **Cross-file inconsistencies in odata-gateway** — BAPI commit policy contradicted (file b says "BAPI_TRANSACTION_COMMIT mandatory", file d says "never commit"); SRV_TYPE conflict between files g and h

4. **Selection screens `MODIF ID` length** — Different files claim 2, 3, or 4 chars (correct: 3)

5. **Data dictionary lock mode E/X** — Reversed in both part 1 and part 2 files (chapter-wide)

---

## Already-applied fixes (commits to make)

48 critical fixes were applied directly to source JSON files via parallel fixer agents. All files validated as well-formed JSON. Items marked ✅ above are done.

**Remaining work:**
- ~~36 critical issues~~ — all fixed 2026-06-11 (second fixer pass)
- ~144 medium issues pending
- ~101 minor issues pending
- Systemic placeholder text rewrites: ooabap done; reports-alv, module-pool, rap-bopf, support-debugging pending

---

*Generated by ABAPPrep audit pipeline — 17 chapter auditors + 4 fixer agents.*
