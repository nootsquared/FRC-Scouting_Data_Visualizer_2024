'use client';

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import data from '../../../../2025-NEW-RESULTS/results.json';

const AllTeamsTotal = () => {
    const processedData = Object.values(
        data.reduce((acc, item) => {
            const teamNumber = item["Team-Number"];
            if (!acc[teamNumber]) {
                acc[teamNumber] = {
                    team_number: teamNumber,
                    autonPoints: 0,
                    teleopPoints: 0,
                    endgamePoints: 0,
                };
            }
            acc[teamNumber].autonPoints +=
                (parseInt(item["Auton-Coral-L4"] || 0) * 4) +
                (parseInt(item["Auton-Coral-L3"] || 0) * 3) +
                (parseInt(item["Auton-Coral-L2"] || 0) * 2) +
                (parseInt(item["Auton-Coral-L1"] || 0) * 1) +
                (parseInt(item["Auton-Algae-Net"] || 0) * 2) +
                (parseInt(item["Auton-Algae-Processor"] || 0) * 1);

            acc[teamNumber].teleopPoints +=
                (parseInt(item["Teleop-Coral-L4"] || 0) * 4) +
                (parseInt(item["Teleop-Coral-L3"] || 0) * 3) +
                (parseInt(item["Teleop-Coral-L2"] || 0) * 2) +
                (parseInt(item["Teleop-Coral-L1"] || 0) * 1) +
                (parseInt(item["Teleop-Algae-Net"] || 0) * 2) +
                (parseInt(item["Teleop-Algae-Processor"] || 0) * 1);

            acc[teamNumber].endgamePoints +=
                item["Climb-Status"] === "s" ? 2 :
                item["Climb-Status"] === "p" ? 1 :
                item["Climb-Status"] === "d" ? 2 : 0;

            // Ensure no NaN values
            acc[teamNumber].autonPoints = isNaN(acc[teamNumber].autonPoints) ? 0 : acc[teamNumber].autonPoints;
            acc[teamNumber].teleopPoints = isNaN(acc[teamNumber].teleopPoints) ? 0 : acc[teamNumber].teleopPoints;
            acc[teamNumber].endgamePoints = isNaN(acc[teamNumber].endgamePoints) ? 0 : acc[teamNumber].endgamePoints;

            return acc;
        }, {})
    ).sort((a, b) => (b.autonPoints + b.teleopPoints + b.endgamePoints) - (a.autonPoints + a.teleopPoints + a.endgamePoints));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={processedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="team_number" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar stackId="a" name="Auton Points" dataKey="autonPoints" fill="#3b82f6" />
                <Bar stackId="a" name="Teleop Points" dataKey="teleopPoints" fill="#8b5cf6" />
                <Bar stackId="a" name="Endgame Points" dataKey="endgamePoints" fill="#a75094" />
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
                <p className="text-sm text-blue-400">Auton Points: {data.autonPoints}</p>
                <p className="text-sm text-indigo-400">Teleop Points: {data.teleopPoints}</p>
                <p className="text-sm text-pink-400">Endgame Points: {data.endgamePoints}</p>
                <p className="text-sm text-green-400">Total Points: {data.autonPoints + data.teleopPoints + data.endgamePoints}</p>
            </div>
        );
    }
    return null;
};

export default AllTeamsTotal;