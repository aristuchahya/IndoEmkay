<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Error;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
    
    $category = $request->query('category');

    
    $query = Product::orderBy('created_at', 'DESC');

    
    if ($category) {
        $query->where('category', 'LIKE', '%' . $category . '%');
    }

   
    $products = $query->get();

    
    if ($products->isNotEmpty()) {
        return ProductResource::collection($products);
    } else {
        return response()->json(['message' => 'Data not found'], 404);
    }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_name' => 'required|max:150',
            'category' => 'required|max:100',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $product = Product::create([
            'product_name' => $request->product_name,
            'category' => $request->category,
            'price' => $request->price,
            'discount' => $request->discount
        ]);

        if ($product) {
            return response()->json([
                'status' => true,
                'message' => 'Product created successfully',
                'data' => new ProductResource($product) 
            ], 200);
        } else {
            return response()->json(['message' => 'Data not found'], 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json([
            'status' => true,
            'message' => 'Success get product',
            'data' => new ProductResource($product)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
         $validator = Validator::make($request->all(), [
            'product_name' => 'required|max:150',
            'category' => 'required|max:100',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $product->update([
            'product_name' => $request->product_name,
            'category' => $request->category,
            'price' => $request->price,
            'discount' => $request->discount
        ]);

        if ($product) {
            return response()->json([
                'status' => true,
                'message' => 'Product updated successfully',
                'data' => new ProductResource($product) 
            ], 200);
        } else {
            return response()->json(['message' => 'Data not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
