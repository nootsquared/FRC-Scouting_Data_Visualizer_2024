"use client"
import { useEffect, useRef, useState } from 'react';
import jsQR from "jsqr";
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export default function PickList() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [cameraToggled, setCameraToggled] = useState(true);
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(true);
    const [submitStatus, setSubmitStatus] = useState('');

    const downloadFile = async () => {
        const zip = new JSZip();
        const response = await fetch('../results/resultsmatch.json');
        const data = await response.blob();
        zip.file('resultsmatch.json', data);
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'results.zip');
    };

    const clearData = () => {
        setQrCodeData(null);
        setIsScanning(true);
    }

    const postData = async () => {
        const parsedData = JSON.parse(qrCodeData);
        await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: parsedData,
                path: "./src/app/results/resultsmatch.json"
            }),
        });
        clearData();
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
    
            const intervalId = setInterval(() => {
                if (video && canvas && isScanning) {
                    const context = canvas.getContext('2d');
                    context?.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
                    if (imageData) {
                        const code = jsQR(imageData.data, imageData.width, imageData.height);
                        if (code) {
                            setQrCodeData(code.data);
                            setIsScanning(false);
                        }
                    }
                }
            }, 200);
    
            return () => clearInterval(intervalId);
        } else if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            if (video) {
                video.srcObject = null;
            }
        }
    }, [cameraToggled, isScanning]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-8 xl:px-10 py-14">
            <div className="flex items-center justify-start mb-4">
                <a href="/" className='bg-slate-900 px-8 py-4 text-center flex flex-row items-center justify-center text-2xl font-extralight rounded-2xl'>Back</a>
                <h1 className="text-4xl font-bold text-white ml-4">QR Scanner - Match</h1>
            </div>
            <div className="w-1/3 border-b-2 border-gray-800 mb-8"></div>
            <div>
                <div className="mb-12"></div>
            </div>

            <div className="w-[800px] h-[600px] rounded-[10px] overflow-hidden bg-gray-900 relative border-8 border-gray-800">
                <div className="absolute inset-0 bg-gray-900"></div>
                <video ref={videoRef} className="w-full h-full object-cover absolute inset-0" autoPlay playsInline></video>
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
            {qrCodeData && (
                <div className="w-[800px] h-auto rounded-[10px] overflow-hidden relative bg-gray-900 mt-4 p-4 overflow-x-auto">
                    <pre className="text-white">{qrCodeData}</pre>
                </div>
            )}
            <div className="flex justify-center mt-4">
                <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-2xl mr-2 w-40 h-20" onClick={() => setCameraToggled(!cameraToggled)}>Toggle Camera</button>
                <button className="bg-green-100 text-green-800 px-4 py-2 rounded-2xl mr-2 w-40 h-20" onClick={postData}>Submit</button>
                <button className="bg-red-100 text-red-800 px-4 py-2 rounded-2xl mr-2 w-40 h-20" onClick={clearData}>Clear</button>
            </div>

            <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-2xl mt-2 w-40 h-20" onClick={downloadFile}>Download Data</button>

        </main>
    );
}