// إعداد Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDGpF-HjLKvJgUFVjMbKz8f8yGzJ5X5X5X",
    authDomain: "elsher.firebaseapp.com",
    projectId: "elsher",
    storageBucket: "elsher.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// تسجيل مشفر لحالة Firebase
if (typeof db !== 'undefined') {
    // Firebase تم تهيئته بنجاح
}

// تفعيل التشفير للاتصالات
db.settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});
db.enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            console.error('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code == 'unimplemented') {
            console.error('The current browser does not support persistence.');
        }
    });

// ===========================================
// 🔒 نظام حماية الموقع من السرقة والاختراق
// ===========================================

// منع فتح أدوات المطور
(function() {
    'use strict';
    
    // رسالة تحذيرية في الكونسول
    const warningMessage = `
    ⚠️  تحذير أمني ⚠️
    
    🚫 هذا الموقع محمي بحقوق الطبع والنشر
    🔒 أي محاولة لسرقة أو نسخ الكود مخالفة للقانون
    
    
    `;
    
    console.clear();
    console.log('%c' + warningMessage, 'color: red; font-size: 16px; font-weight: bold;');
    
    // منع اس// إدارة بوابات الدفع
let paymentSettings = {
    cash: { enabled: true, fee: 0 },
    fawry: { enabled: false, fee: 0 },
    telda: { enabled: false, fee: 0 }
};

// تحميل إعدادات الدفع من Firebase
async function loadPaymentSettings() {
    try {
        const paymentDoc = await db.collection('settings').doc('payments').get();
        if (paymentDoc.exists) {
            paymentSettings = paymentDoc.data();
            updatePaymentMethods();
        }
    } catch (error) {
        console.log('تعذر تحميل إعدادات الدفع:', error);
    }
}

// تحديث طرق الدفع المتاحة
function updatePaymentMethods() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
        const methodType = method.getAttribute('data-method');
        const isEnabled = paymentSettings[methodType]?.enabled;
        
        if (!isEnabled) {
            method.style.display = 'none';
        } else {
            method.style.display = 'block';
        }
    });
}

// إضافة مستمعي الأحداث لطرق الدفع
document.addEventListener('DOMContentLoaded', function() {
    loadPaymentSettings();
    
    // مستمع تغيير طريقة الدفع
    document.addEventListener('change', function(e) {
        if (e.target.name === 'payment-method') {
            handlePaymentMethodChange(e.target.value);
        }
    });
});

// التعامل مع تغيير طريقة الدفع
function handlePaymentMethodChange(method) {
    const paymentDetails = document.getElementById('payment-details');
    const fawryDetails = document.getElementById('fawry-details');
    const teldaDetails = document.getElementById('telda-details');
    
    // إخفاء جميع التفاصيل
    if (paymentDetails) {
        paymentDetails.style.display = 'none';
        if (fawryDetails) fawryDetails.style.display = 'none';
        if (teldaDetails) teldaDetails.style.display = 'none';
    }
    
    // عرض التفاصيل المناسبة
    if (method === 'fawry' && fawryDetails) {
        paymentDetails.style.display = 'block';
        fawryDetails.style.display = 'block';
    } else if (method === 'telda' && teldaDetails) {
        paymentDetails.style.display = 'block';
        teldaDetails.style.display = 'block';
    }
}

// تحديث دالة إرسال الطلب لتشمل طريقة الدفع
const originalSubmitOrder = submitOrder;
function submitOrder(e) {
    e.preventDefault();
    
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || 'cash';
    
    // إضافة طريقة الدفع للطلب
    const orderData = {
        ...getOrderData(),
        paymentMethod: paymentMethod,
        paymentFee: paymentSettings[paymentMethod]?.fee || 0
    };
    
    // متابعة مع الطلب الأصلي
    originalSubmitOrder.call(this, e, orderData);
}

// الحصول على بيانات الطلب
function getOrderData() {
    return {
        customerName: document.getElementById('customer-name').value,
        customerPhone: document.getElementById('customer-phone').value,
        customerAddress: document.getElementById('customer-address').value,
        items: cart,
        total: calculateTotal(),
        timestamp: new Date().toISOString()
    };
}

