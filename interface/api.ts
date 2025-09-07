interface IAPIRequestOptions {
  method?: string;
  payload?: any;
  headers?: HeadersInit;
}

interface IAPIResponse {
  success: boolean;
  message: string;
  data?: any;
}

export type { IAPIRequestOptions, IAPIResponse };
