/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Long: any;
};

export type Query = {
   __typename?: 'Query';
  getWatch: Subscribed;
  watchesRecipes: Array<Recipe>;
  Subscribed?: Maybe<Array<Maybe<Subscribed>>>;
  MessageSubscription?: Maybe<Array<Maybe<MessageSubscription>>>;
  User?: Maybe<Array<Maybe<User>>>;
  Message?: Maybe<Array<Maybe<Message>>>;
  Ingredient?: Maybe<Array<Maybe<Ingredient>>>;
  Credentials?: Maybe<Array<Maybe<Credentials>>>;
  Tag?: Maybe<Array<Maybe<Tag>>>;
  Recipe?: Maybe<Array<Maybe<Recipe>>>;
  Comment?: Maybe<Array<Maybe<Comment>>>;
  Token?: Maybe<Array<Maybe<Token>>>;
};


export type QueryGetWatchArgs = {
  subscribingUser: Scalars['ID'];
  subscribedUser: Scalars['ID'];
  filter?: Maybe<_SubscribedFilter>;
};


export type QueryWatchesRecipesArgs = {
  id: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_RecipeOrdering>>>;
  filter?: Maybe<_RecipeFilter>;
};


export type QuerySubscribedArgs = {
  subscribed?: Maybe<Scalars['Boolean']>;
  _id?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_SubscribedOrdering>>>;
  filter?: Maybe<_SubscribedFilter>;
};


export type QueryMessageSubscriptionArgs = {
  _id?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  filter?: Maybe<_MessageSubscriptionFilter>;
  orderBy?: Maybe<Array<Maybe<_MessageSubscriptionOrdering>>>;
};


export type QueryUserArgs = {
  _id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Long']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_UserOrdering>>>;
  filter?: Maybe<_UserFilter>;
};


export type QueryMessageArgs = {
  _id?: Maybe<Scalars['ID']>;
  message?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Long']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_MessageOrdering>>>;
  filter?: Maybe<_MessageFilter>;
};


export type QueryIngredientArgs = {
  _id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Long']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_IngredientOrdering>>>;
  filter?: Maybe<_IngredientFilter>;
};


export type QueryCredentialsArgs = {
  token?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_CredentialsOrdering>>>;
  filter?: Maybe<_CredentialsFilter>;
};


export type QueryTagArgs = {
  _id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Long']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_TagOrdering>>>;
  filter?: Maybe<_TagFilter>;
};


export type QueryRecipeArgs = {
  _id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Difficulty>;
  image?: Maybe<Scalars['String']>;
  totalCost?: Maybe<Scalars['Float']>;
  time?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['Long']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_RecipeOrdering>>>;
  filter?: Maybe<_RecipeFilter>;
};


export type QueryCommentArgs = {
  _id?: Maybe<Scalars['ID']>;
  timestamp?: Maybe<Scalars['Long']>;
  rating?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_CommentOrdering>>>;
  filter?: Maybe<_CommentFilter>;
};


export type QueryTokenArgs = {
  token?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_TokenOrdering>>>;
  filter?: Maybe<_TokenFilter>;
};

export type _SubscribedFilter = {
  AND?: Maybe<Array<_SubscribedFilter>>;
  OR?: Maybe<Array<_SubscribedFilter>>;
  subscribed?: Maybe<Scalars['Boolean']>;
  subscribed_not?: Maybe<Scalars['Boolean']>;
};

export type Subscribed = {
   __typename?: 'Subscribed';
  subscribed: Scalars['Boolean'];
  _id?: Maybe<Scalars['String']>;
};

export enum _RecipeOrdering {
  IdAsc = '_id_asc',
  IdDesc = '_id_desc',
  NameAsc = 'name_asc',
  NameDesc = 'name_desc',
  DescriptionAsc = 'description_asc',
  DescriptionDesc = 'description_desc',
  DifficultyAsc = 'difficulty_asc',
  DifficultyDesc = 'difficulty_desc',
  ImageAsc = 'image_asc',
  ImageDesc = 'image_desc',
  TotalCostAsc = 'totalCost_asc',
  TotalCostDesc = 'totalCost_desc',
  TimeAsc = 'time_asc',
  TimeDesc = 'time_desc',
  TimestampAsc = 'timestamp_asc',
  TimestampDesc = 'timestamp_desc'
}

export type _RecipeFilter = {
  AND?: Maybe<Array<_RecipeFilter>>;
  OR?: Maybe<Array<_RecipeFilter>>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_not_in?: Maybe<Array<Scalars['String']>>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_starts_with?: Maybe<Scalars['String']>;
  description_not_starts_with?: Maybe<Scalars['String']>;
  description_ends_with?: Maybe<Scalars['String']>;
  description_not_ends_with?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Difficulty>;
  difficulty_not?: Maybe<Difficulty>;
  difficulty_in?: Maybe<Array<Difficulty>>;
  difficulty_not_in?: Maybe<Array<Difficulty>>;
  image?: Maybe<Scalars['String']>;
  image_not?: Maybe<Scalars['String']>;
  image_in?: Maybe<Array<Scalars['String']>>;
  image_not_in?: Maybe<Array<Scalars['String']>>;
  image_contains?: Maybe<Scalars['String']>;
  image_not_contains?: Maybe<Scalars['String']>;
  image_starts_with?: Maybe<Scalars['String']>;
  image_not_starts_with?: Maybe<Scalars['String']>;
  image_ends_with?: Maybe<Scalars['String']>;
  image_not_ends_with?: Maybe<Scalars['String']>;
  totalCost?: Maybe<Scalars['Float']>;
  totalCost_not?: Maybe<Scalars['Float']>;
  totalCost_in?: Maybe<Array<Scalars['Float']>>;
  totalCost_not_in?: Maybe<Array<Scalars['Float']>>;
  totalCost_lt?: Maybe<Scalars['Float']>;
  totalCost_lte?: Maybe<Scalars['Float']>;
  totalCost_gt?: Maybe<Scalars['Float']>;
  totalCost_gte?: Maybe<Scalars['Float']>;
  time?: Maybe<Scalars['Int']>;
  time_not?: Maybe<Scalars['Int']>;
  time_in?: Maybe<Array<Scalars['Int']>>;
  time_not_in?: Maybe<Array<Scalars['Int']>>;
  time_lt?: Maybe<Scalars['Int']>;
  time_lte?: Maybe<Scalars['Int']>;
  time_gt?: Maybe<Scalars['Int']>;
  time_gte?: Maybe<Scalars['Int']>;
  tag?: Maybe<_TagFilter>;
  tag_not?: Maybe<_TagFilter>;
  tag_in?: Maybe<Array<_TagFilter>>;
  tag_not_in?: Maybe<Array<_TagFilter>>;
  tag_some?: Maybe<_TagFilter>;
  tag_none?: Maybe<_TagFilter>;
  tag_single?: Maybe<_TagFilter>;
  tag_every?: Maybe<_TagFilter>;
  user?: Maybe<_UserFilter>;
  user_not?: Maybe<_UserFilter>;
  user_in?: Maybe<Array<_UserFilter>>;
  user_not_in?: Maybe<Array<_UserFilter>>;
  ingredient?: Maybe<_IngredientFilter>;
  ingredient_not?: Maybe<_IngredientFilter>;
  ingredient_in?: Maybe<Array<_IngredientFilter>>;
  ingredient_not_in?: Maybe<Array<_IngredientFilter>>;
  ingredient_some?: Maybe<_IngredientFilter>;
  ingredient_none?: Maybe<_IngredientFilter>;
  ingredient_single?: Maybe<_IngredientFilter>;
  ingredient_every?: Maybe<_IngredientFilter>;
  comment?: Maybe<_CommentFilter>;
  comment_not?: Maybe<_CommentFilter>;
  comment_in?: Maybe<Array<_CommentFilter>>;
  comment_not_in?: Maybe<Array<_CommentFilter>>;
  comment_some?: Maybe<_CommentFilter>;
  comment_none?: Maybe<_CommentFilter>;
  comment_single?: Maybe<_CommentFilter>;
  comment_every?: Maybe<_CommentFilter>;
};

