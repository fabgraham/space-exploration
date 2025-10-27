import { useEffect, useRef, useState } from 'react';

/**
 * useAudio Hook
 *
 * Custom React hook for managing audio playback.
 * Provides play, pause, stop controls and playback state.
 *
 * @param {string} audioPath - Path to audio file
 * @returns {object} Audio controls and state
 */
export default function useAudio(audioPath) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Initialize audio element
  useEffect(() => {
    if (!audioPath) return;

    audioRef.current = new Audio(audioPath);
    const audio = audioRef.current;

    // Event listeners
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handleError = (e) => {
      console.error('Audio error:', e);
      setError(e);
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    // Cleanup
    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audioPath]);

  /**
   * Play audio
   * @returns {Promise} Play promise (can be caught if autoplay blocked)
   */
  const play = () => {
    if (audioRef.current) {
      return audioRef.current.play().catch(err => {
        console.error('Audio play error:', err);
        setError(err);
      });
    }
  };

  /**
   * Pause audio
   */
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  /**
   * Stop audio (pause and reset to beginning)
   */
  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  /**
   * Toggle play/pause
   */
  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  /**
   * Set volume (0.0 to 1.0)
   * @param {number} volume - Volume level
   */
  const setVolume = (volume) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  };

  /**
   * Seek to specific time
   * @param {number} time - Time in seconds
   */
  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, time));
    }
  };

  return {
    play,
    pause,
    stop,
    toggle,
    setVolume,
    seek,
    isPlaying,
    error,
    duration,
    currentTime,
  };
}
