<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
      return Inertia::render('Product/index',[
            'product' => Product::with('category')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       return Inertia::render('Product/create',[
           'category' => Category::all(),
       ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        
        if($request->hasFile('image')){
            $image = $request->file('image');
            $imagePath = $image->storeAs('products', $image->hashName());
            $data['image'] = $imagePath;
        }
        Product::create($data);
        return to_route('product.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('Product/show', [
            'product' => $product,
            'category' => Category::all(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return Inertia::render('Product/edit', [
            'product' => Product::find($id),
            'category' => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
         $data = $request->validated();
        
        if($request->hasFile('image')){
            if($product->image){
                Storage::delete('products/' . basename($product->image)); // Delete old image if exists
            }
            $image = $request->file('image');
            $imagePath = $image->storeAs('products', $image->hashName());
            $data['image'] = $imagePath;
        }else{
            unset($data['image']); // Remove image key if no new image is uploaded
        }
        $product->update($data);
        return to_route('product.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        if($product->image){
            Storage::delete('products/' . basename($product->image)); // Delete image file if exists
        }
        return to_route('product.index');
    }

    public function getLastProductNumber($categoryId)
    {
        
        $lastProduct = Product::where('category_id', $categoryId)
            ->orderBy('created_at', 'desc')
            ->first();
        $lastNumber = 0;

        if($lastProduct && preg_match('/\d+$/', $lastProduct->product_code, $matches)) {
            $lastNumber = (int)$matches[0];
        }

        return response()->json([
            'last_number' => $lastNumber,
        ]);
    }
}