export enum Difficulty {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Hard = 'HARD'
}

export type _TagFilter = {
  AND?: Maybe<Array<_TagFilter>>;
  OR?: Maybe<Array<_TagFilter>>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  recipes?: Maybe<_RecipeFilter>;
  recipes_not?: Maybe<_RecipeFilter>;
  recipes_in?: Maybe<Array<_RecipeFilter>>;
  recipes_not_in?: Maybe<Array<_RecipeFilter>>;
  recipes_some?: Maybe<_RecipeFilter>;
  recipes_none?: Maybe<_RecipeFilter>;
  recipes_single?: Maybe<_RecipeFilter>;
  recipes_every?: Maybe<_RecipeFilter>;
};

export type _UserFilter = {
  AND?: Maybe<Array<_UserFilter>>;
  OR?: Maybe<Array<_UserFilter>>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_not?: Maybe<Scalars['String']>;
  email_in?: Maybe<Array<Scalars['String']>>;
  email_not_in?: Maybe<Array<Scalars['String']>>;
  email_contains?: Maybe<Scalars['String']>;
  email_not_contains?: Maybe<Scalars['String']>;
  email_starts_with?: Maybe<Scalars['String']>;
  email_not_starts_with?: Maybe<Scalars['String']>;
  email_ends_with?: Maybe<Scalars['String']>;
  email_not_ends_with?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  password_not?: Maybe<Scalars['String']>;
  password_in?: Maybe<Array<Scalars['String']>>;
  password_not_in?: Maybe<Array<Scalars['String']>>;
  password_contains?: Maybe<Scalars['String']>;
  password_not_contains?: Maybe<Scalars['String']>;
  password_starts_with?: Maybe<Scalars['String']>;
  password_not_starts_with?: Maybe<Scalars['String']>;
  password_ends_with?: Maybe<Scalars['String']>;
  password_not_ends_with?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  avatar_not?: Maybe<Scalars['String']>;
  avatar_in?: Maybe<Array<Scalars['String']>>;
  avatar_not_in?: Maybe<Array<Scalars['String']>>;
  avatar_contains?: Maybe<Scalars['String']>;
  avatar_not_contains?: Maybe<Scalars['String']>;
  avatar_starts_with?: Maybe<Scalars['String']>;
  avatar_not_starts_with?: Maybe<Scalars['String']>;
  avatar_ends_with?: Maybe<Scalars['String']>;
  avatar_not_ends_with?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_not_in?: Maybe<Array<Scalars['String']>>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_starts_with?: Maybe<Scalars['String']>;
  description_not_starts_with?: Maybe<Scalars['String']>;
  description_ends_with?: Maybe<Scalars['String']>;
  description_not_ends_with?: Maybe<Scalars['String']>;
  comment?: Maybe<_CommentFilter>;
  comment_not?: Maybe<_CommentFilter>;
  comment_in?: Maybe<Array<_CommentFilter>>;
  comment_not_in?: Maybe<Array<_CommentFilter>>;
  comment_some?: Maybe<_CommentFilter>;
  comment_none?: Maybe<_CommentFilter>;
  comment_single?: Maybe<_CommentFilter>;
  comment_every?: Maybe<_CommentFilter>;
  friends?: Maybe<_UserFilter>;
  friends_not?: Maybe<_UserFilter>;
  friends_in?: Maybe<Array<_UserFilter>>;
  friends_not_in?: Maybe<Array<_UserFilter>>;
  friends_some?: Maybe<_UserFilter>;
  friends_none?: Maybe<_UserFilter>;
  friends_single?: Maybe<_UserFilter>;
  friends_every?: Maybe<_UserFilter>;
  recipe?: Maybe<_RecipeFilter>;
  recipe_not?: Maybe<_RecipeFilter>;
  recipe_in?: Maybe<Array<_RecipeFilter>>;
  recipe_not_in?: Maybe<Array<_RecipeFilter>>;
  recipe_some?: Maybe<_RecipeFilter>;
  recipe_none?: Maybe<_RecipeFilter>;
  recipe_single?: Maybe<_RecipeFilter>;
  recipe_every?: Maybe<_RecipeFilter>;
};

