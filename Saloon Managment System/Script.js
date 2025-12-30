// Hair Salon Management System - Main JavaScript

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadServices();
    displayAppointments();
    displayCustomers();
    displayServices();
    updateStats();
    setMinDate();
});

// Set minimum date to today for appointments
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').setAttribute('min', today);
}

// Tab switching function
function openTab(tabName) {
    const tabs = document.getElementsByClassName('tab-content');
    const btns = document.getElementsByClassName('tab-btn');
    
    for (let tab of tabs) {
        tab.classList.remove('active');
    }
    
    for (let btn of btns) {
        btn.classList.remove('active');
    }
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Load services into dropdown
function loadServices() {
    const select = document.getElementById('appointmentService');
    select.innerHTML = '<option value="">Select Service</option>';
    
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.name;
        option.textContent = `${service.name} - $${service.price} (${service.duration} min)`;
        select.appendChild(option);
    });
}

// ==================================================
// APPOINTMENT MANAGEMENT
// ==================================================

// Handle appointment form submission
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const appointment = {
        id: Date.now(),
        customer: document.getElementById('appointmentCustomer').value,
        phone: document.getElementById('appointmentPhone').value,
        service: document.getElementById('appointmentService').value,
        stylist: document.getElementById('appointmentStylist').value,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        status: 'Scheduled',
        createdAt: new Date().toISOString()
    };
    
    appointments.push(appointment);
    localStorage.setItem('salonAppointments', JSON.stringify(appointments));
    
    displayAppointments();
    updateStats();
    this.reset();
    
    showNotification('✅ Appointment booked successfully!', 'success');
});

// Display all appointments
function displayAppointments() {
    const list = document.getElementById('appointmentsList');
    list.innerHTML = '<h2 style="margin-top: 30px; margin-bottom: 20px;">Upcoming Appointments</h2>';
    
    if (appointments.length === 0) {
        list.innerHTML += '<p style="text-align: center; padding: 20px; opacity: 0.7;">No appointments scheduled yet</p>';
        return;
    }
    
    // Sort appointments by date and time
    const sortedAppointments = appointments.sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.time);
        const dateB = new Date(b.date + ' ' + b.time);
        return dateA - dateB;
    });
    
    sortedAppointments.forEach(apt => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <h3>👤 ${apt.customer}</h3>
            <p>📞 Phone: ${apt.phone}</p>
            <p>💇 Service: ${apt.service}</p>
            <p>✂️ Stylist: ${apt.stylist}</p>
            <p>📅 Date: ${formatDate(apt.date)}</p>
            <p>🕐 Time: ${formatTime(apt.time)}</p>
            <p>📊 Status: <span style="color: #4CAF50;">${apt.status}</span></p>
            <button class="btn-delete" onclick="deleteAppointment(${apt.id})">Delete</button>
        `;
        list.appendChild(card);
    });
}

// Delete appointment
function deleteAppointment(id) {
    if (confirm('Are you sure you want to delete this appointment?')) {
        appointments = appointments.filter(apt => apt.id !== id);
        localStorage.setItem('salonAppointments', JSON.stringify(appointments));
        displayAppointments();
        updateStats();
        showNotification('🗑️ Appointment deleted', 'success');
    }
}

// ==================================================
// CUSTOMER MANAGEMENT
// ==================================================

// Handle customer form submission
document.getElementById('customerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const customer = {
        id: Date.now(),
        name: document.getElementById('customerName').value,
        phone: document.getElementById('customerPhone').value,
        email: document.getElementById('customerEmail').value,
        stylist: document.getElementById('customerStylist').value,
        notes: document.getElementById('customerNotes').value,
        createdAt: new Date().toISOString(),
        totalVisits: 0
    };
    
    customers.push(customer);
    localStorage.setItem('salonCustomers', JSON.stringify(customers));
    
    displayCustomers();
    updateStats();
    this.reset();
    
    showNotification('✅ Customer added successfully!', 'success');
});

// Display all customers
function displayCustomers() {
    const list = document.getElementById('customersList');
    list.innerHTML = '<h2 style="margin-top: 30px; margin-bottom: 20px;">Customer List</h2>';
    
    if (customers.length === 0) {
        list.innerHTML += '<p style="text-align: center; padding: 20px; opacity: 0.7;">No customers registered yet</p>';
        return;
    }
    
    customers.forEach(customer => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <h3>👤 ${customer.name}</h3>
            <p>📞 Phone: ${customer.phone}</p>
            <p>✉️ Email: ${customer.email}</p>
            <p>✂️ Preferred Stylist: ${customer.stylist || 'None'}</p>
            ${customer.notes ? `<p>📝 Notes: ${customer.notes}</p>` : ''}
            <p style="opacity: 0.7; font-size: 0.9rem;">Joined: ${formatDate(customer.createdAt.split('T')[0])}</p>
            <button class="btn-delete" onclick="deleteCustomer(${customer.id})">Delete</button>
        `;
        list.appendChild(card);
    });
}