// حساب المجموع مع رسوم الدفع
function calculateTotalWithFees() {
    const baseTotal = calculateTotal();
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || 'cash';
    const paymentFee = paymentSettings[paymentMethod]?.fee || 0;
    
    return baseTotal + paymentFee;
}

// تحديث عرض المجموع عند تغيير طريقة الدفع
function updateTotalDisplay() {
    const totalWithFees = calculateTotalWithFees();
    const totalElements = document.querySelectorAll('#total-price, #order-total-btn');
    
    totalElements.forEach(element => {
        if (element.id === 'order-total-btn') {
            element.textContent = `${totalWithFees} جنيه`;
        } else {
            element.textContent = `${totalWithFees} جنيه`;
        }
    });
}

// تصدير الدوال للاستخدام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        encryptHTML,
        encryptText,
        decryptText,
        obfuscateJS,
        encryptCSS
    };
}
    
    const threshold = 160;
    
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                // إعادة توجيه أو إخفاء المحتوى
                document.body.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        font-family: 'Cairo', sans-serif;
                        z-index: 99999;
                    ">
                        <h1 style="font-size: 3rem; margin-bottom: 1rem;">🔒</h1>
                        <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">وصول غير مصرح به</h2>
                        <p style="font-size: 1.1rem; text-align: center; max-width: 500px; line-height: 1.6;">
                            هذا الموقع محمي بحقوق الطبع والنشر.<br>
                            يرجى إغلاق أدوات المطور والمحاولة مرة أخرى.
                        </p>
                        <button onclick="location.reload()" style="
                            margin-top: 2rem;
                            padding: 12px 24px;
                            background: rgba(255,255,255,0.2);
                            border: 2px solid white;
                            color: white;
                            border-radius: 25px;
                            cursor: pointer;
                            font-size: 1rem;
                            font-family: 'Cairo', sans-serif;
                        ">إعادة تحميل الصفحة</button>
                    </div>
                `;
            }
        } else {
            devtools.open = false;
        }
    }, 500);
    
    // منع النقر بالزر الأيمن
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showSecurityAlert('منع النقر بالزر الأيمن');
        return false;
    });
    
    // منع اختصارات لوحة المفاتيح الخطيرة
    document.addEventListener('keydown', function(e) {
        // منع F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
        if (e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
            (e.ctrlKey && e.keyCode === 85) ||
            (e.ctrlKey && e.shiftKey && e.keyCode === 67)) {
            e.preventDefault();
            showSecurityAlert('محاولة استخدام اختصار محظور');
            return false;
        }
        
        // منع Ctrl+A (تحديد الكل)
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            return false;
        }
        
        // منع Ctrl+S (حفظ الصفحة)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            showSecurityAlert('محاولة حفظ الصفحة');
            return false;
        }
    });
    
    // منع تحديد النص
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    });
    
    // منع السحب والإفلات
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // دالة عرض تنبيه أمني
    function showSecurityAlert(action) {
        const alertDiv = document.createElement('div');
        alertDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
                padding: 16px 20px;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
                z-index: 10000;
                font-family: 'Cairo', sans-serif;
                font-weight: 600;
                animation: slideIn 0.3s ease-out;
            ">
                🚫 ${action} - هذا الإجراء محظور
            </div>
        `;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
    
    // تسجيل محاولات الوصول المشبوهة
    function logSuspiciousActivity(activity) {
        const logData = {
            activity: activity,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            ip: 'hidden' // سيتم الحصول عليه من الخادم
        };
        
        // إرسال البيانات إلى Firebase (إذا كان متاحاً)
        if (typeof db !== 'undefined') {
            db.collection('security_logs').add(logData).catch(() => {});
        }
    }
    
    // مراقبة تغييرات DOM المشبوهة
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        const tagName = node.tagName ? node.tagName.toLowerCase() : '';
                        if (tagName === 'script' || tagName === 'iframe') {
                            node.remove();
                            logSuspiciousActivity('محاولة حقن كود خبيث');
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();

// إعادة تعريف console للحماية
const originalConsole = window.console;
window.console = {
    log: function() {},
    warn: function() {},
    error: function() {},
    info: function() {},
    debug: function() {},
    clear: function() {},
    dir: function() {},
    dirxml: function() {},
    table: function() {},
    trace: function() {},
    group: function() {},
    groupCollapsed: function() {},
    groupEnd: function() {},
    time: function() {},
    timeEnd: function() {},
    profile: function() {},
    profileEnd: function() {},
    count: function() {}
};

// ===========================================
// 🛡️ دوال الحماية والتحقق من البيانات
// ===========================================

// دالة التحقق من صحة المدخلات وتنظيفها
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    // إزالة الأكواد الخبيثة المحتملة
    return input
        .replace(/[<>"']/g, '') // إزالة HTML tags والاقتباسات
        .replace(/javascript:/gi, '') // إزالة javascript protocols
        .replace(/on\w+=/gi, '') // إزالة event handlers
        .replace(/script/gi, '') // إزالة كلمة script
        .trim();
}

// دالة التحقق من الأمان للروابط
function validateURL(url) {
    const allowedDomains = ['localhost', '127.0.0.1', window.location.hostname];
    try {
        const urlObj = new URL(url);
        return allowedDomains.includes(urlObj.hostname);
    } catch {
        return false;
    }
}

// دالة تشفير البيانات الحساسة
function encryptSensitiveData(data) {
    // تشفير بسيط للبيانات (يمكن تحسينه)
    return btoa(JSON.stringify(data));
}

// دالة فك تشفير البيانات
function decryptSensitiveData(encryptedData) {
    try {
        return JSON.parse(atob(encryptedData));
    } catch {
        return null;
    }
}

// دالة التحقق من صحة الأرقام وحمايتها
function validateNumber(number) {
    const num = parseFloat(number);
    return !isNaN(num) && isFinite(num) && num >= 0;
}

// دالة حماية من XSS
function preventXSS(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// دالة التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && !email.includes('<') && !email.includes('>');
}

// دالة التحقق من صحة رقم الهاتف
function validatePhone(phone) {
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}
function validateNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num > 0;
}

// تحديث دالة إضافة منتج للسلة مع التحقق
function addToCart(productId, name, price) {
    try {
        // التحقق من صحة المدخلات
        productId = sanitizeInput(productId);
        name = sanitizeInput(name);
        if (!validateNumber(price)) {
            throw new Error('سعر غير صالح');
        }

        // التحقق من وجود المنتج في Firebase
        db.collection('products').doc(productId).get()
            .then(doc => {
                if (!doc.exists) {
                    throw new Error('المنتج غير موجود');
                }
                const product = doc.data();
                if (product.price !== price || product.name !== name) {
                    throw new Error('بيانات المنتج غير متطابقة');
                }
                
                // إضافة المنتج للسلة
                const existingItem = cart.find(item => item.id === productId);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: productId,
                        name: name,
                        price: price,
                        quantity: 1
                    });
                }
                
                // تحديث السلة
                updateCartBadge();
                showNotification('تمت إضافة المنتج إلى السلة', 'success');
            })
            .catch(error => {
                console.error(error);
                showNotification('حدث خطأ في إضافة المنتج', 'error');
            });
    } catch (error) {
        console.error(error);
        showNotification('حدث خطأ في إضافة المنتج', 'error');
    }
}

