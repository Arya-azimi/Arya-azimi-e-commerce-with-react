import { API_URL } from "../constants";

interface ApiClientOptions<TBody> extends Omit<RequestInit, "body"> {
  body?: TBody;
}

async function apiClient<TResponse, TBody = unknown>(
  endpoint: string,
  options: ApiClientOptions<TBody> = {}
): Promise<TResponse> {
  const { body, ...customConfig } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
    credentials: "include",
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || "خطایی در ارتباط با سرور رخ داد.");
    }

    const text = await response.text();
    return text ? JSON.parse(text) : ({} as TResponse);
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

apiClient.get = <TResponse>(
  endpoint: string,
  options?: ApiClientOptions<never>
) => apiClient<TResponse>(endpoint, { ...options, method: "GET" }); // endpoint = 'products', params = {isFeatured: true}

apiClient.post = <TResponse, TBody>(
  endpoint: string,
  body: TBody,
  options?: ApiClientOptions<TBody>
) =>
  apiClient<TResponse, TBody>(endpoint, { ...options, method: "POST", body });

apiClient.put = <TResponse, TBody>(
  endpoint: string,
  body: TBody,
  options?: ApiClientOptions<TBody>
) => apiClient<TResponse, TBody>(endpoint, { ...options, method: "PUT", body });

apiClient.patch = <TResponse, TBody>(
  endpoint: string,
  body: TBody,
  options?: ApiClientOptions<TBody>
) =>
  apiClient<TResponse, TBody>(endpoint, { ...options, method: "PATCH", body });

export default apiClient;
