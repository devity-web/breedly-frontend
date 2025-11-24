import {IconCirclePlus} from '@tabler/icons-react';
import {useNavigate} from '@tanstack/react-router';
import {format} from 'date-fns';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {dogsClient} from '@/server/dogs/dogs.client';

export const Dogs = () => {
  const {data} = dogsClient.getDogs.useQuery(['dogs']);

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Input className="w-64" placeholder="Search for dogs" />
        <Button>
          <IconCirclePlus />
          Add dog
        </Button>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Assigned Name</TableHead>
                <TableHead>Chip ID</TableHead>
                <TableHead>Passport</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Born At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.body.map(dog => (
                <TableRow
                  key={dog.id}
                  onClick={() => navigate({to: `/dogs/${dog.id}`})}
                >
                  <TableCell className="font-medium">
                    {dog.id.substring(0, 8)}
                  </TableCell>
                  <TableCell>{dog.name}</TableCell>
                  <TableCell>{dog.assignedName ?? '-'}</TableCell>
                  <TableCell>{dog.chipId ?? '-'}</TableCell>
                  <TableCell>{dog.passport ?? '-'}</TableCell>
                  <TableCell>{dog.owner?.name ?? '-'}</TableCell>
                  <TableCell>
                    {format(dog.bornAt, 'dd/MM/yyyy HH:mm')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
