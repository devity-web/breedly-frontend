import {useNavigate} from '@tanstack/react-router';
import {format} from 'date-fns';
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
import {
  customersClient,
  customersKeys,
} from '@/server/customers/customers.client';

export const Customers = () => {
  const {data} = customersClient.getCustomers.useQuery(
    customersKeys.getAll.queryKey,
  );

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Input className="w-64" placeholder="Search for customers" />
        {/* <AddDog /> */}
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.body.map(customer => (
                <TableRow
                  key={customer.id}
                  onClick={() => navigate({to: `/customers/${customer.id}`})}
                >
                  <TableCell className="font-medium">
                    {customer.id.substring(0, 8)}
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    {format(customer.createdAt, 'dd/MM/yyyy')}
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
