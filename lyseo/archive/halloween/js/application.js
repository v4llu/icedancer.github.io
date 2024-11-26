// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalScoreManager);
});


    var imageList = [
        "https://oispalyseolla.ml/archive/halloween/img/2.png",
        "https://oispalyseolla.ml/archive/halloween/img/4.png",
        "https://oispalyseolla.ml/archive/halloween/img/8.png",
        "https://oispalyseolla.ml/archive/halloween/img/16.png",
        "https://oispalyseolla.ml/archive/halloween/img/32.png",
        "https://oispalyseolla.ml/archive/halloween/img/64.png",
        "https://oispalyseolla.ml/archive/halloween/img/128.png",
        "https://oispalyseolla.ml/archive/halloween/img/256.png",
        "https://oispalyseolla.ml/archive/halloween/img/512.png",
        "https://oispalyseolla.ml/archive/halloween/img/1024.png",
        "https://oispalyseolla.ml/archive/halloween/img/2048.png",
	"https://oispalyseolla.ml/archive/halloween/img/super.png",
	"https://oispalyseolla.ml/archive/halloween/img/katko.png"

    ];
    for(var i = 0; i < imageList.length; i++ )
    {
        var imageObject = new Image();
        imageObject.src = imageList[i];
    }
