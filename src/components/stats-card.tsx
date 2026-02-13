import type {Icon} from '@tabler/icons-react';
import {cn} from '@/lib/utils';
import {Card, CardContent, CardHeader, CardTitle} from './ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: Icon;
}

export function StatsCard({title, value, icon: Icon}: StatsCardProps) {
  return (
    <Card className={cn('w-full max-w-xs')}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-md bg-primary/10 p-2">
          <Icon className="size-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
