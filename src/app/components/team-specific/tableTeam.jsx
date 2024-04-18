'use client';

import React, { useState, useEffect } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Divider, Typography, TableFooter, TablePagination, Container } from '@material-ui/core';
import data from  '../../results/resultsmatch.json';
import { ResponsiveContainer } from 'recharts';

const MatchNumberTable = ({page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, teamNumber }) => {
    
  const [filteredData, setFilteredData] = useState([]);
  const selectedTeam = teamNumber;

    if (!data) {
        return <div>Loading...</div>;
    }

    let teamData = data
    .filter(item => String(item.team_number) === selectedTeam)
    .map(item => ({
        ...item,
        match_number: Number(item.match_number),
        speaker_notes_auton: Number(item.speaker_notes_auton),
        amp_notes_auton: Number(item.amp_notes_auton),
    }))
    .sort((a, b) => a.match_number - b.match_number);

  return (
    <div>
      <ResponsiveContainer width="100 %" height="100%">
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 850 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Scouter Name</TableCell>
                  <TableCell align="right">Match Number</TableCell>
                  <TableCell align="right">Starting Position</TableCell>
                  <TableCell align="right">AMP Notes Auton</TableCell>
                  <TableCell align="right">Speaker Notes Auton</TableCell>
                  <TableCell align="right">Disabled</TableCell>
                  <TableCell align="right">Additional Notes Location</TableCell>
                  <TableCell align="right">AMP Notes Teleop</TableCell>
                  <TableCell align="right">Speaker Notes Teleop</TableCell>
                  <TableCell align="right">Notes Fed</TableCell>
                  <TableCell align="right">Trap</TableCell>
                  <TableCell align="right">Hang or Park</TableCell>
                  <TableCell align="right">Harmonize</TableCell>
                  <TableCell align="right">Penalized</TableCell>
                  <TableCell align="right">Robot Driving</TableCell>
                  <TableCell align="right">Defense Capability</TableCell>
                  <TableCell align="right">Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.scouter_name}</TableCell>
                    <TableCell align="right">{item.match_number}</TableCell>
                    <TableCell align="right">{item.starting_position}</TableCell>
                    <TableCell align="right">{item.amp_notes_auton}</TableCell>
                    <TableCell align="right">{item.speaker_notes_auton}</TableCell>
                    <TableCell align="right">{item.disabled}</TableCell>
                    <TableCell align="right">{item.additional_notes_location}</TableCell>
                    <TableCell align="right">{item.amp_notes_teleop}</TableCell>
                    <TableCell align="right">{item.speaker_notes_teleop}</TableCell>
                    <TableCell align="right">{item.notes_fed}</TableCell>
                    <TableCell align="right">{item.trap}</TableCell>
                    <TableCell align="right">{item.hang_or_park}</TableCell>
                    <TableCell align="right">{item.harmonize}</TableCell>
                    <TableCell align="right">{item.penalized}</TableCell>
                    <TableCell align="right">{item.robot_driving}</TableCell>
                    <TableCell align="right">{item.defense_capability}</TableCell>
                    <TableCell align="right">{item.notes}</TableCell>
                    {/* <TableCell align="right">{item.totalAutonPoints}</TableCell>
                    <TableCell align="right">{item.totalTeleopPoints}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default MatchNumberTable;