<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Low Stock Alert</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f44336;
            color: white;
            padding: 20px;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 0 0 5px 5px;
        }
        .product-info {
            background-color: white;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
            border-left: 4px solid #f44336;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
        }
        .label {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>⚠️ Low Stock Alert</h1>
    </div>
    <div class="content">
        <p>Hello Admin,</p>
        <p>The following product is running low on stock and needs your attention:</p>
        
        <div class="product-info">
            <div class="info-row">
                <span class="label">Product Name:</span>
                <span>{{ $product->name }}</span>
            </div>
            <div class="info-row">
                <span class="label">Current Stock:</span>
                <span>{{ $product->stock_quantity }} units</span>
            </div>
            <div class="info-row">
                <span class="label">Low Stock Threshold:</span>
                <span>{{ $product->low_stock_threshold }} units</span>
            </div>
            <div class="info-row">
                <span class="label">Price:</span>
                <span>${{ number_format($product->price, 2) }}</span>
            </div>
        </div>
        
        <p>Please reorder this product to maintain adequate inventory levels.</p>
        
        <p>Best regards,<br>E-commerce System</p>
    </div>
</body>
</html>