// ============================================
// FILE: script.js
// ============================================

// ============================================
// State Management
// ============================================
let nextId = 100;
function genId() { return nextId++; }

const state = {
    customers: [],
    vehicles: [],
    services: [],
    products: [],
    quotations: [],
    invoices: [],
    activities: []
};

// Tracks which dashboard card filter is active (null = table hidden)
let activeFilter = null;

// ============================================
// Sample / Seed Data
// ============================================
(function seedData() {
    // Customers (now with email field)
    const c1 = { id: genId(), name: 'Marcus Reid', phone: '555-0101', email: 'marcus.reid@email.com', createdAt: '2024-11-02' };
    const c2 = { id: genId(), name: 'Elena Vasquez', phone: '555-0202', email: 'elena.v@email.com', createdAt: '2024-11-05' };
    const c3 = { id: genId(), name: 'David Okonkwo', phone: '555-0303', email: 'david.okonkwo@email.com', createdAt: '2024-11-08' };
    const c4 = { id: genId(), name: 'Sarah Mitchell', phone: '555-0404', email: 'sarah.m@email.com', createdAt: '2024-11-12' };
    const c5 = { id: genId(), name: 'Raj Patel', phone: '555-0505', email: 'raj.patel@email.com', createdAt: '2024-11-15' };
    state.customers = [c1, c2, c3, c4, c5];

    // Vehicles (extended fields for the All Data table)
    const v1 = { id: genId(), customerId: c1.id, number: 'TXL-4821', model: 'Toyota Camry 2022', type: 'Sedan', chassisNumber: 'CHS-2024-4821', status: 'Delivered', carTaken: '2024-11-02', carDelivered: '2024-11-14', carNotes: 'Engine repair completed successfully', lastUpdated: '2024-11-14', createdAt: '2024-11-02' };
    const v2 = { id: genId(), customerId: c2.id, number: 'HND-7733', model: 'Honda Civic 2021', type: 'Sedan', chassisNumber: 'CHS-2021-7733', status: 'Delivered', carTaken: '2024-11-05', carDelivered: '2024-11-15', carNotes: 'Brake service completed', lastUpdated: '2024-11-15', createdAt: '2024-11-05' };
    const v3 = { id: genId(), customerId: c3.id, number: 'FRD-1150', model: 'Ford F-150 2023', type: 'Truck', chassisNumber: 'CHS-2023-1150', status: 'Maintenance', carTaken: '2024-11-16', carDelivered: '', carNotes: 'Transmission issue — work in progress', lastUpdated: '2024-11-16', createdAt: '2024-11-08' };
    const v4 = { id: genId(), customerId: c4.id, number: 'BMW-9902', model: 'BMW X5 2022', type: 'SUV', chassisNumber: 'CHS-2022-9902', status: 'Maintenance', carTaken: '2024-11-17', carDelivered: '', carNotes: 'AC compressor replacement pending', lastUpdated: '2024-11-17', createdAt: '2024-11-12' };
    const v5 = { id: genId(), customerId: c5.id, number: 'HYD-3344', model: 'Hyundai Tucson 2023', type: 'SUV', chassisNumber: 'CHS-2023-3344', status: 'Transferred', carTaken: '2024-11-18', carDelivered: '', carNotes: 'Transferred to external body shop', lastUpdated: '2024-11-18', createdAt: '2024-11-15' };
    const v6 = { id: genId(), customerId: c1.id, number: 'NIS-5567', model: 'Nissan Altima 2020', type: 'Sedan', chassisNumber: 'CHS-2020-5567', status: 'Out of Service', carTaken: '2024-11-18', carDelivered: '', carNotes: 'Awaiting spare parts — currently out of service', lastUpdated: '2024-11-18', createdAt: '2024-11-10' };
    state.vehicles = [v1, v2, v3, v4, v5, v6];

    // Services
    state.services = [
        { id: genId(), vehicleId: v1.id, issue: 'Engine knocking noise', workDone: 'Replaced connecting rod bearings', cost: 850, status: 'Completed', createdAt: '2024-11-14' },
        { id: genId(), vehicleId: v2.id, issue: 'Brake pads worn out', workDone: 'Front and rear brake pad replacement', cost: 320, status: 'Completed', createdAt: '2024-11-15' },
        { id: genId(), vehicleId: v3.id, issue: 'Transmission slipping', workDone: 'Transmission fluid flush and filter change', cost: 280, status: 'In Progress', createdAt: '2024-11-16' },
        { id: genId(), vehicleId: v4.id, issue: 'AC not cooling', workDone: 'AC compressor replacement', cost: 620, status: 'In Progress', createdAt: '2024-11-17' },
        { id: genId(), vehicleId: v5.id, issue: 'Oil change overdue', workDone: 'Full synthetic oil change', cost: 75, status: 'Pending', createdAt: '2024-11-18' },
        { id: genId(), vehicleId: v6.id, issue: 'Battery drain', workDone: 'Battery replacement and alternator check', cost: 210, status: 'Pending', createdAt: '2024-11-18' },
    ];

    // Products
    state.products = [
        { id: genId(), name: 'Synthetic Motor Oil 5W-30 (5Qt)', price: 38.99, createdAt: '2024-10-20' },
        { id: genId(), name: 'Brake Pad Set (Front)', price: 64.50, createdAt: '2024-10-22' },
        { id: genId(), name: 'Air Filter (Universal)', price: 18.75, createdAt: '2024-10-25' },
        { id: genId(), name: 'Spark Plug (Iridium, 4-pack)', price: 32.00, createdAt: '2024-11-01' },
        { id: genId(), name: 'Coolant 50/50 (1 Gallon)', price: 22.50, createdAt: '2024-11-03' },
    ];

    // Quotations
    state.quotations = [
        {
            id: genId(), customerId: c1.id, vehicleId: v1.id, createdAt: '2024-11-13', status: 'Pending',
            items: [
                { description: 'Engine diagnostics', qty: 1, rate: 120, total: 120 },
                { description: 'Connecting rod bearing set', qty: 1, rate: 450, total: 450 },
                { description: 'Labor - engine repair', qty: 4, rate: 70, total: 280 },
            ]
        },
        {
            id: genId(), customerId: c2.id, vehicleId: v2.id, createdAt: '2024-11-14', status: 'Pending',
            items: [
                { description: 'Front brake pad set', qty: 1, rate: 64.50, total: 64.50 },
                { description: 'Rear brake pad set', qty: 1, rate: 54.00, total: 54.00 },
                { description: 'Brake fluid flush', qty: 1, rate: 45, total: 45 },
                { description: 'Labor - brake service', qty: 2, rate: 78, total: 156 },
            ]
        }
    ];
    state.quotations.forEach(q => {
        q.total = q.items.reduce((s, i) => s + i.total, 0);
    });

    // Invoices
    state.invoices = [
        { id: genId(), quotationId: state.quotations[0].id, invoiceNumber: 'INV-001', createdAt: '2024-11-14', status: 'Paid' },
    ];

    // Activities
    state.activities = [
        { id: genId(), type: 'service', description: 'Battery drain service added for NIS-5567', time: '2024-11-18 14:30' },
        { id: genId(), type: 'vehicle', description: 'Hyundai Tucson registered for Raj Patel', time: '2024-11-15 11:20' },
        { id: genId(), type: 'service', description: 'Oil change service completed for TXL-4821', time: '2024-11-14 16:45' },
        { id: genId(), type: 'invoice', description: 'Invoice INV-001 generated for Marcus Reid', time: '2024-11-14 10:00' },
        { id: genId(), type: 'vehicle', description: 'BMW X5 registered for Sarah Mitchell', time: '2024-11-12 09:15' },
        { id: genId(), type: 'quotation', description: 'Quotation created for Elena Vasquez', time: '2024-11-11 13:40' },
        { id: genId(), type: 'vehicle', description: 'Ford F-150 registered for David Okonkwo', time: '2024-11-08 08:50' },
    ];
})();