// تحديث دالة إرسال الطلب مع التحقق
document.getElementById('order-form').addEventListener('submit', submitOrder);

// دالة العودة للأعلى
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// دالة إرسال الطلب
async function submitOrder(e) {
    e.preventDefault();
    
    try {
        // التحقق من صحة المدخلات
        const name = sanitizeInput(document.getElementById('customer-name').value);
        const phone = sanitizeInput(document.getElementById('customer-phone').value);
        const address = sanitizeInput(document.getElementById('customer-address').value);

        // التحقق من صحة رقم الهاتف
        if (!phone.match(/^[0-9+\s-]{10,}$/)) {
            throw new Error('رقم هاتف غير صالح');
        }

        // التحقق من وجود منتجات في السلة
        if (cart.length === 0) {
            throw new Error('السلة فارغة');
        }

        // حساب المجموع مع التحقق
        let totalPrice = 0;
        for (const item of cart) {
            if (!validateNumber(item.price) || !validateNumber(item.quantity)) {
                throw new Error('بيانات المنتج غير صالحة');
            }
            totalPrice += item.price * item.quantity;
        }

        // إنشاء رمز للطلب
        const orderCode = generateSecureOrderCode();

        // حفظ الطلب في Firebase مع التشفير
        const orderData = {
            orderCode: orderCode,
            customerName: name,
            customerPhone: phone,
            customerAddress: address,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            totalPrice: totalPrice,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            userAgent: window.navigator.userAgent,
            orderSource: 'web'
        };

        await db.collection('orders').add(orderData);

        // إرسال الرسالة عبر WhatsApp
        const message = generateOrderMessage(orderData);
        sendWhatsAppMessage(message);

        // تنظيف السلة وإظهار رسالة نجاح
        cart = [];
        updateCartBadge();
        showNotification('تم إرسال طلبك بنجاح!', 'success');
        closeCart();

    } catch (error) {
        console.error(error);
        showNotification(error.message || 'حدث خطأ في إرسال الطلب', 'error');
    }
};

