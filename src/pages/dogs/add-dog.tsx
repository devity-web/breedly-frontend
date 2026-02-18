import {zodResolver} from '@hookform/resolvers/zod';
import {IconCirclePlus} from '@tabler/icons-react';
import {useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import type z from 'zod';
import {Button} from '@/components/ui/button';
import {ColorPicker} from '@/components/ui/color-picker';
import {DatePicker} from '@/components/ui/date-picker';
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
import {dogsClient, dogsKeys} from '@/server/dogs/dogs.client';
import {dogFormSchema} from '@/server/dogs/dogs.schemas';

export function AddDog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof dogFormSchema>>({
    resolver: zodResolver(dogFormSchema),
    defaultValues: {
      name: '',
      color: '#6366f1'
    },
  });

  const {mutate, isPending} = dogsClient.createDog.useMutation({
    onSuccess: () => {
      toast.success('Dog successfully created');
      queryClient.invalidateQueries({
        queryKey: dogsKeys.getAll.queryKey,
      });
      form.reset({});
      setOpen(false);
    },
  });

  const onSubmit = (values: z.infer<typeof dogFormSchema>) => {
    console.log(values);
    mutate({body: values});
  };

  return (
    <Dialog
      open={open}
      onOpenChange={value => {
        form.reset({});
        setOpen(value);
      }}
    >
      <form>
        <DialogTrigger asChild>
          <Button>
            <IconCirclePlus />
            Add dog
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <DialogHeader>
                <DialogTitle>Add dog</DialogTitle>
              </DialogHeader>

              <FormField
                control={form.control}
                name="color"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-right">Color</FormLabel>
                    <ColorPicker color={field.value} {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="bornAt"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-right">Born At</FormLabel>
                    <DatePicker value={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" isLoading={isPending}>
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
