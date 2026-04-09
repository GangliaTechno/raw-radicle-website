
$products = @("adarkc", "amilkc", "bdarkc", "bmilkc", "cdarkc", "cmilkc")

foreach ($p in $products) {
    $filePath = "public/pages/$p.html"
    if (Test-Path $filePath) {
        Write-Host "Tagging $filePath..."
        $content = Get-Content $filePath -Raw
        
        # 1. Body Tag
        $content = $content -replace '<body', "<body data-cms-product-id=`"$p`""
        
        # 2. Product Badge
        $content = $content -replace '<div class="ProductBadge">', '<div class="ProductBadge" data-cms-key="badge">'
        
        # 3. Features List
        $content = $content -replace '<div class="FeaturesList">', '<div class="FeaturesList" data-cms-key="features">'
        
        # 4. Specifications RTE (Look for the one inside the specs tab)
        # This one is tricky, we'll try to find the Rte that follows the specs title or is in that section
        $content = $content -replace '<div class="Rte">', '<div class="Rte" data-cms-key="specifications">'
        
        # 5. Internal Features
        $content = $content -replace '<div class="ProductFeatures__Grid">', '<div class="ProductFeatures__Grid" data-cms-key="internalFeatures">'
        
        # 6. Reviews List
        $content = $content -replace '<div class="ReviewSection__List">', '<div class="ReviewSection__List" data-cms-key="reviews">'
        
        # Save back
        $content | Set-Content $filePath -NoNewline
    }
}
