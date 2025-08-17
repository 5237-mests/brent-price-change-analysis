# import pymc as pm
# import arviz as az
# import numpy as np
# from pymc.model_builder import ModelBuilder

# class ChangePointModel(ModelBuilder):
#     def build_model(self, X, y=None, coords=None):
#         idx = X  # X is idx array
#         with pm.Model(coords=coords) as model:
#             tau = pm.DiscreteUniform('tau', lower=0, upper=len(y)-1)
#             mu1 = pm.Normal('mu1', mu=0, sigma=1)
#             mu2 = pm.Normal('mu2', mu=0, sigma=1)
#             sigma = pm.HalfNormal('sigma', sigma=1)
#             mu = pm.math.switch(tau >= idx, mu1, mu2)
#             pm.Normal('obs', mu=mu, sigma=sigma, observed=y)
#         return model

#     def _data_setter(self, data, y=None):
#         with self.model:
#             pm.set_data({'obs': y})

# def fit_and_save_model(df):
#     data = df['log_returns'].values
#     idx = np.arange(len(data))
#     cp_model = ChangePointModel()
#     cp_model.fit(idx, data)
#     cp_model.save('datao/model_trace.nc')  # Note: ModelBuilder saves to JSON, but use az.to_netcdf for trace
#     trace = cp_model.idata  # Assuming fit stores idata
#     az.to_netcdf(trace, 'datao/model_trace.nc')

# def load_trace():
#     return az.from_netcdf('datao/model_trace.nc')



import pymc as pm
import arviz as az
import numpy as np

def build_change_point_model(data, coords=None):
    idx = np.arange(len(data))
    with pm.Model(coords=coords) as model:
        tau = pm.DiscreteUniform('tau', lower=0, upper=len(data)-1)
        mu1 = pm.Normal('mu1', mu=0, sigma=1)
        mu2 = pm.Normal('mu2', mu=0, sigma=1)
        sigma = pm.HalfNormal('sigma', sigma=1)
        mu = pm.math.switch(tau >= idx, mu1, mu2)
        pm.Normal('obs', mu=mu, sigma=sigma, observed=data)
    return model

def fit_and_save_model(df):
    data = df['log_returns'].values
    model = build_change_point_model(data)
    with model:
        trace = pm.sample()
        idata = az.from_pymc(trace)
        az.to_netcdf(idata, 'datao/model_trace.nc')
    return idata

def load_trace():
    return az.from_netcdf('datao/model_trace.nc')