export type _CommentFilter = {
  AND?: Maybe<Array<_CommentFilter>>;
  OR?: Maybe<Array<_CommentFilter>>;
  rating?: Maybe<Scalars['Int']>;
  rating_not?: Maybe<Scalars['Int']>;
  rating_in?: Maybe<Array<Scalars['Int']>>;
  rating_not_in?: Maybe<Array<Scalars['Int']>>;
  rating_lt?: Maybe<Scalars['Int']>;
  rating_lte?: Maybe<Scalars['Int']>;
  rating_gt?: Maybe<Scalars['Int']>;
  rating_gte?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_not_in?: Maybe<Array<Scalars['String']>>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_starts_with?: Maybe<Scalars['String']>;
  description_not_starts_with?: Maybe<Scalars['String']>;
  description_ends_with?: Maybe<Scalars['String']>;
  description_not_ends_with?: Maybe<Scalars['String']>;
  user?: Maybe<_UserFilter>;
  user_not?: Maybe<_UserFilter>;
  user_in?: Maybe<Array<_UserFilter>>;
  user_not_in?: Maybe<Array<_UserFilter>>;
  recipe?: Maybe<_RecipeFilter>;
  recipe_not?: Maybe<_RecipeFilter>;
  recipe_in?: Maybe<Array<_RecipeFilter>>;
  recipe_not_in?: Maybe<Array<_RecipeFilter>>;
};

export type _IngredientFilter = {
  AND?: Maybe<Array<_IngredientFilter>>;
  OR?: Maybe<Array<_IngredientFilter>>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  amount_not?: Maybe<Scalars['String']>;
  amount_in?: Maybe<Array<Scalars['String']>>;
  amount_not_in?: Maybe<Array<Scalars['String']>>;
  amount_contains?: Maybe<Scalars['String']>;
  amount_not_contains?: Maybe<Scalars['String']>;
  amount_starts_with?: Maybe<Scalars['String']>;
  amount_not_starts_with?: Maybe<Scalars['String']>;
  amount_ends_with?: Maybe<Scalars['String']>;
  amount_not_ends_with?: Maybe<Scalars['String']>;
};

export type Recipe = {
   __typename?: 'Recipe';
  _id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description: Scalars['String'];
  difficulty: Difficulty;
  image: Scalars['String'];
  totalCost: Scalars['Float'];
  time: Scalars['Int'];
  tag: Array<Tag>;
  user: User;
  ingredient: Array<Ingredient>;
  comment?: Maybe<Array<Maybe<Comment>>>;
  timestamp: Scalars['Long'];
};


export type RecipeTagArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_TagOrdering>>>;
  filter?: Maybe<_TagFilter>;
};


export type RecipeUserArgs = {
  filter?: Maybe<_UserFilter>;
};


export type RecipeIngredientArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_IngredientOrdering>>>;
  filter?: Maybe<_IngredientFilter>;
};


export type RecipeCommentArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_CommentOrdering>>>;
  filter?: Maybe<_CommentFilter>;
};

export enum _TagOrdering {
  IdAsc = '_id_asc',
  IdDesc = '_id_desc',
  NameAsc = 'name_asc',
  NameDesc = 'name_desc',
  TimestampAsc = 'timestamp_asc',
  TimestampDesc = 'timestamp_desc'
}

export type Tag = {
   __typename?: 'Tag';
  _id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  recipes: Array<Recipe>;
  timestamp: Scalars['Long'];
};


export type TagRecipesArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_RecipeOrdering>>>;
  filter?: Maybe<_RecipeFilter>;
};


export type User = {
   __typename?: 'User';
  _id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  comment?: Maybe<Array<Maybe<Comment>>>;
  friends?: Maybe<Array<Maybe<User>>>;
  recipe?: Maybe<Array<Maybe<Recipe>>>;
  timestamp: Scalars['Long'];
};


export type UserCommentArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_CommentOrdering>>>;
  filter?: Maybe<_CommentFilter>;
};


export type UserFriendsArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_UserOrdering>>>;
  filter?: Maybe<_UserFilter>;
};


export type UserRecipeArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_RecipeOrdering>>>;
  filter?: Maybe<_RecipeFilter>;
};

export enum _CommentOrdering {
  IdAsc = '_id_asc',
  IdDesc = '_id_desc',
  TimestampAsc = 'timestamp_asc',
  TimestampDesc = 'timestamp_desc',
  RatingAsc = 'rating_asc',
  RatingDesc = 'rating_desc',
  DescriptionAsc = 'description_asc',
  DescriptionDesc = 'description_desc'
}

export type Comment = {
   __typename?: 'Comment';
  _id?: Maybe<Scalars['String']>;
  timestamp: Scalars['Long'];
  rating: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  user: User;
  recipe: Recipe;
};


export type CommentUserArgs = {
  filter?: Maybe<_UserFilter>;
};


export type CommentRecipeArgs = {
  filter?: Maybe<_RecipeFilter>;
};

export enum _UserOrdering {
  IdAsc = '_id_asc',
  IdDesc = '_id_desc',
  NameAsc = 'name_asc',
  NameDesc = 'name_desc',
  EmailAsc = 'email_asc',
  EmailDesc = 'email_desc',
  PasswordAsc = 'password_asc',
  PasswordDesc = 'password_desc',
  AvatarAsc = 'avatar_asc',
  AvatarDesc = 'avatar_desc',
  DescriptionAsc = 'description_asc',
  DescriptionDesc = 'description_desc',
  TimestampAsc = 'timestamp_asc',
  TimestampDesc = 'timestamp_desc'
}

export enum _IngredientOrdering {
  IdAsc = '_id_asc',
  IdDesc = '_id_desc',
  NameAsc = 'name_asc',
  NameDesc = 'name_desc',
  AmountAsc = 'amount_asc',
  AmountDesc = 'amount_desc',
  TimestampAsc = 'timestamp_asc',
  TimestampDesc = 'timestamp_desc'
}

export type Ingredient = {
   __typename?: 'Ingredient';
  _id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  amount: Scalars['String'];
  timestamp: Scalars['Long'];
};

export enum _SubscribedOrdering {
  SubscribedAsc = 'subscribed_asc',
  SubscribedDesc = 'subscribed_desc',
  IdAsc = '_id_asc',
  IdDesc = '_id_desc'
}

export type _MessageSubscriptionFilter = {
  AND?: Maybe<Array<_MessageSubscriptionFilter>>;
  OR?: Maybe<Array<_MessageSubscriptionFilter>>;
};

export enum _MessageSubscriptionOrdering {
  IdAsc = '_id_asc',
  IdDesc = '_id_desc'
}

