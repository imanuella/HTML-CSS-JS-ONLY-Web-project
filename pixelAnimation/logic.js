window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const contex = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
        constructor(effect, x, y , colour){
            this.effect = effect;
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.originX = Math.floor(x);
            this.originY =  Math.floor(y);
            this.colour = colour;
            this.size = this.effect.gap;
            this.vx = 0;
            this.vy = 0;
            this.ease = 0.3;
            this.distanceX = 0;
            this.distanceY = 0;
            this.distance = 0;
            this.force = 0;
            this.angle = 0;
            this.friction = 0.9;
        }
        draw(ctx){
            ctx.fillStyle = this.colour;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
        update(){
            this.distanceX = this.effect.mouse.x - this.x;
            this.distanceY = this.effect.mouse.y - this.y;
            this.distance = this.distanceX * this.distanceX + this.distanceY * this.distanceY;
            this.force = -this.effect.mouse.radius / this.distance;

            if (this.distance < this.effect.mouse.radius){
                this.angle = Math.atan2(this.distanceY, this.distanceX);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);

            }

            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        }
    }

    class Effect {
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.particlearray = [];
            this.img1 = document.getElementById('img1');
            this.centerX = this.width * 0.5;
            this.centerY = this.height * 0.5;
            this.x = this.centerX - this.img1.width * 0.5;
            this.y = this.centerY - this.img1.height * 0.5;
            this.gap = 3;
            this.mouse = {
                radius: 2700,
                x: undefined,
                y: undefined
            }
            window.addEventListener('mousemove', event => {
                this.mouse.x = event.x;
                this.mouse.y = event.y;

            });
        }

        initialize(contex){
            contex.drawImage(this.img1, this.x, this.y);
            const pixel = contex.getImageData(0, 0, this.width, this.height).data;
            for (let y = 0; y < this.height; y += this.gap){
                for (let x = 0; x < this.width; x += this.gap){
                    const index = (y * this.width + x) * 4;
                    const r = pixel[index];
                    const g = pixel[index + 1];
                    const b = pixel[index + 2];
                    const a = pixel[index + 3];
                    const colour = 'rgb(' + r + ',' + g + ',' + b + ')';

                    if (a > 0){
                        this.particlearray.push(new Particle(this, x, y, colour));
                    }
                }                
            }

            
        }
        draw(ctx){
            this.particlearray.forEach(particle => particle.draw(ctx));
            
        }
        update(){
            this.particlearray.forEach(particle => particle.update());
        }

    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.initialize(contex);


    function animation(){
        contex.clearRect(0, 0 , canvas.width, canvas. height)
        effect.draw(contex);
        effect.update();

        requestAnimationFrame(animation);

    }

    animation();

    
})