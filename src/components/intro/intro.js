define([/* dependencies */],
/**
 * intro component
 */
function(/* dependencies */){
	'use strict';
	var videoStill = document.querySelector('[data-video-trigger]');
    var videoUrl = videoStill.getAttribute('data-video-url');
    var videoContainer = document.querySelector('.video-container');
    videoStill.addEventListener('click', function(){
        var video = document.createElement('video');
        video.setAttribute('controls', '');
        video.setAttribute('autoplay', '');

        var sourceMp4 = document.createElement('source');
        sourceMp4.src = videoUrl+'.mp4';
        sourceMp4.type = 'video/mp4';
        video.appendChild(sourceMp4);

        var sourceWebm = document.createElement('source');
        sourceWebm.src = videoUrl+'.webmhd.webm';
        sourceWebm.type = 'video/webm';
        video.appendChild(sourceWebm);

        var sourceOgg = document.createElement('source');
        sourceOgg.src = videoUrl+'.ogv';
        sourceOgg.type = 'video/ogg';
        video.appendChild(sourceOgg);

        videoContainer.removeChild(videoStill);
        videoContainer.appendChild(video);
    });
});