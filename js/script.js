// Elements
const buttonPlay = document.querySelector('.buttonPlay')
const buttonPause = document.querySelector('.buttonPause')
const buttonStop = document.querySelector('.buttonStop')
const buttonSet = document.querySelector('.buttonSet')

const buttonUpTime = document.querySelector('.buttonUpTime')
const buttonDownTime = document.querySelector('.buttonDownTime')

const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')

const buttonSoundForest = document.querySelector('.buttonSoundForest')
const buttonSoundRain = document.querySelector('.buttonSoundRain')
const buttonSoundCoffeShop = document.querySelector('.buttonSoundCoffeShop')
const buttonSoundFirePlace = document.querySelector('.buttonSoundFirePlace')
const buttonPressAudio = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true")
const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")
const SoundForest = new Audio('assets/Floresta.wav') 
const SoundRain = new Audio('assets/Chuva.wav')
const SoundCoffeShop = new Audio('assets/Cafeteria.wav')
const SoundFirePlace = new Audio('assets/Lareira.wav')



let minutes = Number(minutesDisplay.textContent)
let timerTimeOut



//Sounds

let soundsOff = (soundOne, soundTwo, soundThree, soundFour) =>{
  soundOne.pause()
  soundTwo.pause()
  soundThree.pause()
  soundFour.pause()
}

function ForestStart(){
  soundsOff(SoundRain, SoundCoffeShop, SoundFirePlace, SoundFirePlace)
  if (SoundForest.paused){
      SoundForest.play()
      SoundForest.loop = true
      buttonSoundForest.classList.add('active')

  } else {
    SoundForest.pause()
    buttonSoundForest.classList.remove('active')
  }
}

function RainStart(){
  soundsOff(SoundForest, SoundCoffeShop, SoundFirePlace, SoundFirePlace)
  if (SoundRain.paused){
    SoundRain.play()
    SoundRain.loop = true
    buttonSoundRain.classList.add('active')

} else {
  SoundRain.pause()
  buttonSoundRain.classList.remove('active')

}
}
function CoffeShopStart(){
  soundsOff(SoundRain, SoundForest, SoundFirePlace, SoundFirePlace)
  if (SoundCoffeShop.paused){
    SoundCoffeShop.play()
    SoundCoffeShop.loop = true
    buttonSoundCoffeShop.classList.add('active')
    

} else {
  SoundCoffeShop.pause()
  buttonSoundCoffeShop.classList.remove('active')

}
}

function FirePlaceStart() {
  soundsOff(SoundRain, SoundCoffeShop, SoundForest, SoundForest)
  if (SoundFirePlace.paused){
    SoundFirePlace.play()
    SoundFirePlace.loop = true
    buttonSoundFirePlace.classList.add('active')

} else {
  SoundFirePlace.pause()
  buttonSoundFirePlace.classList.remove('active')

}
}


function pressButton(){
  buttonPressAudio.play()
}

function endTime(){
  kitchenTimer.play()
}


// timer
function resetControls() {
  buttonStop.classList.add('hide')
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
  buttonSet.classList.remove('hide')
}

function updateTimerDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, "0")
}

function resetTimer() {

  updateTimerDisplay(minutes, 0)
  clearTimeout(timerTimeOut)

}

function upTime (){
  const totalSeconds = minutes * 60 + Number(secondsDisplay.textContent)
  const newTotalSeconds = totalSeconds + 5 * 60
  minutes = Math.floor(newTotalSeconds / 60)
  const newSeconds = newTotalSeconds % 60
  updateTimerDisplay(minutes , newSeconds)
}

function downTime(){
  const totalSeconds = minutes * 60 + Number(secondsDisplay.textContent)
  const newTotalSeconds = totalSeconds - 5 * 60
  if (newTotalSeconds >= 0){
    minutes = Math.floor(newTotalSeconds / 60)
    const newSeconds = newTotalSeconds % 60
    updateTimerDisplay(minutes, newSeconds)
  }
}

function countdown(){
  timerTimeOut = setTimeout(function() {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    

    if (minutes <=0 && seconds <= 0) {
       
     resetControls()
     endTime()
     soundsOff(SoundCoffeShop, SoundFirePlace, SoundForest, SoundRain)
     buttonSoundForest.classList.remove('active')
     buttonSoundRain.classList.remove('active')
     buttonSoundCoffeShop.classList.remove('active')
     buttonSoundFirePlace.classList.remove('active')

     return
    }
    if(seconds <= 0 ) {

      seconds = 10
      --minutes
    }

 updateTimerDisplay(minutes, String(seconds-1))
    
 countdown()
  }, 1000)

}


// controls
buttonPlay.addEventListener('click', () => {
  buttonPlay.classList.add('hide')
  buttonPause.classList.remove('hide')
  buttonSet.classList.add('hide')
  buttonStop.classList.remove('hide')
  countdown()
  pressButton()
  

} )

buttonPause.addEventListener('click', () => {
  buttonPause.classList.add('hide')
  buttonPlay.classList.remove('hide')
  clearTimeout(timerTimeOut)
  pressButton()

})

buttonStop.addEventListener('click', () => {
  resetControls()
  resetTimer()
  pressButton()

})

buttonSet.addEventListener('click', () => {
  pressButton()
  let newMinutes = prompt(" Quantos minutos ?")
  if(!newMinutes) {
    resetTimer()
    return
  }
  minutes = Number(newMinutes);
  updateTimerDisplay(minutes, 0)
})

buttonUpTime.addEventListener('click', () => {
  pressButton()
  upTime()
})

buttonDownTime.addEventListener('click', () =>{
  pressButton()
  downTime()
})

buttonSoundForest.addEventListener('click', () =>{
  ForestStart()
 
  buttonSoundRain.classList.remove('active')
  buttonSoundCoffeShop.classList.remove('active')
  buttonSoundFirePlace.classList.remove('active')

}) 

buttonSoundRain.addEventListener('click', () =>{
  buttonSoundForest.classList.remove('active')
  
  buttonSoundCoffeShop.classList.remove('active')
  buttonSoundFirePlace.classList.remove('active')
  RainStart()
})

buttonSoundCoffeShop.addEventListener('click', () => {
  buttonSoundForest.classList.remove('active')
  buttonSoundRain.classList.remove('active')
  buttonSoundFirePlace.classList.remove('active')
  CoffeShopStart()
}) 

buttonSoundFirePlace.addEventListener('click', () => {
  buttonSoundForest.classList.remove('active')
  buttonSoundRain.classList.remove('active')
  buttonSoundCoffeShop.classList.remove('active')

  FirePlaceStart()
})