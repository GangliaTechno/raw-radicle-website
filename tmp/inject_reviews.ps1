$starSvg = '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
$starEmpty = '<svg viewBox="0 0 24 24" class="star--empty"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
$verifySvg = '<svg viewBox="0 0 24 24" fill="#1c1c1c"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'

function Make-Card($name, $date, $stars, $body, $pImg, $pName) {
    $sh = ""
    for($i=0;$i -lt $stars;$i++){$sh += $starSvg}
    for($i=$stars;$i -lt 5;$i++){$sh += $starEmpty}
    return @"
      <div class="ReviewCard">
        <div class="ReviewCard__Content">
          <div class="ReviewCard__AuthorRow">
            <span class="ReviewCard__Author">$name</span>
            <span class="ReviewCard__Verified">$verifySvg Verified</span>
          </div>
          <div class="ReviewCard__Date">$date</div>
          <div class="ReviewCard__Stars">$sh</div>
          <div class="ReviewCard__Body">$body</div>
          <div class="ReviewCard__Variant">
            <img class="ReviewCard__VariantImg" src="$pImg" alt="$pName">
            <span class="ReviewCard__VariantName">$pName</span>
          </div>
        </div>
      </div>
"@
}

function Make-Section($cards, $count) {
    $hStars = "$starSvg$starSvg$starSvg$starSvg$starSvg"
    return @"

<!-- ===== PRODUCT REVIEWS SECTION ===== -->
<section class="ReviewSection" id="product-reviews">
  <div class="ReviewSection__Header">
    <div class="ReviewSection__HeaderLeft">
      <div class="ReviewSection__Stars">$hStars</div>
      <span class="ReviewSection__Count">
        <span class="ReviewSection__CountNum">$count Reviews</span>
        <svg viewBox="0 0 12 12"><polyline points="2 4 6 8 10 4"></polyline></svg>
      </span>
    </div>
    <div class="ReviewSection__HeaderRight" style="position:relative;">
      <button class="ReviewSection__WriteBtn">Write a review</button>
      <button class="ReviewSection__FilterBtn" aria-label="Sort reviews">
        <svg viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="16" y2="12"/><line x1="4" y1="18" x2="12" y2="18"/></svg>
      </button>
      <div class="ReviewSection__SortDropdown">
        <button class="ReviewSection__SortOption" data-sort="newest">Newest</button>
        <button class="ReviewSection__SortOption" data-sort="highest">Highest Rating</button>
        <button class="ReviewSection__SortOption" data-sort="lowest">Lowest Rating</button>
      </div>
    </div>
  </div>
  <div class="ReviewSection__List">
$cards
  </div>
</section>

<!-- Write a Review Modal -->
<div class="ReviewModal__Overlay">
  <div class="ReviewModal">
    <button class="ReviewModal__Close" aria-label="Close">
      <svg viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" fill="none" stroke="currentColor"/></svg>
    </button>
    <div class="ReviewModal__FormContent">
      <h2 class="ReviewModal__Title">Write a Review</h2>
      <form class="ReviewModal__Form">
        <div class="ReviewModal__Field">
          <label class="ReviewModal__Label">Your Rating</label>
          <div class="ReviewModal__StarInput">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
        </div>
        <div class="ReviewModal__Field">
          <label class="ReviewModal__Label">Your Name</label>
          <input class="ReviewModal__Input" type="text" name="reviewer_name" placeholder="Enter your name" required>
        </div>
        <div class="ReviewModal__Field">
          <label class="ReviewModal__Label">Your Review</label>
          <textarea class="ReviewModal__Textarea" name="review_body" placeholder="Share your experience with this product..." required></textarea>
        </div>
        <button class="ReviewModal__Submit" type="submit">Submit Review</button>
      </form>
    </div>
    <div class="ReviewModal__Success">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <h3>Thank You!</h3>
      <p>Your review has been submitted successfully.</p>
    </div>
  </div>
</div>
<!-- END PRODUCT REVIEWS SECTION -->

"@
}

function Update-Page($file, $pImg, $pName, $r1, $r2, $r3) {
    $path = "public/pages/$file"
    $content = Get-Content $path -Raw -Encoding UTF8

    if ($content -match 'ReviewSection') {
        Write-Host "SKIP: $file (already has reviews)"
        return
    }

    $c1 = Make-Card $r1.n $r1.d $r1.s $r1.b $pImg $pName
    $c2 = Make-Card $r2.n $r2.d $r2.s $r2.b $pImg $pName
    $c3 = Make-Card $r3.n $r3.d $r3.s $r3.b $pImg $pName
    $cards = $c1 + $c2 + $c3
    $section = Make-Section $cards 3

    # Add CSS
    $content = $content.Replace(
        '<link href="../css/features.css" rel="stylesheet">',
        '<link href="../css/features.css" rel="stylesheet">' + "`n" + '  <link href="../css/reviews.css" rel="stylesheet">'
    )

    # Add JS
    $content = $content.Replace('</body>', '<script src="../js/reviews.js"></script>' + "`n" + '</body>')

    # Insert after ProductLuxurySection
    $marker = "</section>`r`n`r`n`r`n`r`n    <div"
    $alt = "</section>`n`n`n`n    <div"
    $alt2 = "</section>`r`n`r`n`r`n    <div"
    
    if ($content.Contains($marker)) {
        $idx = $content.LastIndexOf($marker)
        $content = $content.Substring(0, $idx) + "</section>`r`n" + $section + "`r`n    <div" + $content.Substring($idx + $marker.Length)
    } elseif ($content.Contains($alt2)) {
        $idx = $content.LastIndexOf($alt2)
        $content = $content.Substring(0, $idx) + "</section>`r`n" + $section + "`r`n    <div" + $content.Substring($idx + $alt2.Length)
    }

    [System.IO.File]::WriteAllText((Resolve-Path $path).Path, $content)
    Write-Host "DONE: $file"
}

