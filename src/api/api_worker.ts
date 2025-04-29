import { httpErrorFromCode, rethrow } from "./error";

export interface GetArgs {
  path?: { [key: string]: string | number | boolean | undefined };
  query?: { [key: string]: string | number | boolean | undefined };
}

export interface PostArgs extends GetArgs {
  body?: any;
}

const _noArgs: PostArgs = {};

/**
 * ApiService is a simple wrapper around fetch that handles JSON serialization and error handling.
 * to use it, you must first call `ApiService.init(apiURL)` with the base URL of your API.
 */
export class ApiWorker {
  public constructor(private apiURL: string) {}

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

      throw httpErrorFromCode(response.status);
    } catch (e) {
      rethrow(e);
    }
  }

  async get(path: string, args?: GetArgs): Promise<any> {
    return this._fetch(path, "GET", args || _noArgs);
  }

  async post(path: string, args: PostArgs): Promise<any> {
    return this._fetch(path, "POST", args || _noArgs);
  }

  async delete(path: string, args: GetArgs): Promise<any> {
    return this._fetch(path, "DELETE", args || _noArgs);
  }
}

const errors = {};
