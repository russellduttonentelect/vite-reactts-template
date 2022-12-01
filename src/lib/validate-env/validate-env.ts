import { Env } from 'types';

export const validateEnv = (envConfig: Partial<Env>, defaultConfig?: Partial<Env>): Env => {
  envConfig.apiUrl ||= defaultConfig?.apiUrl;
  if (!envConfig.apiUrl) {
    throw new Error('API Url not defined in ENV config');
  }

  envConfig.featureFlags ||= defaultConfig?.featureFlags;

  return envConfig as Env;
};