export type MessageSubscription = {
   __typename?: 'MessageSubscription';
  messageRecived: Message;
  _id?: Maybe<Scalars['String']>;
};


export type MessageSubscriptionMessageRecivedArgs = {
  filter?: Maybe<_MessageFilter>;
};

export type _MessageFilter = {
  AND?: Maybe<Array<_MessageFilter>>;
  OR?: Maybe<Array<_MessageFilter>>;
  addressee?: Maybe<_UserFilter>;
  addressee_not?: Maybe<_UserFilter>;
  addressee_in?: Maybe<Array<_UserFilter>>;
  addressee_not_in?: Maybe<Array<_UserFilter>>;
  sender?: Maybe<_UserFilter>;
  sender_not?: Maybe<_UserFilter>;
  sender_in?: Maybe<Array<_UserFilter>>;
  sender_not_in?: Maybe<Array<_UserFilter>>;
  message?: Maybe<Scalars['String']>;
  message_not?: Maybe<Scalars['String']>;
  message_in?: Maybe<Array<Scalars['String']>>;
  message_not_in?: Maybe<Array<Scalars['String']>>;
  message_contains?: Maybe<Scalars['String']>;
  message_not_contains?: Maybe<Scalars['String']>;
  message_starts_with?: Maybe<Scalars['String']>;
  message_not_starts_with?: Maybe<Scalars['String']>;
  message_ends_with?: Maybe<Scalars['String']>;
  message_not_ends_with?: Maybe<Scalars['String']>;
};

export type Message = {
   __typename?: 'Message';
  _id?: Maybe<Scalars['String']>;
  addressee: User;
  sender: User;
  message: Scalars['String'];
  timestamp: Scalars['Long'];
};


export type MessageAddresseeArgs = {
  filter?: Maybe<_UserFilter>;
};


export type MessageSenderArgs = {
  filter?: Maybe<_UserFilter>;
};

export enum _MessageOrdering {
  IdAsc = '_id_asc',
  IdDesc = '_id_desc',
  MessageAsc = 'message_asc',
  MessageDesc = 'message_desc',
  TimestampAsc = 'timestamp_asc',
  TimestampDesc = 'timestamp_desc'
}

export enum _CredentialsOrdering {
  TokenAsc = 'token_asc',
  TokenDesc = 'token_desc',
  IdAsc = '_id_asc',
  IdDesc = '_id_desc'
}

export type _CredentialsFilter = {
  AND?: Maybe<Array<_CredentialsFilter>>;
  OR?: Maybe<Array<_CredentialsFilter>>;
  token?: Maybe<Scalars['String']>;
  token_not?: Maybe<Scalars['String']>;
  token_in?: Maybe<Array<Scalars['String']>>;
  token_not_in?: Maybe<Array<Scalars['String']>>;
  token_contains?: Maybe<Scalars['String']>;
  token_not_contains?: Maybe<Scalars['String']>;
  token_starts_with?: Maybe<Scalars['String']>;
  token_not_starts_with?: Maybe<Scalars['String']>;
  token_ends_with?: Maybe<Scalars['String']>;
  token_not_ends_with?: Maybe<Scalars['String']>;
};

export type Credentials = {
   __typename?: 'Credentials';
  token: Scalars['String'];
  user: User;
  _id?: Maybe<Scalars['String']>;
};


export type CredentialsUserArgs = {
  filter?: Maybe<_UserFilter>;
};

export enum _TokenOrdering {
  TokenAsc = 'token_asc',
  TokenDesc = 'token_desc',
  IdAsc = '_id_asc',
  IdDesc = '_id_desc'
}

export type _TokenFilter = {
  AND?: Maybe<Array<_TokenFilter>>;
  OR?: Maybe<Array<_TokenFilter>>;
  token?: Maybe<Scalars['String']>;
  token_not?: Maybe<Scalars['String']>;
  token_in?: Maybe<Array<Scalars['String']>>;
  token_not_in?: Maybe<Array<Scalars['String']>>;
  token_contains?: Maybe<Scalars['String']>;
  token_not_contains?: Maybe<Scalars['String']>;
  token_starts_with?: Maybe<Scalars['String']>;
  token_not_starts_with?: Maybe<Scalars['String']>;
  token_ends_with?: Maybe<Scalars['String']>;
  token_not_ends_with?: Maybe<Scalars['String']>;
};

export type Token = {
   __typename?: 'Token';
  token: Scalars['String'];
  _id?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  deleteMessage: Scalars['Int'];
  deleteRecipe: Scalars['Int'];
  createMessage: Message;
  createRecipe: Recipe;
  updateRecipe: Recipe;
  login: Credentials;
  createUser: Credentials;
  updateUser: User;
  createComment: Comment;
  createWatchRelationship: Scalars['Int'];
  removeWatchRelationship: Scalars['Int'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['ID'];
};


export type MutationCreateMessageArgs = {
  addressee: Scalars['String'];
  sender: Scalars['String'];
  message: Scalars['String'];
};


export type MutationCreateRecipeArgs = {
  name: Scalars['String'];
  description: Scalars['String'];
  difficulty: Difficulty;
  image: Scalars['String'];
  time: Scalars['Int'];
  tag: Array<TagInput>;
  ingredient: Array<IngredientInput>;
  userID: Scalars['ID'];
  totalCost: Scalars['Float'];
};


export type MutationUpdateRecipeArgs = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Difficulty>;
  image?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Int']>;
  tag?: Maybe<Array<Maybe<TagInput>>>;
  ingredient?: Maybe<Array<Maybe<IngredientInput>>>;
  id: Scalars['ID'];
  totalCost?: Maybe<Scalars['Float']>;
};


export type MutationLoginArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateUserArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};


export type MutationCreateCommentArgs = {
  input: CommentInput;
};


export type MutationCreateWatchRelationshipArgs = {
  subscribingUser: Scalars['ID'];
  subscribedUser: Scalars['ID'];
};


export type MutationRemoveWatchRelationshipArgs = {
  subscribingUser: Scalars['ID'];
  subscribedUser: Scalars['ID'];
};

export type TagInput = {
  name: Scalars['String'];
};

export type IngredientInput = {
  name: Scalars['String'];
  amount: Scalars['String'];
};

