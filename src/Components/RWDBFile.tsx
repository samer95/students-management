import React, { Component, Fragment } from 'react';
import Student from "../Instances/Student";
import RWFile from "./RWFile";
import axios from 'axios'
import { Button } from "react-bootstrap";

class RWDBFile extends Component {
  renderUploadComponent = (callback: any) => (
      <Button variant="primary" onClick={() => {
        axios({
          baseURL: 'http://localhost:3001/',
          url: 'students',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }).then(({ data }) => {
          data = data.map((s: any) => {
            const student: Student = {
              id: s.id,
              fName: s.first_name,
              lName: s.last_name,
              visa: s.visa,
              final: s.final,
              succGrade: 0,
              succChar: '',
            }
            return student
          })
          callback(data)
        })
      }}>
        Öğrencileri Getir
      </Button>
  )

  downloadData = (data: []) => {
    // todo: save the students in database
  }

  render() {
    return (
        <Fragment>
          <RWFile
              uploadData={null}
              downloadData={this.downloadData}
              renderExportBtn={null}
              renderUploadComponent={this.renderUploadComponent}
          />
        </Fragment>
    )
  }
}

export default RWDBFile