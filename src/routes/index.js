// Dependancies
const express = require("express");
const Prismic = require("prismic-javascript");
const PrismicDOM = require("prismic-dom");
const ejs = require("ejs");
const indexTemplate = require("../views/index.ejs");

const homeRouter = express.Router();

homeRouter.get("/", (request, response) => {
  request.prismic.api
    .query(Prismic.Predicates.at("document.type", "home"))
    .then((homeResponse) => {
      response.send(
        ejs.render(indexTemplate.default, {
          home: homeResponse.results[0].data,
          PrismicDOM: PrismicDOM,
          rootPath: request.app.locals.rootPath
        })
      );
    });
});

module.exports = homeRouter;