export type UpdateUserInput = {
  oldName: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CommentInput = {
  userID: Scalars['ID'];
  recipeID: Scalars['ID'];
  rating: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
};

export type Subscription = {
   __typename?: 'Subscription';
  messageRecived: Message;
  newRecipeDiscover: Recipe;
};


export type SubscriptionMessageRecivedArgs = {
  id: Scalars['ID'];
};


export type SubscriptionNewRecipeDiscoverArgs = {
  id: Scalars['ID'];
};

export type RecipeFilter = {
  user?: Maybe<UserFilter>;
  totalCost_gte?: Maybe<Scalars['Float']>;
  totalCost_lte?: Maybe<Scalars['Float']>;
  time_gte?: Maybe<Scalars['Float']>;
  time_lte?: Maybe<Scalars['Float']>;
  difficulty?: Maybe<Difficulty>;
  tag?: Maybe<TagFilter>;
  comment?: Maybe<CommentFilter>;
};

export type UserFilter = {
  name: Scalars['String'];
};

export type TagFilter = {
  name: Scalars['String'];
};

export type CommentFilter = {
  rating_gte: Scalars['Float'];
  rating_lte: Scalars['Float'];
};

export type _Neo4jTime = {
   __typename?: '_Neo4jTime';
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  timezone?: Maybe<Scalars['String']>;
  formatted?: Maybe<Scalars['String']>;
};

export type _Neo4jTimeInput = {
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  timezone?: Maybe<Scalars['String']>;
  formatted?: Maybe<Scalars['String']>;
};

export type _Neo4jDate = {
   __typename?: '_Neo4jDate';
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  formatted?: Maybe<Scalars['String']>;
};

export type _Neo4jDateInput = {
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  formatted?: Maybe<Scalars['String']>;
};

export type _Neo4jDateTime = {
   __typename?: '_Neo4jDateTime';
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  timezone?: Maybe<Scalars['String']>;
  formatted?: Maybe<Scalars['String']>;
};

export type _Neo4jDateTimeInput = {
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  timezone?: Maybe<Scalars['String']>;
  formatted?: Maybe<Scalars['String']>;
};

export type _Neo4jLocalTime = {
   __typename?: '_Neo4jLocalTime';
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  formatted?: Maybe<Scalars['String']>;
};

export type _Neo4jLocalTimeInput = {
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  formatted?: Maybe<Scalars['String']>;
};

export type _Neo4jLocalDateTime = {
   __typename?: '_Neo4jLocalDateTime';
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  formatted?: Maybe<Scalars['String']>;
};

export type _Neo4jLocalDateTimeInput = {
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  formatted?: Maybe<Scalars['String']>;
};

export type _Neo4jPointDistanceFilter = {
  point: _Neo4jPointInput;
  distance: Scalars['Float'];
};

export type _Neo4jPointInput = {
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
  z?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  crs?: Maybe<Scalars['String']>;
  srid?: Maybe<Scalars['Int']>;
};

export type _Neo4jPoint = {
   __typename?: '_Neo4jPoint';
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
  z?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  crs?: Maybe<Scalars['String']>;
  srid?: Maybe<Scalars['Int']>;
};

export enum _RelationDirections {
  In = 'IN',
  Out = 'OUT'
}

export type LoginMutationVariables = {
  name: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'Credentials' }
    & Pick<Credentials, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name'>
    ) }
  ) }
);

export type CreateUserMutationVariables = {
  name: Scalars['String'];
  password: Scalars['String'];
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'Credentials' }
    & Pick<Credentials, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name'>
    ) }
  ) }
);

export type DeleteMessageMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMessage'>
);

export type CreateMessageMutationVariables = {
  addressee: Scalars['String'];
  sender: Scalars['String'];
  message: Scalars['String'];
};


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage: (
    { __typename?: 'Message' }
    & Pick<Message, '_id'>
  ) }
);

export type YourMessagesQueryVariables = {
  name: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
};


export type YourMessagesQuery = (
  { __typename?: 'Query' }
  & { Message?: Maybe<Array<Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'message' | 'timestamp'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name'>
    ) }
  )>>> }
);

export type OnMessageRecivedSubscriptionVariables = {
  id: Scalars['ID'];
};


export type OnMessageRecivedSubscription = (
  { __typename?: 'Subscription' }
  & { messageRecived: (
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'message' | 'timestamp'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name'>
    ) }
  ) }
);

export type UpdateUserMutationVariables = {
  oldName: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'name' | 'avatar' | 'email' | 'description'>
  ) }
);

export type GetUserQueryVariables = {
  name: Scalars['String'];
};


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { User?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'name' | 'avatar' | 'email' | 'description'>
    & { recipe?: Maybe<Array<Maybe<(
      { __typename?: 'Recipe' }
      & { tag: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, '_id' | 'name'>
      )> }
    )>>> }
  )>>> }
);

export type CreateCommentMutationVariables = {
  userID: Scalars['ID'];
  recipeID: Scalars['ID'];
  rating: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
};


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, '_id' | 'timestamp' | 'rating' | 'description'>
  ) }
);

export type DeleteRecipeMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteRecipeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteRecipe'>
);

export type UpdateRecipeMutationVariables = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Int']>;
  totalCost?: Maybe<Scalars['Float']>;
  difficulty?: Maybe<Difficulty>;
  tag?: Maybe<Array<Maybe<TagInput>>>;
  ingredient?: Maybe<Array<Maybe<IngredientInput>>>;
};


export type UpdateRecipeMutation = (
  { __typename?: 'Mutation' }
  & { updateRecipe: (
    { __typename?: 'Recipe' }
    & Pick<Recipe, '_id'>
  ) }
);

export type CreateWatchMutationVariables = {
  subscribingUser: Scalars['ID'];
  subscribedUser: Scalars['ID'];
};


export type CreateWatchMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createWatchRelationship'>
);

export type RemoveWatchMutationVariables = {
  subscribingUser: Scalars['ID'];
  subscribedUser: Scalars['ID'];
};


export type RemoveWatchMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeWatchRelationship'>
);

export type RecipeQueryVariables = {
  id: Scalars['ID'];
};


