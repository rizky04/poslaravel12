import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types'
import { Head } from '@inertiajs/react';
import { console } from 'inspector';
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
                            src={product.image} 
                            alt={product.image} 
                            className='rounded-lg object-cover aspect-square' />
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {product.name}
                        </h1>
                        <div className="flex justify-betwent gap-2">
                            <p className="text-2xl font-semibolde mt-2">
                                <span>Harga</span>
                              <p>
                                  {product.price.toLocaleString('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                })} 
                              </p>
                            </p> 
                            <p className="text-2xl font-semibolde mt-2">
                                <span>Harga Jual</span>
                               <p>
                                 {product.selling_price.toLocaleString('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                })} 
                               </p>
                            </p>
                        </div>
                        <div className="flex item-center gap-2 mt">
                            <span className="text-sm text-muted-foreground">
                                Stok :
                            </span>
                            <span className="text-sm text-muted-foreground">
                               {product.stock}
                            </span>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            Deskripsi
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
  )
}
