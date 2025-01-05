// import * as Sentry from '@sentry/react-native';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import i18next from "i18next";

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export interface IApiError {
  detail: string;
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

const injectToken = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  try {
    config.headers["Accept-Language"] = i18next.language ?? "en";
    return config;
  } catch (error) {
    throw new Error(`Error getting access token ${error}`);
  }
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance ?? this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers,
    });

    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error),
    );

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        return this.handleError(error);
      },
    );

    this.instance = http;
    return http;
  }

  request<TResponse = any>(config: AxiosRequestConfig): Promise<TResponse> {
    return this.handleRequest(this.http.request(config));
  }

  get<TResponse = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    return this.handleRequest(this.http.get<TResponse>(url, config));
  }

  post<TResponse = any, TRequestBody = any>(
    url: string,
    data?: TRequestBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    return this.handleRequest(this.http.post<TResponse>(url, data, config));
  }

  put<TResponse = any, TRequestBody = any>(
    url: string,
    data?: TRequestBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    return this.handleRequest(this.http.put<TResponse>(url, data, config));
  }

  patch<TResponse = any, TRequestBody = any>(
    url: string,
    data?: TRequestBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    return this.handleRequest(this.http.patch<TResponse>(url, data, config));
  }

  delete<TResponse = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    return this.handleRequest(this.http.delete<TResponse>(url, config));
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private handleError(error: Error | AxiosError) {
    let apiError: IApiError;
    if (axios.isAxiosError(error)) {
      console.error("error data", JSON.stringify(error));
      switch (error.status) {
        case StatusCode.InternalServerError: {
          // Handle InternalServerError
          break;
        }
        case StatusCode.Forbidden: {
          // Handle Forbidden
          break;
        }
        case StatusCode.Unauthorized: {
          console.log("unauthorized", JSON.stringify(error.response));
          // Handle Unauthorized
          break;
        }
        case StatusCode.TooManyRequests: {
          // Handle TooManyRequests
          break;
        }
      }
      apiError = {
        detail: error.response?.data?.detail || error?.message,
      };
    } else {
      apiError = {
        detail: error?.message,
      };
    }

    return Promise.reject(apiError);
  }

  private async handleRequest<T>(
    request: Promise<AxiosResponse<T>>,
  ): Promise<T> {
    try {
      const response = await request;
      
      return response.data;
    } catch (error) {
      handleApiError(error as unknown as IApiError);
      throw error;
    }
  }
}

export const http = new Http();

export function handleApiError(error: IApiError): void {
  console.error("API Error:", error.detail);
}