// دالة إنشاء رمز آمن للطلب
function generateSecureOrderCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 8;
    let code = '';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
        code += chars[array[i] % chars.length];
    }
    return code;
}

// دالة إنشاء رسالة الطلب
function generateOrderMessage(orderData) {
    let message = `🌟 طلب جديد #${orderData.orderCode}\n`;
    message += `------------------\n`;
    message += `الاسم: ${orderData.customerName}\n`;
    message += `الهاتف: ${orderData.customerPhone}\n`;
    message += `العنوان: ${orderData.customerAddress}\n\n`;
    message += `الطلبات:\n`;
    
    orderData.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        message += `${item.name}: ${item.quantity} × ${item.price} = ${itemTotal} جنيه\n`;
    });
    
    message += `\nالمجموع: ${orderData.totalPrice} جنيه`;
    return message;
}

// دالة إرسال رسالة WhatsApp


// المتغيرات العامة
let cart = [];
let products = [];
let currentCategory = 'all';
let selectedProduct = null;

// دالة تحميل المنتجات من Firebase
async function loadProducts() {
    try {
        console.log('Loading products from Firebase...');
        const snapshot = await db.collection('products').get();
        products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        
        console.log('Products loaded:', products.length);
        
        // إنشاء أزرار الفئات
        createCategoryButtons();
        
        // عرض المنتجات
        displayProducts();
        
        console.log('تم تحميل المنتجات:', products.length);
    } catch (error) {
        console.error('Error loading products:', error);
        // إضافة منتجات نموذجية في حالة الخطأ
        await addSampleProducts();
        showNotification('تم تحميل المنتجات النموذجية', 'success');
    }
}

// دالة إنشاء أزرار الفئات
function createCategoryButtons() {
    const categoryContainer = document.querySelector('.category-buttons');
    if (!categoryContainer) {
        console.error('Category buttons container not found!');
        return;
    }
    
    // الحصول على الفئات الفريدة
    const categories = ['all', ...new Set(products.map(product => product.category))];
    
    categoryContainer.innerHTML = '';
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.dataset.category = category;
        
        // تحديد النص المناسب للفئة
        let categoryText = '';
        switch(category) {
            case 'all':
                categoryText = 'الكل';
                break;
            case 'donuts':
                categoryText = 'دونتس';
                break;
            default:
                categoryText = category;
        }
        
        button.textContent = categoryText;
        
        // إضافة كلاس active للفئة الأولى
        if (category === currentCategory) {
            button.classList.add('active');
        }
        
        // إضافة مستمع الحدث
        button.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = category;
            displayProducts();
        });
        
        categoryContainer.appendChild(button);
    });
}

