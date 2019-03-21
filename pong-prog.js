//-- Exceso de codigo en ordenes de palas (unificar una vez terminado)
//-- Crear a modo constructor (new Pala, mismas ordenes para cada una)

//--Archivo con log de cada proceso y mas recursos en "/Users/josemanuelbarja/Desktop/copiapong.js"

function main()
{
  console.log('PONG: MAIN: Start!');

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  var netdraw = function () {
    ctx.setLineDash([10,12])
    ctx.moveTo(300,0) //desde
    ctx.lineTo(300,400) //hasta
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }

  var make_random = function (a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
  }

  var sign_random = function (a) {
    n = Math.round(Math.random());
    if (n == 1){
      a = a * -1
    }
    return a
  }

  var bin_random = function () {
    return Math.round(Math.random());
  }

  var sett = {
    status: null,
    ia: null,
    level: null,
  }

  //--Animacion

  var score = {

    scor1_ini: 0,
    scor2_ini: 0,

    scor1: 0,
    scor2: 0,

    ctx: null,

    reset: function () {
      this.scor1 = this.scor1_ini;
      this.scor2 = this.scor2_ini;
    },

    init: function () {
      this.reset();
      this.ctx = ctx;
    },
    draw: function() {
      ctx.font = "80px Arial";
      ctx.fillStyle = 'white';
      ctx.fillText(this.scor1,220,70);
      ctx.fillText(this.scor2,340,70);
    },
  }

  var racks = {
    //-- P1:
    x1_ini: 50,
    y1_ini: 100,

    x1: 0,
    y1: 0,

    //-- P2:

    x2_ini: 500,
    y2_ini: 100,

    x2: 0,
    y2: 0,

    //-- Comun:

    vx: 0, //movimiento horizontal
    vy: 0, //movimiento vertical

    ctx: null,

    width: 10,
    height: 40,

    reset: function() {
      this.x1 = this.x1_ini;
      this.y1 = this.y1_ini;
      this.x2 = this.x2_ini;
      this.y2 = this.y2_ini;
      //-- Velocidad de animacion
      this.vy1 = 0;
      this.vy2 = 0;
    },

    init: function(ctx) {
      this.reset();
      this.ctx = ctx;
    },

    draw: function() {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x1, this.y1, this.width, this.height);
      this.ctx.fillRect(this.x2, this.y2, this.width, this.height);
    },
    update: function () {
      window.onkeydown = (e) => {
        e.preventDefault();
        switch (e.key) {
          case "w":
            //-- Comprobacion limite superior y mover
            if (this.y1 > 0) {
              this.vy1 = -5;
            }
            break;
          case "s":
            //-- Comprobacion limite inferior y mover
            if (this.y1 < canvas.height -40) {
              this.vy1 = 5;
            }
            break;
          case "ArrowUp":
            //-- Comprobacion limite superior y mover
            if (this.y2 > 0) {
              this.vy2 = -5;
            }
            break;
          case "ArrowDown":
            //-- Comprobacion limite inferior y mover
            if (this.y2 < canvas.height -40) {
              this.vy2 = 5;
            }
            break;
          default:
            break;
        }
      }
      window.onkeyup = (e) => {
        e.preventDefault();
        switch (e.key) {
          case "w":
            //-- Comprobacion limite superior y mover
            if (this.y1 > 0) {
              this.vy1 = 0;
            }
            break;
          case "s":
            //-- Comprobacion limite inferior y mover
            if (this.y1 < canvas.height -40) {
              this.vy1 = 0;
            }
            break;
          case "ArrowUp":
            //-- Comprobacion limite superior y mover
            if (this.y2 > 0) {
              this.vy2 = 0;
            }
            break;
          case "ArrowDown":
            //-- Comprobacion limite inferior y mover
            if (this.y2 < canvas.height -40) {
              this.vy2 = 0;
            }
            break;
          default:
            break;
        }
      }
      this.y1 = this.y1 + this.vy1;
      this.y2 = this.y2 + this.vy2;
    }
  }

  var bola = {

    x_ini: 0,
    y_ini: make_random(100,300),

    x: 0,
    y: 0,

    vx: 0,
    vy: 0,

    ctx: null,

    width: 5,
    height: 5,

    reset: function() {
      //--Vel. Level
      this.vx = make_random(2,6); //--Movimiento horizontal
      remind = 6 - this.vx; //--Movimiento vertical
      this.vy = sign_random(remind)
      console.log(this.vx);
      console.log(this.vy);
      //--Init. Position
      nbin = bin_random()
      if (nbin == 1) {
        this.x_ini = 450;
        this.vx = -this.vx;
      }else{
        this.x_ini = 100;
      }
      this.x = this.x_ini;
      this.y = this.y_ini;

    },
    init: function(ctx) {
      this.reset();
      this.ctx = ctx;
    },
    draw: function() {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    update: function () {
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    },
  }

  netdraw();
  racks.init(ctx);
  racks.draw();
  bola.init(ctx);
  bola.draw();
  score.init(ctx);
  score.draw();

  var timer = null;

  var sacar  = document.getElementById('sacar');

  sacar.onclick = () => {
    console.log("Click");
    //-- Lanzar el timer (si es que no estaba ya lanzado)
    if(!timer) {
      timer = setInterval(() => {
        //-- Actualizar elementos
        racks.update()
        bola.update()
        //-- Partir de un canvas limpio
        ctx.clearRect(0,0, canvas.width, canvas.height)
        //-- Dibujar los elementos
        racks.draw()
        bola.draw()
        score.draw()
        netdraw()
        //--Condicion de terminacion
        if(bola.x > canvas.width || bola.x < -10) {
          if(bola.x > canvas.width){
            //--Aumentar marcador 1
            score.scor1 = score.scor1 + 1;
          }else if (bola.x < -10) {
            //--Aumentar marcador 2
            score.scor2 = score.scor2 + 1;
          }
          clearInterval(timer);
          timer = null;
          racks.reset();
          bola.reset();
          bola.draw();
        }
        //-- Rebote
        if(bola.y > canvas.height || bola.y < 0){
          bola.vy = -bola.vy;
        }
        //-- Igualar rangos:
        //codigo repetido
        if (bola.x < 55){
          ptop = racks.y1;
          pbott = racks.y1 + racks.height;
          pleft = racks.x1;
          pright = racks.x1 + racks.width;
          btop = bola.y;
          bbott = bola.y + bola.height;
          bleft = bola.x;
          bright = bola.x + bola.width;
          if (bright > pleft && btop < pbott && bleft < pright && bbott > ptop){
            bola.vx = -bola.vx
          }
        }else if (bola.x > 445) {
          ptop = racks.y2;
          pbott = racks.y2 + racks.height;
          pleft = racks.x2;
          pright = racks.x2 + racks.width;
          btop = bola.y;
          bbott = bola.y + bola.height;
          bleft = bola.x;
          bright = bola.x + bola.width;
          if (bright > pleft && btop < pbott && bleft < pright && bbott > ptop){
            bola.vx = -bola.vx
          }
        }
      },20);
    }
  }
}
