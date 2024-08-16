import { gql } from 'graphql-request'

export const GET_RESOURCE_LIST = gql`
  query Resources {
    resources {
      id
      title
      description
      createdAt
      updatedAt
      type
    }
  }
`

export const GET_RESOURCE = gql`
  query Resource($id: ID!) {
    resources(where: { id: $id }) {
      id
      title
      type
      updatedAt
      content {
        text
      }
    }
  }
`
