import {Card, CardContent, CardHeader} from './ui/card';
import {Skeleton} from './ui/skeleton';

export default function DashboardSkeleton() {
  return (
    <main className="p-6 md:p-10">
      <Skeleton className="h-8 w-40" />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({length: 4}).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: mock array
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-9 w-10" />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