export type RecipeQuery = (
  { __typename?: 'Query' }
  & { Recipe?: Maybe<Array<Maybe<(
    { __typename?: 'Recipe' }
    & Pick<Recipe, '_id' | 'name' | 'difficulty' | 'time' | 'totalCost' | 'description' | 'image'>
    & { comment?: Maybe<Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, '_id' | 'rating' | 'description' | 'timestamp'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, '_id' | 'name'>
      ) }
    )>>>, tag: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, '_id' | 'name'>
    )>, ingredient: Array<(
      { __typename?: 'Ingredient' }
      & Pick<Ingredient, '_id' | 'name' | 'amount'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name' | 'avatar'>
    ) }
  )>>> }
);

export type GetWatchQueryVariables = {
  subscribingUser: Scalars['ID'];
  subscribedUser: Scalars['ID'];
};


export type GetWatchQuery = (
  { __typename?: 'Query' }
  & { getWatch: (
    { __typename?: 'Subscribed' }
    & Pick<Subscribed, 'subscribed'>
  ) }
);

export type CreateRecipeMutationVariables = {
  name: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  time: Scalars['Int'];
  difficulty: Difficulty;
  tag: Array<TagInput>;
  totalCost: Scalars['Float'];
  ingredient: Array<IngredientInput>;
  userID: Scalars['ID'];
};


export type CreateRecipeMutation = (
  { __typename?: 'Mutation' }
  & { createRecipe: (
    { __typename?: 'Recipe' }
    & Pick<Recipe, '_id'>
  ) }
);

export type RecipesQueryVariables = {
  offset?: Maybe<Scalars['Int']>;
  filter?: Maybe<_RecipeFilter>;
};


export type RecipesQuery = (
  { __typename?: 'Query' }
  & { Recipe?: Maybe<Array<Maybe<(
    { __typename?: 'Recipe' }
    & Pick<Recipe, '_id' | 'name' | 'difficulty' | 'totalCost' | 'time' | 'image'>
    & { tag: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, '_id' | 'name'>
    )>, ingredient: Array<(
      { __typename?: 'Ingredient' }
      & Pick<Ingredient, '_id' | 'name' | 'amount'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name'>
    ), comment?: Maybe<Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, '_id' | 'rating' | 'description' | 'timestamp'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, '_id' | 'name'>
      ) }
    )>>> }
  )>>> }
);

export type WatchesRecipesQueryVariables = {
  id: Scalars['ID'];
};


export type WatchesRecipesQuery = (
  { __typename?: 'Query' }
  & { watchesRecipes: Array<(
    { __typename?: 'Recipe' }
    & Pick<Recipe, '_id' | 'name' | 'description' | 'difficulty' | 'image' | 'time'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name'>
    ) }
  )> }
);

export type NewRecipeDiscoverSubscriptionVariables = {
  id: Scalars['ID'];
};


export type NewRecipeDiscoverSubscription = (
  { __typename?: 'Subscription' }
  & { newRecipeDiscover: (
    { __typename?: 'Recipe' }
    & Pick<Recipe, '_id' | 'name' | 'description' | 'difficulty' | 'image' | 'time'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name'>
    ) }
  ) }
);


export const LoginDocument = gql`
    mutation Login($name: String!, $password: String!) {
  login(name: $name, password: $password) {
    token
    user {
      _id
      name
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      name: // value for 'name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $password: String!) {
  createUser(name: $name, password: $password) {
    token
    user {
      _id
      name
    }
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($id: ID!) {
  deleteMessage(id: $id)
}
    `;
export type DeleteMessageMutationFn = ApolloReactCommon.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, baseOptions);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = ApolloReactCommon.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($addressee: String!, $sender: String!, $message: String!) {
  createMessage(sender: $sender, addressee: $addressee, message: $message) {
    _id
  }
}
    `;
export type CreateMessageMutationFn = ApolloReactCommon.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      addressee: // value for 'addressee'
 *      sender: // value for 'sender'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, baseOptions);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = ApolloReactCommon.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const YourMessagesDocument = gql`
    query YourMessages($name: String!, $message: String, $offset: Int) {
  Message(filter: {addressee: {name: $name}, message_contains: $message}, orderBy: timestamp_desc, first: 10, offset: $offset) {
    _id
    message
    timestamp
    sender {
      _id
      name
    }
  }
}
    `;

/**
 * __useYourMessagesQuery__
 *
 * To run a query within a React component, call `useYourMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useYourMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useYourMessagesQuery({
 *   variables: {
 *      name: // value for 'name'
 *      message: // value for 'message'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useYourMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<YourMessagesQuery, YourMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<YourMessagesQuery, YourMessagesQueryVariables>(YourMessagesDocument, baseOptions);
      }
export function useYourMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<YourMessagesQuery, YourMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<YourMessagesQuery, YourMessagesQueryVariables>(YourMessagesDocument, baseOptions);
        }
export type YourMessagesQueryHookResult = ReturnType<typeof useYourMessagesQuery>;
export type YourMessagesLazyQueryHookResult = ReturnType<typeof useYourMessagesLazyQuery>;
export type YourMessagesQueryResult = ApolloReactCommon.QueryResult<YourMessagesQuery, YourMessagesQueryVariables>;
export const OnMessageRecivedDocument = gql`
    subscription onMessageRecived($id: ID!) {
  messageRecived(id: $id) {
    _id
    message
    timestamp
    sender {
      _id
      name
    }
  }
}
    `;

/**
 * __useOnMessageRecivedSubscription__
 *
 * To run a query within a React component, call `useOnMessageRecivedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnMessageRecivedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnMessageRecivedSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOnMessageRecivedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnMessageRecivedSubscription, OnMessageRecivedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnMessageRecivedSubscription, OnMessageRecivedSubscriptionVariables>(OnMessageRecivedDocument, baseOptions);
      }
export type OnMessageRecivedSubscriptionHookResult = ReturnType<typeof useOnMessageRecivedSubscription>;
export type OnMessageRecivedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnMessageRecivedSubscription>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($oldName: String!, $name: String, $email: String, $password: String, $avatar: String, $description: String) {
  updateUser(user: {oldName: $oldName, name: $name, email: $email, password: $password, avatar: $avatar, description: $description}) {
    _id
    name
    avatar
    email
    description
  }
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      oldName: // value for 'oldName'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      avatar: // value for 'avatar'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($name: String!) {
  User(name: $name) {
    _id
    name
    avatar
    email
    description
    recipe {
      tag {
        _id
        name
      }
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($userID: ID!, $recipeID: ID!, $rating: Int!, $description: String) {
  createComment(input: {userID: $userID, recipeID: $recipeID, rating: $rating, description: $description}) {
    _id
    timestamp
    rating
    description
  }
}
    `;
export type CreateCommentMutationFn = ApolloReactCommon.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      recipeID: // value for 'recipeID'
 *      rating: // value for 'rating'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = ApolloReactCommon.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteRecipeDocument = gql`
    mutation DeleteRecipe($id: ID!) {
  deleteRecipe(id: $id)
}
    `;
export type DeleteRecipeMutationFn = ApolloReactCommon.MutationFunction<DeleteRecipeMutation, DeleteRecipeMutationVariables>;

/**
 * __useDeleteRecipeMutation__
 *
 * To run a mutation, you first call `useDeleteRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRecipeMutation, { data, loading, error }] = useDeleteRecipeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRecipeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteRecipeMutation, DeleteRecipeMutationVariables>(DeleteRecipeDocument, baseOptions);
      }
export type DeleteRecipeMutationHookResult = ReturnType<typeof useDeleteRecipeMutation>;
export type DeleteRecipeMutationResult = ApolloReactCommon.MutationResult<DeleteRecipeMutation>;
export type DeleteRecipeMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>;
export const UpdateRecipeDocument = gql`
    mutation UpdateRecipe($id: ID!, $name: String, $description: String, $image: String, $time: Int, $totalCost: Float, $difficulty: Difficulty, $tag: [TagInput], $ingredient: [IngredientInput]) {
  updateRecipe(id: $id, name: $name, description: $description, image: $image, time: $time, totalCost: $totalCost, difficulty: $difficulty, tag: $tag, ingredient: $ingredient) {
    _id
  }
}
    `;
export type UpdateRecipeMutationFn = ApolloReactCommon.MutationFunction<UpdateRecipeMutation, UpdateRecipeMutationVariables>;

/**
 * __useUpdateRecipeMutation__
 *
 * To run a mutation, you first call `useUpdateRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecipeMutation, { data, loading, error }] = useUpdateRecipeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *      time: // value for 'time'
 *      totalCost: // value for 'totalCost'
 *      difficulty: // value for 'difficulty'
 *      tag: // value for 'tag'
 *      ingredient: // value for 'ingredient'
 *   },
 * });
 */
export function useUpdateRecipeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRecipeMutation, UpdateRecipeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateRecipeMutation, UpdateRecipeMutationVariables>(UpdateRecipeDocument, baseOptions);
      }
