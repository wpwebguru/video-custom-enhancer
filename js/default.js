// const player = new Plyr("video", {
const players = Plyr.setup("video", {
  title: "",
  controls: [
    "play-large",
    "rewind",
    "play",
    "progress",
    "current-time",
    "mute",
    "volume",
    "fullscreen",
  ],
  seekTime: 5,
  keyboard: { focused: false, global: false },
  listeners: {
    seek: function customSeekBehavior(e) {
      var currentTime = this.currentTime;
      var newTime = _getTargetTime(this, e);

      // get the player
      let player = players.find((plyr) => plyr.id === this.id);

      // init maxPlayTime
      if (player.maxPlayTime === undefined) {
        player.maxPlayTime = 0;
      }

      // check the current time
      if (newTime < currentTime) {
        if (player.maxPlayTime < currentTime) {
          player.maxPlayTime = currentTime;
        }
      }

      // We only want rewind functionality, and disallow moving forward
      if (newTime > player.maxPlayTime) {
        // Object.defineProperty(event, "defaultPrevented", {
        //   value: event.defaultPrevented,
        //   writable: true,
        // });
        // event.preventDefault = () => {
        //   event.defaultPrevented = true;
        // };
        if ( jQuery('body').hasClass('is-admin') ) { 
          // do nothing
        }
        else
        {
           e.preventDefault();
          return false;
        }  
       
      }
    },
  },
});

// get target time
function _getTargetTime(plyr, input) {
  if (
    typeof input === "object" &&
    (input.type === "input" || input.type === "change")
  ) {
    return (input.target.value / input.target.max) * plyr.media.duration;
  } else {
    return Number(input);
  }
}
