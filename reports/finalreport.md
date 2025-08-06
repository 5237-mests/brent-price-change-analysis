# 🛢️ Final Report – Brent Oil Price Change Point Analysis

## 🧠 Objective

The goal of this project was to detect and analyze **structural changes** in Brent oil prices using **Bayesian Change Point Modeling**.
The resulting model helps understand how major events influenced price volatility, and is integrated into an interactive dashboard for exploration.

---

## 🔍 Task 1: Data Preparation & EDA

- Daily Brent oil prices cleaned and log returns computed
- ADF test confirmed stationarity of log returns (p ≪ 0.05)
- Summary stats:
  - Mean return ≈ 0.00018
  - Std dev ≈ 0.0255
  - 9,010 observations

---

## 🔢 Task 2.1: PyMC Change Point Modeling

- Bayesian model fitted using **PyMC**
- Detected 3 key change points:

  1. 1997-06-18 – Start of Asian Financial Crisis
  2. 2008-08-11 – Oil price crash during GFC
  3. 2008-12-17 – Recovery begins

- Segment return means:

  - μ₁: +0.00018
  - μ₂: +0.00046
  - μ₃: −0.00834
  - μ₄: +0.00098

- Quantified impact:
  - μ₂ → μ₃: **−1898% drop**

All outputs saved as JSON/CSV for dashboard.

---

## 🧪 Task 3: Interactive Dashboard

Built with **Flask (API)** and **React (UI)**

### Backend

- `/api/price-returns`, `/change-points`, `/key-events`, `/regimes`, `/metrics`
- CSV/JSON files served using Flask & Pandas

### Frontend

- React + Recharts + Tailwind
- Change point lines, event overlays, filter-ready
- Ready to extend with volatility bands and date filters

---

## 📦 Deliverables

- `README.md`: full project instructions
- `report.md`: this file
- `notebooks/`: EDA and PyMC modeling
- `outputs/`: all analysis results
- `frontend/`: interactive dashboard
- `backend/`: Flask API

---

## 📊 Dashboard Preview

![Log Return with Change Points](../figures/dashboard.png)

## 🧠 Learnings

- Bayesian time series modeling with PyMC
- Flask API design and CORS integration
- Frontend data visualization using Recharts
- Full-stack coordination with real-world data

---

## ✅ Final Thoughts

This project gave a complete end-to-end experience: from raw data cleaning to advanced modeling and web-based interactive delivery — a complete data product. The dashboard makes it easy to explore complex time-series changes and link them to real-world economic events.

---
