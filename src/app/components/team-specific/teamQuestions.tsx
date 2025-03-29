import resultsData from '../../../../2025-NEW-RESULTS/results.json';
import _, { set } from 'lodash';
import React, { useState, useEffect } from 'react';

interface teamData {
    team: number,
    matches_scouted: number,
    scoreL4: boolean,
    scoreAlgae: boolean,
    climb: boolean,
    favorite_start: string,
    autonomous_epa: number,
    teleop_epa: number,
    endgame_epa: number,
}

const PRECISION = 1; // Value lodash.round uses to round numbers

// Map for position codes to readable names
const positionMap = {
    'p': 'Port',
    'o': 'Outer',
    'c': 'Center'
};

export default function TeamQuestions({teamNumber}: {teamNumber: number}) {

    let [teamData, setTeamData] = useState<teamData>({
        team: 0,
        matches_scouted: 0,
        scoreL4: false,
        scoreAlgae: false,
        climb: false,
        favorite_start: "",
        autonomous_epa: 0,
        teleop_epa: 0,
        endgame_epa: 0,
    } as teamData);
    
    useEffect(() => {
        if (teamNumber) {
            let auto_points: number[] = [];
            let teleop_points: number[] = [];
            let endgame_points: number[] = [];
            let starting_position: string[] = [];

            // reset data when teamNumber changes
            setTeamData(previousData => ({
                team: 0,
                matches_scouted: 0,
                scoreL4: false,
                scoreAlgae: false,
                climb: false,
                favorite_start: "",
                autonomous_epa: 0,
                teleop_epa: 0,
                endgame_epa: 0,
            } as teamData))
            
            setTeamData(previousData => ({...previousData, team: Number(teamNumber)} as teamData))
            
            const data = resultsData
                .filter((d: any) => d["Team-Number"] == Number(teamNumber))
                .forEach((i: any) => {
                    
                    // Can they score in L4?
                    if (Number(i["Auton-Coral-L4"]) > 0 || Number(i["Teleop-Coral-L4"]) > 0) {
                        setTeamData(previousData => ({...previousData, scoreL4: true} as teamData))
                    }

                    // Can they score Algae?
                    if (Number(i["Auton-Algae-Processor"]) > 0 || Number(i["Teleop-Algae-Processor"]) > 0 || 
                        Number(i["Auton-Algae-Net"]) > 0 || Number(i["Teleop-Algae-Net"]) > 0) {
                        setTeamData(previousData => ({...previousData, scoreAlgae: true} as teamData))
                    }

                    // Can they climb?
                    if (i["Climb-Status"] === "s" || i["Climb-Status"] === "p") {
                        setTeamData(previousData => ({...previousData, climb: true} as teamData))
                    }

                    // Total Matches Scouted
                    setTeamData(previousData => ({...previousData, matches_scouted: previousData.matches_scouted + 1} as teamData))

                    // Calculate Auton points
                    const autonPoints = 
                        (Number(i["Auton-Coral-L4"] || 0) * 4) +
                        (Number(i["Auton-Coral-L3"] || 0) * 3) +
                        (Number(i["Auton-Coral-L2"] || 0) * 2) +
                        (Number(i["Auton-Coral-L1"] || 0) * 1) +
                        (Number(i["Auton-Algae-Net"] || 0) * 2) +
                        (Number(i["Auton-Algae-Processor"] || 0) * 1);
                    
                    auto_points.push(autonPoints);
                    
                    // Calculate Teleop points
                    const teleopPoints = 
                        (Number(i["Teleop-Coral-L4"] || 0) * 4) +
                        (Number(i["Teleop-Coral-L3"] || 0) * 3) +
                        (Number(i["Teleop-Coral-L2"] || 0) * 2) +
                        (Number(i["Teleop-Coral-L1"] || 0) * 1) +
                        (Number(i["Teleop-Algae-Net"] || 0) * 2) +
                        (Number(i["Teleop-Algae-Processor"] || 0) * 1);
                    
                    teleop_points.push(teleopPoints);
                    
                    // Calculate Endgame points
                    let endgamePoints = 0;
                    if (i["Climb-Status"] === "s") endgamePoints += 2;
                    if (i["Climb-Status"] === "p") endgamePoints += 1;
                    
                    endgame_points.push(endgamePoints);

                    // Add starting position to array
                    if (i["Auton-Position"]) {
                        starting_position.push(i["Auton-Position"]);
                    }
                });
            
            // Calculate favorite starting position
            let favorite_start = "";
            if (starting_position.length > 0) {
                const positionCounts = {};
                let maxCount = 0;
                
                // Count occurrences of each position
                for (const position of starting_position) {
                    positionCounts[position] = (positionCounts[position] || 0) + 1;
                    if (positionCounts[position] > maxCount) {
                        maxCount = positionCounts[position];
                        favorite_start = position;
                    }
                }
            }
            
            // Calculate EPA with top 50% of matches for auto and teleop
            setTeamData(previousData => ({
                ...previousData, 
                autonomous_epa: _.round(calculateTopHalfAverage(auto_points), PRECISION),
                teleop_epa: _.round(calculateTopHalfAverage(teleop_points), PRECISION),
                endgame_epa: _.round(_.mean(endgame_points), PRECISION),
                favorite_start: favorite_start
            } as teamData));
        }
    }, [teamNumber]);
    
    // Get readable position name
    const getPositionDisplay = (posCode) => {
        return posCode ? (positionMap[posCode] || posCode) : 'None';
    };
    
    return (
        <div className="p-8 bg-slate-900 shadow-slate-400/10 divide-x-8 shadow-xl gap-8 rounded-xl mb-12 flex flex-row justify-between w-full h-full">
            <div className='flex flex-row justify-between w-full h-full font-extralight'>
                <div className='text-left flex flex-col'>
                    <p className='font-bold'>Expected Points Added (EPA):</p>
                    <br />
                    <p className='text-purple-400'>Autonomous EPA:</p>
                    <p className='text-blue-400'>Teleoperated EPA:</p>
                    <p className='text-orange-400'>Endgame EPA:</p>
                </div>
                <div className='text-right flex flex-col font-extrabold text-md'>
                    <p
                        className={teamData.autonomous_epa ? (teamData.autonomous_epa + teamData.teleop_epa + teamData.endgame_epa > 15 ? 'text-white' : 'text-red-300') : 'text-red-300'}
                    >{teamData.autonomous_epa + teamData.teleop_epa + teamData.endgame_epa ? _.round(teamData.autonomous_epa + teamData.teleop_epa + teamData.endgame_epa, PRECISION) : 0}</p>
                    <br />
                    <p className='text-purple-500'>{teamData.autonomous_epa}</p>
                    <p className='text-blue-500'>{teamData.teleop_epa}</p>
                    <p className='text-orange-500'>{teamData.endgame_epa}</p>
                </div>
            </div>
            <div className='flex flex-row justify-between w-full pl-8'>
                <div className='text-left flex flex-col justify-between'>
                    <p>Can they score in L4?</p>
                    <p>Can they score Algae?</p>
                    <p>Can they Climb?</p>
                    <p>Favorite Starting Position:</p>
                    <p>Total Matches Scouted: </p>
                </div>
                <div className='text-right flex flex-col justify-between font-extrabold text-md'>
                    <p className={teamData.scoreL4 ? 'text-green-500' : 'text-red-500'}>{teamData.scoreL4 ? "Yes" : "No"}</p>
                    <p className={teamData.scoreAlgae ? 'text-green-500' : 'text-red-500'}>{teamData.scoreAlgae ? "Yes" : "No"}</p>
                    <p className={teamData.climb ? 'text-green-500' : 'text-red-500'}>{teamData.climb ? "Yes" : "No"}</p>
                    <p>{getPositionDisplay(teamData.favorite_start)}</p>
                    <p>{teamData.matches_scouted}</p>
                </div>
            </div>
        </div>
    );
}

/**
 * Calculates the average of the top 50% of values in an array
 * @param arr - The array of numbers to calculate from
 * @returns The average of the top 50% of values
 */
function calculateTopHalfAverage(arr: number[]) {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[0];
    
    // Sort in descending order
    const sorted = [...arr].sort((a, b) => b - a);
    
    // Take the top 50%
    const numToTake = Math.ceil(sorted.length / 2);
    const topHalf = sorted.slice(0, numToTake);
    
    // Calculate average
    return _.mean(topHalf);
}