// ============================================
// Utility Functions
// ============================================
function getVehicleLabel(vehicleId) {
    const v = state.vehicles.find(x => x.id === vehicleId);
    return v ? `${v.number} (${v.model})` : 'Unknown';
}

function getCustomerName(customerId) {
    const c = state.customers.find(x => x.id === customerId);
    return c ? c.name : 'Unknown';
}

function getCustomerPhone(customerId) {
    const c = state.customers.find(x => x.id === customerId);
    return c ? c.phone : '-';
}

function getCustomerEmail(customerId) {
    const c = state.customers.find(x => x.id === customerId);
    return c ? c.email : '-';
}

function getVehicleByCustomer(customerId) {
    return state.vehicles.filter(v => v.customerId === customerId);
}

function getVehicleForService(vehicleId) {
    return state.vehicles.find(v => v.id === vehicleId);
}

function formatCurrency(amount) {
    return '$' + Number(amount).toFixed(2);
}

function todayStr() {
    return new Date().toISOString().split('T')[0];
}

function nowDateTimeStr() {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function statusBadgeClass(status) {
    const map = {
        'Pending': 'badge--pending',
        'In Progress': 'badge--in-progress',
        'Completed': 'badge--completed',
        'Delivered': 'badge--delivered',
        'Paid': 'badge--paid',
        'Unpaid': 'badge--unpaid',
        'Transferred': 'badge--in-progress',
        'Out of Service': 'badge--unpaid',
    };
    return map[status] || '';
}

// ============================================
// Toast Notification System
// ============================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const iconMap = {
        success: 'fa-circle-check',
        error: 'fa-circle-xmark',
        info: 'fa-circle-info'
    };
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<i class="fa-solid ${iconMap[type] || iconMap.info}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
}

