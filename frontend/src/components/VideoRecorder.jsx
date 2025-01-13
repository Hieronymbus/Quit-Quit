import React, { useState, useRef } from "react";

const VideoRecorder = ({ setNewQuit }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [timer, setTimer] = useState(0);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null); // For clearing interval

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      videoRef.current.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setRecordedBlob(blob);
        stopMediaStream();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTimer(0);

      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev >= 120) {
            stopRecording();
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopRecording = () => {
    console.log("yoyo")
    console.log(recordedBlob)
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    clearInterval(timerRef.current); // Clear interval
    setIsRecording(false);
  };

  const stopMediaStream = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  const uploadRecording = () => {
    if (recordedBlob) {
      
      console.log(recordedBlob)
      setNewQuit((prev) => ({ ...prev, videoFile: recordedBlob }));
    }
  };

  return (
    <div>
      <h2>Record Video</h2>
      <video ref={videoRef} autoPlay muted style={{ width: "100%" }}></video>
      <div>
        {isRecording ? (
            <button onClick={(e) => { e.preventDefault(); stopRecording(); }}>Stop Recording</button>
        ) : (
            <button onClick={(e) => { e.preventDefault(); startRecording(); }}>Start Recording</button>
        )}
      </div>

      {isRecording && <p>Recording... {timer}s</p>}
      {recordedBlob && (
        <div>
          <h3>Preview</h3>
          <video
            controls
            style={{ width: "100%" }}
            src={URL.createObjectURL(recordedBlob)}
          ></video>
          <div>
            <button onClick={(e) => {e.preventDefault(); setRecordedBlob(null)}}>Re-record</button>
            <button onClick={(e) => {e.preventDefault(); uploadRecording}}>Accept & Upload</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
