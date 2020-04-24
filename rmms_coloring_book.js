let pages = [];
let canvas, canvasWidth;
let brushSize = 20;
let pageNumber = 0;

function preload() {
  pages.push(loadImage("pages/cover.jpg"));

  for (let i = 0; i < 9; i++) {
    pages.push(loadImage(`pages/page_${i+1}.jpg`));
  }
}

function setup() {
  $("#instructions").modal("show");

  let img = pages[pageNumber];

  canvasWidth = (windowHeight*img.width)/img.height;
  canvas = createCanvas(canvasWidth, windowHeight - 50);
  canvas.parent("canvasContainer");

  $("#helpButton").on("click", function() {
    $("#instructions").modal("show");
  });

  $("#palette").children("button").each( function() {
    let rgb = $(this).attr("data-rgb").split(",");
    $(this).css("background-color", `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
  });

  $("#pages").children("button").each( function() {
  let fileName = $(this).attr("data-file-name");
  $(this).css("background-image", `url("pages/${fileName}.jpg")`);
});

  $("#palette button").on("click", function(){
    changeColor($(this));
  });

  $("#brushSize").on("change", function(){
    changeBrushSize();
  });

  $("#pages button").on("click", function(){
    changePage($(this));
  });

  $("#clear").on("click", function() {
    clearPage();
  });

  $("#save").on("click", function() {
    savePage();
  });

  image(img, 0, 0, canvasWidth, windowHeight - 50);

  noStroke();
  colorMode(RGB, 255, 255, 255, 1);
  fill(255, 0, 0, 0.1);
}

function draw() {
  if (mouseIsPressed) {
    ellipse(mouseX, mouseY, brushSize, brushSize);
  }
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    saveCanvas(canvas, "coloring_page.png");
  }
}

function changeColor(button) {
  let rgb = button.attr("data-rgb").split(",");
  fill(rgb[0], rgb[1], rgb[2], 0.1);
}

function changeBrushSize() {
  brushSize = $("#brushSize").val();
}

function changePage(button) {
  pageNumber = button.attr("data-page-number");
  image(pages[pageNumber], 0, 0, canvasWidth, windowHeight - 50);
}

function clearPage() {
  image(pages[pageNumber], 0, 0, canvasWidth, windowHeight - 50);
}

function savePage() {
  saveCanvas(canvas, "The Possible Book.jpg");
}
