function Player(x, y) {
    this.x = x;
    this.y = y;
    this.xspeed = 0;
    this.yspeed = 0;
    this.friction = 0.25;
    this.maxSpeed = 10;
    this.width = 50;
    this.height = 100;
    this.active = true;

    this.step = function() {
			// Movment 
			if (this.active) {
				// Horizontal Movement
				if (!leftKey && !rightKey || leftKey && rightKey) {
					// Slow down
					this.xspeed *= this.friction;
				} else if (rightKey) {
					this.xspeed ++;
				} else if (leftKey) {
					this.xspeed --;
				}

				// Vertical Movement
				if (upKey) {
					// Check if on ground
					this.yspeed -= 15;
				}

				// Apply Gravity
				this.yspeed += 5;

				// Coreect Speed
				if (this.xspeed > this.maxSpeed) {
						this.xspeed = this.maxSpeed;
				} else if (this.xspeed < -this.maxSpeed) {
						this.xspeed = -this.maxSpeed;
				}
				if (this.yspeed > this.maxSpeed) {
						this.yspeed = this.maxSpeed;
				} else if (this.yspeed < -this.maxSpeed) {
						this.yspeed = -this.maxSpeed;
				}
				if (this.xspeed > 0) {
					this.xspeed = Math.floor(this.xspeed);
				} else {
					this.xspeed = Math.ceil(this.xspeed);
				}
				if (this.yspeed > 0) {
					this.yspeed = Math.floor(this.yspeed);
				} else {
					this.yspeed = Math.ceil(this.yspeed);
				}

				// Horizontal Collision Rect
				let horizontalRect = {
					x: this.x + this.xspeed,
					y: this.y,
					width: this.width,
					height: this.height
				}
				// Vertical Collision Rect
				let verticalRect = {
					x: this.x,
					y: this.y + this.yspeed,
					width: this.width,
					height: this.height
				}

				// Check for intersections
				for (let i = 0; i < borders.length; i++) {
					let borderRect = {
						x: borders[i].x,
						y: borders[i].y,
						width: borders[i].width,
						height: borders[i].height
					}

					if (checkIntersection(horizontalRect, borderRect)) {
						while (checkIntersection(horizontalRect, borderRect)) {
							horizontalRect.x -= Math.sign(this.xspeed);
						}
						this.x = horizontalRect.x;
						this.xspeed = 0;
					}

					if (checkIntersection(verticalRect, borderRect)) {
						while (checkIntersection(verticalRect, borderRect)) {
							verticalRect.y -= Math.sign(this.yspeed);
						}
						this.y = verticalRect.y;
						this.yspeed = 0;
					}
				}

				this.x += this.xspeed;
				this.y += this.yspeed;
			}
    }

    this.draw = function() {
			ctx.fillStyle = "green";
			ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}