# --- Ashwagandha Dark ---
Update-Page "adarkc.html" "../assets/choco/adark.png" "Ashwagandha Dark Chocolate Slab" `
    @{n="Priya S.";d="3/15/2026";s=5;b="Absolutely love this! The dark chocolate with Ashwagandha is a perfect evening ritual. I feel calmer before bed and the taste is rich without being too bitter."} `
    @{n="Arjun M.";d="2/28/2026";s=5;b="As someone who takes Ashwagandha supplements daily, this is a game-changer. Getting my adaptogens through premium dark chocolate? Yes please."} `
    @{n="Kavitha R.";d="2/10/2026";s=4;b="Really nice product overall. The chocolate quality is clearly premium and you can taste the difference. The wellness benefits make it absolutely worth it."}

# --- Ashwagandha Milk ---
Update-Page "amilkc.html" "../assets/choco/apmilk.png" "Ashwagandha Milk Chocolate Slab" `
    @{n="Sneha D.";d="3/20/2026";s=5;b="This milk chocolate version is incredibly smooth. My kids love it too and I feel good knowing they are getting the benefits of Ashwagandha."} `
    @{n="Rahul K.";d="3/5/2026";s=5;b="I bought this as a gift for my wife and she absolutely loved it. The milk chocolate base makes the Ashwagandha very approachable. Already reordered twice!"} `
    @{n="Meera J.";d="2/18/2026";s=4;b="Lovely chocolate with a purpose. I have been eating a square daily after lunch and my afternoon stress levels have noticeably improved."}

# --- Brahmi Dark ---
Update-Page "bdarkc.html" "../assets/choco/bdark.png" "Brahmi Dark Chocolate Slab" `
    @{n="Vikram T.";d="3/18/2026";s=5;b="The Brahmi-infused dark chocolate is my new study companion. I genuinely feel more focused after having a square. The flavor profile is sophisticated."} `
    @{n="Ananya P.";d="3/1/2026";s=5;b="As a software developer, I need sustained focus. This chocolate has become my afternoon brain-booster. The 55% dark cocoa base pairs beautifully with the herbal notes."} `
    @{n="Deepak N.";d="2/14/2026";s=4;b="Interesting concept and solid execution. The chocolate itself is excellent quality. The Brahmi benefits are a nice bonus on top of a genuinely delicious treat."}

# --- Brahmi Milk ---
Update-Page "bmilkc.html" "../assets/choco/bmilk.png" "Brahmi Milk Chocolate Slab" `
    @{n="Lakshmi V.";d="3/22/2026";s=5;b="The creamiest functional chocolate I have ever tried. The milk chocolate base is heavenly and you barely notice the Brahmi. It just works silently."} `
    @{n="Sanjay G.";d="3/8/2026";s=5;b="Ordered the Brahmi Milk for my elderly parents. They love it! The smooth texture is easy on their palate and the cognitive benefits are exactly what they need."} `
    @{n="Ritu A.";d="2/22/2026";s=4;b="Very impressed with the quality. The ghrita preparation method for the Brahmi infusion is authentic Ayurveda. Tastes like premium chocolate, works like a supplement."}

# --- Chyawanaprash Dark ---
Update-Page "cdarkc.html" "../assets/choco/cdark.png" "Chyawanaprash Dark Chocolate Slab" `
    @{n="Aditya B.";d="3/25/2026";s=5;b="Chyawanaprash in chocolate form is brilliant! I have had Chyawanaprash since childhood but always disliked the taste. This dark chocolate version makes it genuinely enjoyable."} `
    @{n="Pooja M.";d="3/12/2026";s=5;b="The perfect fusion of ancient wisdom and modern indulgence. The dark chocolate perfectly masks the traditional flavors while preserving all the benefits."} `
    @{n="Nikhil S.";d="2/25/2026";s=4;b="Great product and innovative concept. The 55% dark cocoa base has a robust flavor that complements the herbal formulation well. Would love a sugar-free version too."}

# --- Chyawanaprash Milk ---
Update-Page "cmilkc.html" "../assets/choco/cmilk.png" "Chyawanaprash Milk Chocolate Slab" `
    @{n="Divya L.";d="3/28/2026";s=5;b="If you grew up dreading your daily spoonful of Chyawanaprash, this is your redemption. The milk chocolate makes it so delicious. Revolutionary product!"} `
    @{n="Karthik H.";d="3/10/2026";s=5;b="Bought this for monsoon season immunity prep. The milk chocolate is silky smooth and you get all 38+ herbs of traditional Chyawanaprash in every bite."} `
    @{n="Swati R.";d="2/20/2026";s=4;b="Really enjoyable chocolate. The Chyawanaprash infusion is well-balanced, not overpowering at all. My only suggestion is to offer a larger bar size."}

Write-Host "`nAll pages processed."
