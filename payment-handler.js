// إدارة بوابات الدفع - MFM Donuts
// ========================================

// إعدادات الدفع الافتراضية
let paymentSettings = {
    cash: { enabled: true, fee: 0 },
    fawry: { enabled: false, fee: 0 },
    telda: { enabled: false, fee: 0 },
    vodafone: { enabled: false, fee: 0 }
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

// تحديث طرق الدفع المتاحة في الواجهة
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
    
    // التأكد من وجود طريقة دفع مفعلة
    ensureActivePaymentMethod();
}

// التأكد من وجود طريقة دفع مفعلة
function ensureActivePaymentMethod() {
    const activeMethod = document.querySelector('input[name="payment-method"]:checked');
    const visibleMethods = document.querySelectorAll('.payment-method[style*="block"], .payment-method:not([style*="none"])');
    
    if (!activeMethod && visibleMethods.length > 0) {
        const firstVisibleInput = visibleMethods[0].querySelector('input[type="radio"]');
        if (firstVisibleInput) {
            firstVisibleInput.checked = true;
            handlePaymentMethodChange(firstVisibleInput.value);
        }
    }
}

// التعامل مع تغيير طريقة الدفع
function handlePaymentMethodChange(method) {
    const paymentDetails = document.getElementById('payment-details');
    const fawryDetails = document.getElementById('fawry-details');
    const teldaDetails = document.getElementById('telda-details');
    const vodafoneDetails = document.getElementById('vodafone-details');
    
    // إخفاء جميع التفاصيل
    if (paymentDetails) {
        paymentDetails.style.display = 'none';
        if (fawryDetails) fawryDetails.style.display = 'none';
        if (teldaDetails) teldaDetails.style.display = 'none';
        if (vodafoneDetails) vodafoneDetails.style.display = 'none';
    }
    
    // عرض التفاصيل المناسبة
    if (method === 'fawry' && fawryDetails) {
        paymentDetails.style.display = 'block';
        fawryDetails.style.display = 'block';
    } else if (method === 'telda' && teldaDetails) {
        paymentDetails.style.display = 'block';
        teldaDetails.style.display = 'block';
    } else if (method === 'vodafone' && vodafoneDetails) {
        paymentDetails.style.display = 'block';
        vodafoneDetails.style.display = 'block';
    }
    
    // تحديث المجموع
    updateTotalDisplay();
}

// حساب المجموع مع رسوم الدفع
function calculateTotalWithFees() {
    const baseTotal = calculateTotal();
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || 'cash';
    const paymentFee = paymentSettings[paymentMethod]?.fee || 0;
    
    return baseTotal + paymentFee;
}

// تحديث عرض المجموع
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

// إضافة طريقة الدفع لبيانات الطلب
function addPaymentDataToOrder(orderData) {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || 'cash';
    const paymentFee = paymentSettings[paymentMethod]?.fee || 0;
    
    return {
        ...orderData,
        paymentMethod: paymentMethod,
        paymentFee: paymentFee,
        totalWithFees: calculateTotalWithFees()
    };
}

// معالجة الدفع حسب النوع
async function processPayment(orderData) {
    const { paymentMethod } = orderData;
    
    switch (paymentMethod) {
        case 'cash':
            return processCashPayment(orderData);
        case 'fawry':
            return processFawryPayment(orderData);
        case 'telda':
            return processTeldaPayment(orderData);
        case 'vodafone':
            return processVodafonePayment(orderData);
        default:
            return processCashPayment(orderData);
    }
}

// معالجة الدفع عند الاستلام
function processCashPayment(orderData) {
    return {
        success: true,
        message: 'سيتم الدفع عند الاستلام',
        paymentStatus: 'pending'
    };
}

// معالجة الدفع بفوري
function processFawryPayment(orderData) {
    // هنا يمكن إضافة تكامل مع API فوري
    const fawryCode = generateFawryCode();
    
    return {
        success: true,
        message: `كود الدفع بفوري: ${fawryCode}`,
        paymentStatus: 'pending',
        fawryCode: fawryCode
    };
}

// معالجة الدفع بتيلدا
function processTeldaPayment(orderData) {
    // هنا يمكن إضافة تكامل مع API تيلدا
    const paymentLink = generateTeldaLink(orderData);
    
    return {
        success: true,
        message: 'سيتم إرسال رابط الدفع عبر الواتساب',
        paymentStatus: 'pending',
        paymentLink: paymentLink
    };
}

// معالجة الدفع بفودافون كاش
function processVodafonePayment(orderData) {
    // هنا يمكن إضافة تكامل مع API فودافون كاش
    const paymentCode = generateVodafoneCode();
    
    return {
        success: true,
        message: `كود الدفع بفودافون كاش: ${paymentCode}`,
        paymentStatus: 'pending',
        vodafoneCode: paymentCode
    };
}

// توليد كود فوري
function generateFawryCode() {
    return 'FWR' + Date.now().toString().slice(-6);
}

// توليد رابط تيلدا
function generateTeldaLink(orderData) {
    // هذا مثال - يجب استبداله بالتكامل الحقيقي
    return `https://telda.com/pay/${Date.now()}`;
}

// توليد كود فودافون كاش
function generateVodafoneCode() {
    return 'VF' + Date.now().toString().slice(-6);
}

// تهيئة معالج الدفع
function initializePaymentHandler() {
    // تحميل إعدادات الدفع
    loadPaymentSettings();
    
    // إضافة مستمعي الأحداث
    document.addEventListener('change', function(e) {
        if (e.target.name === 'payment-method') {
            handlePaymentMethodChange(e.target.value);
        }
    });
    
    // تحديث المجموع عند تغيير السلة
    document.addEventListener('cartUpdated', function() {
        updateTotalDisplay();
    });
}

// تشغيل المعالج عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePaymentHandler);
} else {
    initializePaymentHandler();
}

// تصدير الدوال للاستخدام العام
window.paymentHandler = {
    loadPaymentSettings,
    updatePaymentMethods,
    handlePaymentMethodChange,
    calculateTotalWithFees,
    updateTotalDisplay,
    addPaymentDataToOrder,
    processPayment
};
