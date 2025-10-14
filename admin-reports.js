// ===== صفحة التقارير والإحصائيات =====

// عرض لوحة القيادة
function showDashboard() {
    const container = document.getElementById('content-container');
    container.innerHTML = `
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h2><i class="fas fa-tachometer-alt"></i> لوحة القيادة</h2>
                <div class="dashboard-actions">
                    <button class="btn-primary" onclick="refreshDashboard()">
                        <i class="fas fa-sync-alt"></i> تحديث
                    </button>
                    <button class="btn-secondary" onclick="exportDashboard()">
                        <i class="fas fa-download"></i> تصدير
                    </button>
                </div>
            </div>
            
            <!-- الإحصائيات السريعة -->
            <div class="stats-grid">
                <div class="stat-card orders-stat">
                    <div class="stat-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="stat-content">
                        <h3 id="total-orders">0</h3>
                        <p>إجمالي الطلبات</p>
                        <span class="stat-change positive" id="orders-change">+12%</span>
                    </div>
                </div>
                
                <div class="stat-card revenue-stat">
                    <div class="stat-icon">
                        <i class="fas fa-money-bill-wave"></i>
                    </div>
                    <div class="stat-content">
                        <h3 id="total-revenue">0 جنيه</h3>
                        <p>إجمالي المبيعات</p>
                        <span class="stat-change positive" id="revenue-change">+8%</span>
                    </div>
                </div>
                
                <div class="stat-card products-stat">
                    <div class="stat-icon">
                        <i class="fas fa-cookie-bite"></i>
                    </div>
                    <div class="stat-content">
                        <h3 id="total-products">0</h3>
                        <p>عدد المنتجات</p>
                        <span class="stat-change neutral" id="products-change">--</span>
                    </div>
                </div>
                
                <div class="stat-card customers-stat">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-content">
                        <h3 id="total-customers">0</h3>
                        <p>عدد العملاء</p>
                        <span class="stat-change positive" id="customers-change">+5%</span>
                    </div>
                </div>
            </div>
            
            <!-- الرسوم البيانية -->
            <div class="charts-grid">
                <div class="chart-card">
                    <div class="chart-header">
                        <h3><i class="fas fa-chart-line"></i> مبيعات الأسبوع</h3>
                        <select id="sales-period" onchange="updateSalesChart()">
                            <option value="week">هذا الأسبوع</option>
                            <option value="month">هذا الشهر</option>
                            <option value="year">هذا العام</option>
                        </select>
                    </div>
                    <div class="chart-content">
                        <canvas id="sales-chart"></canvas>
                    </div>
                </div>
                
                <div class="chart-card">
                    <div class="chart-header">
                        <h3><i class="fas fa-chart-pie"></i> المنتجات الأكثر مبيعاً</h3>
                    </div>
                    <div class="chart-content">
                        <div id="top-products-list"></div>
                    </div>
                </div>
            </div>
            
            <!-- الطلبات الأخيرة -->
            <div class="recent-orders-card">
                <div class="card-header">
                    <h3><i class="fas fa-clock"></i> الطلبات الأخيرة</h3>
                    <a href="#" onclick="switchView('orders')" class="view-all-link">عرض الكل</a>
                </div>
                <div class="recent-orders-list" id="recent-orders-list">
                    <!-- سيتم تحميل الطلبات هنا -->
                </div>
            </div>
        </div>
    `;
    
    loadDashboardData();
}

