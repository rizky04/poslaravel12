import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types'
import { Head } from '@inertiajs/react';
import React from 'react'


interface DetailProductProps {
    product: Product
}
export default function show({ product }: DetailProductProps) {
  const breadcrumbs = [
    {
        title: 'Product / Show',
        href: '/product',
        },
    ];
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Product Detail" />
        <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                    <Card className='border-0 shadow-none'>
                        <CardContent className='p-0'>
                            <img 
                            src={product.images} 
                            alt={product.name} 
                            className='rounded-lg object-cover aspect-square' />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </AppLayout>
  )
}
