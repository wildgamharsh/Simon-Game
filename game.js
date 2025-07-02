var buttonColors = ['red','blue','green','yellow']
var gamePattern = [] 
var userClickedPattern = []
var level = 0 

function playSound(color){
    var audio = new Audio('sounds/'+color+'.mp3')
    audio.play()
}

function animateButton(button){
    button.classList.add('pressed')
    setTimeout(remove,300)
    function remove(){
        button.classList.remove('pressed')
    }
}
function nextSequence(){
    level ++;
    $("h1").text('Level ' + level)
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColors[randomNumber]
    gamePattern.push(randomChosenColour)
    var randomChosenButton = $("." + randomChosenColour)[0]
    animateButton(randomChosenButton)
    playSound(randomChosenColour)
}



var started = false 
$(document).keypress(function(event){
    if (!started){
        started = true
        setTimeout(function(){
            nextSequence();

        },2000)
    }


})


$('.btn').click(function(){

    if (started){

        
        var userChosenColour = this.id
        animateButton(this)
        playSound(userChosenColour)
        setTimeout(function(){
            userClickedPattern.push(userChosenColour)
            var lastIndex = userClickedPattern.length - 1 
            checkAnswer(lastIndex)
            
            
        },1000)
        
    }
})

    


function checkAnswer(currentLevel){
    var max = gamePattern.length - 1 
    if (max === currentLevel){
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            userClickedPattern = []
            nextSequence();
        }

    }
    else{
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        }
        else{
            started = false 
            $('h1').text('YOU LOST THE GAME')
            setTimeout(function(){
                playSound("wrong")
                $('body')[0].classList.add('game-over')
                setTimeout(function(){
                    $('body')[0].classList.remove('game-over')
                },1000)

                $('h1').text('Press any key to Replay the game. ')

            },100)

            startOver();
            }
            }
        }
    
    


function startOver(){
    userClickedPattern = []
    gamePattern = []
    level = 0
    started = false

}
