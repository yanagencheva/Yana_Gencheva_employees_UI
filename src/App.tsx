import React, { useState, useEffect } from 'react';
import './App.css';
import Button from "@mui/material/Button";
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';


function App() {
 const [data, setData] = useState([]);
 const [updateData, setUpdateData] = useState(false);

//  useEffect(() => {
//     reloadData();
//   }, []);

  const tableHeader = [
  "Employee ID #1",
  "Employee ID #2",
  "Project ID",
  "Days worked"
];

 const onFilesSelect = (newfile: File) => {
  const file = new FormData();
    file.append("File", newfile);

  fetch('https://localhost:9999/api/public/EmployeeProjects/import-file', 
  { 
    method: "POST",
    body: file
  })
  .then(function (res) {
      if (res.ok) {
         fetch('https://localhost:9999/api/public/EmployeeProjects/all-employees')
          .then(response => response.json())
          .then(json => setData(json))
          .catch(error => console.error(error));
      };
    }, function (e) {
      alert("Error submitting form!");
    });
  };


  return (
    <Grid>
      <input
        type='file'
        onChange={(event) => {
          if (event.target.files) {
              onFilesSelect(event.target.files[0]);
          }
            event.target.value = '';
          }}
      />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeader.map((el) => (
              <TableCell>{el}</TableCell>
            ))}
          </TableRow>
        </TableHead>
          <TableBody>
          {data.map(({ firstEmpID, secondEmpID, projectID, daysWorked }) => {
            return (
              <TableRow hover key={firstEmpID-secondEmpID}>
                <TableCell align="center">{firstEmpID}</TableCell>
                <TableCell align="center">{secondEmpID}</TableCell>
                <TableCell align="center">{projectID}</TableCell>
                <TableCell align="center">{daysWorked}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
     </Grid>
  );
}

export default App;
