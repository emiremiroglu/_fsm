<script setup>
  import {ref, reactive} from 'vue';
  import session from '../lib/session';
  import gql from '../lib/gql';

  const workspaces = ref(session('workspaces') || [])
  const workspace = reactive(session('workspaces')[0])

  gql(workspace, `
      query{
        campaignDelivery(
          granularity: TOTAL
          dataType: TABLE
          date: {
            from: "2024-01-01",
            to: "2024-09-20"
          }
        ) {
          __typename
          ... on CampaignDeliveryOutcome {
            records(first: 1000) {
              nodes {
                campaign {
                  id
                  name
                  advertiser { id name }
                  campaignStatus { state status }
                  campaignGroup { id name }
                  createdAt
                  __typename
                }
                metrics {
                  impressions
                  uniqueImpressions
                  clicks
                  engagements
                  engagementRate
                  conversions
                  roas
                }
              }
            }
            totalStats {
              impressions
              uniqueImpressions
              frequency
              clicks
              engagements
              engagementRate
              conversions
              conversionRevenue
              viewPercentage
              roas
            }
          }
        }
      }
    `)
  .then(data => {
    console.log(data)
  })

</script>

<template>
  <main class="flex flex-col md:flex-row">
    <Sidebar />
    <section class="flex flex-col w-full overflow-y-scroll h-screen">
      <div class="sticky flex justify-between top-0 bg-zinc-100 dark:bg-zinc-800 p-5 z-50">
        <Title _="Dashboard"/>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-5 px-5">
        <template v-for="workspace in workspaces">
          <template v-for="advertiser in workspace.advertisers">
            <Card :data="[]" :label="advertiser.name" />
          </template>
        </template>
      </div>
    </section>
  </main>
</template>