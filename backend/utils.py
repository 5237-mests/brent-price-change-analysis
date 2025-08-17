import pandas as pd
import numpy as np

def load_brent_data(file_path='../data/BrentOilPrices.csv'):
    df = pd.read_csv(file_path)
    df.columns = ['Date', 'Price']
    df['Date'] = pd.to_datetime(df['Date'])
    df = df[(df['Date'] >= '2012-01-01') & (df['Date'] <= '2022-09-30')].dropna()
    df['log_returns'] = np.log(df['Price']) - np.log(df['Price'].shift(1))
    df = df.dropna()
    return df

def load_events(file_path='../data/key_events.csv'):
    events = pd.read_csv(file_path)
    events['Date'] = pd.to_datetime(events['Date'])
    return events