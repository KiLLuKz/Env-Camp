document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null, // use viewport
        threshold: 0.2, // trigger when 20% of element is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once faded in (remove if you want re-animate)
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Select all elements to animate
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 2. Navbar Active State on Scroll (Optional polish)
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav ul li a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                let currentId = entry.target.getAttribute('id');
                navLi.forEach(link => {
                    link.style.color = 'white'; // reset
                    link.style.textShadow = 'none';
                    if(link.getAttribute('href').includes(currentId)) {
                        link.style.color = '#32ff7e'; // neon green
                        link.style.textShadow = '0 0 8px #32ff7e';
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => navObserver.observe(section));
});

/* --- เพิ่มต่อท้ายไฟล์ js/script.js --- */

// Logic สำหรับ Filter ปุ่ม
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.activity-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. ลบ class 'active' ออกจากปุ่มเดิม แล้วใส่ให้ปุ่มที่เพิ่งกด
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');

        // 2. อ่านค่าหมวดหมู่จาก text ในปุ่ม (เช่น Adventure, Science)
        const category = btn.textContent.toLowerCase();

        // 3. วนลูปเช็คการ์ดทุกใบ
        cards.forEach(card => {
            // ถ้าเลือก All หรือ หมวดหมู่ตรงกัน -> ให้แสดง
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
                // ใส่ Animation ให้ดูนุ่มนวลตอนโผล่มา
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                // ถ้าไม่ตรง -> ซ่อน
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300); // รอให้ Fade out เสร็จก่อนค่อยซ่อนพื้นที่
            }
        });
    });
});

/* --- Popup Modal Logic --- */
const modal = document.getElementById('mission-modal');
const closeBtn = document.querySelector('.close-modal');
const viewBtns = document.querySelectorAll('.neon-btn-sm'); // เลือกปุ่ม View Mission ทั้งหมด

// 1. ฟังก์ชันเปิด Popup
viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // หาตัวการ์ดแม่ (Parent) ของปุ่มที่กด
        const card = e.target.closest('.activity-item');
        
        // ดึงข้อมูลจากการ์ดนั้นๆ
        const imgSrc = card.querySelector('.card-image').style.backgroundImage.slice(5, -2); // ตัด url("...") ออก
        const title = card.querySelector('h3').innerText;
        const desc = card.querySelector('.description').innerText;
        const meta = card.querySelector('.card-meta').innerHTML; // ดึงเวลา/ประเภทมาด้วย

        // เอาข้อมูลไปใส่ใน Modal HTML
        document.getElementById('modal-img').src = imgSrc;
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-desc').innerText = desc + " \n\n(รายละเอียดเพิ่มเติม: กิจกรรมนี้เน้นการปฏิบัติจริง ผู้เข้าร่วมจะได้รับอุปกรณ์ครบชุด และมีวิทยากรคอยดูแลตลอดระยะเวลา)"; // (ผมแถม Text หลอกๆ เพิ่มให้ดูยาวขึ้น)
        
        // โชว์ Modal
        modal.classList.add('active');
    });
});

// 2. ฟังก์ชันปิด Modal (กดกากบาท)
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// 3. ฟังก์ชันปิด Modal (กดปุ่ม Close ด้านล่างที่เราสร้างเพิ่ม)
function closeModal() {
    modal.classList.remove('active');
}

// 4. ปิดเมื่อกดพื้นที่ว่างๆ รอบนอก
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.classList.remove('active');
    }
});