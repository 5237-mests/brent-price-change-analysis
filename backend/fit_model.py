from utils import load_brent_data
from models import fit_and_save_model


if __name__ == '__main__':
    df = load_brent_data('../data/BrentOilPrices.csv')
    fit_and_save_model(df)
    print("Model fitted and saved.")
