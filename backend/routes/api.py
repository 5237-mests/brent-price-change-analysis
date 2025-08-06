from flask import Blueprint, jsonify
import pandas as pd
import json
import os

api_bp = Blueprint("api", __name__)

BASE_DATA = "data"
BASE_OUTPUTS = "outputs"

@api_bp.route("/price-returns")
def price_returns():
    df = pd.read_csv(os.path.join(BASE_DATA, "processed_brent_oil_data.csv"))
    return df.to_dict(orient="records")

@api_bp.route("/key-events")
def key_events():
    df = pd.read_csv(os.path.join(BASE_DATA, "key_events.csv"))
    return df.to_dict(orient="records")

@api_bp.route("/change-points")
def change_points():
    with open(os.path.join(BASE_OUTPUTS, "change_points.json")) as f:
        return jsonify(json.load(f))

@api_bp.route("/regimes")
def regimes():
    with open(os.path.join(BASE_OUTPUTS, "regime_segments.json")) as f:
        return jsonify(json.load(f))

@api_bp.route("/metrics")
def metrics():
    with open(os.path.join(BASE_OUTPUTS, "metrics.json")) as f:
        return jsonify(json.load(f))
