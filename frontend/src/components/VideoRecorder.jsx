import React, { useState, useRef, useEffect } from "react";

const VideoRecorder = ({ setNewQuit, mode }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPreRecording, setIsPreRecording] = useState(true);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [timer, setTimer] = useState(0);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null); // For clearing interval

  useEffect(() => {
    const getMedia = async () => {
      try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setMediaStream(stream);
          videoRef.current.srcObject = stream;
      } catch (error) {
          console.error("Error accessing media devices.", error);
      }
    };
    if(isPreRecording){

      getMedia()
    }

  
},[isPreRecording])

  const startRecording = async () => {
    if(mediaStream) {
      stopMediaStream()
    }
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
    
    setIsPreRecording(false)
    
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
      setNewQuit((prev) => ({ ...prev, videoFile: recordedBlob }));
      stopMediaStream()
    }
    console.log("accept and upload clicked")
  };

  return (
    <div>
      {
        isPreRecording
        &&
        <div>
          <h2
            className="text-xl mb-1"
          >
          </h2>
          <video
            className="rounded-t-lg rounded-r-lg"
            ref={videoRef}
            autoPlay 
            muted 
            style={{ width: "100%" }}
          > 
          </video>
          {
            !isRecording
            &&
            <button 
                className="text-xl p-2 rounded-b-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2"

                onClick={(e) => { e.preventDefault(); startRecording(); }}
              >
                Start Recording
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-6 ml-2 inline">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
            </button>
          }
        </div>

      }
      <div>
        {
          isRecording 
          &&
          ( 
              <button 
                className="text-xl p-2 rounded-b-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2"

                onClick={(e) => { e.preventDefault(); stopRecording(); }}
              >
                Stop Recording
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-6 ml-2 inline">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
                </svg>
              </button>
            
          )      
        }
      </div>

      {isRecording && <p>Recording... {timer}s</p>}
      {recordedBlob && (
        <div>
          <h3
            className="text-xl"
          >
            Preview
          </h3>
          <video
            controls
            style={{ width: "100%" }}
            src={URL.createObjectURL(recordedBlob)}
          ></video>
          <div>
            <button 
              className="text-xl p-2 rounded-b-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2"
              onClick={(e) => {e.preventDefault(); setIsPreRecording(true); setRecordedBlob(null)}}
            >
              Re-record
            </button>
            <button 
              className="text-xl p-2 rounded-b-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2"
              onClick={(e) => {e.preventDefault(); uploadRecording()}}
            >
              Accept & Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
