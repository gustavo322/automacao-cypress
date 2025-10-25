/* eslint-disable @typescript-eslint/no-unused-expressions */
import { api} from "../utils/url";

declare global {
  namespace Cypress {
    interface Chainable {
      getToken(user: string, passwd: string): Chainable<string>;
    }
  }
}

Cypress.Commands.add("getToken", (user, passwd) => {
  return cy.request({
    method: "POST",
    url: api("/user/login"),
    body: { username: user, password: passwd },
  }).then((response) => {
    const authorization = response.headers.authorization;
    expect(authorization).to.not.be.empty;
    return authorization as string;
  });

});
