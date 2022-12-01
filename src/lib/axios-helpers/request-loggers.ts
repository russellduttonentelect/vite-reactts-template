import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const logRequest = (requestConfig: AxiosRequestConfig) => {
  // eslint-disable-next-line no-console
  console.log({ type: 'REQUEST', url: requestConfig.url, requestConfig });
  return requestConfig;
};

export const logResponse = (response: AxiosResponse) => {
  // eslint-disable-next-line no-console
  console.log({
    type: 'RESPONSE',
    url: response.config.url,
    data: response.data,
    response
  });
  return response;
};
