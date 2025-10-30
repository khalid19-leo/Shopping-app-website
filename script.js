// 📜 ملف JavaScript الرئيسي
// 🚀 يحتوي على جميع الوظائف المطلوبة

// 🍔 قائمة الموبايل المتحركة
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');
    
    if (menuToggle && nav) {
        // فتح/إغلاق القائمة
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // إغلاق القائمة عند النقر على رابط
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// 🎯 أنيميشن ظهور العناصر عند التمرير
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // مراقبة جميع العناصر التي لها أنيميشن
    const animatedElements = document.querySelectorAll([
        '.hero',
        '.about-cards',
        '.features',
        '.how-it-works', 
        '.testimonials',
        '.footer',
        '.card',
        '.feature-card',
        '.step-card',
        '.testimonial-card',
        '.footer-section',
        '.stat-item'
    ].join(','));
    
    animatedElements.forEach(el => {
        // إيقاف الأنيميشن مؤقتاً حتى يظهر العنصر
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// 🔢 عدادات متحركة
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 ثانية
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                if (target === 4.8) {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target === 4.8) {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = target.toLocaleString();
                }
                counter.classList.add('animated');
            }
        };
        
        // بدء العد عندما يكون العنصر في منطقة الرؤية
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// 🎨 تأثيرات Hover للكروت
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card, .feature-card, .step-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
        });
    });
}

// 📧 التحقق من نموذج الإيميل
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // هنا يمكنك إضافة كود إرسال الإيميل
                showNotification('تم الاشتراك بنجاح! شكراً لك.', 'success');
                emailInput.value = '';
            } else {
                showNotification('يرجى إدخال بريد إلكتروني صحيح.', 'error');
            }
        });
    }
}

// ✅ التحقق من صحة الإيميل
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 🔔 إشعارات
function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // إضافة الأنيميشن
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // إغلاق الإشعار
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // إغلاق تلقائي بعد 5 ثواني
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// 🎯 التنقل السلس
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // تعويض الهيدر الثابت
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 📱 كشف نوع الجهاز
function detectDeviceType() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
    } else {
        document.body.classList.add('desktop-device');
    }
}

// 🔄 إعادة تحميل الصور عند الخطأ
function initImageErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = '/placeholder-image.jpg'; // صورة بديلة
            this.alt = 'الصورة غير متوفرة';
        });
    });
}

// 🎮 تهيئة جميع الوظائف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 تهيئة التطبيق...');
    
    // تشغيل جميع الوظائف
    initMobileMenu();
    initScrollAnimations();
    animateCounters();
    initCardHoverEffects();
    initNewsletterForm();
    initSmoothScrolling();
    detectDeviceType();
    initImageErrorHandling();
    
    console.log('✅ تم تحميل التطبيق بنجاح!');
});

// 📈 تتبع أحداث الموقع
function trackUserInteractions() {
    // تتبع النقر على أزرار التحميل
    const downloadButtons = document.querySelectorAll('.btn-main, .store-btn');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('📥 تم النقر على زر التحميل:', this.textContent.trim());
            // هنا يمكنك إضافة Google Analytics أو أي خدمة تتبع
        });
    });
    
    // تتبع النقر على روابط وسائل التواصل
    const socialLinks = document.querySelectorAll('.social-icon');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.getAttribute('aria-label') || 'وسائل التواصل';
            console.log('📱 تم النقر على:', platform);
        });
    });
}

// 🎵 تأثيرات صوتية (اختياري)
function initSoundEffects() {
    const buttons = document.querySelectorAll('button, .store-btn, .nav a');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            // يمكنك إضافة أصوات هنا إذا أردت
            // const clickSound = new Audio('/click-sound.mp3');
            // clickSound.play().catch(() => {}); // تجاهل الأخطاء
        });
    });
}

// 🌙 دعم الوضع الداكن (اختياري)
function initDarkModeSupport() {
    // كشف تفضيلات المستخدم للوضع الداكن
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
    
    // الاستماع لتغيرات الوضع
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
}

// 🛠️ وظائف مساعدة إضافية
const utils = {
    // إضافة تأثير اهتزاز للعناصر
    shakeElement: function(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    },
    
    // نسخ النص إلى الحافظة
    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('تم نسخ النص!', 'success');
        }).catch(() => {
            showNotification('تعذر نسخ النص', 'error');
        });
    },
    
    // تنسيق الأرقام
    formatNumber: function(num) {
        return new Intl.NumberFormat('ar-EG').format(num);
    }
};

// 🎪 إضافة أنيميشن الاهتزاز إلى CSS
const shakeAnimation = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
`;

// إضافة الأنيميشن إلى الـ CSS
const style = document.createElement('style');
style.textContent = shakeAnimation;
document.head.appendChild(style);

// تشغيل وظائف إضافية عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    trackUserInteractions();
    initSoundEffects();
    initDarkModeSupport();
});

// 📱 تحسينات للأجهزة المحمولة
window.addEventListener('load', function() {
    // منع zoom على المدخلات في iOS
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.fontSize = '16px'; // منع zoom في iOS
        });
    });
});

// 🎯 تحسينات الأداء
window.addEventListener('beforeunload', function() {
    // تنظيف الذاكرة قبل مغادرة الصفحة
    if (window.performance && window.performance.clearResourceTimings) {
        window.performance.clearResourceTimings();
    }
});