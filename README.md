**Week 10 KAIM challenge repo**, structured for clarity and professionalism:

---

# Brent Oil Price Change Analysis 🛢️📈

A data science project analyzing the impact of major geopolitical and economic events on Brent crude oil prices using **Bayesian Change Point Detection**. Developed for the **10 Academy KAIM Week 10 Challenge**.

---

## 🚀 Project Objective

To identify significant change points in Brent oil price trends over the past decades and associate them with real-world events such as:

- OPEC decisions
- Global conflicts
- Economic sanctions
- Major political and policy shifts

The goal is to help **investors, analysts, and policymakers** make better-informed decisions.

---

## 🧠 Key Features

- 📊 Interactive **React dashboard** (with Recharts)
- 🔍 **Bayesian inference with PyMC3** to detect change points
- 🗃️ Event-matching logic to associate shifts with real events
- 📑 Well-structured analysis workflow & reporting

---

## 📁 Repository Structure

brent-price-change-analysis/
├── backend/ # Flask API and Bayesian model (PyMC3)
├── frontend/ # React + TypeScript dashboard
├── data/
│ ├── brent_prices.csv
│ └── key_events.csv
├── notebooks/
│ └── eda.ipynb
├── reports/  
│ ├── interim_report.md
│ └── log_return_events.png
├── reports/ # Interim/final reports
└── README.md

---

## 🔧 Tech Stack

### 📦 Frontend

- React.js with TypeScript
- Tailwind CSS
- Recharts

### 🧠 Backend

- Flask (Python)
- PyMC3 for Bayesian modeling
- Pandas, NumPy

---

## 📈 Sample Workflow

1. **Load Brent oil daily price data** (1987–2022)
2. **Overlay key events** (wars, OPEC meetings, crises)
3. **Run PyMC3 Bayesian Change Point Detection**
4. **Quantify and visualize** changes in price structure
5. **Display insights** in a web dashboard

---

## 📅 Key Dates

- 📝 Interim Submission: **01 August 2025, 20:00 UTC**
- 📊 Final Submission: **05 August 2025, 20:00 UTC**

---

## 🧠 Learning Outcomes

- Bayesian inference & MCMC
- Statistical modeling of time series
- React dashboard design for data storytelling
- Communicating insights to stakeholders

---

## 👥 Contributors

- Mesfin Mulugeta (Data Scientist @ KAIM)
- 10 Academy Mentors: Mahlet, Rediet, Kerod, Rehmet

---

## 📌 Notes

- This project uses mock data in early stages.
- Real analysis begins once PyMC3 modeling is integrated.

---

## 📌 Task 1: Laying the Foundation — ✅ Completed

- ✅ Defined full data science workflow
- ✅ Compiled and structured 15 key geopolitical and economic oil market events (`key_events.csv`)
- ✅ Performed EDA:
  - Price trend visualization
  - Log return transformation
  - Stationarity testing using ADF
  - Volatility spike detection
- ✅ Overlaid key event markers on the log return chart
- ✅ Documented everything in `interim_report.md`

# Visuals

### 📷 Key Plot: Log Return Volatility with Events

![Log Return with Events](./figures/brent_log_returns_with_events.png)
