"use client"
import { useEffect, useRef, useState } from 'react';
import jsQR from "jsqr";
import { NextResponse } from "next/server";

export default function PickList() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [cameraToggled, setCameraToggled] = useState(true);
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);

    const postData = async () => {
        await fetch('/pages/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: 'test string' }),
        });
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (cameraToggled) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((mediaStream) => {
                    streamRef.current = mediaStream;
                    if (video) {
                        video.srcObject = streamRef.current;
                    }
                })
                .catch((error) => {
                    console.error('Error accessing webcam:', error);
                });

            // Start scanning for QR codes
            const intervalId = setInterval(() => {
                if (video && canvas) {
                    const context = canvas.getContext('2d');
                    context?.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
                    if (imageData) {
                        const code = jsQR(imageData.data, imageData.width, imageData.height);
                        if (code) {
                            setQrCodeData(code.data);
                            clearInterval(intervalId);
                        }
                    }
                }
            }, 200);

            return () => clearInterval(intervalId);
        } else if (streamRef.current) {
            // Stop the camera feed
            streamRef.current.getTracks().forEach((track) => track.stop());
            if (video) {
                video.srcObject = null;
            }
        }


    }, [cameraToggled]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-8 xl:px-10 py-14">
            <div>
                <h1 className="text-4xl font-bold text-white mb-8">Scouting Data Visualization</h1>
            </div>
    
            <div>
                <a href="/" className='bg-slate-900 w-72 h-20 text-center flex flex-row items-center justify-center text-2xl font-extralight rounded-2xl'>Back</a>
                <div className="mb-12"></div>
            </div>
    
            <div className="w-[800px] h-[600px] rounded-[10px] overflow-hidden relative bg-gray-800">
                <div className="absolute inset-0 bg-gray-900"></div>
                <video ref={videoRef} className="w-full h-full object-cover absolute inset-0" autoPlay playsInline></video>
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
            {qrCodeData && (
                <div className="w-[800px] h-auto rounded-[10px] overflow-hidden relative bg-gray-800 mt-4 p-4 overflow-x-auto">
                    <pre className="text-white">{qrCodeData}</pre>
                </div>
            )}
            <div className="flex justify-center mt-4">
                <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-2xl mr-2 w-40 h-20" onClick={() => setCameraToggled(!cameraToggled)}>Toggle Camera</button>
                <button className="bg-green-100 text-green-800 px-4 py-2 rounded-2xl mr-2 w-40 h-20" onClick={postData}>Submit</button>
                <button className="bg-red-100 text-red-800 px-4 py-2 rounded-2xl mr-2 w-40 h-20">Clear</button>
            </div>
        </main>
    );
}