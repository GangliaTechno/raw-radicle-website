# update_review_modal.ps1 — Replaces old single-form modal with MVST multi-step wizard

$files = @("adarkc.html", "amilkc.html", "bdarkc.html", "bmilkc.html", "cdarkc.html", "cmilkc.html")

$newModal = @'
<!-- Write a Review Modal (MVST Multi-Step) -->
<div class="ReviewModal__Overlay">
  <div class="ReviewModal">
    <button class="ReviewModal__Close" aria-label="Close">
      <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
    </button>

    <!-- Step 1: Rating -->
    <div class="ReviewModal__Step is-active" data-step="1">
      <h2 class="ReviewModal__StepTitle">How would you rate this item?</h2>
      <div class="ReviewModal__RatingStars">
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      <div class="ReviewModal__RatingLabels">
        <span>Dislike it</span>
        <span>Love it!</span>
      </div>
    </div>

    <!-- Step 2: Photo -->
    <div class="ReviewModal__Step" data-step="2">
      <h2 class="ReviewModal__StepTitle">Add a photo or video</h2>
      <div class="ReviewModal__UploadArea">
        <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
      </div>
      <button class="ReviewModal__ContinueBtn" data-action="photo-continue">CONTINUE</button>
      <button class="ReviewModal__SkipBtn" data-action="photo-skip">Skip</button>
    </div>

    <!-- Step 3: Review Text -->
    <div class="ReviewModal__Step" data-step="3">
      <h2 class="ReviewModal__StepTitle">Tell us more!</h2>
      <textarea class="ReviewModal__Textarea" placeholder="Share your experience with this product..."></textarea>
      <button class="ReviewModal__ContinueBtn" data-action="text-continue">CONTINUE</button>
      <button class="ReviewModal__SkipBtn" data-action="text-skip">Skip</button>
    </div>

    <!-- Step 4: Details -->
    <div class="ReviewModal__Step" data-step="4">
      <h2 class="ReviewModal__StepTitle">Please enter your details:</h2>
      <div class="ReviewModal__InputGroup">
        <label class="ReviewModal__InputLabel">Name</label>
        <input class="ReviewModal__Input" type="text" name="reviewer_name" placeholder="Your name" required>
      </div>
      <div class="ReviewModal__InputGroup">
        <label class="ReviewModal__InputLabel">Email</label>
        <input class="ReviewModal__Input" type="email" name="reviewer_email" placeholder="your@email.com">
      </div>
      <button class="ReviewModal__ContinueBtn" data-action="submit-review">DONE</button>
    </div>

    <!-- Success -->
    <div class="ReviewModal__Success">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <h3>Thank you!</h3>
      <p>Your review has been submitted successfully.</p>
    </div>
  </div>
</div>
'@

foreach ($file in $files) {
    $path = "public/pages/$file"
    $content = Get-Content $path -Raw -Encoding UTF8

    # Find old modal and replace
    $startMarker = '<!-- Write a Review Modal'
    $endMarker = '<!-- END PRODUCT REVIEWS SECTION -->'

    $startIdx = $content.IndexOf($startMarker)
    $endIdx = $content.IndexOf($endMarker)

    if ($startIdx -eq -1 -or $endIdx -eq -1) {
        Write-Host "SKIP: $file (markers not found)"
        continue
    }

    $before = $content.Substring(0, $startIdx)
    $after = $content.Substring($endIdx)

    $content = $before + $newModal + "`r`n" + $after

    [System.IO.File]::WriteAllText((Resolve-Path $path).Path, $content)
    Write-Host "DONE: $file"
}

Write-Host "`nAll modals updated."
