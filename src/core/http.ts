import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { dialog } from './dialog/dialog';
import { hideSpinner, showSpinner } from '../store/reducers/spinner.reducer';
import store from '../store/store';
import translate from '../translations';
import { nonPermanentStorage } from './storage/non-permanent';

export const http = axios.create({
    baseURL: 'https://dev.socious.io/api/v2',
//   baseURL: 'https://socious.io/api/v2',
  withCredentials: true,
  timeout: 1000000,
});

async function getAuthHeaders(): Promise<unknown> {
  const token = await nonPermanentStorage.get('access_token');
  const prefix = await nonPermanentStorage.get('token_type');
  const currentIdentity = await nonPermanentStorage.get('identity');

  if (!token || !prefix) return;

  return {
    Authorization: `${prefix} ${token}`,
    'Current-Identity': currentIdentity,
  };
}

export async function post(uri: string, payload: unknown, config?: AxiosRequestConfig<unknown>) {
  const authHeaders = await getAuthHeaders();
  config = config || {};

  if (authHeaders) config.headers = { ...config.headers, ...authHeaders };

  return http.post(uri, payload, config);
}

export async function get(uri: string, config?: AxiosRequestConfig<unknown>) {
  const authHeaders = await getAuthHeaders();
  config = config || {};
  if (authHeaders) config.headers = { ...config.headers, ...authHeaders };

  return http.get(uri, config);
}

export type ErrorSection = 'AUTH' | 'FORGET_PASSWORD';

export type ErrorHandlerParams = {
  title?: string;
  message?: string;
  section?: string;
};

const errorSections: ErrorSection[] = ['AUTH', 'FORGET_PASSWORD'];

export function handleError(params?: ErrorHandlerParams) {
  return (err: AxiosError<{ error: string }>) => {
    const errMessage = params?.message || err?.response?.data.error || 'An error accrued';
    const message = translate(errMessage, {
      cluster: 'ERROR',
      section: params?.section || getErrorSection(err?.request),
    });

    dialog.alert({
      message,
      title: params?.title || 'Failed',
    });
  };
}

http.interceptors.request.use(
  function (config) {
    store.dispatch(showSpinner());
    // Do something before request is sent
    return config;
  },
  function (error) {
    store.dispatch(hideSpinner());
    // Do something with request error
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    store.dispatch(hideSpinner());
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error) {
    store.dispatch(hideSpinner());
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
  }
);

function getErrorSection(request: XMLHttpRequest): string | undefined {
  return errorSections.filter((s) => request.responseURL.toUpperCase().includes(s))[0];
}
