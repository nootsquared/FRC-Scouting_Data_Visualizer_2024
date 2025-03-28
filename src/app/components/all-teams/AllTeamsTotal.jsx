'use client';

import { 
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip,
} from 'recharts';
import _ from 'lodash';
import data from  '../../results/resultsmatch.json';

const AllTeamsGraph = () => {

    const groupedData = data.reduce((acc, item) => {
        const key = `${item.team_number}-${item.match_number}`;
        if (!acc[key]) {
            acc[key] = {
                team_number: item.team_number,
                match_number: item.match_number,
                totalAutonPoints: 0,
                totalTeleopPoints: 0,
                totalEndgamePoints: 0,
                count: 0,
            };
        }
        acc[key].totalAutonPoints += Number(item.amp_notes_auton) + Number(item.speaker_notes_auton);
        acc[key].totalTeleopPoints += Number(item.amp_notes_teleop) + Number(item.speaker_notes_teleop);

        acc[key].totalEndgamePoints = 0
        if (item.trap === "Yes") acc[key].totalEndgamePoints += 5;
        if (item.hang_or_park === "Hang") {
            if (item.harmonize === "Yes") {
                acc[key].totalEndgamePoints += 5;
            } else {
                acc[key].totalEndgamePoints += 3;    
            }
        } else if (item.hang_or_park === "Park") {
            acc[key].totalEndgamePoints += 1;
        }

        acc[key].count += 1;
        return acc;
    }, {});


    const averagedData = Object.values(groupedData).map(item => ({
        ...item,
        totalAutonPoints: item.totalAutonPoints / item.count,
        totalTeleopPoints: item.totalTeleopPoints / item.count,
        totalEndgamePoints: item.totalEndgamePoints / item.count,
    }));

    const teamData = averagedData.reduce((acc, item) => {
        if (!acc[item.team_number]) {
            acc[item.team_number] = {
                team_number: item.team_number,
                totalAutonPoints: 0,
                totalTeleopPoints: 0,
                totalEndgamePoints: 0,
                count: 0,
            };
        }
        acc[item.team_number].totalAutonPoints += item.totalAutonPoints;
        acc[item.team_number].totalTeleopPoints += item.totalTeleopPoints;
        acc[item.team_number].totalEndgamePoints += item.totalEndgamePoints;
        acc[item.team_number].count += 1;
        return acc;
    }, {});

    const sortedData = Object.values(teamData).map(item => ({
        team_number: item.team_number,
        totalAutonPoints: Math.round(item.totalAutonPoints / item.count),
        totalTeleopPoints: Math.round(item.totalTeleopPoints / item.count),
        totalEndgamePoints: Math.round(item.totalEndgamePoints / item.count),
    })).sort((a, b) => (b.totalAutonPoints + b.totalTeleopPoints + b.totalEndgamePoints) - (a.totalAutonPoints + a.totalTeleopPoints + a.totalEndgamePoints));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="team_number" />
                <CartesianGrid strokeDasharray="5 5"/>
                <YAxis />
                <Legend />
                <Tooltip content={<CustomTooltip />}/>
                <Bar name="Average Auton Notes" dataKey="totalAutonPoints" stackId="a" fill="#143975"/>
                <Bar name="Average Teleop Notes" dataKey="totalTeleopPoints" stackId="a" fill="#8b5cf6" />
                <Bar name="Average Endgame Points" dataKey="totalEndgamePoints" stackId="a" fill="#a75094" />
            </BarChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg">{label}</p>
                <p className="text-sm text-blue-400">
                    Average Auton Notes:
                    <span className="ml-2">{payload[0].value}</span>
                </p>
                <p className="text-sm text-indigo-400">
                    Average Teleop Notes:
                    <span className="ml-2">{payload[1].value}</span>
                </p>
                <p className="text-sm text-pink-400">
                    Average Endgame Points:
                    <span className="ml-2">{payload[2].value}</span>
                </p>

            </div>
        );
    }
};

export default AllTeamsGraph;