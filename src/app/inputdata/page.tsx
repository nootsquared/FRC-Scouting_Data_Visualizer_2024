'use client'

import React, { useRef, useEffect } from 'react';

const Page: React.FC = () => {
    const matchFormRef = useRef<HTMLFormElement>(null);
    const pitFormRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        document.addEventListener('keydown', handleMatchFormKeyDown);
        return () => {
            document.removeEventListener('keydown', handleMatchFormKeyDown);
        };
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handlePitFormKeyDown);
        return () => {
            document.removeEventListener('keydown', handlePitFormKeyDown);
        };
    }, []);

    const handleClearClick = () => {
        if (matchFormRef.current) {
            matchFormRef.current.reset();
        }
        if (pitFormRef.current) {
            pitFormRef.current.reset();
        }
    };

    const handleMatchFormKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const currentInput = document.activeElement as HTMLInputElement;
            const formInputs = Array.from(matchFormRef.current?.querySelectorAll('input') || []);
            const currentIndex = formInputs.findIndex(input => input === currentInput);
            if (currentIndex !== -1 && currentIndex < formInputs.length - 1) {
                const nextInput = formInputs[currentIndex + 1];
                nextInput.focus();
            }
        }
    };

    const handlePitFormKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const currentInput = document.activeElement as HTMLInputElement;
            const formInputs = Array.from(pitFormRef.current?.querySelectorAll('input') || []);
            const currentIndex = formInputs.findIndex(input => input === currentInput);
            if (currentIndex !== -1 && currentIndex < formInputs.length - 1) {
                const nextInput = formInputs[currentIndex + 1];
                nextInput.focus();
            }
        }
    };

    const handleMatchClearClick = () => {
        if (matchFormRef.current) {
            matchFormRef.current.reset();
        }
    };
    
    const handlePitClearClick = () => {
        if (pitFormRef.current) {
            pitFormRef.current.reset();
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-8 xl:px-10 py-14">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold text-white mb-12">Form Input</h1>
                <hr className="border-white w-1/2 mb-12" />
                <h1 className="text-2xl font-bold text-white mb-12">Match Scouting</h1>
                <form ref={matchFormRef} className="grid grid-cols-4 gap-4">
                <div>
                        <p className="text-white text-lg mb-6 text-center">Scouter Name - 1</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} autoFocus/>
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Match Number - 2</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Team Number - 3</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Alliance - 4</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Starting Position - 5</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Additional Notes Location - 6</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Auton Amp Notes - 7</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Auton Speaker Notes - 8</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Teleop Amp Notes - 9</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Teleop Speaker Notes - 10</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Trap? - 11</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Harmonized? - 12</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Hang/Park? - 13</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Robot Driving Rating - 14</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Defense Capability - 15</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Other Notes</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                </form>
                <div className="flex justify-center">
                    <button onClick={handleMatchClearClick} className="bg-red-500 text-white font-bold py-2 px-4 rounded-full mb-12">Clear</button>
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mb-12 ml-4">Submit</button>
                </div>
                <hr className="border-white w-1/2 mb-12" />
                <h1 className="text-2xl font-bold text-white mb-12">Pit Scouting</h1>
                <form ref={pitFormRef} className="grid grid-cols-4 gap-4">
                <div>
                        <p className="text-white text-lg mb-6 text-center">Scouter Name - 1</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Team Number - 2</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Drivetrain Type - 3</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Under Stage? - 4</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Intake Description - 5</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Preferred Auto - 6</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Max Scoring - 7</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Shooting Location - 8</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Amp? - 9</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Trap? - 10</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Harmonize? - 11</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Hang/Park? - 12</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                    <div>
                        <p className="text-white text-lg mb-6 text-center">Other Notes</p>
                        <input type="text" className="form-input bg-gray-200 text-black mb-12" placeholder="Enter text here" style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                    </div>
                </form>
                <div className="flex justify-center">
                    <button onClick={handlePitClearClick} className="bg-red-500 text-white font-bold py-2 px-4 rounded-full mb-12">Clear</button>
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mb-12 ml-4">Submit</button>
                </div>
                <hr className="border-white w-1/2 mb-12" />
            </div>
        </main>
    );
};

export default Page;
