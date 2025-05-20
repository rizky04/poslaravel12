<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;


class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
           'product_code' => 'required|unique:products',
           'name' => 'required|min:4|unique:products',
           'slug' => 'required|unique:products',
           'stock' => 'required|numeric|min:1',
           'price' => 'required|numeric|min:1',
           'selling_price' => 'required|numeric|min:1',
           'image' => 'nullable|mimes:jpg,jpeg,png|max:2048',
           'description' => 'nullable|min:4',
           'category_id' => 'required|exists:categories,id', 
        ];
    }
     protected function prepareForValidation()
    {
        $this->merge([
            'slug' => Str::slug($this->input('name', ''))
        ]);
    }
}
