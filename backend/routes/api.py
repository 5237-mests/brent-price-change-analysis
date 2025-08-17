from flask import Blueprint, jsonify, request
import pandas as pd
import numpy as np
import arviz as az
import pymc as pm

api_bp = Blueprint('api', __name__)

# Access global variables from app.py (loaded data and trace)
df = None
events = None
trace = None

def init_globals(global_df, global_events, global_trace):
    global df, events, trace
    df = global_df
    events = global_events
    trace = global_trace

@api_bp.route('/prices', methods=['GET'])
def get_prices():
    if df is None or df.empty:
        return jsonify({"error": "Data not available. Check file paths."}), 404
    return jsonify(df[['Date', 'Price', 'log_returns']].to_dict(orient='records'))

@api_bp.route('/events', methods=['GET'])
def get_events():
    if events is None or events.empty:
        return jsonify({"error": "Events data not available. Check file paths."}), 404
    return jsonify(events.to_dict(orient='records'))

@api_bp.route('/changepoints', methods=['GET'])
def get_changepoints():
    if trace is None:
        return jsonify({"error": "Model trace not available. Run fit_model.py first."}), 404
    
    summary = az.summary(trace, var_names=['tau', 'mu1', 'mu2'])
    probable_tau = int(summary.loc['tau', 'mean'])
    tau_date = df.iloc[probable_tau]['Date'] if len(df) > probable_tau else pd.NaT
    associated = events[abs(events['Date'] - tau_date).dt.days < 7] if pd.notna(tau_date) else pd.DataFrame()
    impact = {
        'mean_shift': float(summary.loc['mu2', 'mean'] - summary.loc['mu1', 'mean']),
        'associated_events': associated.to_dict(orient='records') if not associated.empty else []
    }
    return jsonify({'summary': summary.to_dict(), 'impact': impact})

@api_bp.route('/predict', methods=['POST'])
def predict():
    if trace is None:
        return jsonify({"error": "Model trace not available. Run fit_model.py first."}), 404
    
    req_data = request.json.get('log_returns', df['log_returns'].values[:100] if df is not None and not df.empty else np.zeros(100))
    idx = np.arange(len(req_data))
    
    with build_change_point_model(req_data) as model:
        with model:
            ppc = pm.sample_posterior_predictive(trace, var_names=['obs'])
            predictions = ppc.posterior_predictive['obs'].mean(axis=(0, 1)).tolist()
    
    return jsonify({'predictions': predictions})

# Import build_change_point_model after defining the blueprint to avoid circular imports
from models import build_change_point_model

# Initialize globals after app setup (called from app.py)
init_globals(None, None, None)  # Placeholder; actual values set by app.py
