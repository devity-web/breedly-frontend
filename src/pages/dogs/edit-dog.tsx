import {zodResolver} from '@hookform/resolvers/zod';
import {IconArrowLeft, IconEPassport} from '@tabler/icons-react';
import {useQueryClient} from '@tanstack/react-query';
import {useNavigate} from '@tanstack/react-router';
import {format} from 'date-fns';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import type z from 'zod';
import DogSkeleton from '@/components/dog-skeleton';
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
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {dogsClient, dogsKeys} from '@/server/dogs/dogs.client';
import {dogFormSchema} from '@/server/dogs/dogs.schemas';
import {replaceNulls} from '@/utils/replace-nulls';
import {HealthCard} from './health-card';
import {PoopCard} from './poop-card';
import {WeightCard} from './weight-card';

export const EditDog = ({dogId}: {dogId: string}) => {
  const queryClient = useQueryClient();

  const {data, isLoading} = dogsClient.getDogById.useQuery(
    dogsKeys.getById(dogId).queryKey,
    {
      params: {id: dogId},
    },
  );

  const {mutate, isPending} = dogsClient.updateDog.useMutation({
    onSuccess: () => {
      toast('Identity successfully updated ✅');
      queryClient.invalidateQueries({
        queryKey: dogsKeys.getById(dogId).queryKey,
      });
    },
  });

  const form = useForm<z.infer<typeof dogFormSchema>>({
    resolver: zodResolver(dogFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof dogFormSchema>) => {
    console.log(values);
    mutate({params: {id: dogId}, body: values});
  };

  useEffect(() => {
    if (data) {
      form.reset(replaceNulls(data.body));
    }
  }, [form, data]);

  return isLoading ? (
    <DogSkeleton />
  ) : (
    <div className="flex flex-col gap-4">
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
            {data?.body.name}{' '}
            <span className="text-2xl">({data?.body.assignedName})</span>
          </h2>
        </div>

        <Badge variant="secondary" className="h-full">
          {data && format(data.body.bornAt, 'dd/MM/yyyy HH:mm')}
        </Badge>
      </div>

      <Tabs defaultValue="identity">
        <TabsList>
          <TabsTrigger value="identity">Identity</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="poops">Poops</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>
        <TabsContent value="identity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1">
                <IconEPassport /> Identity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
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
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        data && form.reset(replaceNulls(data.body))
                      }
                    >
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
        </TabsContent>
        <TabsContent value="weight">
          {data && (
            <WeightCard dogId={data.body.id} weights={data.body.weights} />
          )}
        </TabsContent>
        <TabsContent value="poops">
          {data && <PoopCard dogId={data.body.id} poops={data.body.poops} />}
        </TabsContent>
        <TabsContent value="health">
          {data && (
            <HealthCard dogId={data.body.id} healths={data.body.healths} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
