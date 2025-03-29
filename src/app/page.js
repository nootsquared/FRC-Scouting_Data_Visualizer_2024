'use client';

import AutonCoral from './components/all-teams/AutonCoral';
import AutonAlgae from './components/all-teams/AutonAlgae';
import TeleopCoral from './components/all-teams/TeleopCoral';
import TeleopAlgae from './components/all-teams/TeleopAlgae';
import AllTeamsTotal from './components/all-teams/AllTeamsTotal';
import TeamAutons from './components/team-specific/teamAutons';
import TeamTeleops from './components/team-specific/teamTeleops';
import TeamQuestions from './components/team-specific/teamQuestions';
import Graph from './components/team-specific/tableTeam';
import PitGraph from './components/team-specific/tableTeamPit';
import { Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { IconLink } from '@tabler/icons-react';
import Link from 'next/link';

export default function Home() {
  const [teamNumber, setTeamNumber] = useState("226");
  const [teleopCoralFilter, setTeleopCoralFilter] = useState("ALL");
  const [teleopAlgaeFilter, setTeleopAlgaeFilter] = useState("ALL");

  const handleTeamNumberChange = (event) => {
    setTeamNumber(event.target.value);
  };

  const handleTeleopCoralFilterChange = (filter) => setTeleopCoralFilter(filter);
  const handleTeleopAlgaeFilterChange = (filter) => setTeleopAlgaeFilter(filter);

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
          <Link className='flex flex-row justify-evenly gap-2' href={"/csv-to-json"}>
            CSV to JSON
            <IconLink size={30} />
          </Link>
        </button>
      </div>

      <div className="grid xl:grid-cols-1 lg:grid-cols-2 w-full gap-10 max-w-[1400px] mb-12">
        <GridItem title="All Teams">
          <AllTeamsTotal />
        </GridItem>
      </div>

      {/* Option Chooser */}
      <div className="flex flex-col items-center justify-center mb-12">
        <h2 className="text-lg font-semibold text-white mb-4">Filter Teleop Graphs</h2>
        <div className="flex flex-row gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-full shadow-md ${teleopCoralFilter === "L4" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => handleTeleopCoralFilterChange("L4")}
          >
            L4
          </button>
          <button
            className={`px-4 py-2 rounded-full shadow-md ${teleopCoralFilter === "L3" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => handleTeleopCoralFilterChange("L3")}
          >
            L3
          </button>
          <button
            className={`px-4 py-2 rounded-full shadow-md ${teleopCoralFilter === "L2" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => handleTeleopCoralFilterChange("L2")}
          >
            L2
          </button>
          <button
            className={`px-4 py-2 rounded-full shadow-md ${teleopCoralFilter === "L1" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => handleTeleopCoralFilterChange("L1")}
          >
            L1
          </button>
          <button
            className={`px-4 py-2 rounded-full shadow-md ${teleopCoralFilter === "TotalCoral" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => handleTeleopCoralFilterChange("TotalCoral")}
          >
            Total Coral
          </button>
          <button
            className={`px-4 py-2 rounded-full shadow-md ${teleopCoralFilter === "ALL" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => handleTeleopCoralFilterChange("ALL")}
          >
            ALL
          </button>
        </div>
        <div className="flex flex-row gap-4">
          <button
            className={`px-4 py-2 rounded-full shadow-md ${teleopAlgaeFilter === "Barge" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => handleTeleopAlgaeFilterChange("Barge")}
          >
            Barge
          </button>
          <button
            className={`px-4 py-2 rounded-full shadow-md ${teleopAlgaeFilter === "Processor" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => handleTeleopAlgaeFilterChange("Processor")}
          >
            Processor
          </button>
          <button
            className={`px-4 py-2 rounded-full shadow-md ${teleopAlgaeFilter === "ALL" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => handleTeleopAlgaeFilterChange("ALL")}
          >
            ALL
          </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 lg:grid-cols-2 w-full gap-10 max-w-[1400px] mb-12">
        <GridItem title="Auton Coral">
          <AutonCoral />
        </GridItem>
        <GridItem title="Auton Algae">
          <AutonAlgae />
        </GridItem>
      </div>

      <div className="grid xl:grid-cols-2 lg:grid-cols-2 w-full gap-10 max-w-[1400px] mb-12">
        <GridItem title="Teleop Coral">
          <TeleopCoral filter={teleopCoralFilter} />
        </GridItem>
        <GridItem title="Teleop Algae">
          <TeleopAlgae filter={teleopAlgaeFilter} />
        </GridItem>
      </div>

      <div className="grid xl:grid-cols-1 lg:grid-cols-2 w-full gap-10 max-w-[400px] max-h-[400px] mb-12 text-white">
        <h1 className="text-2xl font-bold text-white text-center">Team Number Input:</h1>
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
        <TeamQuestions teamNumber={teamNumber} />
      </div>
      <div className="grid xl:grid-cols-2 lg:grid-cols-2 w-full gap-10 max-w-[1400px] mb-12">
        <GridItem title="Autonomous">
          <TeamAutons teamNumber={teamNumber} />
        </GridItem>

        <GridItem title="Teleoperated">
          <TeamTeleops teamNumber={teamNumber} />
        </GridItem>
      </div>

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