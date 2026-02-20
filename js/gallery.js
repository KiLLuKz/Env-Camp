document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("fullImage");
    const closeBtn = document.querySelector(".close-modal");
    const images = document.querySelectorAll(".gallery-item img");

    const openModal = (src) => {
        if (modal && modalImg) {
            modal.style.display = "flex"; // ใช้ flex เพื่อให้ CSS จัดกึ่งกลางได้ง่าย
            modalImg.src = src;
            document.body.style.overflow = "hidden"; // ล็อกการ Scroll
        }
    };

    const closeModal = () => {
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // คืนค่าการ Scroll
        }
    };

    if (images.length > 0) {
        images.forEach(img => {
            img.addEventListener('click', () => openModal(img.src));
        });
    } else {
        console.error("หา .gallery-item img ไม่เจอ!");
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") closeModal();
    });
});