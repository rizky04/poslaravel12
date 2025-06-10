import { AppContent } from '@/components/app-content';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Category, Product } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import { toast } from 'sonner';



interface CreateTransactionProps extends PageProps {
  products: Product[];
}

export default function create({auth, products}: CreateTransactionProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Transaction / Create',
      href: '/transaction/create',
    },
  ];


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Category" />
      <div className="container py-6 px-4 sm:px-6 md:px-8">
  <div className="flex justify-end">
    <div className="w-full sm:w-auto">
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select Type Transaction</SelectLabel>
            <SelectItem value="purchase">Purchase</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
</div>

    </AppLayout>
  )
}
