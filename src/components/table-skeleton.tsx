import {Skeleton} from './ui/skeleton';
import {TableCell, TableRow} from './ui/table';

interface TableSkeletonProps {
  colSpan: number;
  rows: number;
}

export default function TableSkeleton({colSpan, rows}: TableSkeletonProps) {
  return (
    <>
      {Array.from({length: rows}).map((_, rowIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Mock rows
        <TableRow key={rowIndex} className="border-border hover:bg-transparent">
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton
                className="h-8 w-8 rounded-full"
                style={{animationDelay: `${rowIndex * 150}ms`}}
              />
              <Skeleton
                className="h-4 w-24"
                style={{animationDelay: `${rowIndex * 200}ms`}}
              />
            </div>
          </TableCell>
          {Array.from({length: colSpan - 1}).map((_, rowIndexTwo) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Mock rows
            <TableCell key={rowIndexTwo}>
              <Skeleton
                className="h-6 w-20 rounded-full"
                style={{
                  animationDelay: `${rowIndexTwo * 250}ms`,
                }}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
