import axios, { AxiosInstance } from 'axios';
import { useEnvContext } from './EnvProvider';
import { useFeature } from 'flagged';
import { logRequest, logResponse } from 'lib';
import { createContext, PropsWithChildren, useContext } from 'react';

type Services = {
  api: AxiosInstance;
};

const ServiceContext = createContext<Services | undefined>(undefined);

export const ServiceProvider = ({ children }: PropsWithChildren) => {
  const { apiUrl } = useEnvContext();
  const hasRequestLogging = useFeature('requestLogging') as boolean;

  const api = axios.create({
    baseURL: apiUrl
  });

  if (hasRequestLogging) {
    api.interceptors.request.use(logRequest);
    api.interceptors.response.use(logResponse);
  }

  return <ServiceContext.Provider value={{ api }}>{children}</ServiceContext.Provider>;
};

export const useServiceProvider = () => {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error('Cannot use Service Provider outside Service Provider Context');
  }

  return context;
};
