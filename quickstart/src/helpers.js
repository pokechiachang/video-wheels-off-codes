'use strict';

var Video = require('twilio-video');

/**
 * Display local video in the given HTMLVideoElement.
 * @param {HTMLVideoElement} video
 * @returns {Promise<void>}
 */

/**
 * Mute/unmute your media in a Room.
 * @param {Room} room - The Room you have joined
 * @param {'audio'|'video'} kind - The type of media you want to mute/unmute
 * @param {'mute'|'unmute'} action - Whether you want to mute/unmute
 */
/**
 * 
 * Take snapshot of the local video from the HTMLVideoElement and render it
 * in the HTMLCanvasElement.
 * @param {LocalVideoTrack} localVideoTrack
 * @param {HTMLCanvasElement|HTMLImageElement} snapshot
 */
function displayLocalVideo(video) {
  return Video.createLocalVideoTrack().then(function(localTrack) {
    localTrack.attach(video);
    return localTrack;
  });
}

function muteOrUnmuteYourMedia(room, kind, action) {
  const publications = kind === 'audio'
    ? room.localParticipant.audioTracks
    : room.localParticipant.videoTracks;

  publications.forEach(function(publication) {
    if (action === 'mute') {
      publication.track.disable();
    } else {
      publication.track.enable();
    }
  });
}

/**
 * Mute your audio in a Room.
 * @param {Room} room - The Room you have joined
 * @returns {void}
 */
 function muteYourAudio(room) {
  muteOrUnmuteYourMedia(room, 'audio', 'mute');
}

/**
 * Mute your video in a Room.
 * @param {Room} room - The Room you have joined
 * @returns {void}
 */
 function muteYourVideo(room) {
  muteOrUnmuteYourMedia(room, 'video', 'mute');
}

/**
 * Unmute your audio in a Room.
 * @param {Room} room - The Room you have joined
 * @returns {void}
 */
 function unmuteYourAudio(room) {
  muteOrUnmuteYourMedia(room, 'audio', 'unmute');
}

/**
 * Unmute your video in a Room.
 * @param {Room} room - The Room you have joined
 * @returns {void}
 */
 function unmuteYourVideo(room) {
  muteOrUnmuteYourMedia(room, 'video', 'unmute');
}

/**
 * A RemoteParticipant muted or unmuted its media.
 * @param {Room} room - The Room you have joined
 * @param {function} onMutedMedia - Called when a RemoteParticipant muted its media
 * @param {function} onUnmutedMedia - Called when a RemoteParticipant unmuted its media
 * @returns {void}
 */

 function participantMutedOrUnmutedMedia(room, onMutedMedia, onUnmutedMedia) {
  room.on('trackSubscribed', function(track, publication, participant) {
    track.on('disabled', function() {
      return onMutedMedia(track, participant);
    });
    track.on('enabled', function() {
      return onUnmutedMedia(track, participant);
    });
  });
}



 function takeLocalVideoSnapshot(video, localVideoTrack, snapshot) {
  if (window.ImageCapture) {
    const imageCapture = new ImageCapture(localVideoTrack.mediaStreamTrack);
    imageCapture.takePhoto().then(function(blob) {
      snapshot.src = URL.createObjectURL(blob);
    });
  } else {
    snapshot.getContext('2d').drawImage(video, 0, 0);
  }
}
exports.displayLocalVideo = displayLocalVideo;
exports.takeLocalVideoSnapshot = takeLocalVideoSnapshot;


exports.muteYourAudio = muteYourAudio;
exports.muteYourVideo = muteYourVideo;
exports.unmuteYourAudio = unmuteYourAudio;
exports.unmuteYourVideo = unmuteYourVideo;
exports.participantMutedOrUnmutedMedia = participantMutedOrUnmutedMedia;
