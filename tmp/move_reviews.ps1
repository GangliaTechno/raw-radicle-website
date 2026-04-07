# move_reviews.ps1 — Moves the review section AFTER the related products section

$files = @("adarkc.html", "amilkc.html", "bdarkc.html", "bmilkc.html", "cdarkc.html", "cmilkc.html")

foreach ($file in $files) {
    $path = "public/pages/$file"
    $content = Get-Content $path -Raw -Encoding UTF8

    # Find and extract the review section + modal
    $startMarker = '<!-- ===== PRODUCT REVIEWS SECTION ====='
    $endMarker = '<!-- END PRODUCT REVIEWS SECTION -->'

    $startIdx = $content.IndexOf($startMarker)
    $endIdx = $content.IndexOf($endMarker)

    if ($startIdx -eq -1 -or $endIdx -eq -1) {
        Write-Host "SKIP: $file (no review section found)"
        continue
    }

    $endIdx = $endIdx + $endMarker.Length

    # Extract the review section
    $reviewBlock = $content.Substring($startIdx, $endIdx - $startIdx)

    # Remove it from its current position
    $content = $content.Substring(0, $startIdx) + $content.Substring($endIdx)

    # Find the insertion point: after the related products </div> closing tag
    # The related products section ends with </section> then Flickity JS then </div>
    $flickityEnd = 'clearInterval(checkFlickity);'
    $flickityIdx = $content.IndexOf($flickityEnd)

    if ($flickityIdx -eq -1) {
        Write-Host "SKIP: $file (no flickity end found)"
        continue
    }

    # Find the </div> that closes the shopify-section--bordered container after the flickity script
    # Pattern: clearInterval(checkFlickity); ... }); </script> </div>
    $searchFrom = $flickityIdx
    $closeDivPattern = '</div>'

    # Find the </div> after the </script> that follows the flickity code
    $scriptEnd = $content.IndexOf('</script>', $searchFrom)
    if ($scriptEnd -eq -1) {
        Write-Host "SKIP: $file (no script end found)"
        continue
    }

    # The </div> that closes shopify-section--bordered is right after </script>
    $closingDiv = $content.IndexOf('</div>', $scriptEnd)
    if ($closingDiv -eq -1) {
        Write-Host "SKIP: $file (no closing div found)"
        continue
    }

    $insertionPoint = $closingDiv + '</div>'.Length

    # Insert the review section after the related products container
    $content = $content.Substring(0, $insertionPoint) + "`r`n`r`n" + $reviewBlock + "`r`n" + $content.Substring($insertionPoint)

    [System.IO.File]::WriteAllText((Resolve-Path $path).Path, $content)
    Write-Host "DONE: $file (moved reviews after related products)"
}

Write-Host "`nAll pages processed."