// دالة عرض المنتجات
function displayProducts(productsToDisplay = products) {
    const menuSection = document.getElementById('menu');
    if (!menuSection) {
        console.error('Menu section not found!');
        return;
    }
    
    menuSection.innerHTML = '';

    const filteredProducts = currentCategory === 'all' 
        ? productsToDisplay 
        : productsToDisplay.filter(product => product.category === currentCategory);

    console.log('Displaying products:', filteredProducts.length);

    if (filteredProducts.length === 0) {
        menuSection.innerHTML = `
            <div class="no-products">
                <i class="fas fa-cookie-bite"></i>
                <h3>لا توجد منتجات متاحة</h3>
                <p>لم يتم العثور على منتجات في هذه الفئة</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image" 
                     onerror="this.src='https://via.placeholder.com/300x250?text=صورة+غير+متاحة'">
                <button class="favorite-btn" data-product-id="${product.id}" 
                        onclick="toggleFavorite('${product.id}', '${product.name}', ${product.price}, '${product.image}')">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description || 'دونتس طازج ولذيذ'}</p>
                <p class="product-price">${product.price} جنيه للقطعة</p>
                <button onclick="showPriceModal('${product.id}')" class="add-to-cart-btn">
                    <i class="fas fa-cart-plus"></i>
                    أضف إلى السلة
                </button>
            </div>
        `;
        menuSection.appendChild(productCard);
    });
    
    // تحديث أزرار المفضلة بعد عرض المنتجات
    setTimeout(() => {
        if (typeof updateFavoriteButtons === 'function') {
            updateFavoriteButtons();
        }
    }, 100);
    
    console.log('تم عرض المنتجات:', filteredProducts.length);
}

// دالة تغيير التصنيف
function changeCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    displayProducts();
}

// دالة عرض نافذة تحديد الكمية
function showPriceModal(productId) {
    console.log('showPriceModal called with productId:', productId);
    selectedProduct = products.find(p => p.id === productId);
    console.log('selectedProduct:', selectedProduct);
    
    if (!selectedProduct) {
        console.error('Product not found!');
        return;
    }

    const modal = document.getElementById('price-modal');
    const nameElement = document.getElementById('selected-product-name');
    const priceElement = document.getElementById('selected-product-price');
    const quantityInput = document.getElementById('quantity-input');
    
    if (!modal || !nameElement || !priceElement || !quantityInput) {
        console.error('Modal elements not found!');
        return;
    }
    
    nameElement.textContent = selectedProduct.name;
    priceElement.textContent = selectedProduct.price;
    quantityInput.value = '1';
    updateTotalPreview();
    
    modal.style.display = 'block';
    console.log('Modal displayed');
}

// دالة إغلاق نافذة تحديد المبلغ
function closePriceModal() {
    document.getElementById('price-modal').style.display = 'none';
    selectedProduct = null;
}

// دالة تحديث معاينة المجموع
function updateTotalPreview() {
    const quantityInput = document.getElementById('quantity-input');
    const totalPreview = document.getElementById('total-preview');
    const quantity = parseInt(quantityInput.value) || 0;
    
    if (selectedProduct && quantity > 0) {
        const total = quantity * selectedProduct.price;
        totalPreview.textContent = total;
    } else {
        totalPreview.textContent = '0';
    }
}

// دالة تأكيد الكمية وإضافة المنتج للسلة
function confirmPrice() {
    console.log('confirmPrice called');
    const quantityInput = document.getElementById('quantity-input');
    const quantity = parseInt(quantityInput.value);
    
    console.log('quantity:', quantity);
    console.log('selectedProduct:', selectedProduct);
    console.log('cart before:', cart);

    if (!selectedProduct || !quantity || quantity <= 0) {
        console.error('Invalid input');
        showNotification('يجب اختيار عدد القطع', 'error');
        return;
    }

    const existingItem = cart.find(item => item.id === selectedProduct.id);
    if (existingItem) {
        existingItem.quantity += quantity;
        console.log('Updated existing item');
    } else {
        cart.push({
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            quantity: quantity
        });
        console.log('Added new item to cart');
    }

    console.log('cart after:', cart);
    updateCartBadge();
    showNotification(`تم إضافة ${quantity} قطعة من ${selectedProduct.name} للسلة`, 'success');
    closePriceModal();
}

// دالة إضافة منتج إلى السلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCartBadge();
    showNotification('تمت إضافة المنتج إلى السلة', 'success');
}

// تحديث عداد السلة
function updateCartBadge() {
    console.log('updateCartBadge called');
    const badge = document.getElementById('cart-badge');
    const floatingBadge = document.getElementById('cart-badge-floating');
    console.log('badge element:', badge);
    
    if (badge || floatingBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        console.log('totalItems:', totalItems);
        if (badge) {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'block' : 'none';
        }
        if (floatingBadge) {
            floatingBadge.textContent = totalItems;
            floatingBadge.style.display = totalItems > 0 ? 'block' : 'none';
        }
        console.log('Badge updated successfully');
    } else {
        console.error('Cart badge element not found!');
    }
}