// ============================================
// Navigation
// ============================================
function navigateTo(pageName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageName);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageName);
    });

    document.getElementById('nav-links').classList.remove('open');
    document.getElementById('nav-toggle').setAttribute('aria-expanded', 'false');

    if (pageName === 'dashboard') renderDashboard();
    if (pageName === 'customer') renderCustomerTable();
    if (pageName === 'services') { populateVehicleDropdowns(); renderServiceTable(); }
    if (pageName === 'quotations') { populateQuotationDropdowns(); renderQuotationTable(); }
    if (pageName === 'invoice') { populateInvoiceDropdown(); renderInvoiceTable(); }
    if (pageName === 'products') renderProductTable();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(link.dataset.page);
    });
});

document.getElementById('nav-toggle').addEventListener('click', () => {
    const navLinks = document.getElementById('nav-links');
    const isOpen = navLinks.classList.toggle('open');
    document.getElementById('nav-toggle').setAttribute('aria-expanded', isOpen);
});

document.getElementById('btn-logout').addEventListener('click', () => {
    showToast('You have been logged out.', 'info');
});

// ============================================
// Dashboard
// ============================================
function renderDashboard() {
    activeFilter = null;
    document.querySelectorAll('.stats-grid .stat-card').forEach(c => c.classList.remove('stat-card--active'));
    document.getElementById('all-data-section').style.display = 'none';
    document.getElementById('date-from').value = '';
    document.getElementById('date-to').value = '';

    const allCount = state.vehicles.length;
    const deliveredCount = state.vehicles.filter(v => v.status === 'Delivered').length;
    const maintenanceCount = state.vehicles.filter(v => v.status === 'Maintenance').length;
    const transferredCount = state.vehicles.filter(v => v.status === 'Transferred').length;
    const outOfServiceCount = state.vehicles.filter(v => v.status === 'Out of Service').length;

    animateCounter('stat-alldata', allCount);
    animateCounter('stat-delivered', deliveredCount);
    animateCounter('stat-maintenance', maintenanceCount);
    animateCounter('stat-transferred', transferredCount);
    animateCounter('stat-outofservice', outOfServiceCount);

    const tbody = document.getElementById('activity-table-body');
    if (state.activities.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="3">No recent activity</td></tr>';
        return;
    }
    tbody.innerHTML = state.activities.slice(0, 10).map(a => {
        const iconMap = {
            vehicle: 'fa-car',
            service: 'fa-screwdriver-wrench',
            invoice: 'fa-file-invoice-dollar',
            quotation: 'fa-file-lines',
            product: 'fa-boxes-stacked'
        };
        const icon = iconMap[a.type] || 'fa-circle-info';
        return `<tr>
            <td style="white-space:nowrap;color:var(--text-muted);font-size:0.82rem;">${a.time}</td>
            <td><i class="fa-solid ${icon}" style="color:var(--accent);margin-right:8px;font-size:0.82rem;"></i>${a.type.charAt(0).toUpperCase() + a.type.slice(1)}</td>
            <td>${a.description}</td>
        </tr>`;
    }).join('');
}

