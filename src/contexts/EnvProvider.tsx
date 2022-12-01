import { FlagsProvider } from 'flagged';
import { validateEnv } from 'lib';
import { createContext, PropsWithChildren, useContext } from 'react';
import { Env } from 'types';

declare global {
  interface Window {
    env: Env;
  }
}

const EnvContext = createContext<Env | undefined>(undefined);
EnvContext.displayName = 'Environment Variables Configuration';

export const EnvProvider = ({ config, children }: PropsWithChildren<{ config?: Partial<Env> }>) => {
  const windowConfig = window?.env ?? {};

  const envConfig = validateEnv(windowConfig, config);
  const featureFlags = envConfig.featureFlags;

  return (
    <EnvContext.Provider value={envConfig}>
      <FlagsProvider features={featureFlags}>{children}</FlagsProvider>
    </EnvContext.Provider>
  );
};

export const useEnvContext = () => {
  const context = useContext(EnvContext);

  if (!context) {
    throw new Error('Cannot use Env Context outside of Env Context Provider');
  }

  return context;
};
