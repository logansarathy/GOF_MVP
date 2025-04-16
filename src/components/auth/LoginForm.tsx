
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole, useAuth } from '@/contexts/AuthContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { User, Store, Shield } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  userType: z.enum(['customer', 'admin', 'store_owner']).optional().default('customer'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { signIn, loading } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      userType: 'customer',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await signIn(values.email, values.password);
    // Role will be fetched from the database in the AuthContext
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" className="bg-white border-gray-300 focus:border-violet-500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••" className="bg-white border-gray-300 focus:border-violet-500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>I am a:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0 rounded-md border border-gray-200 p-2 hover:bg-gray-50">
                    <FormControl>
                      <RadioGroupItem value="customer" />
                    </FormControl>
                    <FormLabel className="font-normal flex items-center cursor-pointer">
                      <User className="h-4 w-4 mr-1 text-violet-500" />
                      Customer
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0 rounded-md border border-gray-200 p-2 hover:bg-gray-50">
                    <FormControl>
                      <RadioGroupItem value="store_owner" />
                    </FormControl>
                    <FormLabel className="font-normal flex items-center cursor-pointer">
                      <Store className="h-4 w-4 mr-1 text-indigo-500" />
                      Store Owner
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0 rounded-md border border-gray-200 p-2 hover:bg-gray-50">
                    <FormControl>
                      <RadioGroupItem value="admin" />
                    </FormControl>
                    <FormLabel className="font-normal flex items-center cursor-pointer">
                      <Shield className="h-4 w-4 mr-1 text-purple-500" />
                      Admin
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-violet-600 hover:bg-violet-700 transition-colors mt-6"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign In'}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
