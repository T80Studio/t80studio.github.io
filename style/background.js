
        // Set current year in copyright
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // Stars animation
        const canvas = document.getElementById('stars-canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to window size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        // Star class
        class Star {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 100;
                this.size = Math.random() * 1.5 + 0.5;
                this.speed = Math.random() * 0.8 + 0.2;
                this.opacity = Math.random() * 0.8 + 0.2;
            }
            
            update() {
                this.y -= this.speed;
                
                // Reset star when it goes off screen
                if (this.y < -10) {
                    this.reset();
                    this.y = canvas.height + 10;
                }
            }
            
            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Create stars
        const starCount = Math.floor(window.innerWidth * window.innerHeight / 3000);
        const stars = [];
        
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
            // Distribute stars throughout the canvas initially
            stars[i].y = Math.random() * canvas.height;
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                star.update();
                star.draw();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();