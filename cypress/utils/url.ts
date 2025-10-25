import { envDynamic, envStatic } from "./env";

export function createUrl(base: string, path = "/") {
  if (typeof base !== "string") {
    throw new Error("base deve ser uma string");
  }
  if (typeof path !== "string") {
    throw new Error("path deve ser uma string");
  }
  if (base[base.length - 1] === "/") {
    base = base.slice(0, base.length - 1);
  }

  if (path[0] === "/") {
    path = path.slice(1, path.length);
  }

  return base + "/" + path;
}
export function api(path = "/") {
  return createUrl(envStatic.baseUrlApi, path);
}

export function authenticateInTheApi(
  user = envStatic.apiUser,
  password = envStatic.apiPassword,
) {
  cy.log("Autenticando na API...");

  return cy.getToken(user, password).then((token) => {
    envDynamic.apiToken = token;
    cy.log("Autenticação concluída.");
  });
}

export function headerApi(extras = {}) {
  return {
    Authorization: envDynamic.apiToken,
    ...extras,
  };
}