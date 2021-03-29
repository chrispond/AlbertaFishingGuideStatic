// Dependancies
const Prismic = require("prismic-javascript");
const PrismicConfig = require("./prismic-configuration");
const PrismicDOM = require("prismic-dom");

const prismicMiddleware = (request, response, next) => {
  response.locals.ctx = {
    endpoint: PrismicConfig.apiEndpoint,
    linkResolver: PrismicConfig.linkResolver
  };
  // add PrismicDOM in locals to access them in templates.
  response.locals.PrismicDOM = PrismicDOM;
    Prismic.getApi(PrismicConfig.apiEndpoint, {
    accessToken: PrismicConfig.accessToken,
    request
  })
  .then(api => {
    request.prismic = { api };
  next();
  })
  .catch(error => {
    next(error.message);
  });
}

module.exports = prismicMiddleware;
