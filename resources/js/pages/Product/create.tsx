import { AppContent } from '@/components/app-content';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Category } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import { toast } from 'sonner';


interface CreateCategoryProps {
  category: Category[]
}

export default function create({category}: CreateCategoryProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Product / Create',
      href: '//product',
    },
  ];
  const { data, setData, post, processing, errors } = useForm({
    product_code : '',
    name: '',
    slug: '',
    description: '',
    image: null as File | null,
    stock: '',
    price: '',
    selling_price: '',
    category_id: 0,
  })
  const [prouctCode, setProductCode] = useState<string>('');
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const handleCategoryChange = async (categoryId: string) => {
    const numbericCategoryId = parseInt(categoryId);
    setData("category_id", numbericCategoryId);
    try {
      const response = await fetch(`/last-number/${categoryId}`)
      const result = await response.json();

      const selectcategoryData = category.find((item) => item.id === numbericCategoryId);
      if (selectcategoryData){
        const prefix = selectcategoryData.name.slice(0, 3).toLocaleLowerCase();
        const today = new Date().toLocaleDateString('id-ID').replace(/\//g, '');
        const newCode = `${prefix}${today}${String(result.last_number + 1).padStart(2, '0')}`;
        setProductCode(newCode);
        setData('product_code', newCode);
      }
    } catch (error) {
      console.error('Error fetching last number:', error);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
   if (file) {
    setData('image', file);
    setPreview(URL.createObjectURL(file));
   }
  };


 const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('product.store'), {
      onSuccess: () => {
        toast.success('Product created successfully');
      },
      onError: () => {
        toast.error('Failed to create Product');
      },
    })
  }
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Category" />
      <div className="space-y-6">
        <div className='m-4'>
          <div className="py-3">
            <div className="mx-auto max-w-lg sm:px-6 lg:px-8">
              <Card>
                <CardContent>
                  <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-5">
                      <div className="grid gap-2">
                      <label>
                          Nama Kategori
                      </label>
                      <Select 
                      name='category_id'
                      onValueChange={handleCategoryChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {category.map((item) => (
                            <SelectItem 
                            key={item.id} 
                            value={item.id.toString()}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      </div>

                       <div className="grid gap-2">
                        <label>
                          Nama Kategori
                        </label>
                        <Input value={prouctCode} name='product_code' />
                        <InputError message={errors.name} />
                      </div>
                      <div className="grid gap-2">
                        <label>
                          Nama Kategori
                        </label>
                        <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        name="name"
                        type='text' 
                        className={cn(errors.name ? "border-red-600 border-1": "", "input-base-class")}
                        disabled={processing}
                        placeholder="Kategori" />
                        <InputError message={errors.name} />
                      </div>
                      <div className="grid gap-2">
                        <label>
                          Deskripsi
                        </label>
                        <Textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        name="description" 
                        disabled={processing}
                        className={cn(errors.description ? "border-red-600 border-1": "", "input-base-class")}
                        placeholder="Kategori" />
                        <InputError message={errors.description} />
                        <InputError />
                      </div>
                      <div className='gap-y-2'>
                        <Button type="submit">
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
