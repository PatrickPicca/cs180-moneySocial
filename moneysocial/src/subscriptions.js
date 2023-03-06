/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup($filter: ModelSubscriptionGroupFilterInput) {
    onCreateGroup(filter: $filter) {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup($filter: ModelSubscriptionGroupFilterInput) {
    onUpdateGroup(filter: $filter) {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup($filter: ModelSubscriptionGroupFilterInput) {
    onDeleteGroup(filter: $filter) {
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
export const onCreateExpense = /* GraphQL */ `
  subscription OnCreateExpense($filter: ModelSubscriptionExpenseFilterInput) {
    onCreateExpense(filter: $filter) {
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
export const onUpdateExpense = /* GraphQL */ `
  subscription OnUpdateExpense($filter: ModelSubscriptionExpenseFilterInput) {
    onUpdateExpense(filter: $filter) {
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
export const onDeleteExpense = /* GraphQL */ `
  subscription OnDeleteExpense($filter: ModelSubscriptionExpenseFilterInput) {
    onDeleteExpense(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateUserGroup = /* GraphQL */ `
  subscription OnCreateUserGroup(
    $filter: ModelSubscriptionUserGroupFilterInput
  ) {
    onCreateUserGroup(filter: $filter) {
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
export const onUpdateUserGroup = /* GraphQL */ `
  subscription OnUpdateUserGroup(
    $filter: ModelSubscriptionUserGroupFilterInput
  ) {
    onUpdateUserGroup(filter: $filter) {
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
export const onDeleteUserGroup = /* GraphQL */ `
  subscription OnDeleteUserGroup(
    $filter: ModelSubscriptionUserGroupFilterInput
  ) {
    onDeleteUserGroup(filter: $filter) {
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
