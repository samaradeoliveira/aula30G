//importação de módulos necessários
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

//chão, fruta, corda, restrição
var ground, fruit, rope, fruit_con;

//variáveis de imagens: fundo, fruta, coelho
var bgImg, fruitImg, bunnyImg;

//variável para sprite do coelho 


//variável para botão cortar
var button;

function preload() {
  //CARREGAMENTO DE IMAGEM
  bgImg = loadImage('background.png');
  fruitImg = loadImage('melon.png');
  //carregar a imagem do coelho na variável


}

function setup() {
  createCanvas(500, 700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //criar o botão cortar aqui
  button = createImg("cut_btn.png");
  button.position(220, 30);
  button.size(50,50);
  button.mouseClicked(drop);




  //CHÃO
  ground = new Ground(200, 700, 600, 20);

  //CORDA, FRUTA E MESMO COMPORTAMENTO ENTRE OBJETOS
  rope = new Rope(7, { x: 245, y: 30 });

  //corpo da frutinha
  fruit = Bodies.circle(300, 300, 20);
  //fruta está fazendo parte da composição da corda
  Matter.Composite.add(rope.body, fruit);

  //sprite do coelho e suas características 






  //LINCANDO A CORDA COM A FRUTA ATRAVÉS DA CLASSE LINK
  fruit_con = new Link(rope, fruit);

  ellipseMode(RADIUS);
}

function draw() {
  background(0);

  //rect(0,0, windowWidth, windowHeight);
  //EXIBIÇÃO DA IMAGEM DE FUNDO
  image(bgImg, 0, 0, windowWidth, windowHeight);

 
  //ellipse( fruit.position.x, fruit.position.y, 70, 70);
  //exibição da fruta
  imageMode(CENTER);
  image(fruitImg, fruit.position.x, fruit.position.y, 70, 70);

  //EXIBIÇÃO DA CORDA E DO CHÃO
  rope.show();
  ground.show();

  //desenhar sprite do coelho (drawSprites)


  Engine.update(engine);
}

//criar função drop, nome: drop
function drop(){
  rope.break();
  fruit_con.dettach();
  fruit_con=null;
}