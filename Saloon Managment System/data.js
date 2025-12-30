// Hair Salon Management System - Data File
// This file stores default data and data structures

// Default Services
const defaultServices = [
    {
        id: 1,
        name: "Men's Haircut",
        price: 25,
        duration: 30,
        category: "Hair Cut",
        description: "Classic men's haircut with styling"
    },
    {
        id: 2,
        name: "Women's Haircut",
        price: 45,
        duration: 45,
        category: "Hair Cut",
        description: "Professional women's haircut with blow dry"
    },
    {
        id: 3,
        name: "Hair Coloring",
        price: 80,
        duration: 120,
        category: "Hair Color",
        description: "Full hair coloring service"
    },
    {
        id: 4,
        name: "Hair Styling",
        price: 35,
        duration: 30,
        category: "Styling",
        description: "Special occasion hair styling"
    },
    {
        id: 5,
        name: "Hair Treatment",
        price: 50,
        duration: 60,
        category: "Hair Treatment",
        description: "Deep conditioning and hair repair treatment"
    }
];

// Initialize data from localStorage or use defaults
let appointments = JSON.parse(localStorage.getItem('salonAppointments')) || [];
let customers = JSON.parse(localStorage.getItem('salonCustomers')) || [];
let services = JSON.parse(localStorage.getItem('salonServices')) || defaultServices;

// Save initial services if not exists
if (!localStorage.getItem('salonServices')) {
    localStorage.setItem('salonServices', JSON.stringify(services));
}

// Sample Stylists (can be extended)
const stylists = [
    "Sarah Johnson",
    "Mike Brown",
    "Emma Wilson",
    "John Davis",
    "Lisa Anderson"
];

// Service Categories
const serviceCategories = [
    "Hair Cut",
    "Hair Color",
    "Hair Treatment",
    "Styling",
    "Other"
];

// Working Hours
const workingHours = {
    start: "09:00",
    end: "18:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};

// Salon Information
const salonInfo = {
    name: "Elite Hair Salon",
    address: "123 Fashion Street, City Center",
    phone: "+1 234 567 8900",
    email: "info@elitesalon.com",
    website: "www.elitesalon.com"
};