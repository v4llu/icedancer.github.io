function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");
  this.scoreContainer   = document.querySelector(".score-container");
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  this.buttonsContainer = document.querySelector(".lower-container");
  this.info             = document.querySelector(".info");
  this.dogeSays = document.querySelector(".doge-says");
  this.katkoViesti = document.querySelector(".katkoviesti");
  this.katkoContainerColor = document.querySelector(".katko-container-color");

  this.score = 0;

}

dogeSayings = [
  // En jaksanu lajitella :D
  'Hitto ku pelottaa',
  'Simppa sponssaa!!',
  'Voitko vaa puhuu suomee lol',
  'Kauhuleffat <3',
  'Rip 1.0',
  'Halloween <3',
  'Joinaa Discord Servulle!', // legit joinaa
  'Karkki vai kepponen?', // halloween.jpg
  'Oisko tappaa?', // pikkunen referenssi
  'Lainaatko sun laturii?', // No en hitsis
  'Tuu kauppaa', // Tarmon lempisana
  'Millo mopokortti?', // Miks kysytää nii paljo???
  'eduskunta.cf', // Mainostus on kivaa
  'Kymppi tulee!', // Osmolla nii rankkoja kokeit et en usko :D
  'Sage rakastaa halloweenia!', // Terveisin Lauri (Peitenimi)
  'Kuka pieras?', // tää
  'Helppoo ku mikä!', // Meikä compis
  'Meneekö kukaa uimaa?', // Ei hitos
  'Maksan takas!', // POV: liikkatunti
  'Osuu G-Spottii',  // En selityst
  'Hui vi**u mä säikähdin', // no jep
  'Kellarin vessa suljettu.', // 09 vapettaa liian lujaa siel
  'Millo ruokailu?', // Ei niit opettajia kiinnosta
  'Kuvist saatu luvat!', // Opettajille viesti
  'Sisu möläytti!', // fak juu
  'Mee rehtorille' // Kuuluisat viimeiset sanat
]

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;

  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);

    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });

    self.updateScore(metadata.score);
    self.updateBestScore(metadata.bestScore);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // You lose
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continue = function () {
  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile) {
  var self = this;

  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];

  if (tile.value > 2048) classes.push("tile-super");

  this.applyClasses(wrapper, classes);

  inner.classList.add("tile-inner");
  inner.textContent = tile.value;

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);

  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);
  this.clearContainer(this.dogeSays);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (this.score > 1000)
      {
          this.katkoContainerColor.setAttribute('style', 'background-color: #0c0!important');

      }
      else {
          this.katkoContainerColor.setAttribute('style', 'background-color: #c00!important');
      }


   var snd;

  if (difference > 0) {

    snd = new Audio("https://oispalyseolla.ml/snd/pen/pencil_scribble" + Math.floor(Math.random() * 3).toString() + ".mp3")

    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;
    this.scoreContainer.appendChild(addition);

    var message = dogeSayings[Math.floor(Math.random() * dogeSayings.length)];
    var messageElement = document.createElement("p");
    messageElement.textContent = message
    var left = 'left:' + Math.round(Math.random() * 20 + 30) + '%;'
    var top = 'top:' + Math.round(Math.random() * 20 + 20) + '%;'

    //var color = 'color: rgb(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ');'
    var color = 'color: white; text-shadow:0px 0px 50px #000000;}';
    var styleString = left + top + color
    messageElement.setAttribute('style', styleString);
    this.dogeSays.appendChild(messageElement);

  }
  else
  {
    snd = new Audio("https://oispalyseolla.ml/snd/paper/page_turning" + Math.floor(Math.random() * 3).toString() + ".mp3");
  }

  snd.play();
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.message = function (won) {
  var type    = won ? "game-won"  : "game-over";
  var message = won ? "Selviydyit Halloweenista!" : "Karkkisi varastettiin :(";

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;
  this.buttonsContainer.setAttribute('style', 'display: none!important;');

};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
    this.buttonsContainer.setAttribute('style', '');
};

HTMLActuator.prototype.showInfo = function () {
  if ( this.info.getAttribute('style') === "display:block;"){
    this.info.setAttribute('style','display:none;');
  } else {
    this.info.setAttribute('style','display:block;'); }
};

HTMLActuator.prototype.hideInfo = function () {
    this.info.setAttribute('style','display:none;');
};

HTMLActuator.prototype.goKatko = function () {

    snd = new Audio("https://oispalyseolla.ml/snd/katkolle.mp3");
    snd.play();

    this.clearContainer(this.scoreContainer);
    this.clearContainer(this.katkoViesti);
    this.clearContainer(this.dogeSays);
    this.scoreContainer.textContent = this.score-1000;

    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "-1000";
    this.scoreContainer.appendChild(addition);

    //var message = "KATKOLLE!";
    var messageElement = document.createElement("img");
    messageElement.setAttribute('src',"https://oispalyseolla.ml/img/katko.png");
    //messageElement.textContent = message;
    //var left = 'left: 37%;';
    //var top = 'top: 10%;';

    //var color = 'color: rgb(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ');'
    //var color = 'font-weight: bold; color: black; text-shadow:0px 0px 50px #ff0000;}';
    //var styleString = left + top;
    //messageElement.setAttribute('style', styleString);
    this.katkoViesti.appendChild(messageElement);
    return true;
}
