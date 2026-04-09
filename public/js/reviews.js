/* ===== Product Reviews — Multi-Step MVST/Loox Style ===== */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initReviewModal();
    initSortDropdown();
    updateReviewCount();
  });

  function updateReviewCount() {
    var cards = document.querySelectorAll('.ReviewCard');
    var countEl = document.querySelector('.ReviewSection__CountNum');
    if (countEl) countEl.textContent = cards.length + ' Reviews';
  }

  /* ===== Multi-Step Review Modal ===== */
  function initReviewModal() {
    var writeBtn = document.querySelector('.ReviewSection__WriteBtn');
    var overlay = document.querySelector('.ReviewModal__Overlay');
    var closeBtn = document.querySelector('.ReviewModal__Close');
    var steps = document.querySelectorAll('.ReviewModal__Step');
    var successEl = document.querySelector('.ReviewModal__Success');

    var currentStep = 0;
    var selectedRating = 0;
    var uploadedPhotoDataUrl = null;

    if (!writeBtn || !overlay) return;

    // Open
    writeBtn.addEventListener('click', function() {
      resetForm();
      overlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      currentStep = 0;
      selectedRating = 0;
      showStep(0);
    });

    // Close
    function closeModal() {
      overlay.classList.remove('is-active');
      document.body.style.overflow = '';
      resetForm();
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });

    function showStep(idx) {
      steps.forEach(function(s) { s.classList.remove('is-active'); });
      if (successEl) successEl.classList.remove('is-active');
      if (steps[idx]) steps[idx].classList.add('is-active');
      currentStep = idx;
    }

    function resetForm() {
      selectedRating = 0;
      uploadedPhotoDataUrl = null;
      var fileInput = document.querySelector('.ReviewModal__UploadArea input[type="file"]');
      if (fileInput) fileInput.value = '';
      var imgPrev = document.querySelector('.ReviewModal__UploadArea .preview-img');
      if (imgPrev) imgPrev.remove();

      var ratingStars = document.querySelectorAll('.ReviewModal__RatingStars svg');
      ratingStars.forEach(function(s) { s.classList.remove('star--active'); });
      var textarea = document.querySelector('.ReviewModal__Textarea');
      if (textarea) textarea.value = '';
      var nameInput = document.querySelector('.ReviewModal__Input[name="reviewer_name"]');
      var emailInput = document.querySelector('.ReviewModal__Input[name="reviewer_email"]');
      if (nameInput) nameInput.value = '';
      if (emailInput) emailInput.value = '';
      steps.forEach(function(s) { s.classList.remove('is-active'); });
      if (successEl) successEl.classList.remove('is-active');
    }

    /* Step 1: Star Rating */
    var ratingStars = document.querySelectorAll('.ReviewModal__RatingStars svg');
    ratingStars.forEach(function(star, idx) {
      star.addEventListener('click', function() {
        selectedRating = idx + 1;
        updateRatingStars(ratingStars, selectedRating);
        // Auto-advance after a brief delay
        setTimeout(function() { showStep(1); }, 300);
      });
      star.addEventListener('mouseenter', function() {
        updateRatingStars(ratingStars, idx + 1);
      });
    });

    var ratingContainer = document.querySelector('.ReviewModal__RatingStars');
    if (ratingContainer) {
      ratingContainer.addEventListener('mouseleave', function() {
        updateRatingStars(ratingStars, selectedRating);
      });
    }

    /* Step 2: Photo — Continue/Skip & Upload Logic */
    var uploadArea = document.querySelector('.ReviewModal__UploadArea');
    if (uploadArea) {
      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*,video/*';
      fileInput.style.display = 'none';
      uploadArea.appendChild(fileInput);

      uploadArea.addEventListener('click', function() {
        fileInput.click();
      });

      fileInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
          var reader = new FileReader();
          reader.onload = function(event) {
            uploadedPhotoDataUrl = event.target.result;
            var imgPrev = uploadArea.querySelector('.preview-img');
            if (!imgPrev) {
              imgPrev = document.createElement('img');
              imgPrev.className = 'preview-img';
              imgPrev.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; border-radius:2px; z-index:2;';
              uploadArea.style.position = 'relative';
              uploadArea.appendChild(imgPrev);
            }
            imgPrev.src = uploadedPhotoDataUrl;
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      });
    }

    var photoContBtn = document.querySelector('[data-action="photo-continue"]');
    var photoSkipBtn = document.querySelector('[data-action="photo-skip"]');
    if (photoContBtn) photoContBtn.addEventListener('click', function() { showStep(2); });
    if (photoSkipBtn) photoSkipBtn.addEventListener('click', function() { showStep(2); });

    /* Step 3: Review Text — Continue/Skip */
    var textContBtn = document.querySelector('[data-action="text-continue"]');
    var textSkipBtn = document.querySelector('[data-action="text-skip"]');
    if (textContBtn) textContBtn.addEventListener('click', function() { showStep(3); });
    if (textSkipBtn) textSkipBtn.addEventListener('click', function() { showStep(3); });

    /* Step 4: Details — Done */
    var doneBtn = document.querySelector('[data-action="submit-review"]');
    if (doneBtn) {
      doneBtn.addEventListener('click', function() {
        var nameInput = document.querySelector('.ReviewModal__Input[name="reviewer_name"]');
        var name = nameInput ? nameInput.value.trim() : '';

        if (!name) {
          nameInput.style.borderColor = '#e74c3c';
          nameInput.focus();
          return;
        }

        var textarea = document.querySelector('.ReviewModal__Textarea');
        var body = textarea ? textarea.value.trim() : '';

        // Get product ID from URL
        var productId = window.location.pathname.split('/').pop().replace('.html', '');

        // Submit the review to the server
        fetch('/api/reviews/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: productId,
            review: {
              name: name,
              rating: selectedRating,
              body: body,
              photo: uploadedPhotoDataUrl
            }
          })
        }).then(function(res) { return res.json(); })
          .then(function(data) {
            if (data.success) {
              // Show success
              steps.forEach(function(s) { s.classList.remove('is-active'); });
              if (successEl) successEl.classList.add('is-active');
              setTimeout(function() { closeModal(); }, 2000);
            }
          })
          .catch(function(err) {
            console.error('Failed to submit review:', err);
            alert('Something went wrong. Please try again.');
          });
      });
    }
  }

  function updateRatingStars(stars, rating) {
    stars.forEach(function(star, idx) {
      if (idx < rating) {
        star.classList.add('star--active');
      } else {
        star.classList.remove('star--active');
      }
    });
  }

  function addNewReview(name, rating, body, photoDataUrl) {
    var reviewList = document.querySelector('.ReviewSection__List');
    if (!reviewList) return;

    var today = new Date();
    var dateStr = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

    var starsHtml = '';
    for (var i = 0; i < 5; i++) {
      starsHtml += i < rating
        ? '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
        : '<svg viewBox="0 0 24 24" class="star--empty"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    }

    var bodyHtml = body ? '<div class="ReviewCard__Body">' + escapeHtml(body) + '</div>' : '';

    var mediaHtml = '';
    if (photoDataUrl) {
      mediaHtml = '<div class="ReviewCard__Media"><img src="' + photoDataUrl + '" class="ReviewCard__Photo" alt="Review Photo"></div>';
    }

    var existingVariant = reviewList.querySelector('.ReviewCard__Variant');
    var variantHtml = existingVariant ? existingVariant.outerHTML : '';

    var cardHtml = '<div class="ReviewCard">' +
      '<div class="ReviewCard__Inner">' +
        '<div class="ReviewCard__Content">' +
          '<div class="ReviewCard__AuthorRow">' +
            '<span class="ReviewCard__Author">' + escapeHtml(name) + '</span>' +
            '<span class="ReviewCard__Verified">' +
              '<svg viewBox="0 0 24 24" fill="#000"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' +
              'Verified' +
            '</span>' +
          '</div>' +
          '<div class="ReviewCard__Date">' + dateStr + '</div>' +
          '<div class="ReviewCard__Stars">' + starsHtml + '</div>' +
          bodyHtml +
        '</div>' +
        mediaHtml +
      '</div>' +
      variantHtml +
    '</div>';

    reviewList.insertAdjacentHTML('afterbegin', cardHtml);
    updateReviewCount();
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /* ===== Sort Dropdown ===== */
  function initSortDropdown() {
    var filterBtn = document.querySelector('.ReviewSection__FilterBtn');
    var dropdown = document.querySelector('.ReviewSection__SortDropdown');
    if (!filterBtn || !dropdown) return;

    filterBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('is-active');
    });

    document.addEventListener('click', function() { dropdown.classList.remove('is-active'); });

    dropdown.querySelectorAll('.ReviewSection__SortOption').forEach(function(opt) {
      opt.addEventListener('click', function() {
        sortReviews(this.getAttribute('data-sort'));
        dropdown.classList.remove('is-active');
      });
    });
  }

  function sortReviews(sortBy) {
    var list = document.querySelector('.ReviewSection__List');
    if (!list) return;
    var cards = Array.prototype.slice.call(list.querySelectorAll('.ReviewCard'));
    cards.sort(function(a, b) {
      if (sortBy === 'newest') {
        return new Date(b.querySelector('.ReviewCard__Date').textContent) - new Date(a.querySelector('.ReviewCard__Date').textContent);
      } else if (sortBy === 'highest') {
        return b.querySelectorAll('.ReviewCard__Stars svg:not(.star--empty)').length - a.querySelectorAll('.ReviewCard__Stars svg:not(.star--empty)').length;
      } else if (sortBy === 'lowest') {
        return a.querySelectorAll('.ReviewCard__Stars svg:not(.star--empty)').length - b.querySelectorAll('.ReviewCard__Stars svg:not(.star--empty)').length;
      }
      return 0;
    });
    cards.forEach(function(c) { list.appendChild(c); });
  }

})();
