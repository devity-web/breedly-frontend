import {IconPlus, IconPoo} from '@tabler/icons-react';
import {useQueryClient} from '@tanstack/react-query';
import {format} from 'date-fns';
import {toast} from 'sonner';
import type z from 'zod';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {dogsClient, dogsKeys} from '@/server/dogs/dogs.client';
import type {poopSchema} from '@/server/dogs/dogs.schemas';

interface PoopCardProps {
  poops: z.infer<typeof poopSchema>[];
  dogId: string;
}

export function PoopCard({poops, dogId}: PoopCardProps) {
  const queryClient = useQueryClient();

  const {mutate, isPending} = dogsClient.addPoop.useMutation({
    onSuccess: () => {
      toast('Poop successfully registered ✅');
      queryClient.invalidateQueries({
        queryKey: dogsKeys.getById(dogId).queryKey,
      });
    },
  });

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="flex items-center gap-1">
          <IconPoo /> Poops
        </CardTitle>

        <Button
          variant="outline"
          isLoading={isPending}
          onClick={() => mutate({params: {id: dogId}})}
        >
          <IconPlus />
          Add poop
        </Button>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="max-h-2">
            {poops.map((poop, key) => (
              <TableRow key={poop.id}>
                <TableCell className="font-medium">{poops.length - key}</TableCell>
                <TableCell>
                  {format(poop.createdAt, 'dd/MM/yyyy HH:mm')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