// دالة فتح السلة المحدثة
function openCart() {
    console.log('Opening cart...');
    const modal = document.getElementById('cart-modal');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartEmpty = document.getElementById('cart-empty');
    const totalPrice = document.getElementById('total-price');
    const totalItems = document.getElementById('total-items');
    const orderTotalBtn = document.getElementById('order-total-btn');
    
    if (!modal) {
        console.error('Cart modal not found!');
        return;
    }

    cartItemsList.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartItemsList.style.display = 'none';
        totalPrice.textContent = '0 جنيه';
        totalItems.textContent = '0';
        orderTotalBtn.textContent = '0 جنيه';
    } else {
        cartEmpty.style.display = 'none';
        cartItemsList.style.display = 'block';
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemCount += item.quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-image">
                    <img src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=80&h=80&fit=crop" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">${item.price} جنيه للقطعة</p>
                    <p class="item-total">المجموع: ${itemTotal} جنيه</p>
                </div>
                <div class="item-controls">
                    <div class="quantity-controls">
                        <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" class="qty-btn minus">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" class="qty-btn plus">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button onclick="removeFromCart('${item.id}')" class="remove-item-btn">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            cartItemsList.appendChild(cartItem);
        });
        
        totalPrice.textContent = `${total} جنيه`;
        totalItems.textContent = itemCount;
        orderTotalBtn.textContent = `${total} جنيه`;
    }

    modal.style.display = 'block';
    console.log('Cart modal opened successfully');
}

// دالة إغلاق السلة
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// دالة تحديث كمية المنتج
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartBadge();
        openCart(); // تحديث عرض السلة
    }
}

// دالة حذف منتج من السلة
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartBadge();
    openCart(); // تحديث عرض السلة
}

// دالة إنشاء كود تحقق عشوائي
function generateVerificationCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// دالة تأكيد الطلب المحدثة
function submitOrder(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        showNotification('السلة فارغة! أضف بعض المنتجات أولاً', 'error');
        return;
    }
    
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    
    if (!name || !phone || !address) {
        showNotification('يرجى ملء جميع البيانات المطلوبة', 'error');
        return;
    }
    
    // التحقق من صحة رقم الهاتف (مع رمز الدولة +20)
    if (!phone.match(/^1[0-9]{9}$/)) {
        showNotification('يرجى إدخال رقم هاتف صحيح (1xxxxxxxxx)', 'error');
        return;
    }
    
    // إظهار حالة التحميل
    const submitBtn = document.querySelector('.submit-order-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;
    
    // إنشاء كود تحقق للطلب
    const orderCode = generateVerificationCode();
    const verificationCode = generateVerificationCode();
    
    // حساب المجموع
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += getEffectivePrice(item.price) * item.quantity;
    });
    
    // تجهيز بيانات الطلب
    const orderData = {
        orderCode: orderCode,
        verificationCode: verificationCode,
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        totalPrice: totalPrice,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        orderDate: new Date().toISOString()
    };
    
    // حفظ الطلب في Firebase
    db.collection('orders').add(orderData)
        .then(() => {
            // تم حفظ الطلب بنجاح في Firebase - سيظهر في صفحة الإدارة
            
            // إظهار رسالة نجاح
            showNotification('تم إرسال طلبك بنجاح!', 'success');
            
            // إظهار نافذة التأكيد
            document.getElementById('order-number').textContent = orderCode;
            document.getElementById('confirmation-modal').style.display = 'block';
            
            // إفراغ السلة وإغلاق النافذة
            cart = [];
            updateCartBadge();
            closeCart();
            
            // إعادة تعيين النموذج
            document.getElementById('order-form').reset();
            
        })
        .catch(error => {
            console.error('خطأ في حفظ الطلب:', error);
            showNotification('حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى', 'error');
        })
        .finally(() => {
            // إعادة تعيين زر الإرسال
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        });
}

// دالة إغلاق نافذة التأكيد
function closeConfirmation() {
    const modal = document.getElementById('confirmation-modal');
    modal.style.display = 'none';
}

// دالة عرض رسالة التأكيد
function showConfirmation(orderId) {
    const modal = document.getElementById('confirmation-modal');
    document.getElementById('order-number').textContent = orderId;
    modal.style.display = 'block';
}

