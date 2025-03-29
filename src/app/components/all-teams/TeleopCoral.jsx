'use client';

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import data from '../../../../2025-NEW-RESULTS/results.json';

const TeleopCoral = ({ filter }) => {
    const processedData = Object.values(
        data.reduce((acc, item) => {
            const teamNumber = item["Team-Number"];
            if (!acc[teamNumber]) {
                acc[teamNumber] = {
                    team_number: teamNumber,
                    L4: 0,
                    L3: 0,
                    L2: 0,
                    L1: 0,
                    totalCoral: 0, // Add total coral count
                };
            }
            acc[teamNumber].L4 += parseInt(item["Teleop-Coral-L4"] || 0) || 0;
            acc[teamNumber].L3 += parseInt(item["Teleop-Coral-L3"] || 0) || 0;
            acc[teamNumber].L2 += parseInt(item["Teleop-Coral-L2"] || 0) || 0;
            acc[teamNumber].L1 += parseInt(item["Teleop-Coral-L1"] || 0) || 0;
            acc[teamNumber].totalCoral +=
                parseInt(item["Teleop-Coral-L4"] || 0) +
                parseInt(item["Teleop-Coral-L3"] || 0) +
                parseInt(item["Teleop-Coral-L2"] || 0) +
                parseInt(item["Teleop-Coral-L1"] || 0); // Sum all coral levels
            return acc;
        }, {})
    ).map((team) => ({
        ...team,
        total:
            filter === "ALL"
                ? team.L4 * 4 + team.L3 * 3 + team.L2 * 2 + team.L1
                : filter === "TotalCoral"
                ? team.totalCoral
                : team[filter] || 0,
    })).sort((a, b) => b.total - a.total);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={processedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="team_number" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                {filter === "ALL" ? (
                    <>
                        <Bar stackId="a" name="L4" dataKey="L4" fill="#1d4ed8" />
                        <Bar stackId="a" name="L3" dataKey="L3" fill="#3b82f6" />
                        <Bar stackId="a" name="L2" dataKey="L2" fill="#93c5fd" />
                        <Bar stackId="a" name="L1" dataKey="L1" fill="#bfdbfe" />
                    </>
                ) : (
                    <Bar stackId="a" name={filter === "TotalCoral" ? "Total Coral" : filter} dataKey="total" fill="#1d4ed8" />
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
                <p className="text-sm text-blue-400">L4: {data.L4}</p>
                <p className="text-sm text-blue-400">L3: {data.L3}</p>
                <p className="text-sm text-blue-400">L2: {data.L2}</p>
                <p className="text-sm text-blue-400">L1: {data.L1}</p>
                <p className="text-sm text-indigo-400">Total Coral: {data.totalCoral}</p>
                <p className="text-sm text-indigo-400">Total Points: {data.total}</p>
            </div>
        );
    }
    return null;
};

export default TeleopCoral;
