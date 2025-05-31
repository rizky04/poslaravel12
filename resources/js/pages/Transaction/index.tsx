import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Product } from '@/types'
import { Head } from '@inertiajs/react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';

interface TransactionIndexProps {
  transaction : TransactionIndexProps[]
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transacntion',
        href: '/transaction',
    },
];
export default function index( {transaction}: TransactionIndexProps ) {
  return (
   <AppLayout breadcrumbs={breadcrumbs}>
     <Head title="Transaction" />
        <div className="space-y-6">
           <div className='m-4'>
           <DataTable columns={columns} data={transaction} />
           </div>
        </div>
    </AppLayout>
  )
}