// Delete customer
function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        customers = customers.filter(c => c.id !== id);
        localStorage.setItem('salonCustomers', JSON.stringify(customers));
        displayCustomers();
        updateStats();
        showNotification('🗑️ Customer deleted', 'success');
    }
}

// ==================================================
// SERVICE MANAGEMENT
// ==================================================

// Handle service form submission
document.getElementById('serviceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const service = {
        id: Date.now(),
        name: document.getElementById('serviceName').value,
        price: parseFloat(document.getElementById('servicePrice').value),
        duration: parseInt(document.getElementById('serviceDuration').value),
        category: document.getElementById('serviceCategory').value,
        description: document.getElementById('serviceDescription').value,
        createdAt: new Date().toISOString()
    };
    
    services.push(service);
    localStorage.setItem('salonServices', JSON.stringify(services));
    
    loadServices();
    displayServices();
    updateStats();
    this.reset();
    
    showNotification('✅ Service added successfully!', 'success');
});

// Display all services
function displayServices() {
    const list = document.getElementById('servicesList');
    list.innerHTML = '<h2 style="margin-top: 30px; margin-bottom: 20px;">Available Services</h2>';
    
    // Group services by category
    const groupedServices = {};
    services.forEach(service => {
        if (!groupedServices[service.category]) {
            groupedServices[service.category] = [];
        }
        groupedServices[service.category].push(service);
    });
    
    // Display services by category
    Object.keys(groupedServices).forEach(category => {
        const categoryHeader = document.createElement('h3');
        categoryHeader.style.cssText = 'color: #FFD700; margin-top: 20px; margin-bottom: 15px;';
        categoryHeader.textContent = `📁 ${category}`;
        list.appendChild(categoryHeader);
        
        groupedServices[category].forEach(service => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <h3>💇 ${service.name}</h3>
                <p>💰 Price: $${service.price}</p>
                <p>⏱️ Duration: ${service.duration} minutes</p>
                <p>📁 Category: ${service.category}</p>
                ${service.description ? `<p>📝 ${service.description}</p>` : ''}
                <button class="btn-delete" onclick="deleteService(${service.id})">Delete</button>
            `;
            list.appendChild(card);
        });
    });
}

// Delete service
function deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        services = services.filter(s => s.id !== id);
        localStorage.setItem('salonServices', JSON.stringify(services));
        loadServices();
        displayServices();
        updateStats();
        showNotification('🗑️ Service deleted', 'success');
    }
}

// ==================================================
// UTILITY FUNCTIONS
// ==================================================

// Update statistics
function updateStats() {
    document.getElementById('totalAppointments').textContent = appointments.length;
    document.getElementById('totalCustomers').textContent = customers.length;
    document.getElementById('totalServices').textContent = services.length;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Format time
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: bold;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Console log for debugging
console.log('🎨 Hair Salon Management System Loaded');
console.log('📊 Statistics:', {
    appointments: appointments.length,
    customers: customers.length,
    services: services.length
});