import React, { Component, Fragment } from 'react';
import Student from "../Instances/Student";
import RWFile from "./RWFile";

class RWTextFile extends Component {
  uploadData = (file: any, callback: any) => {
    const reader = new FileReader()
    reader.onload = e => {
      if (e.target?.result) {
        const data = (e.target.result as string).split('\n').map(row => {
          const cols = row.split(' ')
          const student: Student = {
            id: parseInt(cols[0]),
            fName: cols[1],
            lName: cols[2],
            visa: parseFloat(cols[3]),
            final: parseFloat(cols[4]),
            succGrade: 0,
            succChar: '',
          }
          return student
        })
        callback(data)
      }
    };
    reader.readAsText(file)
  }

  downloadData = (data: []) => {
    const dataToPrint =
        data.reduce((rowsText: string, row: Student) => (
            `${rowsText}\n${Object.values(row).join(" ")}`
        ), '')
    const element = document.createElement("a")
    const file = new Blob([dataToPrint], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = "BilgilerBasari.txt"
    document.body.appendChild(element)
    element.click()
  }

  render() {
    return (
        <Fragment>
          <RWFile
              uploadData={this.uploadData}
              downloadData={this.downloadData}
              renderExportBtn={null}
              renderUploadComponent={null}
              exportBtnText=""
          />
        </Fragment>
    )
  }
}

export default RWTextFile