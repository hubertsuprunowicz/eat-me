import gql from 'graphql-tag';

export const USERS = gql` {
  users {
    name
  }
}`;

export const USER = gql` 
   query userList($_id: ID!) {
    user(_id: $_id) {
       name
    }
   }  
`;

export const INGREDIENTS = gql` {
    ingredients {
        name
    }
}`;

export const INGREDIENT = gql`
    query userList($name: String!) {
        ingredient(name: $name) {
            name
        }
    }
`;

export const RECIPES = gql` {
    recipes {
        name
    }
}`;

export const RECIPE = gql`
    query userList($name: String!) {
        recipe(name: $name) {
            name
        }
    }
`;

export const TAGS = gql` {
    tags {
        name
    }
}`;

export const TAG = gql`
    query userList($name: String!) {
        tag(name: $name) {
            name
        }
    }
`;

export const COMMENTS = gql` {
    comments {
        description
    }
}`;

export const COMMENT = gql`
    query userList($_id: ID!) {
        comment(_id: $_id) {
            description
        }
    }
`;

export const RATINGS = gql` {
    ratings {
        rate
    }
}`;

export const RATING = gql`
    query userList($_id: ID!) {
        rating(_id: $_id) {
            rate
        }
    }
`;




