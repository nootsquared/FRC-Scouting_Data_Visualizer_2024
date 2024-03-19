import raw_data from '../results.json';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';

interface teamData {
    team: number,
    matches_scouted: number,
    speaker: boolean,
    amp: boolean,
    climb: boolean,
    trap: boolean,
    autonomous_epa: number,
    teleop_epa: number,
    endgame_epa: number,
    expected_notes: number // used for melody 
    // total_epa: number, // this is a calculated field 
}

// This represents the number of matches that are dropped from our EPA calculations. 
// If a team has played GRACE_MATCHES + 2 total matches, the lowest GRACE_MATCHES matches are dropped 
// from the EPA calculations.
const GRACE_MATCHES = 1;

const PRECISION = 1; // Value lodash.round uses to round numbers

// This function is used to calculate the average of an array of numbers,
// excluding the lowest grace_num numbers in the array
function graceAvg(arr: number[], grace_num: number) {
    return _.mean(_.orderBy(arr, [], ['desc']).slice(0, arr.length - grace_num));
}


export default function TeamQuestions({teamNumber}: {teamNumber: number}) {

    let [teamData, setTeamData] = useState<teamData>({
        team: 0,
        matches_scouted: 0,
        speaker: false,
        amp: false,
        climb: false,
        trap: false,
        autonomous_epa: 0,
        teleop_epa: 0,
        endgame_epa: 0,
    } as teamData);
    
    useEffect(() => {
        if (teamNumber) {

            let auto_points: number[] = [];
            let teleop_points: number[] = [];
            let endgame_points: number[] = [];
            let notes_scored: number[] = [];

            // reset matches scouted when teamNumber changes
            setTeamData(previousData => ({
                team: 0,
                matches_scouted: 0,
                speaker: false,
                amp: false,
                climb: false,
                trap: false,
                autonomous_epa: 0,
                teleop_epa: 0,
                endgame_epa: 0,
            } as teamData))
            

            setTeamData(previousData => ({...previousData, team: Number(teamNumber)} as teamData))
            const data = raw_data
                .filter((d: any) => d.team_number == Number(teamNumber))
                .forEach((i: any) => {

                    console.log(i)
                    
                    // Can they score in the Speaker?
                    if (Number(i.speaker_notes_auton) > 0 || Number(i.speaker_notes_teleop) > 0) {
                        setTeamData(previousData => ({...previousData, speaker: true} as teamData))
                    }

                    // Can they score in the Amp?
                    if (Number(i.amp_notes_auton) > 0 || Number(i.amp_notes_teleop) > 0) {
                        setTeamData(previousData => ({...previousData, amp: true} as teamData))
                    }

                    // Can they climb?
                    if (i.hang_or_park === "Hang") {
                        setTeamData(previousData => ({...previousData, climb: true} as teamData))
                    }
                    
                    // Can they trap?
                    if (i.trap === "Yes") {
                        setTeamData(previousData => ({...previousData, trap: true} as teamData))
                    }

                    // Total Matches Scouted
                    setTeamData(previousData => ({...previousData, matches_scouted: previousData.matches_scouted + 1} as teamData))

                    // Add all points scored to a running array
                    auto_points.push(Number(i.speaker_notes_auton) * 5 + Number(i.amp_notes_auton) * 2)
                    teleop_points.push(Number(i.speaker_notes_teleop) * 2 + Number(i.amp_notes_teleop) * 1)
                    let endgame_pts = 0
                    if (i.trap === "Yes") endgame_pts += 5;
                    if (i.hang_or_park === "Hang") {
                        if (i.harmonize === "Yes") {
                            endgame_pts += 5;
                        } else {
                            endgame_pts += 3;
                        }
                    } else if (i.hang_or_park === "Park") {
                        endgame_pts += 1;
                    }
                    endgame_points.push(endgame_pts)
                    notes_scored.push(Number(i.speaker_notes_auton) + Number(i.speaker_notes_teleop) + Number(i.amp_notes_auton) + Number(i.amp_notes_teleop))

                })
            
            

            // Calculate the average of the points arrays
            setTeamData(previousData => ({...previousData, autonomous_epa: _.round(graceAvg(auto_points, GRACE_MATCHES), PRECISION)} as teamData))
            setTeamData(previousData => ({...previousData, teleop_epa: _.round(graceAvg(teleop_points, GRACE_MATCHES), PRECISION)} as teamData))
            setTeamData(previousData => ({...previousData, endgame_epa: _.round(graceAvg(endgame_points, GRACE_MATCHES), PRECISION)} as teamData))
            setTeamData(previousData => ({...previousData, expected_notes: Math.floor(graceAvg(notes_scored, GRACE_MATCHES))} as teamData))
                
        }
    }, [teamNumber]);
    
    return (
        <div className="p-8 bg-slate-900 shadow-slate-400/10 divide-x-8 shadow-xl gap-8 rounded-xl mb-12 flex flex-row justify-between w-full h-full">
            <div className='flex flex-row justify-between w-full h-full font-extralight'>
                <div className='text-left flex flex-col'>
                    <p className='font-bold'>Expected Points Added (EPA):</p>
                    <br />
                    <p className='text-purple-400'>Autonomous EPA:</p>
                    <p className='text-blue-400'>Teleoperated EPA:</p>
                    <p className='text-orange-400'>Endgame EPA:</p>
                    <br />
                    <p>Expected Notes Scored: </p>
                </div>
                <div className='text-right flex flex-col font-extrabold text-md'>
                    <p
                        className={teamData.autonomous_epa ? (teamData.autonomous_epa + teamData.teleop_epa + teamData.endgame_epa > 15 ? 'text-white' : 'text-red-300') : 'text-red-300'}
                    >{teamData.autonomous_epa ? _.round(teamData.autonomous_epa + teamData.teleop_epa + teamData.endgame_epa, PRECISION) : 0}</p>
                    <br />
                    <p className='text-purple-500'>{teamData.autonomous_epa}</p>
                    <p className='text-blue-500'>{teamData.teleop_epa}</p>
                    <p className='text-orange-500'>{teamData.endgame_epa}</p>
                    <br />
                    <p>{teamData.expected_notes}</p>
                </div>
            </div>
            <div className='flex flex-row justify-between w-full pl-8'>
                <div className='text-left flex flex-col justify-between'>
                    <p>Can they score in the Speaker?</p>
                    <p>Can they score in the Amp?</p>
                    <p>Can they Climb?</p>
                    <p>Can they Trap?</p>
                    <p>Total Matches Scouted: </p>

                </div>
                <div className='text-right flex flex-col justify-between font-extrabold text-md'>
                    <p className={teamData.speaker ? 'text-green-500' : 'text-red-500'}>{teamData.speaker ? "Yes" : "No"}</p>
                    <p className={teamData.amp ? 'text-green-500' : 'text-red-500'}>{teamData.amp ? "Yes" : "No"}</p>
                    <p className={teamData.climb ? 'text-green-500' : 'text-red-500'}>{teamData.climb ? "Yes" : "No"}</p>
                    <p className={teamData.trap ? 'text-green-500' : 'text-red-500'}>{teamData.trap ? "Yes" : "No"}</p>
                    <p>{teamData.matches_scouted}</p>
                </div>
            </div>
        </div>
    );
}