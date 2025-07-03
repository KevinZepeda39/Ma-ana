document.addEventListener('DOMContentLoaded', function() {
    // Canvas Visualization
    const canvas = document.getElementById('techCanvas');
    const ctx = canvas.getContext('2d');
    let animationId = null;
    let isAnimating = false;
    
    // Set canvas size
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = 400; // Fixed height
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Data visualization
    function startVisualization() {
        if (isAnimating) return;
        
        isAnimating = true;
        const dataPoints = Array.from({length: 20}, () => Math.random() * 100);
        const colors = ['#0d6efd', '#20c997', '#fd7e14', '#dc3545', '#6f42c1'];
        
        function animate() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw grid
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            
            // Vertical grid lines
            for (let x = 0; x <= canvas.width; x += 50) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            
            // Horizontal grid lines
            for (let y = 0; y <= canvas.height; y += 50) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            
            // Update data points with some randomness
            dataPoints.forEach((point, i) => {
                dataPoints[i] = Math.max(10, Math.min(90, point + (Math.random() * 6 - 3)));
            });
            
            // Draw data points
            const segmentWidth = canvas.width / (dataPoints.length - 1);
            
            ctx.lineWidth = 3;
            ctx.lineJoin = 'round';
            
            // Draw line
            ctx.beginPath();
            ctx.moveTo(0, canvas.height - (dataPoints[0] / 100 * canvas.height));
            
            for (let i = 1; i < dataPoints.length; i++) {
                const x = i * segmentWidth;
                const y = canvas.height - (dataPoints[i] / 100 * canvas.height);
                ctx.lineTo(x, y);
            }
            
            ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.stroke();
            
            // Draw points
            for (let i = 0; i < dataPoints.length; i++) {
                const x = i * segmentWidth;
                const y = canvas.height - (dataPoints[i] / 100 * canvas.height);
                
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                ctx.fill();
            }
            
            // Add some random tech elements
            if (Math.random() > 0.7) {
                drawTechElement();
            }
            
            animationId = requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    function drawTechElement() {
        const elements = ['circle', 'square', 'triangle', 'hexagon'];
        const type = elements[Math.floor(Math.random() * elements.length)];
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 10 + Math.random() * 30;
        const opacity = 0.2 + Math.random() * 0.3;
        const color = `rgba(32, 201, 151, ${opacity})`;
        
        ctx.fillStyle = color;
        
        switch(type) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(x, y, size/2, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'square':
                ctx.fillRect(x - size/2, y - size/2, size, size);
                break;
                
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(x, y - size/2);
                ctx.lineTo(x + size/2, y + size/2);
                ctx.lineTo(x - size/2, y + size/2);
                ctx.closePath();
                ctx.fill();
                break;
                
            case 'hexagon':
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = i * Math.PI / 3;
                    const px = x + size/2 * Math.cos(angle);
                    const py = y + size/2 * Math.sin(angle);
                    if (i === 0) {
                        ctx.moveTo(px, py);
                    } else {
                        ctx.lineTo(px, py);
                    }
                }
                ctx.closePath();
                ctx.fill();
                break;
        }
    }
    
    function stopVisualization() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        isAnimating = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    // Button events
    document.getElementById('startViz').addEventListener('click', startVisualization);
    document.getElementById('stopViz').addEventListener('click', stopVisualization);
    
    // Form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        this.reset();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initial visualization
    drawInitialState();
    
    function drawInitialState() {
        ctx.fillStyle = '#212529';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Haz clic en "Iniciar Visualización" para comenzar', canvas.width/2, canvas.height/2);
    }
});