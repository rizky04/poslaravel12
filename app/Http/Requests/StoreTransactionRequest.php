<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
           'type' => 'required',
           'no_transaction' => 'required|unique:transactions,no_transaction',
           'notes' => 'nullable|string|max:255',
           'total_amount' => 'required|numeric|min:0',
        ];
    }
}
