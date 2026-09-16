import { gql } from '@apollo/client';

export const GET_MY_PROMOTION_COMPANIES = gql`
  query GetMyPromotionCompanies {
    myCompanies {
      id
      name
    }
  }
`;

export const GET_PROMOTION_ASSET_USAGE = gql`
  query GetPromotionAssetUsage($companyId: ID!) {
    getAssetUsageReport(companyId: $companyId) {
      companyId
      companyName
      reportPeriod
      totalAssetsAvailable
      totalAssetsConsumed
      overallUsagePercentage
      lowStockAssets
      outOfStockAssets
      generatedAt
      assetCounters {
        assetType
        planAllowed
        individuallyAdded
        totalRemoved
        totalAvailable
        totalConsumed
        totalRemaining
        usagePercentage
        consumedThisMonth
        lastConsumedDate
        isLowStock
        isOutOfStock
      }
    }
  }
`;
