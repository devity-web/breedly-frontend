import {zodResolver} from '@hookform/resolvers/zod';
import {IconBrandAppleFilled, IconBrandGoogleFilled} from '@tabler/icons-react';
import {useNavigate, useSearch} from '@tanstack/react-router';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import z from 'zod';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from '@/components/ui/field';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useAuth} from '@/context/auth.context';
import {cn} from '@/lib/utils';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function LoginForm({className, ...props}: React.ComponentProps<'div'>) {
  const auth = useAuth();
  const navigate = useNavigate();
  const {redirect} = useSearch({strict: false});

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginEmail = async (data: z.infer<typeof loginSchema>) => {
    try {
      await auth.login(data);
      navigate({to: redirect ?? '/'});
    } catch {
      toast.error('Invalid email or password. Please try again.');
    }
  };

  const loginGoogle = async () => {
    try {
      await auth.loginSocial(redirect);
    } catch {
      toast.error('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <Button variant="outline" type="button">
                <IconBrandAppleFilled />
                Login with Apple
              </Button>
              <Button onClick={loginGoogle} variant="outline" type="button">
                <IconBrandGoogleFilled />
                Login with Google
              </Button>
            </Field>
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
              Or continue with
            </FieldSeparator>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(loginEmail)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-right">Email</FormLabel>
                      <Input placeholder="john.doe@example.com" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-right">Password</FormLabel>
                      <Input type="password" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Field>
                  <Button type="submit">Login</Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account? <a href="/">Sign up</a>
                  </FieldDescription>
                </Field>
              </form>
            </Form>
          </FieldGroup>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="/">Terms of Service</a>{' '}
        and <a href="/">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
