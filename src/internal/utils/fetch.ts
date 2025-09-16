"use server";

import { ZodError } from "zod/v3";
import { NEXT_PUBLIC_API_URL } from "../config";

async function apiFetch<T>(
  endpoint: string,
  method: string,
  headers: HeadersInit = {},
  body?: object,
  query?: Record<string, string | boolean>,
  cache: RequestCache = "no-store",
  tags?: string[],
  retries = 2,
  retryDelay = 1000
): Promise<APIResponse<T | null>> {
  const url = new URL(`${NEXT_PUBLIC_API_URL}${endpoint}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
  }
  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    // ...(tags ? { next: { tags }, cache: "force-cache" } : { cache }),
  };

  try {
    const response = await fetch(url.toString(), fetchOptions);

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Non-JSON response received from ${url}`);
      throw new Error("Server returned non-JSON response");
    }

    const data: APIResponse<T> = await response.json();

    return data;
  } catch (error) {
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

class APIError extends Error {
  status: number;
  errors: ErrorDetail[];

  constructor(message: string, status: number, errors: ErrorDetail[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
function handleZodError<T>(error: any): APIResponse<T | null> {
  if (error instanceof ZodError) {
    // console.error("Zod validation error:", error.flatten());
    return {
      status: "error",
      status_code: 400,
      message: "Validation failed",
      payload: {
        data: null,
        errors: error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      },
    };
  }

  return {
    status: "error",
    status_code: 500,
    message: "Unexpected server error",
    payload: {
      data: null,
      errors: [],
    },
  };
}
export { apiFetch, handleZodError };
