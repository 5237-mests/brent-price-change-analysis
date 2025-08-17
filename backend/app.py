from flask import Flask
from flask_cors import CORS
from routes.api import api_bp
from models import load_trace
from utils import load_brent_data, load_events
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for React

# Load data and trace with error handling
try:
    df = load_brent_data('../../data/BrentOilPrices.csv')
    if 'log_returns' not in df.columns:
        df['log_returns'] = np.log(df['Price'] / df['Price'].shift(1)).dropna()
    events = load_events('../../data/key_events.csv')
    trace = load_trace()
except FileNotFoundError as e:
    print(f"Error: {str(e)}. Check data file paths.")
    df, events, trace = pd.DataFrame(), pd.DataFrame(), None

# Register blueprints
app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)