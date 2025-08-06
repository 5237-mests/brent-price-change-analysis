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

- 📊 Interactive **React dashboard** to explore data trends and event impacts
- 🔍 **Bayesian inference using PyMC** to detect structural change points
- 🗃️ Event-matching logic to link historical shifts with real events
- 📑 Cleanly organized analysis workflow with saved model outputs

---

## 📁 Repository Structure

brent-price-change-analysis/
├── backend/ # Flask API with PyMC modeling outputs
│ └── routes/api.py
├── frontend/ # React + Tailwind dashboard
├── data/ # Raw & transformed CSVs
├── outputs/ # change_points.json, regimes.json, metrics.json
├── notebooks/ # EDA and modeling notebooks
├── reports/ # Final report and figures
└── README.md

---

## 🔧 Tech Stack

### 📦 Frontend

- React.js (Vite)
- Tailwind CSS
- Recharts + Axios

### 🧠 Backend

- Flask + Flask-CORS
- PyMC (Bayesian change point detection)
- Pandas, ArviZ

---

## 📈 Workflow Summary

1. **Load and transform** daily Brent oil data (log returns)
2. **Detect change points** using a PyMC Bayesian model
3. **Match detected changes** to historical events
4. **Quantify regime shifts** in terms of % impact
5. **Save artifacts** (JSON, CSV) for dashboard integration
6. **Build an interactive React dashboard**

---

## 📊 Dashboard Preview

![Log Return with Change Points](./figures/dashboard.png)

Features:

- Red vertical lines for detected change points
- Historical events overlaid (optional filter)
- Mean return bands (`μ₁–μ₄`) shown across regimes

---

## 🚦 How to Run Locally

### 1. Run Backend (Flask API)

```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors pandas
python app.py
```

Runs on: [http://localhost:5000](http://localhost:5000)

### 2. Run Frontend (React + Vite)

```
cd frontend
npm install
npm run dev
```

Open in browser: [http://localhost:5173](http://localhost:5173)

---

## 💾 Key Data Artifacts

- `price_returns.csv` — cleaned log return data
- `key_events.csv` — curated geopolitical/economic events
- `change_points.json` — dates + labels of detected change points
- `regimes.json` — segmented periods with mean return (`μ`) per regime
- `metrics.json` — volatility, min/max, stats summary
- `model_trace.nc` — optional PyMC posterior samples

All outputs are stored in `outputs/` for backend access.

---

## ✅ Task Status

| Task                          | Status  |
| ----------------------------- | ------- |
| Task 1: Data Prep & EDA       | ✅ Done |
| Task 2: Bayesian Modeling     | ✅ Done |
| Task 3: Interactive Dashboard | ✅ Done |

---

## 🧠 Learning Outcomes

- Bayesian time-series modeling using PyMC
- Flask API design and serving model results
- React + Recharts dashboard development
- Data storytelling through interactive visualization

---

## 🗎 Reports

- 📄 [`reports/final_report.md`](./reports/final_report.md) — Full project report
- 📊 [`outputs/`](./outputs/) — All model results & visualizations