export type UpdateRecipeMutationHookResult = ReturnType<typeof useUpdateRecipeMutation>;
export type UpdateRecipeMutationResult = ApolloReactCommon.MutationResult<UpdateRecipeMutation>;
export type UpdateRecipeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const CreateWatchDocument = gql`
    mutation CreateWatch($subscribingUser: ID!, $subscribedUser: ID!) {
  createWatchRelationship(subscribingUser: $subscribingUser, subscribedUser: $subscribedUser)
}
    `;
export type CreateWatchMutationFn = ApolloReactCommon.MutationFunction<CreateWatchMutation, CreateWatchMutationVariables>;

/**
 * __useCreateWatchMutation__
 *
 * To run a mutation, you first call `useCreateWatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWatchMutation, { data, loading, error }] = useCreateWatchMutation({
 *   variables: {
 *      subscribingUser: // value for 'subscribingUser'
 *      subscribedUser: // value for 'subscribedUser'
 *   },
 * });
 */
export function useCreateWatchMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateWatchMutation, CreateWatchMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateWatchMutation, CreateWatchMutationVariables>(CreateWatchDocument, baseOptions);
      }
export type CreateWatchMutationHookResult = ReturnType<typeof useCreateWatchMutation>;
export type CreateWatchMutationResult = ApolloReactCommon.MutationResult<CreateWatchMutation>;
export type CreateWatchMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateWatchMutation, CreateWatchMutationVariables>;
export const RemoveWatchDocument = gql`
    mutation RemoveWatch($subscribingUser: ID!, $subscribedUser: ID!) {
  removeWatchRelationship(subscribingUser: $subscribingUser, subscribedUser: $subscribedUser)
}
    `;
export type RemoveWatchMutationFn = ApolloReactCommon.MutationFunction<RemoveWatchMutation, RemoveWatchMutationVariables>;

/**
 * __useRemoveWatchMutation__
 *
 * To run a mutation, you first call `useRemoveWatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveWatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeWatchMutation, { data, loading, error }] = useRemoveWatchMutation({
 *   variables: {
 *      subscribingUser: // value for 'subscribingUser'
 *      subscribedUser: // value for 'subscribedUser'
 *   },
 * });
 */
export function useRemoveWatchMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveWatchMutation, RemoveWatchMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveWatchMutation, RemoveWatchMutationVariables>(RemoveWatchDocument, baseOptions);
      }
export type RemoveWatchMutationHookResult = ReturnType<typeof useRemoveWatchMutation>;
export type RemoveWatchMutationResult = ApolloReactCommon.MutationResult<RemoveWatchMutation>;
export type RemoveWatchMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveWatchMutation, RemoveWatchMutationVariables>;
export const RecipeDocument = gql`
    query Recipe($id: ID!) {
  Recipe(_id: $id) {
    _id
    name
    difficulty
    time
    totalCost
    description
    image
    comment {
      _id
      rating
      description
      timestamp
      user {
        _id
        name
      }
    }
    tag {
      _id
      name
    }
    ingredient {
      _id
      name
      amount
    }
    user {
      _id
      name
      avatar
    }
  }
}
    `;

/**
 * __useRecipeQuery__
 *
 * To run a query within a React component, call `useRecipeQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRecipeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecipeQuery, RecipeQueryVariables>) {
        return ApolloReactHooks.useQuery<RecipeQuery, RecipeQueryVariables>(RecipeDocument, baseOptions);
      }
export function useRecipeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecipeQuery, RecipeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RecipeQuery, RecipeQueryVariables>(RecipeDocument, baseOptions);
        }
export type RecipeQueryHookResult = ReturnType<typeof useRecipeQuery>;
export type RecipeLazyQueryHookResult = ReturnType<typeof useRecipeLazyQuery>;
export type RecipeQueryResult = ApolloReactCommon.QueryResult<RecipeQuery, RecipeQueryVariables>;
export const GetWatchDocument = gql`
    query GetWatch($subscribingUser: ID!, $subscribedUser: ID!) {
  getWatch(subscribingUser: $subscribingUser, subscribedUser: $subscribedUser) {
    subscribed
  }
}
    `;

/**
 * __useGetWatchQuery__
 *
 * To run a query within a React component, call `useGetWatchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWatchQuery({
 *   variables: {
 *      subscribingUser: // value for 'subscribingUser'
 *      subscribedUser: // value for 'subscribedUser'
 *   },
 * });
 */
