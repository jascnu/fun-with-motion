function init() {
  var canvas = document.getElementById("canvas");
  var c = canvas.getContext("2d");
  function fix_dpi() {
    let style_height = 200;
    let style_width = 400;
    let dpi = window.devicePixelRatio;
    canvas.setAttribute("height", style_height * dpi);
    canvas.setAttribute("width", style_width * dpi);
  }
  fix_dpi();

  function Circle(originX, originY, x, y, radius) {
    this.originX = originX;
    this.originY = originY;
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.draw = function(nextX, nextY, color) {
      this.x = nextX;
      this.y = nextY;
      c.beginPath();
      c.arc(nextX, nextY, this.radius, 0, 2 * Math.PI, false);
      c.strokeStyle = color;
      c.fillStyle = color;
      c.stroke();
      c.fill();
      c.closePath();
    };

    this.update = function(mouseX, mouseY) {
      let xDist = Math.abs(this.x - mouseX);
      let yDist = Math.abs(this.y - mouseY);
      let cDist = Math.sqrt(xDist * xDist + yDist * yDist);
      if (cDist < 40) {
        let mX = mouseX - this.x;
        let mY = mouseY - this.y;
        let m = mY / mX;
        let dx = Math.sign(this.x - mouse.x);
        let dy = Math.sign(this.y - mouse.y);
        this.retreat(dx, dy);
      } else if (cDist < 42) {
        this.remain();
      } else {
        this.goToStart();
      }
    };

    this.retreat = function(dx, dy) {
      this.draw(this.x + dx, this.y + dy, "white");
    };
    this.goToStart = function() {
      if (this.x != this.originX) {
        let dx = Math.sign(this.originX - this.x);
        let dy = Math.sign(this.originY - this.y);
        this.draw(this.x + dx, this.y + dy, "white");
      } else {
        this.draw(originX, originY, "white");
      }
    };

    this.remain = function() {
      this.draw(this.x, this.y, "white");
    };
  }

  var circles = [];
  var padding = 5;
  var generalRadius = 5;
  var scanX = generalRadius + padding;
  var scanY = generalRadius + padding;
  while (scanY < 185 || scanX < 400 - (generalRadius + padding)) {
    if (scanX >= 400 - (generalRadius + padding)) {
      scanX = generalRadius + padding;
      scanY += padding + generalRadius * 2;
    }

    let circle = new Circle(scanX, scanY, scanX, scanY, generalRadius, "white");
    circle.draw(scanX, scanY, "white");
    circles.push(circle);
    scanX += padding + generalRadius * 2;
  }

  console.log(circles);
  var mouse = {
    x: undefined,
    y: undefined
  };

  window.addEventListener("mousemove", function(event) {
    mouse.x = event.x - 400;
    mouse.y = event.y - 400;
  });

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(function(element) {
      element.update(mouse.x, mouse.y);
    });
  }
  animate();
}
init();
