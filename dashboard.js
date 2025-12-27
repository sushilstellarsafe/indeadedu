// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const profileLink = document.getElementById('profile-link');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Sidebar Toggle
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('shifted');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
                mainContent.classList.remove('shifted');
            }
        }
    });

    // Dropdown Toggles
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('open');
        });
    });

    // Navigation Link Handler
    function showPage(pageId) {
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(pageId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('shifted');
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Nav Link Click Handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.classList.contains('dropdown-toggle')) {
                return; // Let dropdown handler manage this
            }

            e.preventDefault();
            const pageId = this.getAttribute('data-page');

            if (pageId && pageId !== 'enrolled-classes') {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Show the page
                showPage(pageId);
            }
        });
    });

    // Profile Link Handler
    profileLink.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        showPage('profile');
    });

    // Profile Image Upload
    const fileUpload = document.getElementById('file-upload');
    const profileImg = document.getElementById('profile-img');

    if (fileUpload) {
        fileUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                // Check file type
                if (!file.type.match('image/jpeg') && !file.type.match('image/jpg')) {
                    alert('Please upload only JPEG or JPG files.');
                    return;
                }

                // Check file size (3MB = 3 * 1024 * 1024 bytes)
                if (file.size > 3 * 1024 * 1024) {
                    alert('File size should be less than 3 MB.');
                    return;
                }

                // Read and display the image
                const reader = new FileReader();
                reader.onload = function(event) {
                    profileImg.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Calendar Functionality
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();

    // Sample events data - you can customize this
    const eventsData = {
        '0-2025': { // January 2025
            events: [5, 12, 19],
            exams: [15, 28],
            holidays: [1, 26]
        },
        '11-2024': { // December 2024
            events: [8, 15, 22],
            exams: [12, 20],
            holidays: [25, 31]
        }
    };

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Get first day of month and last date
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        
        // Get today's date for comparison
        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
        const todayDate = today.getDate();

        // Update header
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthYear.textContent = `${monthNames[month]} ${year}`;

        // Get events for this month
        const monthKey = `${month}-${year}`;
        const monthEvents = eventsData[monthKey] || { events: [], exams: [], holidays: [] };

        // Clear calendar grid
        calendarGrid.innerHTML = '';

        // Add day names
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'day-name';
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });

        // Add empty cells before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            calendarGrid.appendChild(emptyCell);
        }

        // Add date cells
        for (let date = 1; date <= lastDate; date++) {
            const dateCell = document.createElement('div');
            dateCell.className = 'date';
            dateCell.textContent = date;

            // Highlight today
            if (isCurrentMonth && date === todayDate) {
                dateCell.classList.add('today');
            }

            // Add event markers
            if (monthEvents.events.includes(date)) {
                const marker = document.createElement('div');
                marker.className = 'event-marker event';
                dateCell.appendChild(marker);
            }
            if (monthEvents.exams.includes(date)) {
                const marker = document.createElement('div');
                marker.className = 'event-marker exam';
                dateCell.appendChild(marker);
            }
            if (monthEvents.holidays.includes(date)) {
                const marker = document.createElement('div');
                marker.className = 'event-marker holiday';
                dateCell.appendChild(marker);
            }

            calendarGrid.appendChild(dateCell);
        }
    }

    // Calendar navigation
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    // Initialize calendar
    renderCalendar();

    // Timetable Search Functionality
    const timetableSearch = document.getElementById('timetable-search');
    if (timetableSearch) {
        timetableSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const table = this.closest('.content-card').querySelector('.data-table');
            const rows = table.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Initialize with profile page
    showPage('profile');

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.add('active');
            mainContent.classList.add('shifted');
        } else {
            sidebar.classList.remove('active');
            mainContent.classList.remove('shifted');
        }
    });

    // Set initial state based on screen size
    if (window.innerWidth > 768) {
        sidebar.classList.add('active');
        mainContent.classList.add('shifted');
    }
});