export function useGetWatchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetWatchQuery, GetWatchQueryVariables>) {
        return ApolloReactHooks.useQuery<GetWatchQuery, GetWatchQueryVariables>(GetWatchDocument, baseOptions);
      }
export function useGetWatchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetWatchQuery, GetWatchQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetWatchQuery, GetWatchQueryVariables>(GetWatchDocument, baseOptions);
        }
export type GetWatchQueryHookResult = ReturnType<typeof useGetWatchQuery>;
export type GetWatchLazyQueryHookResult = ReturnType<typeof useGetWatchLazyQuery>;
export type GetWatchQueryResult = ApolloReactCommon.QueryResult<GetWatchQuery, GetWatchQueryVariables>;
export const CreateRecipeDocument = gql`
    mutation CreateRecipe($name: String!, $description: String!, $image: String!, $time: Int!, $difficulty: Difficulty!, $tag: [TagInput!]!, $totalCost: Float!, $ingredient: [IngredientInput!]!, $userID: ID!) {
  createRecipe(name: $name, description: $description, image: $image, time: $time, difficulty: $difficulty, tag: $tag, totalCost: $totalCost, ingredient: $ingredient, userID: $userID) {
    _id
  }
}
    `;
export type CreateRecipeMutationFn = ApolloReactCommon.MutationFunction<CreateRecipeMutation, CreateRecipeMutationVariables>;

/**
 * __useCreateRecipeMutation__
 *
 * To run a mutation, you first call `useCreateRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRecipeMutation, { data, loading, error }] = useCreateRecipeMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *      time: // value for 'time'
 *      difficulty: // value for 'difficulty'
 *      tag: // value for 'tag'
 *      totalCost: // value for 'totalCost'
 *      ingredient: // value for 'ingredient'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useCreateRecipeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRecipeMutation, CreateRecipeMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateRecipeMutation, CreateRecipeMutationVariables>(CreateRecipeDocument, baseOptions);
      }
export type CreateRecipeMutationHookResult = ReturnType<typeof useCreateRecipeMutation>;
export type CreateRecipeMutationResult = ApolloReactCommon.MutationResult<CreateRecipeMutation>;
export type CreateRecipeMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateRecipeMutation, CreateRecipeMutationVariables>;
export const RecipesDocument = gql`
    query Recipes($offset: Int, $filter: _RecipeFilter) {
  Recipe(first: 10, offset: $offset, filter: $filter) {
    _id
    name
    difficulty
    totalCost
    time
    image
    tag {
      _id
      name
    }
    ingredient {
      _id
      name
      amount
    }
    user {
      _id
      name
    }
    comment {
      _id
      rating
      description
      timestamp
      user {
        _id
        name
      }
    }
  }
}
    `;

/**
 * __useRecipesQuery__
 *
 * To run a query within a React component, call `useRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipesQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useRecipesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecipesQuery, RecipesQueryVariables>) {
        return ApolloReactHooks.useQuery<RecipesQuery, RecipesQueryVariables>(RecipesDocument, baseOptions);
      }
export function useRecipesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecipesQuery, RecipesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RecipesQuery, RecipesQueryVariables>(RecipesDocument, baseOptions);
        }
export type RecipesQueryHookResult = ReturnType<typeof useRecipesQuery>;
export type RecipesLazyQueryHookResult = ReturnType<typeof useRecipesLazyQuery>;
export type RecipesQueryResult = ApolloReactCommon.QueryResult<RecipesQuery, RecipesQueryVariables>;
export const WatchesRecipesDocument = gql`
    query watchesRecipes($id: ID!) {
  watchesRecipes(id: $id) {
    _id
    name
    description
    difficulty
    image
    time
    user {
      _id
      name
    }
  }
}
    `;

/**
 * __useWatchesRecipesQuery__
 *
 * To run a query within a React component, call `useWatchesRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWatchesRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchesRecipesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWatchesRecipesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WatchesRecipesQuery, WatchesRecipesQueryVariables>) {
        return ApolloReactHooks.useQuery<WatchesRecipesQuery, WatchesRecipesQueryVariables>(WatchesRecipesDocument, baseOptions);
      }
export function useWatchesRecipesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WatchesRecipesQuery, WatchesRecipesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WatchesRecipesQuery, WatchesRecipesQueryVariables>(WatchesRecipesDocument, baseOptions);
        }
export type WatchesRecipesQueryHookResult = ReturnType<typeof useWatchesRecipesQuery>;
export type WatchesRecipesLazyQueryHookResult = ReturnType<typeof useWatchesRecipesLazyQuery>;
export type WatchesRecipesQueryResult = ApolloReactCommon.QueryResult<WatchesRecipesQuery, WatchesRecipesQueryVariables>;
export const NewRecipeDiscoverDocument = gql`
    subscription NewRecipeDiscover($id: ID!) {
  newRecipeDiscover(id: $id) {
    _id
    name
    description
    difficulty
    image
    time
    user {
      _id
      name
    }
  }
}
    `;

/**
 * __useNewRecipeDiscoverSubscription__
 *
 * To run a query within a React component, call `useNewRecipeDiscoverSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewRecipeDiscoverSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewRecipeDiscoverSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNewRecipeDiscoverSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewRecipeDiscoverSubscription, NewRecipeDiscoverSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewRecipeDiscoverSubscription, NewRecipeDiscoverSubscriptionVariables>(NewRecipeDiscoverDocument, baseOptions);
      }
export type NewRecipeDiscoverSubscriptionHookResult = ReturnType<typeof useNewRecipeDiscoverSubscription>;
export type NewRecipeDiscoverSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewRecipeDiscoverSubscription>;

// Generated in 2020-04-27T23:07:08+02:00
