// HTML targets
let now_playing = document.querySelector(".now-playing"); 
let song_name = document.querySelector(".song-name"); 
let song_artist = document.querySelector(".song-artist"); 
let playpause_btn = document.querySelector(".playpause-song"); 
let next_btn = document.querySelector(".next-song"); 
let prev_btn = document.querySelector(".prev-song"); 
let volume_slider = document.querySelector(".volume_slider"); 
  
// global variables
let song_index = 0; 
let isPlaying = false; 
  
// Creates the audio element in HTML
let selectedSong = document.createElement('audio'); 
  
// Songs
let playlist = [ 
  { 
    name: "Title Screen Music", 
    artist: "Tyler Baldwin", 
    path: "./assets/title_screen_music.wav"
  }, 
  { 
    name: "Battle Theme", 
    artist: "Tyler Baldwin", 
    path: "./assets/battle_theme_2.wav"
  }
]; 

function loadSong(song_index) { 
    
    // Load a new song 
    selectedSong.src = playlist[song_index].path; 
    selectedSong.load();
    // Tried selectedSong.play()
 

    
    // Update song info
    song_name.textContent = playlist[song_index].name; 
    song_artist.textContent = playlist[song_index].artist; 
    now_playing.textContent = " Song " + (song_index + 1) + " of " + playlist.length; 
    selectedSong.addEventListener("ended", nextSong); 
}
function playpauseSong() { 
    // Toggle playing and pausing depending on the current state 
    if (!isPlaying) playSong(); 
    else pauseSong(); 
  } 
    
  function playSong() { 
    // Play the loaded song 
    selectedSong.play(); 
    isPlaying = true; 
    
    // Replace icon w/ pause icon
    playpause_btn.innerHTML = '<img src="./assets/imgs/WW_Shield.png" alt="Previous Track">'; 
  } 
    
  function pauseSong() { 
    // Pause the loaded song 
    selectedSong.pause(); 
    isPlaying = false; 
    
    // Replace icon w/ play icon 
    playpause_btn.innerHTML = '<img src="./assets/imgs/WW_Sword.png" alt="Previous Track" >';; 
  } 
    
  function nextSong() { 
    // Go back to the first song if the 
    // current one is the last in the Song list 
    if (song_index < playlist.length - 1) 
      song_index += 1; 
    else song_index = 0; 
    
    // Load and play the new song 
    loadSong(song_index); 
    playSong(); 
  } 
    
  function prevSong() { 
    // Go back to the last song if the 
    // current one is the first in the song list 
    if (song_index > 0) 
      song_index -= 1; 
    else song_index = playlist.length; 
      
    // Load and play the new Song 
    loadSong(song_index); 
    playSong(); 
  } 
  function setVolume() { 
    // Set the volume according to the 
    // percentage of the volume slider set 
    selectedSong.volume = volume_slider.value / 100;
}
loadSong(song_index)
// Tried playSong(),
// Tried window.onload.playSong()
// Tried window.onload = playSong()