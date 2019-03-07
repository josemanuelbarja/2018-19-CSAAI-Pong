function main()
{
  console.log('PONG: MAIN: Start!');

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  window.onkeydown = (e) => {
    e.preventDefault();
    console.log(e.key);
    if (e.key == 'a'){
      console.log('Tecla A apretada');
    }
  }
  //-- Raquetas:

/*
  ctx.fillStyle = 'white';
  ctx.fillRect(50,100,10,40)
  ctx.fillRect(500,100,10,40)
  //-- Red Centro
  ctx.setLineDash([10,12])
  ctx.moveTo(300,0)
  ctx.lineTo(300,400)
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'white';
  ctx.stroke();
  //-- Bola
  //ctx.fillRect(400,200,5,5)
  //-- Puntuacion
  ctx.font = "80px Arial";
  ctx.fillStyle = 'white';
  ctx.fillText("0",220,70);
  ctx.fillText("2",340,70);
*/
  //--Animacion

  var bola = {
    x_ini: 50,
    y_ini: 50,

    x: 0,
    y: 0,

    vx: 20,
    vy: 1,

    ctx: null,

    width: 5,
    height: 5,

    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    },
    init: function(ctx) {
      console.log("Bola: Init");
      this.reset();
      this.ctx = ctx;
    },
    draw: function() {
      console.log("Bola: draw");
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    update: function () {
      console.log("Bola: update");
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    },
  }

  bola.init(ctx);
  bola.draw();

  var timer = null;

  var sacar  = document.getElementById('sacar');

  sacar.onclick = () => {
    console.log("Click");
    //-- Lanzar el timer (si es que no estaba ya lanzado)
    if(!timer) {
      timer = setInterval(() => {
        console.log("tic");
        //-- Actualizar la bola
        bola.update()
        //-- Partir de un canvas limpio
        ctx.clearRect(0,0, canvas.width, canvas.height)
        //-- Dibujar la bola
        bola.draw()
        //--Condicion de terminacion
        if(bola.x > canvas.width) {
          clearInterval(timer);
          timer = null;
          bola.reset();
          bola.draw();
        }
      },20);
    }
  }
}