function animateCounter(elementId, target) {
    const el = document.getElementById(elementId);
    const duration = 600;
    const start = performance.now();
    function step(timestamp) {
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// ============================================
// All Data Table (Dashboard card click)
// ============================================
function renderAllDataTable() {
    const section = document.getElementById('all-data-section');
    const titleEl = document.getElementById('all-data-title');
    const tbody = document.getElementById('all-data-table-body');

    if (!activeFilter) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';

    const titleMap = {
        'all': 'All Vehicles',
        'Delivered': 'Delivered Vehicles',
        'Maintenance': 'Vehicles in Maintenance',
        'Transferred': 'Transferred Vehicles',
        'Out of Service': 'Out of Service Vehicles'
    };
    titleEl.textContent = titleMap[activeFilter] || 'All Vehicles';

    let data = state.vehicles;
    if (activeFilter !== 'all') {
        data = data.filter(v => v.status === activeFilter);
    }

    // Apply date filter on Car Taken date
    const dateFrom = document.getElementById('date-from').value;
    const dateTo = document.getElementById('date-to').value;
    if (dateFrom) {
        data = data.filter(v => v.carTaken && v.carTaken >= dateFrom);
    }
    if (dateTo) {
        data = data.filter(v => v.carTaken && v.carTaken <= dateTo);
    }

    if (data.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="12">No vehicles found for the selected filter</td></tr>';
        return;
    }

    tbody.innerHTML = data.map(v => {
        const customer = state.customers.find(c => c.id === v.customerId);
        return `<tr>
            <td><button class="btn-ghost" onclick="editVehicle(${v.id})" aria-label="Edit vehicle ${v.number}"><i class="fa-solid fa-pen-to-square"></i></button></td>
            <td style="color:var(--text-primary);font-weight:600;white-space:nowrap;">${v.number}</td>
            <td style="white-space:nowrap;">${v.chassisNumber}</td>
            <td>${v.type}</td>
            <td>${customer ? customer.name : '-'}</td>
            <td><span class="badge ${statusBadgeClass(v.status)}">${v.status}</span></td>
            <td>${customer ? customer.email : '-'}</td>
            <td>${customer ? customer.phone : '-'}</td>
            <td style="white-space:nowrap;">${v.carTaken || '-'}</td>
            <td style="white-space:nowrap;">${v.carDelivered || '-'}</td>
            <td style="max-width:180px;white-space:normal;line-height:1.4;">${v.carNotes || '-'}</td>
            <td style="white-space:nowrap;">${v.lastUpdated || '-'}</td>
        </tr>`;
    }).join('');
}

function editVehicle(vehicleId) {
    const v = state.vehicles.find(x => x.id === vehicleId);
    if (v) showToast(`Edit mode opened for ${v.number}`, 'info');
}

// Dashboard stat card click handlers
document.querySelectorAll('.stats-grid .stat-card').forEach(card => {
    card.addEventListener('click', () => {
        const filter = card.dataset.filter;

        if (activeFilter === filter) {
            activeFilter = null;
            card.classList.remove('stat-card--active');
        } else {
            document.querySelectorAll('.stats-grid .stat-card').forEach(c => c.classList.remove('stat-card--active'));
            activeFilter = filter;
            card.classList.add('stat-card--active');
        }

        document.getElementById('date-from').value = '';
        document.getElementById('date-to').value = '';

        renderAllDataTable();
    });
});

// Date filter change handlers
document.getElementById('date-from').addEventListener('change', renderAllDataTable);
document.getElementById('date-to').addEventListener('change', renderAllDataTable);
document.getElementById('date-filter-clear').addEventListener('click', () => {
    document.getElementById('date-from').value = '';
    document.getElementById('date-to').value = '';
    renderAllDataTable();
});

// ============================================
// Customer & Vehicle Management
// ============================================
document.getElementById('customer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const vNumber = document.getElementById('veh-number').value.trim();
    const vModel = document.getElementById('veh-model').value.trim();

    if (!name || !phone || !vNumber || !vModel) {
        showToast('Please fill in all fields.', 'error');
        return;
    }

    if (state.vehicles.some(v => v.number.toLowerCase() === vNumber.toLowerCase())) {
        showToast('A vehicle with this number already exists.', 'error');
        return;
    }

    const customerId = genId();
    state.customers.push({ id: customerId, name, phone, email: '', createdAt: todayStr() });
    state.vehicles.push({ id: genId(), customerId, number: vNumber, model: vModel, type: 'N/A', chassisNumber: 'N/A', status: 'Maintenance', carTaken: todayStr(), carDelivered: '', carNotes: '', lastUpdated: todayStr(), createdAt: todayStr() });
    state.activities.unshift({
        id: genId(), type: 'vehicle',
        description: `${vModel} registered for ${name}`,
        time: nowDateTimeStr()
    });

    e.target.reset();
    renderCustomerTable();
    showToast(`Customer "${name}" and vehicle "${vNumber}" added successfully.`);
});

function renderCustomerTable(filter = '') {
    const tbody = document.getElementById('customer-table-body');
    let data = state.customers.map(c => {
        const vehicle = state.vehicles.find(v => v.customerId === c.id);
        return { ...c, vehicle };
    });

    if (filter) {
        const f = filter.toLowerCase();
        data = data.filter(d =>
            d.name.toLowerCase().includes(f) ||
            d.phone.includes(f) ||
            (d.vehicle && d.vehicle.number.toLowerCase().includes(f)) ||
            (d.vehicle && d.vehicle.model.toLowerCase().includes(f))
        );
    }

    if (data.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="6">No customers found</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((d, i) => `<tr>
        <td>${i + 1}</td>
        <td style="color:var(--text-primary);font-weight:500;">${d.name}</td>
        <td>${d.phone}</td>
        <td>${d.vehicle ? d.vehicle.number : '-'}</td>
        <td>${d.vehicle ? d.vehicle.model : '-'}</td>
        <td style="color:var(--text-muted);font-size:0.82rem;">${d.createdAt}</td>
    </tr>`).join('');
}

document.getElementById('customer-search').addEventListener('input', (e) => {
    renderCustomerTable(e.target.value);
});

// ============================================
// Service Management
// ============================================
function populateVehicleDropdowns() {
    const select = document.getElementById('svc-vehicle');
    const currentVal = select.value;
    select.innerHTML = '<option value="">Select vehicle...</option>';
    state.vehicles.forEach(v => {
        const cust = getCustomerName(v.customerId);
        select.innerHTML += `<option value="${v.id}">${v.number} - ${v.model} (${cust})</option>`;
    });
    if (currentVal) select.value = currentVal;
}

document.getElementById('service-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const vehicleId = parseInt(document.getElementById('svc-vehicle').value);
    const issue = document.getElementById('svc-issue').value.trim();
    const workDone = document.getElementById('svc-work').value.trim();
    const cost = parseFloat(document.getElementById('svc-cost').value);
    const status = document.getElementById('svc-status').value;

    if (!vehicleId || !issue || !workDone || isNaN(cost)) {
        showToast('Please fill in all fields.', 'error');
        return;
    }

    state.services.push({ id: genId(), vehicleId, issue, workDone, cost, status, createdAt: todayStr() });

    const vLabel = getVehicleLabel(vehicleId);
    state.activities.unshift({
        id: genId(), type: 'service',
        description: `${status} service for ${vLabel}`,
        time: nowDateTimeStr()
    });

    e.target.reset();
    renderServiceTable();
    showToast('Service record added successfully.');
});

function renderServiceTable() {
    const searchVal = document.getElementById('service-search').value.toLowerCase();
    const filterVal = document.getElementById('service-filter').value;

    let data = state.services;
    if (filterVal !== 'All') {
        data = data.filter(s => s.status === filterVal);
    }
    if (searchVal) {
        data = data.filter(s => {
            const vLabel = getVehicleLabel(s.vehicleId).toLowerCase();
            return vLabel.includes(searchVal) ||
                   s.issue.toLowerCase().includes(searchVal) ||
                   s.workDone.toLowerCase().includes(searchVal);
        });
    }

    const tbody = document.getElementById('service-table-body');
    if (data.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="7">No services found</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((s, i) => `<tr>
        <td>${i + 1}</td>
        <td style="color:var(--text-primary);font-weight:500;">${getVehicleLabel(s.vehicleId)}</td>
        <td>${s.issue}</td>
        <td>${s.workDone}</td>
        <td style="font-weight:600;color:var(--text-primary);">${formatCurrency(s.cost)}</td>
        <td><span class="badge ${statusBadgeClass(s.status)}">${s.status}</span></td>
        <td style="color:var(--text-muted);font-size:0.82rem;">${s.createdAt}</td>
    </tr>`).join('');
}

document.getElementById('service-search').addEventListener('input', renderServiceTable);
document.getElementById('service-filter').addEventListener('change', renderServiceTable);

// ============================================
// Quotation Management
// ============================================
function populateQuotationDropdowns() {
    const custSelect = document.getElementById('quo-customer');
    const currentCust = custSelect.value;
    custSelect.innerHTML = '<option value="">Select customer...</option>';
    state.customers.forEach(c => {
        custSelect.innerHTML += `<option value="${c.id}">${c.name} (${c.phone})</option>`;
    });
    if (currentCust) custSelect.value = currentCust;
    updateQuotationVehicleDropdown();
}

function updateQuotationVehicleDropdown() {
    const custId = parseInt(document.getElementById('quo-customer').value);
    const vehSelect = document.getElementById('quo-vehicle');
    vehSelect.innerHTML = '<option value="">Select vehicle...</option>';
    if (!custId) return;
    getVehicleByCustomer(custId).forEach(v => {
        vehSelect.innerHTML += `<option value="${v.id}">${v.number} - ${v.model}</option>`;
    });
}

document.getElementById('quo-customer').addEventListener('change', updateQuotationVehicleDropdown);

function addQuotationItemRow(desc = '', qty = 1, rate = 0) {
    const tbody = document.getElementById('quotation-items-body');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" class="qi-desc" placeholder="Item description" value="${desc}"></td>
        <td><input type="number" class="qi-qty" min="1" value="${qty}" style="width:80px;"></td>
        <td><input type="number" class="qi-rate" min="0" step="0.01" value="${rate}" style="width:110px;"></td>
        <td class="qi-total text-bold" style="white-space:nowrap;">${formatCurrency(qty * rate)}</td>
        <td><button type="button" class="btn-danger-ghost" onclick="this.closest('tr').remove(); recalcQuotationTotal();" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button></td>
    `;
    tr.querySelectorAll('input').forEach(inp => {
        inp.addEventListener('input', () => {
            const row = inp.closest('tr');
            const q = parseFloat(row.querySelector('.qi-qty').value) || 0;
            const r = parseFloat(row.querySelector('.qi-rate').value) || 0;
            row.querySelector('.qi-total').textContent = formatCurrency(q * r);
            recalcQuotationTotal();
        });
    });
    tbody.appendChild(tr);
    recalcQuotationTotal();
}

function recalcQuotationTotal() {
    let total = 0;
    document.querySelectorAll('#quotation-items-body tr').forEach(row => {
        const q = parseFloat(row.querySelector('.qi-qty').value) || 0;
        const r = parseFloat(row.querySelector('.qi-rate').value) || 0;
        total += q * r;
    });
    document.getElementById('quotation-grand-total').textContent = formatCurrency(total);
}

document.getElementById('add-quotation-item').addEventListener('click', () => {
    addQuotationItemRow();
});

document.getElementById('quotation-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const custId = parseInt(document.getElementById('quo-customer').value);
    const vehId = parseInt(document.getElementById('quo-vehicle').value);
    const rows = document.querySelectorAll('#quotation-items-body tr');

    if (!custId || !vehId) {
        showToast('Please select a customer and vehicle.', 'error');
        return;
    }
    if (rows.length === 0) {
        showToast('Please add at least one item.', 'error');
        return;
    }

    const items = [];
    rows.forEach(row => {
        const desc = row.querySelector('.qi-desc').value.trim();
        const qty = parseFloat(row.querySelector('.qi-qty').value) || 0;
        const rate = parseFloat(row.querySelector('.qi-rate').value) || 0;
        if (desc && qty > 0 && rate >= 0) {
            items.push({ description: desc, qty, rate, total: qty * rate });
        }
    });

    if (items.length === 0) {
        showToast('Please fill in at least one valid item.', 'error');
        return;
    }

    const total = items.reduce((s, i) => s + i.total, 0);
    state.quotations.push({
        id: genId(), customerId: custId, vehicleId: vehId,
        items, total, createdAt: todayStr(), status: 'Pending'
    });

    state.activities.unshift({
        id: genId(), type: 'quotation',
        description: `Quotation (${formatCurrency(total)}) created for ${getCustomerName(custId)}`,
        time: nowDateTimeStr()
    });

    e.target.reset();
    document.getElementById('quotation-items-body').innerHTML = '';
    recalcQuotationTotal();
    renderQuotationTable();
    showToast('Quotation saved successfully.');
});

function renderQuotationTable() {
    const tbody = document.getElementById('quotation-table-body');
    if (state.quotations.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="6">No quotations found</td></tr>';
        return;
    }
    tbody.innerHTML = state.quotations.map((q, i) => `<tr>
        <td>${i + 1}</td>
        <td style="color:var(--text-primary);font-weight:500;">${getCustomerName(q.customerId)}</td>
        <td>${getVehicleLabel(q.vehicleId)}</td>
        <td>${q.items.length} item${q.items.length > 1 ? 's' : ''}</td>
        <td style="font-weight:600;color:var(--text-primary);">${formatCurrency(q.total)}</td>
        <td style="color:var(--text-muted);font-size:0.82rem;">${q.createdAt}</td>
    </tr>`).join('');
}

// ============================================
// Invoice Management
// ============================================
function populateInvoiceDropdown() {
    const select = document.getElementById('inv-quotation');
    select.innerHTML = '<option value="">Select a quotation...</option>';
    const invoicedIds = state.invoices.map(inv => inv.quotationId);
    state.quotations.forEach(q => {
        if (!invoicedIds.includes(q.id)) {
            select.innerHTML += `<option value="${q.id}">QOT-${String(q.id).padStart(3,'0')} - ${getCustomerName(q.customerId)} (${formatCurrency(q.total)})</option>`;
        }
    });
}

document.getElementById('generate-invoice-btn').addEventListener('click', () => {
    const quoId = parseInt(document.getElementById('inv-quotation').value);
    if (!quoId) {
        showToast('Please select a quotation first.', 'error');
        return;
    }

    const q = state.quotations.find(x => x.id === quoId);
    if (!q) return;

    const invoiceNumber = 'INV-' + String(state.invoices.length + 1).padStart(3, '0');
    const invoice = {
        id: genId(),
        quotationId: quoId,
        invoiceNumber,
        createdAt: todayStr(),
        status: 'Unpaid'
    };
    state.invoices.push(invoice);

    state.activities.unshift({
        id: genId(), type: 'invoice',
        description: `Invoice ${invoiceNumber} generated for ${getCustomerName(q.customerId)}`,
        time: nowDateTimeStr()
    });

    renderInvoiceModal(q, invoice);
    populateInvoiceDropdown();
    renderInvoiceTable();
    showToast(`Invoice ${invoiceNumber} generated successfully.`);
});

function renderInvoiceModal(quotation, invoice) {
    const body = document.getElementById('invoice-body');
    const customerName = getCustomerName(quotation.customerId);
    const customerPhone = getCustomerPhone(quotation.customerId);
    const vehicle = state.vehicles.find(v => v.id === quotation.vehicleId);

    body.innerHTML = `
        <div class="invoice-print">
            <div class="invoice-print-header">
                <div>
                    <div class="invoice-print-brand">GaragePro</div>
                    <div class="invoice-print-subtitle">Garage & Workshop Services</div>
                </div>
                <div class="invoice-print-meta">
                    <h3>${invoice.invoiceNumber}</h3>
                    <p>Date: ${invoice.createdAt}</p>
                    <p>Status: ${invoice.status}</p>
                </div>
            </div>
            <div class="invoice-print-details">
                <div>
                    <h4>Bill To</h4>
                    <p>${customerName}<br>${customerPhone}</p>
                </div>
                <div>
                    <h4>Vehicle</h4>
                    <p>${vehicle ? vehicle.number : 'N/A'}<br>${vehicle ? vehicle.model : 'N/A'}</p>
                </div>
            </div>
            <table class="invoice-print-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Description</th>
                        <th style="text-align:right;">Qty</th>
                        <th style="text-align:right;">Rate</th>
                        <th style="text-align:right;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${quotation.items.map((item, idx) => `<tr>
                        <td>${idx + 1}</td>
                        <td>${item.description}</td>
                        <td style="text-align:right;">${item.qty}</td>
                        <td style="text-align:right;">${formatCurrency(item.rate)}</td>
                        <td style="text-align:right;">${formatCurrency(item.total)}</td>
                    </tr>`).join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4" style="text-align:right;">Grand Total</td>
                        <td style="text-align:right;color:#f97316;font-size:1.1rem;">${formatCurrency(quotation.total)}</td>
                    </tr>
                </tfoot>
            </table>
            <div class="invoice-print-footer">
                Thank you for choosing GaragePro. Payment is due within 30 days.
            </div>
        </div>
        <div class="invoice-print-actions">
            <button class="btn btn-close-modal" onclick="closeInvoiceModal()">Close</button>
            <button class="btn btn-print" onclick="printInvoice()"><i class="fa-solid fa-print"></i> Print</button>
        </div>
    `;

    document.getElementById('invoice-modal').classList.add('open');
}

function closeInvoiceModal() {
    document.getElementById('invoice-modal').classList.remove('open');
}

document.getElementById('close-invoice-modal').addEventListener('click', closeInvoiceModal);
document.getElementById('invoice-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeInvoiceModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeInvoiceModal();
});

function printInvoice() {
    window.print();
}

function renderInvoiceTable() {
    const tbody = document.getElementById('invoice-table-body');
    if (state.invoices.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="7">No invoices found</td></tr>';
        return;
    }
    tbody.innerHTML = state.invoices.map(inv => {
        const q = state.quotations.find(x => x.id === inv.quotationId);
        const custName = q ? getCustomerName(q.customerId) : '-';
        const vehLabel = q ? getVehicleLabel(q.vehicleId) : '-';
        const total = q ? q.total : 0;
        return `<tr>
            <td style="color:var(--text-primary);font-weight:600;">${inv.invoiceNumber}</td>
            <td>${custName}</td>
            <td>${vehLabel}</td>
            <td style="font-weight:600;color:var(--text-primary);">${formatCurrency(total)}</td>
            <td><span class="badge ${statusBadgeClass(inv.status)}">${inv.status}</span></td>
            <td style="color:var(--text-muted);font-size:0.82rem;">${inv.createdAt}</td>
            <td><button class="btn-ghost" onclick="viewInvoice(${inv.id})"><i class="fa-solid fa-eye"></i> View</button></td>
        </tr>`;
    }).join('');
}

function viewInvoice(invoiceId) {
    const inv = state.invoices.find(x => x.id === invoiceId);
    if (!inv) return;
    const q = state.quotations.find(x => x.id === inv.quotationId);
    if (!q) return;
    renderInvoiceModal(q, inv);
}

// ============================================
// Product Management
// ============================================
document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('prod-name').value.trim();
    const price = parseFloat(document.getElementById('prod-price').value);

    if (!name || isNaN(price) || price < 0) {
        showToast('Please fill in all fields with valid values.', 'error');
        return;
    }

    state.products.push({ id: genId(), name, price, createdAt: todayStr() });
    state.activities.unshift({
        id: genId(), type: 'product',
        description: `Product "${name}" added (${formatCurrency(price)})`,
        time: nowDateTimeStr()
    });

    e.target.reset();
    renderProductTable();
    showToast(`Product "${name}" added successfully.`);
});

function renderProductTable(filter = '') {
    const tbody = document.getElementById('product-table-body');
    let data = state.products;
    if (filter) {
        const f = filter.toLowerCase();
        data = data.filter(p => p.name.toLowerCase().includes(f));
    }

    if (data.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="4">No products found</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((p, i) => `<tr>
        <td>${i + 1}</td>
        <td style="color:var(--text-primary);font-weight:500;">${p.name}</td>
        <td style="font-weight:600;color:var(--text-primary);">${formatCurrency(p.price)}</td>
        <td style="color:var(--text-muted);font-size:0.82rem;">${p.createdAt}</td>
    </tr>`).join('');
}

document.getElementById('product-search').addEventListener('input', (e) => {
    renderProductTable(e.target.value);
});

// ============================================
// Initialization
// ============================================
(function init() {
    addQuotationItemRow();
    renderDashboard();
})();
