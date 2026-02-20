/* js/gallery.js */

// ใช้ฟังก์ชันนี้เพื่อให้แน่ใจว่าหน้าเว็บโหลดเสร็จก่อนค่อยเริ่มทำงาน
window.onload = function() {
    
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("fullImage");
    const closeBtn = document.querySelector(".close-modal");

    // เช็คก่อนว่ามีปุ่มปิด (close-modal) อยู่ในหน้าเว็บจริงๆ ไหม
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // ให้กลับมา scroll ได้ปกติ
        }
    } else {
        console.error("หาปุ่ม .close-modal ไม่เจอใน HTML!");
    }

    // ดึงรูปภาพทั้งหมดจากใน Gallery
    const images = document.querySelectorAll(".gallery-item img");
    
    if (images.length > 0) {
        images.forEach(img => {
            img.addEventListener('click', function() {
                if (modal && modalImg) {
                    modal.style.display = "block";
                    modalImg.src = this.src;
                    document.body.style.overflow = "hidden"; // ล็อกไม่ให้เลื่อนจอขณะดูรูป
                }
            });
        });
    } else {
        console.error("หา .gallery-item img ไม่เจอ!");
    }

    // เมื่อกดพื้นที่ว่างข้างนอกรูป ให้ปิด Modal
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
};