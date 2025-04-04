'use client';

import AutonConst from './components/all-teams/AutonConst';
import TeleopConst from './components/all-teams/TeleopConstSpeaker';
import TeleopConstAmp from './components/all-teams/TeleopConstAmp';
import EndgameConst from './components/all-teams/EndgameConst';
import AllTeamsTotal from './components/all-teams/AllTeamsTotal';
import TeamAutons from './components/team-specific/teamAutons';
import TeamTeleops from './components/team-specific/teamTeleops';
import TeamAverages from './components/team-specific/teamAverages';
import Graph from './components/team-specific/tableTeam';
import { Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import TeamQuestions from './components/team-specific/teamQuestions';
import { IconLink } from '@tabler/icons-react';
import Link from 'next/link';
import PitGraph from './components/team-specific/tableTeamPit';

export default function Home() {
  const [teamNumber, setTeamNumber] = useState("226");

  const handleTeamNumberChange = (event) => {
    setTeamNumber(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-8 xl:px-10 py-14">
      <div>
        <h1 className="text-4xl font-bold text-white mb-12">Scouting Data Visualization</h1>
      </div>

      <div className="flex flex-row justify-center gap-10 mb-12">
        <button className='bg-slate-900 w-72 h-20 text-center flex flex-row items-center justify-center text-2xl font-extralight rounded-2xl'>
          <Link className='flex flex-row justify-evenly gap-2' href={"/picklist"}>
            EPA Ranking
            <IconLink size={30} />
          </Link>
        </button>
        <button className='bg-slate-900 w-72 h-20 text-center flex flex-row items-center justify-center text-2xl font-extralight rounded-2xl'>
          <Link className='flex flex-row justify-evenly gap-2' href={"/qrreader-match"}>
            QR - Match
            <IconLink size={30} />
          </Link>
        </button>
        <button className='bg-slate-900 w-72 h-20 text-center flex flex-row items-center justify-center text-2xl font-extralight rounded-2xl'>
          <Link className='flex flex-row justify-evenly gap-2' href={"/qrreader-pit"}>
            QR - Pit
            <IconLink size={30} />
          </Link>
        </button>

      </div>

      <div className="grid xl:grid-cols-1 lg:grid-cols-2 w-full gap-10 max-w-[1400px] mb-12">
        <GridItem title="All Teams">
          <AllTeamsTotal />
        </GridItem>
      </div>

      <div className="grid xl:grid-cols-2 lg:grid-cols-2 w-full gap-10 max-w-[1400px] mb-12">
        <GridItem title="Auton">
          <AutonConst />
        </GridItem>

        <GridItem title="Teleop Speaker">
          <TeleopConst />
        </GridItem>
        
        <GridItem title="Teleop Amp">
          <TeleopConstAmp />
        </GridItem>
        <GridItem title="Endgame Totals">
          <EndgameConst />
        </GridItem>
      </div>

      <div className="grid xl:grid-cols-1 lg:grid-cols-2 w-full gap-10 max-w-[400px] max-h-[400px] mb-12 text-white">
        <h1 className="text-2xl font-bold text-white  text-center">Team Number Input:</h1>
        <TextField
            focused
            InputProps={{
                style: { color: 'white' }
            }}
            margin="normal"
            color="primary"
            id="teamNumber"
            label="Team Number"
            value={teamNumber}
            onChange={handleTeamNumberChange}
        />
      </div>

      <div className="text-center w-full max-w-[1000px]">
        <h1 className="text-4xl font-bold text-white mb-12 w-full">Team {teamNumber}</h1>
        <TeamQuestions teamNumber={teamNumber}/>
      </div>
      <div className="grid xl:grid-cols-2 lg:grid-cols-2 w-full gap-10 max-w-[1400px] mb-12">
        <GridItem title="Autonomous">
          <TeamAutons teamNumber={teamNumber} />
        </GridItem>

        <GridItem title="Teleoperated">
          <TeamTeleops teamNumber={teamNumber} />
        </GridItem>
      </div>
      {/* <div className="grid xl:grid-cols-1 lg:grid-cols-2 w-full gap-10 max-w-[1400px] mb-12">
        <GridItem title="Total Values">
          <TeamAverages teamNumber={teamNumber} />
        </GridItem>
      </div> */}
      <div className="grid xl:grid-cols-1 lg:grid-cols-2 w-full gap-10 max-w-[1500px] mb-12 px-50">
        <GridItem title="Data Per Match">
          <Graph teamNumber={teamNumber} />
        </GridItem>
      </div>
      <div className="grid xl:grid-cols-1 lg:grid-cols-2 w-full gap-10 max-w-[1500px] mb-12 px-50">
        <GridItem title="Pit Scouted Data">
          <PitGraph teamNumber={teamNumber} />
        </GridItem>
      </div>
    </main>
  );
}

function GridItem({ title, children }) {
  return (
    <div className="flex flex-col items-center justify-start p-4 border border-slate-900 bg-slate-900/50 rounded-xl min-h-[400px]">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="w-full h-full overflow-auto">
        {children}
      </div>
    </div>
  );
}