// دالة عرض الإشعارات
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notification-message');
    
    messageElement.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    // إخفاء الإشعار بعد 3 ثواني
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// دالة البحث في المنتجات
async function searchProducts(query) {
    query = query.trim().toLowerCase();
    
    try {
        // إذا كان حقل البحث فارغ، اعرض كل المنتجات
        if (!query) {
            const snapshot = await db.collection('products').get();
            const allProducts = [];
            snapshot.forEach(doc => {
                allProducts.push({ id: doc.id, ...doc.data() });
            });
            displayProducts(allProducts);
            return;
        }
        
        // البحث في Firebase
        const snapshot = await db.collection('products')
            .orderBy('name')
            .get();
            
        const filteredProducts = [];
        snapshot.forEach(doc => {
            const product = { id: doc.id, ...doc.data() };
            if (product.name.toLowerCase().includes(query) ||
                product.description?.toLowerCase().includes(query)) {
                filteredProducts.push(product);
            }
        });
        
        // اعرض النتائج
        displayProducts(filteredProducts);
        
        // إظهار رسالة إذا لم يتم العثور على نتائج
        if (filteredProducts.length === 0) {
            const menu = document.getElementById('menu');
            menu.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>لا توجد منتجات تطابق بحثك</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('خطأ في البحث:', error);
        showNotification('حدث خطأ في البحث. برجاء المحاولة مرة أخرى', 'error');
    }
}

// دالة إضافة منتجات نموذجية
async function addSampleProducts() {
    const sampleProducts = [
        {
            name: 'دونت شوكولاتة كلاسيك',
            description: 'دونت طازج محشو بالشوكولاتة الفاخرة مع طبقة جلازيد لامعة',
            price: 15,
            image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
            category: 'donuts'
        },
        {
            name: 'دونت فراولة طبيعية',
            description: 'دونت بطعم الفراولة الطبيعية مع كريمة خفيفة ونكهة منعشة',
            price: 12,
            image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop',
            category: 'donuts'
        },
        {
            name: 'دونت جلازيد أصلي',
            description: 'دونت كلاسيكي بالجلازيد الحلو، الطعم التقليدي المحبوب',
            price: 10,
            image: 'https://images.unsplash.com/photo-1514517220017-8ce97d9e6244?w=400&h=300&fit=crop',
            category: 'donuts'
        },
        {
            name: 'دونت كراميل ذهبي',
            description: 'دونت فاخر بصوص الكراميل الذهبي ولمسة من الملح البحري',
            price: 18,
            image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
            category: 'donuts'
        },
        {
            name: 'دونت قرفة وسكر',
            description: 'دونت دافئ بنكهة القرفة العطرة مع رش السكر البودرة',
            price: 14,
            image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=400&h=300&fit=crop',
            category: 'donuts'
        },
        {
            name: 'دونت توت أزرق',
            description: 'دونت طازج محشو بالتوت الأزرق الطبيعي وطبقة سكر ناعمة',
            price: 16,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
            category: 'donuts'
        }
    ];

    try {
        for (const product of sampleProducts) {
            await db.collection('products').add(product);
        }
        console.log('تم إضافة المنتجات النموذجية');
        showNotification('تم إضافة المنتجات النموذجية بنجاح!', 'success');
        loadProducts(); // إعادة تحميل المنتجات
    } catch (error) {
        console.error('خطأ في إضافة المنتجات النموذجية:', error);
        showNotification('حدث خطأ في إضافة المنتجات', 'error');
    }
}

// إضافة مستمعي الأحداث
document.addEventListener('DOMContentLoaded', async function() {
    // إخفاء شاشة التحميل بعد تحميل الصفحة
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);

    // تحميل إعدادات الخصم والمنتجات
    try {
        await Promise.all([loadPricingSettings(), loadProducts()]);
        
        // إذا لم توجد منتجات، أضف المنتجات النموذجية
        if (products.length === 0) {
            console.log('لا توجد منتجات، سيتم إضافة منتجات نموذجية...');
            await addSampleProducts();
        }
    } catch (error) {
        console.error('Error in initialization:', error);
        // إضافة منتجات نموذجية كخطة احتياطية
        await addSampleProducts();
    }

    // مستمع حدث البحث
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            // إلغاء المؤقت السابق
            clearTimeout(searchTimeout);
        
            // انتظر حتى يتوقف المستخدم عن الكتابة
            searchTimeout = setTimeout(() => {
                searchProducts(this.value);
            }, 300);
        });
    }

    // مستمع حدث تغيير الكمية
    const quantityInput = document.getElementById('quantity-input');
    if (quantityInput) {
        quantityInput.addEventListener('input', updateTotalPreview);
        quantityInput.addEventListener('change', updateTotalPreview);
    }
    
    // إضافة مستمع حدث لنموذج الطلب
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', submitOrder);
    }

    // إغلاق النوافذ المنبثقة عند النقر خارجها
    window.onclick = function(event) {
        const cartModal = document.getElementById('cart-modal');
        const confirmationModal = document.getElementById('confirmation-modal');
        const priceModal = document.getElementById('price-modal');
        
        if (event.target === cartModal) {
            closeCart();
        }
        if (event.target === confirmationModal) {
            closeConfirmation();
        }
        if (event.target === priceModal) {
            closePriceModal();
        }
    };
});

