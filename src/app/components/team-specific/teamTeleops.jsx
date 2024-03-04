'use client';

import { 
    LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip,
} from 'recharts';
import data from  '../results.json';
import React, { useState, useEffect } from 'react';

const teamTeleop = ({ teamNumber }) => {

    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const newFilteredData = data
        .filter(item => String(item.team_number) === String(teamNumber))
        .map(item => ({
            ...item,
            match_number: Number(item.match_number),
            speaker_notes_teleop: Number(item.speaker_notes_teleop),
            amp_notes_teleop: Number(item.amp_notes_teleop),
        }))
        .sort((a, b) => a.match_number - b.match_number);

        setFilteredData(newFilteredData);
    }, [teamNumber]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="match_number" />
                <CartesianGrid strokeDasharray="5 5"/>
                <YAxis domain={[0, 'dataMax + 1']}/>
                <Legend />
                <Tooltip content={<CustomTooltip />}/>
                <Line type="monotone" dataKey="speaker_notes_teleop" stroke="#3b82f6" />
                <Line type="monotone" dataKey="amp_notes_teleop" stroke="#8b5cf6" />
            </LineChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg">{label}</p>
                <p className="text-sm text-blue-400">
                    Speaker Notes Auton:
                    <span className="ml-2">{payload[0].value}</span>
                </p>
                <p className="text-sm text-indigo-400">
                    Amp Notes Auton:
                    <span className="ml-2">{payload[1].value}</span>
                </p>
            </div>
        );
    }
}

export default teamTeleop;  