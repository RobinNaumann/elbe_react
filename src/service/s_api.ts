export interface PostArgs {
  path?: { [key: string]: string | number | boolean | undefined };
  query?: { [key: string]: string | number | boolean | undefined };
  body?: any;
}

const _noArgs: PostArgs = {};

/**
 * ApiService is a simple wrapper around fetch that handles JSON serialization and error handling.
 * to use it, you must first call `ApiService.init(apiURL)` with the base URL of your API.
 */
export class ApiService {
  private static _i: ApiService | null = null;
  public static get i(): ApiService {
    if (!ApiService._i) throw "ApiService not initialized. Call ApiService.init(apiURL)";
    return ApiService._i;
  }

  private constructor(private apiURL: string) {}

  static init(apiURL: string) {
    if (ApiService._i) throw "ApiService already initialized";
    ApiService._i = new ApiService(apiURL);
  }

  private async _fetch(
    p: string,
    method: "GET" | "POST" | "DELETE",
    { path, query, body }: PostArgs
  ): Promise<any> {
    try {
      p = path
        ? p.replace(/:([a-zA-Z0-9_]+)/g, (m, p1) => {
            const v = path[p1];
            if (v === undefined)
              throw { code: 400, message: `missing parameter ${p1}` };
            return v?.toString() ?? "";
          })
        : p;

      const queryStr =
        query != null ? "?" + new URLSearchParams(query as any).toString() : "";
      const response = await fetch(this.apiURL + p + queryStr, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (response.ok) {
        try {
          return await response.json();
        } catch (e) {
          return null;
        }
      }
      let data = null;
      try {
        data = await response.clone().json();
      } catch (e) {
        data = await response.text();
      }

      throw {
        code: response.status,
        message: data.message ?? "undefined error",
        data,
      } as ApiError;
    } catch (e) {
      rethrow(e, 0, "unknown error");
    }
  }

  async get(path: string, args?: PostArgs): Promise<any> {
    return this._fetch(path, "GET", args || _noArgs);
  }

  async post(path: string, args: PostArgs): Promise<any> {
    return this._fetch(path, "POST", args || _noArgs);
  }

  async delete(path: string, args: PostArgs): Promise<any> {
    return this._fetch(path, "DELETE", args || _noArgs);
  }
}

function rethrow(e: any, code: number, message: string): ApiError {
  // if e implements the apiError interface, rethrow it:
  if (e && e.code !== null && e.message !== null) throw e;
  throw { code, message, data: e };
}

export interface ApiError {
  code: number;
  message: string;
  data?: any;
}

export function ifApiError(e: any): ApiError | null {
  if (e && e.code !== null && e.message !== null) return e;
  return null;
}