// عرض صفحة التقارير
function showReports() {
    const container = document.getElementById('content-container');
    container.innerHTML = `
        <div class="reports-container">
            <div class="reports-header">
                <h2><i class="fas fa-chart-bar"></i> التقارير والإحصائيات</h2>
                <div class="reports-actions">
                    <select id="report-period" onchange="updateReports()">
                        <option value="today">اليوم</option>
                        <option value="week">هذا الأسبوع</option>
                        <option value="month" selected>هذا الشهر</option>
                        <option value="year">هذا العام</option>
                        <option value="custom">فترة مخصصة</option>
                    </select>
                    <button class="btn-primary" onclick="exportReports()">
                        <i class="fas fa-file-excel"></i> تصدير Excel
                    </button>
                </div>
            </div>
            
            <!-- تقارير المبيعات -->
            <div class="report-section">
                <h3><i class="fas fa-money-bill-wave"></i> تقرير المبيعات</h3>
                <div class="report-cards">
                    <div class="report-card">
                        <h4>إجمالي المبيعات</h4>
                        <div class="report-value" id="sales-total">0 جنيه</div>
                        <div class="report-change positive" id="sales-change">+15% من الشهر الماضي</div>
                    </div>
                    
                    <div class="report-card">
                        <h4>متوسط قيمة الطلب</h4>
                        <div class="report-value" id="avg-order-value">0 جنيه</div>
                        <div class="report-change neutral" id="avg-change">+2% من الشهر الماضي</div>
                    </div>
                    
                    <div class="report-card">
                        <h4>عدد الطلبات</h4>
                        <div class="report-value" id="orders-count">0</div>
                        <div class="report-change positive" id="orders-count-change">+8% من الشهر الماضي</div>
                    </div>
                </div>
            </div>
            
            <!-- تقارير المنتجات -->
            <div class="report-section">
                <h3><i class="fas fa-cookie-bite"></i> تقرير المنتجات</h3>
                <div class="products-report-table">
                    <table id="products-report-table">
                        <thead>
                            <tr>
                                <th>المنتج</th>
                                <th>عدد المبيعات</th>
                                <th>إجمالي الإيرادات</th>
                                <th>النسبة من المبيعات</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody id="products-report-body">
                            <!-- سيتم تحميل البيانات هنا -->
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- تقارير العملاء -->
            <div class="report-section">
                <h3><i class="fas fa-users"></i> تقرير العملاء</h3>
                <div class="customers-report">
                    <div class="report-card">
                        <h4>عملاء جدد</h4>
                        <div class="report-value" id="new-customers">0</div>
                        <div class="report-change positive">+20% من الشهر الماضي</div>
                    </div>
                    
                    <div class="report-card">
                        <h4>عملاء متكررون</h4>
                        <div class="report-value" id="returning-customers">0</div>
                        <div class="report-change positive">+5% من الشهر الماضي</div>
                    </div>
                    
                    <div class="report-card">
                        <h4>معدل الاحتفاظ</h4>
                        <div class="report-value" id="retention-rate">0%</div>
                        <div class="report-change positive">+3% من الشهر الماضي</div>
                    </div>
                </div>
            </div>
            
            <!-- تقارير طرق الدفع -->
            <div class="report-section">
                <h3><i class="fas fa-credit-card"></i> تقرير طرق الدفع</h3>
                <div class="payment-methods-chart">
                    <canvas id="payment-methods-chart"></canvas>
                </div>
            </div>
        </div>
    `;
    
    loadReportsData();
}

