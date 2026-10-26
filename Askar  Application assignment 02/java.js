document.addEventListener('DOMContentLoaded', () => {

    
    const monthlySalesData = [
        { month: 'Jan', revenue: 1250, units: 3400 },
        { month: 'Feb', revenue: 1180, units: 3150 },
        { month: 'Mar', revenue: 1420, units: 3900 },
        { month: 'Apr', revenue: 1610, units: 4300 },
        { month: 'May', revenue: 1550, units: 4050 },
        { month: 'Jun', revenue: 1780, units: 4700 }
    ];

    const branchSalesData = [
        { branch: 'Colombo', q2Revenue: 2450 },
        { branch: 'Kandy', q2Revenue: 1320 },
        { branch: 'Galle', q2Revenue: 1170 }
    ];


    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navbar = document.getElementById('navbar');

    if (hamburgerBtn && navbar) {
        hamburgerBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            
            const icon = hamburgerBtn.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    
    function calculateKPIs() {
        const totalRevenue = monthlySalesData.reduce((sum, item) => sum + item.revenue, 0);
        const totalUnits = monthlySalesData.reduce((sum, item) => sum + item.units, 0);
        const bestMonthObj = monthlySalesData.reduce((max, item) => item.revenue > max.revenue ? item : max, monthlySalesData[0]);
        const bestBranchObj = branchSalesData.reduce((max, item) => item.q2Revenue > max.q2Revenue ? item : max, branchSalesData[0]);

        document.getElementById('kpi-revenue').textContent = `LKR ${totalRevenue.toLocaleString()} ('000)`;
        document.getElementById('kpi-units').textContent = totalUnits.toLocaleString();
        document.getElementById('kpi-best-month').textContent = `${bestMonthObj.month} (${bestMonthObj.revenue}k)`;
        document.getElementById('kpi-best-branch').textContent = `${bestBranchObj.branch}`;
    }

    calculateKPIs();

    /* Render Charts */
    const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
    const textColor = isDarkMode ? '#0d0a0a' : '#1b4d80';
    const gridColor = isDarkMode ? '#0b0909' : '#d71616';

    // Line Chart
    const ctxLine = document.getElementById('monthlyRevenueChart').getContext('2d');
    const monthlyRevenueChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: monthlySalesData.map(item => item.month),
            datasets: [{
                label: 'Monthly Revenue (LKR \'000)',
                data: monthlySalesData.map(item => item.revenue),
                borderColor: '#2e7d32',
                backgroundColor: 'rgba(46, 125, 50, 0.15)',
                borderWidth: 3,
                fill: true,
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: textColor } },
                tooltip: { enabled: true }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Month', color: textColor },
                    ticks: { color: textColor },
                    grid: { color: gridColor }
                },
                y: {
                    title: { display: true, text: 'Revenue (LKR \'000)', color: textColor },
                    ticks: { color: textColor },
                    grid: { color: gridColor },
                    beginAtZero: false
                }
            }
        }
    });

    
    const ctxBar = document.getElementById('branchRevenueChart').getContext('2d');
    const branchRevenueChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: branchSalesData.map(item => item.branch),
            datasets: [{
                label: 'Q2 Revenue (LKR \'000)',
                data: branchSalesData.map(item => item.q2Revenue),
                backgroundColor: [
                    'rgba(46, 125, 50, 0.85)',
                    'rgba(2, 136, 209, 0.85)',
                    'rgba(245, 124, 0, 0.85)'
                ],
                borderColor: [
                    '#2e7d32',
                    '#0288d1',
                    '#f57c00'
                ],
                borderWidth: 1.5,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Branch', color: textColor },
                    ticks: { color: textColor },
                    grid: { display: false }
                },
                y: {
                    title: { display: true, text: 'Q2 Revenue (LKR \'000)', color: textColor },
                    ticks: { color: textColor },
                    grid: { color: gridColor },
                    beginAtZero: true
                }
            }
        }
    });

    
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.body.setAttribute('data-theme', newTheme);
            
            const icon = themeToggleBtn.querySelector('i');
            if (newTheme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }

            const updatedTextColor = newTheme === 'dark' ? '#e0e0e0' : '#2c3e50';
            const updatedGridColor = newTheme === 'dark' ? '#333333' : '#e0e0e0';

            [monthlyRevenueChart, branchRevenueChart].forEach(chart => {
                chart.options.scales.x.ticks.color = updatedTextColor;
                chart.options.scales.x.title.color = updatedTextColor;
                chart.options.scales.y.ticks.color = updatedTextColor;
                chart.options.scales.y.title.color = updatedTextColor;
                chart.options.scales.y.grid.color = updatedGridColor;
                chart.update();
            });
        });
    }
});