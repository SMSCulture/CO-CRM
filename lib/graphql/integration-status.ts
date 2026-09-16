import { gql } from '@apollo/client';

export const GET_INTEGRATION_STATUS = gql`
  query GetIntegrationStatus {
    myCompanies {
      id
      name
      stripeId
      hubspotId
    }
  }
`;
