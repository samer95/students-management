import React, { Component, Fragment } from 'react';
import Student from "../Instances/Student";
import * as XLSX from 'xlsx';
import RWFile from "./RWFile";

class RWExcelFile extends Component {

  uploadData = (file: any, callback: any) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const readedData = XLSX.read(e.target?.result, { type: 'binary' });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const data = dataParse.map((row: any) => {
        const student: Student = {
          id: parseInt(row[0]),
          fName: row[1],
          lName: row[2],
          visa: parseFloat(row[3]),
          final: parseFloat(row[4]),
          succGrade: 0,
          succChar: '',
        }
        return student
      })
      callback(data)
    };
    reader.readAsBinaryString(file)
  }

  downloadData = (data: []) => {
  }

  render() {
    return (
        <Fragment>
          <RWFile
              uploadData={this.uploadData}
              downloadData={this.downloadData}
          />
        </Fragment>
    )
  }
}

export default RWExcelFile