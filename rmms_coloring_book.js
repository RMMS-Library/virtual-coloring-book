let pages = [];
let canvas, canvasWidth, canvasHeight;
let brushSize = 20;
let pageNumber = 0;
let number_of_pages = 10

function preload() {
  for (let i = 0; i < number_of_pages; i++) {
    pages.push(loadImage(`pages/page_${i}.jpg`));
  }
}

function setup() {
  showModal();

  let defaultPage = pages[pageNumber];

  canvasWidth = (windowHeight*defaultPage.width)/defaultPage.height;
  canvasHeight = windowHeight - 50;

  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("canvasContainer");

  // Set Palette Button Colors
  $("#palette").children("button").each( function() {
    let rgb = $(this).attr("data-rgb").split(",");
    $(this).css("background-color", `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
  });

  // Set Page Thumbnails
  $("#pages").children("button").each( function() {
    let pageNumber = $(this).attr("data-page-number");
    $(this).css("background-image", `url("pages/page_${pageNumber}.jpg")`);
  });

  // Help Button
  $("#helpButton").on("click", showModal);

  // Palette Buttons
  $("#palette button").on("click", function(){
    changeColor($(this));
  });

  // Brush Size Slider
  $("#brushSize").on("change", changeBrushSize);

  // Pages Buttons
  $("#pages button").on("click", function(){
    changePage($(this));
  });

  // Clear Button
  $("#clear").on("click", clearPage);

  // Save Button
  $("#save").on("click", savePage);

  // Display Default Page
  image(defaultPage, 0, 0, canvasWidth, canvasHeight);

  noStroke();
  colorMode(RGB, 255, 255, 255, 1);
  fill(211, 47, 47, 0.1);
}

function draw() {
  if (mouseIsPressed) {
    ellipse(mouseX, mouseY, brushSize);
  }
}

// Event Callbacks
function showModal() {
  $("#instructions").modal("show");
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
  image(pages[pageNumber], 0, 0, canvasWidth, canvasHeight);
}

function clearPage() {
  image(pages[pageNumber], 0, 0, canvasWidth, canvasHeight);
}

function savePage() {
  saveCanvas(canvas, "The Possible Book.jpg");
}
