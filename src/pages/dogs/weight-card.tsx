import {zodResolver} from '@hookform/resolvers/zod';
import {IconWeight} from '@tabler/icons-react';
import {useQueryClient} from '@tanstack/react-query';
import {format} from 'date-fns';
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
import {dogsClient} from '@/server/dogs/dogs.client';
import type {weightSchema} from '@/server/dogs/dogs.contract';

interface WeightCardProps {
  weights: z.infer<typeof weightSchema>[];
  dogId: string;
}

const formSchema = z.object({
  value: z.coerce
    .number({
      required_error: 'Value is required',
      invalid_type_error: 'Value must be a number',
    })
    .positive()
    .min(0.1, {message: 'Value should be at least 0.1'}),
});

export function WeightCard({weights, dogId}: WeightCardProps) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 0,
    },
  });

  const {mutate, isPending} = dogsClient.addWeight.useMutation({
    onSuccess: () => {
      toast('Weight added successfully');
      queryClient.invalidateQueries({queryKey: ['dogs', dogId]});
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
          <IconWeight /> Weights
        </CardTitle>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add weight</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <DialogHeader>
                  <DialogTitle>Add weight</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2">
                  <div className="grid flex-1 gap-2">
                    <FormField
                      control={form.control}
                      name="value"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Weight</FormLabel>
                          <Input {...field} />
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
              <TableHead>Value</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weights.map(weight => (
              <TableRow key={weight.id}>
                <TableCell className="font-medium">
                  {weight.id.substring(0, 8)}
                </TableCell>
                <TableCell>{weight.value}</TableCell>
                <TableCell>
                  {format(weight.createdAt, 'dd/MM/yyyy HH:mm')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
