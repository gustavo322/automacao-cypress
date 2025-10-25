interface CypressEnvStatic {
  baseUrlApi: string;
  apiUser: string;
  apiPassword: string;
  }

interface CypressEnvDynamic {
  apiToken: string;
}

function getEnvVariable<T>(
  key: string,
  type: "string" | "number",
  defaultValue?: T,
): T {
  const value = Cypress.env(key);

  if (value === undefined || value === null) {
    if (defaultValue === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return defaultValue;
  }

  if (typeof value !== type) {
    throw new Error(
      `Environment variable ${key} should be of type ${type}, but got ${typeof value}`,
    );
  }

  return value as T;
}

class EnvStatic implements CypressEnvStatic {
  baseUrlApi: string;
  apiUser: string;
  apiPassword: string;

  constructor() {
    this.baseUrlApi = getEnvVariable<string>("baseUrlApi", "string");
    this.apiUser = getEnvVariable<string>("apiUser", "string");
    this.apiPassword = getEnvVariable<string>("apiPassword", "string");
  }
}

class EnvDynamic implements CypressEnvDynamic {
  private _apiToken: string;

  constructor() {
    this._apiToken = getEnvVariable<string>("apiToken", "string", "");
  }

  get apiToken(): string {
    return this._apiToken;
  }

  set apiToken(value: string) {
    this._apiToken = value;
  }

}

export const envStatic = new EnvStatic();
export const envDynamic = new EnvDynamic();
