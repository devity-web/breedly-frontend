import {zodResolver} from '@hookform/resolvers/zod';
import {IconHeart, IconPlus} from '@tabler/icons-react';
import {useQueryClient} from '@tanstack/react-query';
import {format} from 'date-fns';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import z from 'zod';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {dogsClient, dogsKeys} from '@/server/dogs/dogs.client';
import type {healthSchema} from '@/server/dogs/dogs.schemas';

interface HealthCardProps {
  healths: z.infer<typeof healthSchema>[];
  dogId: string;
}

const formSchema = z.object({
  description: z.string().min(2),
});

export function HealthCard({healths, dogId}: HealthCardProps) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  });

  const {mutate, isPending} = dogsClient.addHealth.useMutation({
    onSuccess: () => {
      toast('Health successfully addded ✅');
      queryClient.invalidateQueries({
        queryKey: dogsKeys.getById(dogId).queryKey,
      });
      setOpen(false);
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({body: values, params: {id: dogId}});
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="flex items-center gap-1">
          <IconHeart /> Health
        </CardTitle>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <IconPlus />
              Add health
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <DialogHeader>
                  <DialogTitle>Add health</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2">
                  <div className="grid flex-1 gap-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <Input placeholder="Check-up" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>

                  <Button type="submit" isLoading={isPending}>
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {healths.map(health => (
              <TableRow key={health.id}>
                <TableCell className="font-medium">
                  {health.id.substring(0, 8)}
                </TableCell>
                <TableCell>{health.description}</TableCell>
                <TableCell>
                  {format(health.createdAt, 'dd/MM/yyyy HH:mm')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
