const recipes = require("./recipes.seed");
const user = require("./user.seed");
const tags = require("./tags.seed");
const comments = require("./comments.seed");

module.exports = create = {
  recipes: recipes,
  users: user,
  tags: tags,
  comments: comments
};
