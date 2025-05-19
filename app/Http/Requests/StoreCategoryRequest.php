<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreCategoryRequest extends FormRequest
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
           'name' => 'required|unique:categories,name|min:4',
           'slug' => 'required',
           'description' => 'nullable|string|max:255',
        ];
    }

    // protected function prepareForValidation()
    // {
    //     $this->merge([
    //         'slug' => str($this->name)->slug()
    //     ]);
    // }
    protected function prepareForValidation()
    {
        $this->merge([
            'slug' => Str::slug($this->input('name', ''))
        ]);
    }
}
