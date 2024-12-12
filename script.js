// DOM Elements
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const slideElements = document.querySelectorAll('.slide-left, .slide-right, .slide-up');

// Custom cursor with gradient trail
document.addEventListener('DOMContentLoaded', () => {
    // إضافة حاوية الدخان
    const perfumeContainer = document.querySelector('.perfume-container');
    const smokeContainer = document.createElement('div');
    smokeContainer.className = 'smoke-container';
    perfumeContainer.appendChild(smokeContainer);

    // دالة إنشاء الدخان
    function createSmoke() {
        const smoke = document.createElement('div');
        smoke.className = 'smoke';
        
        // تعيين موقع عشوائي للدخان
        const randomX = Math.random() * 100 - 50; // -50 to 50
        smoke.style.left = `calc(50% + ${randomX}px)`;
        
        // تعيين مدة عشوائية للحركة
        const duration = 5 + Math.random() * 2; // 5-7 seconds
        smoke.style.setProperty('--duration', `${duration}s`);
        
        // تعيين اتجاه عشوائي للرياح
        const wind = (Math.random() - 0.5) * 200; // -100 to 100
        smoke.style.setProperty('--wind', `${wind}px`);
        
        // تعيين انتشار عشوائي
        const spreadX = (Math.random() - 0.5) * 100;
        const spreadY = Math.random() * -40;
        smoke.style.setProperty('--spread-x', `${spreadX}px`);
        smoke.style.setProperty('--spread-y', `${spreadY}px`);
        
        smokeContainer.appendChild(smoke);
        
        // إزالة عنصر الدخان بعد انتهاء الحركة
        setTimeout(() => {
            smoke.remove();
        }, duration * 1000);
    }

    // إنشاء دخان جديد كل 200 مللي ثانية
    setInterval(createSmoke, 200);

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 100);
    });

    // إضافة تأثير البريق
    const sparklesContainer = document.querySelector('.sparkles');
    const createSparkles = () => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparklesContainer.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 3000);
    };
    
    setInterval(createSparkles, 200);

    // إضافة شعاع الضوء
    const lightBeam = document.createElement('div');
    lightBeam.className = 'light-beam';
    perfumeContainer.appendChild(lightBeam);

    // إضافة الجزيئات المتحركة
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        particle.style.animation = `particleFloat ${2 + Math.random() * 2}s linear forwards`;
        
        perfumeContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 4000);
    };

    setInterval(createParticle, 100);

    // Particles Effect
    function createParticles() {
        const particles = document.querySelector('.particles');
        const numberOfParticles = 50;
        
        for (let i = 0; i < numberOfParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation delay
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particles.appendChild(particle);
        }
    }

    createParticles();

    // تأثير حركة العطر مع الماوس
    const productImage = document.querySelector('.product-image');
    
    perfumeContainer.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = perfumeContainer.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(productImage, {
            rotationY: x * 20,
            rotationX: -y * 20,
            x: x * 30,
            y: y * 30,
            duration: 0.5,
            ease: "power2.out"
        });

        // تحريك الدخان مع حركة العطر
        gsap.to(smokeContainer, {
            x: x * 50,
            duration: 1,
            ease: "power1.out"
        });
    });

    perfumeContainer.addEventListener('mouseleave', () => {
        gsap.to(productImage, {
            rotationY: 0,
            rotationX: 0,
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        });

        gsap.to(smokeContainer, {
            x: 0,
            duration: 1,
            ease: "power1.out"
        });
    });

    // تأثيرات الظهور عند السكرول
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.slide-up, .slide-left, .slide-right').forEach(el => {
        observer.observe(el);
    });

    // إضافة تأثير الظهور عند التمرير
    const observerOptions2 = {
        threshold: 0.2
    };

    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('section-title')) {
                    startTitleAnimation(entry.target);
                }
            }
        });
    }, observerOptions2);

    // مراقبة العناصر
    document.querySelectorAll('.section-title, .fade-in').forEach(el => {
        observer2.observe(el);
    });

    // تأثير حركة العنوان
    function startTitleAnimation(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    // تأثيرات الـ header
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // إضافة خلفية عند التمرير
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // إخفاء/إظهار الـ header عند التمرير
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('header-hidden');
            header.classList.remove('header-visible');
        } else {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
        }
        
        lastScroll = currentScroll;
    });

    // تأثير النقر على الروابط
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Smooth scroll with GSAP
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: "power2.inOut"
            });
        });
    });

    // Initialize effects
    window.addEventListener('scroll', () => {
        const slideElements = document.querySelectorAll('.slide-left, .slide-right, .slide-up');
        slideElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.8;

            if (elementTop < triggerPoint) {
                element.classList.add('slide-active');
            }
        });
    });
    window.addEventListener('load', () => {
        const slideElements = document.querySelectorAll('.slide-left, .slide-right, .slide-up');
        slideElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.8;

            if (elementTop < triggerPoint) {
                element.classList.add('slide-active');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showFormMessage('الرجاء تعبئة جميع الحقول', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('الرجاء إدخال بريد إلكتروني صحيح', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        
        setTimeout(() => {
            showFormMessage('تم إرسال رسالتك بنجاح!', 'success');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>إرسال</span><i class="fas fa-paper-plane"></i>';
        }, 2000);
    });

    function showFormMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        const form = document.querySelector('.contact-form');
        form.insertBefore(messageDiv, form.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Add floating label effect
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(element => {
        element.addEventListener('focus', () => {
            element.parentElement.classList.add('focused');
        });
        
        element.addEventListener('blur', () => {
            if (!element.value) {
                element.parentElement.classList.remove('focused');
            }
        });
    });

    // Initialize Gmail.js
    const gmailClient = Gmail();

    // Checkout Form Handling
    const checkoutForm = document.getElementById('checkoutForm');
    const quantityInput = document.getElementById('quantity');
    const totalPriceElement = document.getElementById('totalPrice');
    const PRICE_PER_ITEM = 45;

    // Quantity Control
    function updateQuantity(action) {
        const quantityInput = document.getElementById('quantity');
        let currentValue = parseInt(quantityInput.value);
        
        if (action === 'increase') {
            quantityInput.value = currentValue + 1;
        } else if (action === 'decrease' && currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
        
        updateTotalPrice();
        
        // Add button press animation
        const button = event.currentTarget;
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    }

    // Update total price when quantity changes
    quantityInput.addEventListener('input', updateTotalPrice);

    function updateTotalPrice() {
        const quantity = parseInt(quantityInput.value) || 0;
        const total = quantity * PRICE_PER_ITEM;
        totalPriceElement.textContent = `${total} OMR`;
    }

    // Smooth scroll to checkout section
    function scrollToCheckout() {
        const checkoutSection = document.getElementById('checkout');
        checkoutSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const customerName = document.getElementById('customerName').value;
        const customerEmail = document.getElementById('customerEmail').value;
        const customerPhone = document.getElementById('customerPhone').value;
        const quantity = document.getElementById('quantity').value;
        const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
        const shippingCompany = document.getElementById('shippingCompany').value;
        
        // Create email content
        const emailContent = `
            طلب جديد:
            ===========
            الاسم: ${customerName}
            البريد الإلكتروني: ${customerEmail}
            رقم الهاتف: ${customerPhone}
            الكمية: ${quantity}
            نوع التوصيل: ${deliveryType === 'home' ? 'توصيل للمنزل' : 'توصيل للمكتب'}
            شركة التوصيل: ${shippingCompany}
        `;
        
        try {
            // Send email using Gmail.js
            await gmailClient.send({
                to: 'your-email@gmail.com', // قم بتغيير هذا إلى بريدك الإلكتروني
                subject: 'طلب جديد - AC DELA Rose',
                message: emailContent
            });
            
            // Show success message
            alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
            this.reset();
        } catch (error) {
            console.error('Error sending email:', error);
            alert('عذراً، حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى.');
        }
    });

    // معالجة تقديم النموذج
    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // جمع بيانات النموذج
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            quantity: document.getElementById('quantity').value,
            totalPrice: (parseFloat(document.getElementById('quantity').value) * 299).toFixed(2),
            deliveryType: document.querySelector('input[name="deliveryType"]:checked').value,
            shippingCompany: document.getElementById('shippingCompany').value,
            address: {
                city: document.getElementById('city').value,
                area: document.getElementById('area').value,
                street: document.getElementById('street').value,
                building: document.getElementById('building').value,
                details: document.getElementById('addressDetails').value
            }
        };

        // إنشاء محتوى البريد الإلكتروني
        const emailContent = `
            طلب جديد من موقع AC DELA Rose
            
            معلومات العميل:
            الاسم: ${formData.name}
            البريد الإلكتروني: ${formData.email}
            رقم الهاتف: ${formData.phone}
            
            تفاصيل الطلب:
            الكمية: ${formData.quantity}
            السعر الإجمالي: ${formData.totalPrice} ريال
            
            معلومات التوصيل:
            نوع التوصيل: ${formData.deliveryType === 'home' ? 'توصيل للمنزل' : 'توصيل للمكتب'}
            شركة الشحن: ${formData.shippingCompany}
            
            العنوان:
            المدينة: ${formData.address.city}
            المنطقة: ${formData.address.area}
            الشارع: ${formData.address.street}
            رقم المبنى: ${formData.address.building}
            تفاصيل إضافية: ${formData.address.details}
        `;

        // إرسال البريد الإلكتروني باستخدام EmailJS
        emailjs.send('service_lz1xy6q2', 'template_default', {
            to_email: 'izzkaled@gmail.com',
            from_name: formData.name,
            message: emailContent,
            reply_to: formData.email
        })
        .then(function(response) {
            showNotification('success', 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
            document.getElementById('orderForm').reset();
        })
        .catch(function(error) {
            showNotification('error', 'عذراً، حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
            console.error('خطأ في إرسال البريد:', error);
        });
    });

    // عرض الإشعارات
    function showNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // تحريك الإشعار للأعلى
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // إخفاء الإشعار بعد 5 ثواني
        setTimeout(() => {
            notification.style.transform = 'translateY(-100%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // تحديث أسعار التوصيل والمجموع النهائي
    function updatePrices() {
        const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
        const selectedShipping = document.querySelector('input[name="shippingCompany"]:checked');
        const pointsInput = document.querySelector('.points-input');
        const perfumeQuantity = pointsInput ? parseInt(pointsInput.value) || 0 : 0;
        
        // سعر العطر الواحد
        const perfumePrice = 10;
        
        // حساب سعر العطور
        const totalPerfumePrice = perfumePrice * perfumeQuantity;
        
        // رسوم التوصيل الأساسية
        const baseDeliveryFee = deliveryType === 'home' ? 2 : 1;
        
        // رسوم شركة التوصيل
        let shippingFee = 0;
        if (selectedShipping) {
            const companyValue = selectedShipping.value;
            const baseShippingPrices = {
                jeenakum: 3,
                dalili: 5,
                wasali: 2
            };
            shippingFee = baseShippingPrices[companyValue];
        }
        
        // إجمالي رسوم التوصيل
        const totalDeliveryFee = baseDeliveryFee + shippingFee;
        
        // المجموع النهائي
        const finalTotal = totalPerfumePrice + totalDeliveryFee;
        
        // تحديث العناصر في الصفحة
        document.getElementById('perfumePrice').textContent = `${totalPerfumePrice} OMR`;
        document.getElementById('deliveryPrice').textContent = `${totalDeliveryFee} OMR`;
        document.getElementById('totalPrice').textContent = `${finalTotal} OMR`;
        
        // تحديث أسعار شركات التوصيل في العرض
        updateShippingDisplay(baseDeliveryFee);
    }

    // تحديث عرض أسعار شركات التوصيل
    function updateShippingDisplay(deliveryFee) {
        const baseShippingPrices = {
            jeenakum: 3,
            dalili: 5,
            wasali: 2
        };
        
        const shippingOptions = document.querySelectorAll('.shipping-option');
        shippingOptions.forEach(option => {
            const companyValue = option.querySelector('input[type="radio"]').value;
            const priceElement = option.querySelector('.company-price');
            const totalPrice = baseShippingPrices[companyValue] + deliveryFee;
            priceElement.textContent = `${totalPrice} OMR`;
        });
    }

    // إضافة مستمعي الأحداث للتوصيل
    document.querySelectorAll('input[name="deliveryType"]').forEach(radio => {
        radio.addEventListener('change', updatePrices);
    });

    document.querySelectorAll('input[name="shippingCompany"]').forEach(radio => {
        radio.addEventListener('change', updatePrices);
    });

    // إضافة مستمع الحدث لحقل النقاط
    document.addEventListener('DOMContentLoaded', () => {
        const pointsInput = document.querySelector('.points-input');
        if (pointsInput) {
            pointsInput.addEventListener('input', updatePrices);
            pointsInput.addEventListener('change', updatePrices);
        }
        
        // تحديث الأسعار عند تحميل الصفحة
        updatePrices();
    });

    // Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
});
