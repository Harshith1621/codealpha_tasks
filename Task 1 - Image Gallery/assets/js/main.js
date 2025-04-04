document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".lightbox");
  const lightboxOverlay = document.getElementById("lightbox_overlay");
  const lightboxImage = document.getElementById("lightbox_image");
  const closeBtn = document.getElementById("close");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const zoomInBtn = document.getElementById("zoomIn");
  const zoomOutBtn = document.getElementById("zoomOut");
  const slideshowBtn = document.getElementById("slideshow");
  const loadMoreBtn = document.getElementById("loadMore");
  const viewLessBtn = document.getElementById("viewLess");
  const grid = document.querySelector(".grid");

  let imageArray = Array.from(images);
  let currentIndex = 0;
  let zoomLevel = 1;
  let slideshowInterval = null;
  let visibleImages = 8; // Default images
  const loadCount = 4; // Load more count

  const newImages = [
    "./assets/images/model_9.png",
    "./assets/images/model_10.png",
    "./assets/images/model_11.png",
    "./assets/images/model_12.png",
  ];

  function showImage(index) {
    currentIndex = index;
    lightboxImage.src = imageArray[currentIndex].href;
    lightboxOverlay.style.display = "flex";
    zoomLevel = 1;
    lightboxImage.style.transform = "scale(1)";
  }

  function updateLightboxListeners() {
    const updatedImages = document.querySelectorAll(".lightbox");
    imageArray = Array.from(updatedImages);
    imageArray.forEach((image, index) => {
      image.addEventListener("click", function (event) {
        event.preventDefault();
        showImage(index);
      });
    });
  }

  function updateGallery() {
    const allImages = document.querySelectorAll(".image_wrapper");
    allImages.forEach((image, index) => {
      image.style.display = index < visibleImages ? "block" : "none";
    });

    if (visibleImages >= allImages.length) {
      loadMoreBtn.style.display = "none"; // Hide Load More if all images are loaded
      viewLessBtn.style.display = "block"; // Show View Less
    } else {
      loadMoreBtn.style.display = "block"; // Show Load More if images are left
      viewLessBtn.style.display = visibleImages > 8 ? "block" : "none";
    }
  }

  images.forEach((image, index) => {
    image.addEventListener("click", function (event) {
      event.preventDefault();
      showImage(index);
    });
  });

  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % imageArray.length;
    showImage(currentIndex);
  });

  prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
    showImage(currentIndex);
  });

  closeBtn.addEventListener("click", function () {
    lightboxOverlay.style.display = "none";
    clearInterval(slideshowInterval);
  });

  lightboxOverlay.addEventListener("click", function (event) {
    if (event.target === lightboxOverlay) {
      lightboxOverlay.style.display = "none";
      clearInterval(slideshowInterval);
    }
  });

  zoomInBtn.addEventListener("click", function () {
    zoomLevel += 0.2;
    lightboxImage.style.transform = `scale(${zoomLevel})`;
  });

  zoomOutBtn.addEventListener("click", function () {
    if (zoomLevel > 1) {
      zoomLevel -= 0.2;
      lightboxImage.style.transform = `scale(${zoomLevel})`;
    }
  });

  slideshowBtn.addEventListener("click", function () {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
      slideshowBtn.textContent = "▶";
    } else {
      slideshowInterval = setInterval(function () {
        nextBtn.click();
      }, 1000);
      slideshowBtn.textContent = "⏸";
    }
  });

  loadMoreBtn.addEventListener("click", function () {
    let count = 0;
    newImages.forEach((src) => {
      if (count < loadCount) {
        const div = document.createElement("div");
        div.classList.add("image_wrapper");

        const a = document.createElement("a");
        a.href = src;
        a.classList.add("lightbox");

        const img = document.createElement("img");
        img.src = src;
        img.alt = "Image";

        a.appendChild(img);
        div.appendChild(a);
        grid.appendChild(div);
        count++;
      }
    });

    updateLightboxListeners();
    visibleImages += loadCount;
    updateGallery();
  });

  viewLessBtn.addEventListener("click", function () {
    visibleImages = 8;
    updateGallery();
  });

  updateGallery();
});

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".image_wrapper"); // All images
  const loadMoreBtn = document.getElementById("loadMore");
  const viewLessBtn = document.getElementById("viewLess");

  let visibleImages = 8; // Default images visible
  const loadCount = 4; // Number of images to load per click

  function updateGallery() {
    images.forEach((image, index) => {
      image.style.display = index < visibleImages ? "block" : "none";
    });

    // Show "Load More" only if there are still hidden images
    if (visibleImages < images.length) {
      loadMoreBtn.style.display = "block";
      viewLessBtn.style.display = "none"; // Hide View Less while Load More is available
    } else {
      loadMoreBtn.style.display = "none"; // Hide Load More if all images are shown
      viewLessBtn.style.display = "block"; // Show View Less
    }
  }

  // Load More Button: Shows 4 additional images per click
  loadMoreBtn.addEventListener("click", function () {
    visibleImages += loadCount; // Increase visible images
    updateGallery();
  });

  // View Less Button: Resets to default 8 images
  viewLessBtn.addEventListener("click", function () {
    visibleImages = 8; // Reset to initial 8 images
    updateGallery();
  });

  updateGallery(); // Initialize gallery on page load
});
