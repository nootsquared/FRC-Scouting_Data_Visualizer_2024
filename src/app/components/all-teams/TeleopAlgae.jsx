'use client';

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import data from '../../../../2025-NEW-RESULTS/results.json';

const TeleopAlgae = ({ filter }) => {
    const processedData = Object.values(
        data.reduce((acc, item) => {
            const teamNumber = item["Team-Number"];
            if (!acc[teamNumber]) {
                acc[teamNumber] = {
                    team_number: teamNumber,
                    Barge: 0,
                    Processor: 0,
                };
            }
            acc[teamNumber].Barge += parseInt(item["Teleop-Algae-Net"] || 0) || 0; // Correct field for "Barge"
            acc[teamNumber].Processor += parseInt(item["Teleop-Algae-Processor"] || 0) || 0;
            return acc;
        }, {})
    ).map((team) => ({
        ...team,
        total: filter === "ALL" ? team.Barge * 2 + team.Processor : team[filter] || 0,
    })).sort((a, b) => b.total - a.total);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={processedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="team_number" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                {filter === "ALL" ? (
                    <>
                        <Bar stackId="a" name="Barge" dataKey="Barge" fill="#1d4ed8" />
                        <Bar stackId="a" name="Processor" dataKey="Processor" fill="#3b82f6" />
                    </>
                ) : (
                    <Bar stackId="a" name={filter} dataKey="total" fill="#1d4ed8" />
                )}
            </BarChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg">Team {label}</p>
                <p className="text-sm text-blue-400">Barge: {data.Barge}</p>
                <p className="text-sm text-blue-400">Processor: {data.Processor}</p>
                <p className="text-sm text-indigo-400">Total Points: {data.total}</p>
            </div>
        );
    }
    return null;
};

export default TeleopAlgae;
