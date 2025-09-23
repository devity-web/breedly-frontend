import {zodResolver} from '@hookform/resolvers/zod';
import {IconArrowLeft, IconEPassport, IconPoo} from '@tabler/icons-react';
import {useNavigate} from '@tanstack/react-router';
import {format} from 'date-fns';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import z from 'zod';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
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
import {replaceNulls} from '@/utils/replace-nulls';
import {WeightCard} from './weight-card';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  assignedName: z.string().optional(),
  passport: z.string().optional(),
  chipId: z.string().optional(),
});

export const EditDog = ({dogId}: {dogId: string}) => {
  const {data} = dogsClient.getDogById.useQuery(['dogs', dogId], {
    params: {id: dogId},
  });

  const {mutate, isPending} = dogsClient.updateDog.useMutation({
    onSuccess: () => {
      toast('Dog updated successfully');
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    mutate({params: {id: dogId}, body: values});
  };

  useEffect(() => {
    if (data) {
      form.reset(replaceNulls(data.body));
    }
  }, [form, data]);

  if (!data) {
    return null;
  }

  return (
    <div className="container max-w-6xl mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate({to: '/dogs'})}
            variant="outline"
            size="icon"
          >
            <IconArrowLeft />
          </Button>

          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            {data?.body.name}
          </h2>
        </div>

        <Badge variant="secondary" className="h-full">
          {format(data.body.bornAt, 'dd/MM/yyyy HH:mm')}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            <IconEPassport /> Identity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-2 gap-2 items-start">
                <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-right">Name</FormLabel>
                      <Input placeholder="Romeu Santiago" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignedName"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-right">
                        Assigned Name
                      </FormLabel>
                      <Input placeholder="Dom" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 items-start">
                <FormField
                  control={form.control}
                  name="passport"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-right">Passport</FormLabel>
                      <Input placeholder="AB123456" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="chipId"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-right">Chip ID</FormLabel>
                      <Input placeholder="123456789" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="secondary">
                  Discard
                </Button>
                <Button type="submit" isLoading={isPending}>
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <WeightCard dogId={data.body.id} weights={data.body.weights} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            <IconPoo /> Poops
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.body.weights.map(weight => (
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
    </div>
  );
};