// عرض صفحة العملاء
function showCustomers() {
    const container = document.getElementById('content-container');
    container.innerHTML = `
        <div class="customers-container">
            <div class="customers-header">
                <h2><i class="fas fa-users"></i> إدارة العملاء</h2>
                <div class="customers-actions">
                    <button class="btn-primary" onclick="exportCustomers()">
                        <i class="fas fa-download"></i> تصدير قائمة العملاء
                    </button>
                    <button class="btn-secondary" onclick="sendBulkNotification()">
                        <i class="fas fa-bell"></i> إرسال إشعار جماعي
                    </button>
                </div>
            </div>
            
            <!-- إحصائيات العملاء -->
            <div class="customers-stats">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <div class="stat-content">
                        <h3 id="total-customers-count">0</h3>
                        <p>إجمالي العملاء</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-user-check"></i>
                    </div>
                    <div class="stat-content">
                        <h3 id="active-customers">0</h3>
                        <p>عملاء نشطون</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-crown"></i>
                    </div>
                    <div class="stat-content">
                        <h3 id="vip-customers">0</h3>
                        <p>عملاء مميزون</p>
                    </div>
                </div>
            </div>
            
            <!-- قائمة العملاء -->
            <div class="customers-table-container">
                <div class="table-filters">
                    <input type="text" id="customer-search" placeholder="البحث عن عميل..." onkeyup="filterCustomers()">
                    <select id="customer-filter" onchange="filterCustomers()">
                        <option value="all">جميع العملاء</option>
                        <option value="active">نشطون</option>
                        <option value="inactive">غير نشطون</option>
                        <option value="vip">مميزون</option>
                    </select>
                </div>
                
                <table class="customers-table">
                    <thead>
                        <tr>
                            <th>العميل</th>
                            <th>البريد الإلكتروني</th>
                            <th>الهاتف</th>
                            <th>عدد الطلبات</th>
                            <th>إجمالي المشتريات</th>
                            <th>تاريخ التسجيل</th>
                            <th>الحالة</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody id="customers-table-body">
                        <!-- سيتم تحميل البيانات هنا -->
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    loadCustomersData();
}

// تحميل بيانات لوحة القيادة
async function loadDashboardData() {
    try {
        // تحميل الطلبات
        const ordersSnapshot = await db.collection('orders').get();
        const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // تحميل المنتجات
        const productsSnapshot = await db.collection('products').get();
        const productsData = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // حساب الإحصائيات
        const totalOrders = ordersData.length;
        const totalRevenue = ordersData.reduce((sum, order) => sum + (order.total || 0), 0);
        const totalProducts = productsData.length;
        
        // تحديث العرض
        document.getElementById('total-orders').textContent = totalOrders;
        document.getElementById('total-revenue').textContent = totalRevenue.toFixed(2) + ' جنيه';
        document.getElementById('total-products').textContent = totalProducts;
        
        // عرض الطلبات الأخيرة
        const recentOrders = ordersData.slice(-5).reverse();
        displayRecentOrders(recentOrders);
        
    } catch (error) {
        console.error('خطأ في تحميل بيانات لوحة القيادة:', error);
    }
}

// عرض الطلبات الأخيرة
function displayRecentOrders(orders) {
    const container = document.getElementById('recent-orders-list');
    
    if (orders.length === 0) {
        container.innerHTML = '<p class="no-data">لا توجد طلبات حديثة</p>';
        return;
    }
    
    container.innerHTML = orders.map(order => `
        <div class="recent-order-item">
            <div class="order-info">
                <h4>#${order.orderNumber || order.id}</h4>
                <p>${order.customerName || 'عميل'}</p>
                <span class="order-time">${formatDate(order.createdAt)}</span>
            </div>
            <div class="order-amount">
                <span class="amount">${order.total || 0} جنيه</span>
                <span class="status ${order.status || 'pending'}">${getStatusText(order.status)}</span>
            </div>
        </div>
    `).join('');
}

// تحميل بيانات التقارير
async function loadReportsData() {
    try {
        const period = document.getElementById('report-period').value;
        const dateRange = getDateRange(period);
        
        // تحميل بيانات المبيعات للفترة المحددة
        const ordersSnapshot = await db.collection('orders')
            .where('createdAt', '>=', dateRange.start)
            .where('createdAt', '<=', dateRange.end)
            .get();
            
        const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // حساب إحصائيات المبيعات
        const totalSales = ordersData.reduce((sum, order) => sum + (order.total || 0), 0);
        const avgOrderValue = ordersData.length > 0 ? totalSales / ordersData.length : 0;
        
        // تحديث العرض
        document.getElementById('sales-total').textContent = totalSales.toFixed(2) + ' جنيه';
        document.getElementById('avg-order-value').textContent = avgOrderValue.toFixed(2) + ' جنيه';
        document.getElementById('orders-count').textContent = ordersData.length;
        
        // تحميل تقرير المنتجات
        loadProductsReport(ordersData);
        
    } catch (error) {
        console.error('خطأ في تحميل بيانات التقارير:', error);
    }
}

// تحميل تقرير المنتجات
function loadProductsReport(ordersData) {
    const productSales = {};
    
    ordersData.forEach(order => {
        if (order.items) {
            order.items.forEach(item => {
                if (!productSales[item.name]) {
                    productSales[item.name] = {
                        name: item.name,
                        quantity: 0,
                        revenue: 0
                    };
                }
                productSales[item.name].quantity += item.quantity;
                productSales[item.name].revenue += item.quantity * item.price;
            });
        }
    });
    
    const sortedProducts = Object.values(productSales)
        .sort((a, b) => b.revenue - a.revenue);
    
    const tbody = document.getElementById('products-report-body');
    const totalRevenue = sortedProducts.reduce((sum, product) => sum + product.revenue, 0);
    
    tbody.innerHTML = sortedProducts.map(product => {
        const percentage = totalRevenue > 0 ? (product.revenue / totalRevenue * 100).toFixed(1) : 0;
        return `
            <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.revenue.toFixed(2)} جنيه</td>
                <td>${percentage}%</td>
                <td><span class="status active">نشط</span></td>
            </tr>
        `;
    }).join('');
}

// دوال مساعدة
function getDateRange(period) {
    const now = new Date();
    let start, end;
    
    switch (period) {
        case 'today':
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            break;
        case 'week':
            start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            end = now;
            break;
        case 'month':
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            break;
        case 'year':
            start = new Date(now.getFullYear(), 0, 1);
            end = new Date(now.getFullYear() + 1, 0, 0);
            break;
        default:
            start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            end = now;
    }
    
    return { start, end };
}

function formatDate(timestamp) {
    if (!timestamp) return 'غير محدد';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ar-EG');
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'في الانتظار',
        'confirmed': 'مؤكد',
        'preparing': 'قيد التحضير',
        'ready': 'جاهز',
        'delivered': 'تم التوصيل',
        'cancelled': 'ملغي'
    };
    return statusMap[status] || 'غير محدد';
}

// تصدير التقارير
function exportReports() {
    // سيتم تطوير هذه الوظيفة لاحقاً
    showNotification('سيتم إضافة وظيفة التصدير قريباً', 'info');
}

function exportCustomers() {
    showNotification('سيتم إضافة وظيفة تصدير العملاء قريباً', 'info');
}

function refreshDashboard() {
    loadDashboardData();
    showNotification('تم تحديث لوحة القيادة', 'success');
}
