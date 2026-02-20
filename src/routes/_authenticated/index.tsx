import {IconCamera, IconDog, IconPoo, IconUsers} from '@tabler/icons-react';
import {createFileRoute} from '@tanstack/react-router';
import DashboardSkeleton from '@/components/dashboard-skeleton';
import {PageName} from '@/components/page-name';
import {StatsCard} from '@/components/stats-card';
import {
  dashboardClient,
  dashboardKeys,
} from '@/server/dashboard/dashboard.client';

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
});

function Index() {
  const {data, isLoading} = dashboardClient.getStats.useQuery([
    dashboardKeys.getStats,
  ]);

  return (
    <>
      {isLoading && <DashboardSkeleton />}
      {data && (
        <div>
          <PageName name="Dashboard" />
          {data && (
            <div className="grid grid-cols-4 gap-4">
              <StatsCard title="Dogs" value={data.body.dogs} icon={IconDog} />
              <StatsCard
                title="Customers"
                value={data.body.customers}
                icon={IconUsers}
              />
              <StatsCard
                title="Photos"
                value={data.body.photos}
                icon={IconCamera}
              />
              <StatsCard title="Poops" value={data.body.poops} icon={IconPoo} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