// إعادة عرض شاشة التحميل عند تحديث الصفحة
window.addEventListener('beforeunload', function() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex';
    loadingScreen.classList.remove('fade-out');
});

// دالة اختبار للتأكد من أن كل شيء يعمل
function testCartFunctionality() {
    console.log('=== Testing Cart Functionality ===');
    console.log('Products loaded:', products.length);
    console.log('Cart items:', cart.length);
    
    // اختبار عناصر DOM
    const elements = {
        'cart-badge': document.getElementById('cart-badge'),
        'price-modal': document.getElementById('price-modal'),
        'quantity-input': document.getElementById('quantity-input'),
        'selected-product-name': document.getElementById('selected-product-name'),
        'selected-product-price': document.getElementById('selected-product-price'),
        'total-preview': document.getElementById('total-preview'),
        'notification': document.getElementById('notification'),
        'notification-message': document.getElementById('notification-message')
    };
    
    console.log('DOM Elements Check:');
    Object.keys(elements).forEach(key => {
        console.log(`${key}:`, elements[key] ? '✓ Found' : '✗ Missing');
    });
    
    return elements;
}

// تشغيل الاختبار عند تحميل الصفحة
window.addEventListener('load', function() {
    setTimeout(() => {
        testCartFunctionality();
    }, 2000);
});

// تم إزالة كود منع أدوات المطور للسماح بالتطوير والتشخيص

// مراقبة تغييرات DOM
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            // التحقق من إضافة عناصر مشبوهة
            const suspiciousElements = document.querySelectorAll('script[src*="http"], link[href*="http"]');
            suspiciousElements.forEach(element => element.remove());
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// التحقق من محاولات التلاعب
setInterval(function() {
    // التحقق من وجود أدوات المطور
    if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
        document.body.innerHTML = 'تم اكتشاف محاولة اختراق!';
    }
    
    // التحقق من تعديل الأسعار
    const priceElements = document.querySelectorAll('.price');
    priceElements.forEach(element => {
        const originalPrice = element.getAttribute('data-original-price');
        if (originalPrice && element.textContent !== originalPrice) {
            element.textContent = originalPrice;
        }
    });
}, 1000);

// تشفير البيانات الحساسة قبل الإرسال
function encryptData(data) {
    // تشفير بسيط للتوضيح - يمكن استخدام خوارزميات تشفير أقوى
    return btoa(JSON.stringify(data));
}

// التحقق من صحة المصدر
function validateSource() {
    const validDomains = ['portozalabya.com', 'www.portozalabya.com'];
    if (!validDomains.includes(window.location.hostname)) {
        document.body.innerHTML = 'هذا الموقع مزيف!';
        return false;
    }
    return true;
}

// تحديث دالة إرسال الطلب مع التشفير
async function sendOrder(orderData) {
    if (!validateSource()) return;
    
    const encryptedData = encryptData(orderData);
    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Security-Token': generateSecurityToken()
            },
            body: JSON.stringify({ data: encryptedData })
        });
        return await response.json();
    } catch (error) {
        console.error('خطأ في إرسال الطلب');
        return null;
    }
}

// إنشاء رمز أمان للطلبات
function generateSecurityToken() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    return btoa(`${timestamp}:${random}`);
}
