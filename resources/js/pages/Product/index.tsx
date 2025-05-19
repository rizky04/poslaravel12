import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Product } from '@/types'
import { Head } from '@inertiajs/react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';

interface ProductIndexProps {
  product : Product[]
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: '/product',
    },
];
export default function index( {product}: ProductIndexProps ) {
  return (
   <AppLayout breadcrumbs={breadcrumbs}>
     <Head title="Product" />
        <div className="space-y-6">
           <div className='m-4'>
           <DataTable columns={columns} data={product} />
           </div>
        </div>
    </AppLayout>
  )
}
