/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      name
      Expenses {
        nextToken
      }
      groupKey
      users {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        groupKey
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getExpense = /* GraphQL */ `
  query GetExpense($id: ID!) {
    getExpense(id: $id) {
      id
      amount
      category
      description
      groupID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const listExpenses = /* GraphQL */ `
  query ListExpenses(
    $filter: ModelExpenseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExpenses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        amount
        category
        description
        groupID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const expensesByGroupID = /* GraphQL */ `
  query ExpensesByGroupID(
    $groupID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelExpenseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    expensesByGroupID(
      groupID: $groupID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        amount
        category
        description
        groupID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const expensesByUserID = /* GraphQL */ `
  query ExpensesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelExpenseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    expensesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        amount
        category
        description
        groupID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      imageUri
      bio
      Expenses {
        nextToken
      }
      Groups {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        imageUri
        bio
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserGroup = /* GraphQL */ `
  query GetUserGroup($id: ID!) {
    getUserGroup(id: $id) {
      id
      groupId
      userId
      group {
        id
        name
        groupKey
        createdAt
        updatedAt
      }
      user {
        id
        name
        imageUri
        bio
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserGroups = /* GraphQL */ `
  query ListUserGroups(
    $filter: ModelUserGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        groupId
        userId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userGroupsByGroupId = /* GraphQL */ `
  query UserGroupsByGroupId(
    $groupId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userGroupsByGroupId(
      groupId: $groupId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        groupId
        userId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userGroupsByUserId = /* GraphQL */ `
  query UserGroupsByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userGroupsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        groupId
        userId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
