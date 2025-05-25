
      const musicContainer = document.querySelector('.player-container');
      const playBtn = document.getElementById('play');
      const prevBtn = document.getElementById('prev');
      const nextBtn = document.getElementById('next');
      const audio = document.getElementById('audio');
      const progress = document.getElementById('progress');
      const progressContainer = document.getElementById('progress-container');
      const title = document.getElementById('title');
      const cover = document.getElementById('cover');
      const currentTimeEl = document.getElementById('current-time');
      const durationEl = document.getElementById('duration');
      const volumeSlider = document.getElementById('volume');

      // Song titles
      const songs = ['hey', 'summer', 'ukulele'];
      const artists = ['Artist One', 'Artist Two', 'Artist Three'];

      // Keep track of song
      let songIndex = 2;

      // Initially load song details into DOM
      loadSong(songs[songIndex]);

      // Update song details
      function loadSong(song) {
        title.innerText = song;
        audio.src = `music/${song}.mp3`;
        cover.src = `images/${song}.jpg`;
      }

      // Play song
      function playSong() {
        musicContainer.classList.add('play');
        playBtn.querySelector('i').classList.remove('fa-play');
        playBtn.querySelector('i').classList.add('fa-pause');
        cover.classList.add('rotate');

        audio.play();
      }

      // Pause song
      function pauseSong() {
        musicContainer.classList.remove('play');
        playBtn.querySelector('i').classList.add('fa-play');
        playBtn.querySelector('i').classList.remove('fa-pause');
        cover.classList.remove('rotate');

        audio.pause();
      }

      // Previous song
      function prevSong() {
        songIndex--;

        if (songIndex < 0) {
          songIndex = songs.length - 1;
        }

        loadSong(songs[songIndex]);

        playSong();
      }

      // Next song
      function nextSong() {
        songIndex++;

        if (songIndex > songs.length - 1) {
          songIndex = 0;
        }

        loadSong(songs[songIndex]);

        playSong();
      }

      // Update progress bar
      function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Update time display
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
          durationSeconds = `0${durationSeconds}`;
        }
        
        // Skip if duration is NaN
        if (durationSeconds) {
          durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
          currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
      }

      // Set progress bar
      function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
      }

      // Set volume
      function setVolume() {
        audio.volume = this.value;
      }

      // Theme switcher
      function setTheme(theme) {
        document.body.className = theme + '-theme';
        localStorage.setItem('theme', theme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem('theme') || 'default';
      setTheme(savedTheme);

      // Event listeners
      playBtn.addEventListener('click', () => {
        const isPlaying = musicContainer.classList.contains('play');

        if (isPlaying) {
          pauseSong();
        } else {
          playSong();
        }
      });

      // Change song
      prevBtn.addEventListener('click', prevSong);
      nextBtn.addEventListener('click', nextSong);

      // Time/song update
      audio.addEventListener('timeupdate', updateProgress);

      // Click on progress bar
      progressContainer.addEventListener('click', setProgress);

      // Song ends
      audio.addEventListener('ended', nextSong);

      // Volume control
      volumeSlider.addEventListener('input', setVolume);

      // Theme buttons
      document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          setTheme(this.dataset.theme);
        });
      });

      // Format time on load
      audio.addEventListener('loadedmetadata', () => {
        const durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration % 60);
        if (durationSeconds < 10) {
          durationSeconds = `0${durationSeconds}`;
        }
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
      });
    