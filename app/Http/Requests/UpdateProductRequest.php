<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
           'product_code' => 'nullable',
           'name' => 'nullable',
           'slug' => 'nullable',
           'stock' => 'nullable',
           'price' => 'nullable',
           'selling_price' => 'nullable',
           'image' => 'nullable|mimes:jpg,jpeg,png|max:2048',
           'description' => 'nullable',
           'category_id' => 'nullable',
        ];
    }
}
