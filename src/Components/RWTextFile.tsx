import React, { Component } from 'react';
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Student from "../Instances/Student";

const COLS: { key: string, value: string }[] = [
  { key: 'id', value: 'Öğrenci Numarası' },
  { key: 'fName', value: 'Adı' },
  { key: 'lName', value: 'Soyadı' },
  { key: 'visa', value: 'Vize Notu' },
  { key: 'final', value: 'final' },
  { key: 'succGrade', value: 'Başarı Notu' },
  { key: 'succChar', value: 'Harf Notu' },
]

interface IState {
  data: any,
  calculatedData: any,
}

class RWTextFile extends Component<{}, IState> {
  constructor({ props }: { props: any }) {
    super(props)
    this.state = {
      data: null,
      calculatedData: null,
    }
    this.calcGrades = this.calcGrades.bind(this)
  }

  uploadFile = (e: any) => {
    e.preventDefault()
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
        this.setState({ data })
      }
    };
    reader.readAsText(e.target.files[0])
  }

  calcGrades() {
    let { data } = this.state
    const calculatedData = data.map((row: Student) => {
      const succGrade = 0.4 * row.visa + 0.6 * row.final
      let succChar
      if (succGrade >= 0 && succGrade <= 24) {
        succChar = 'D'
      } else if (succGrade >= 25 && succGrade <= 49) {
        succChar = 'C'
      } else if (succGrade >= 50 && succGrade <= 74) {
        succChar = 'B'
      } else if (succGrade >= 75 && succGrade <= 100) {
        succChar = 'A'
      }
      return { ...row, succGrade, succChar }
    })
    this.setState({ calculatedData })
  }

  render = () => {
    const { data, calculatedData } = this.state
    return <div className="mt-2">
      {!data && (
          <Form.File
              onChange={this.uploadFile}
              className="mb-2"
              label="Kayıtları Yükle"
          />
      )}

      {data && (<>
        <Row className="mb-3">
          <Col>
            <Button variant="primary" onClick={this.calcGrades}>
              Başarı Notlarını Hesapla
            </Button>
          </Col>
          <Col>
            <Button
                className="float-right"
                variant="danger"
                onClick={() => {
                  this.setState({ data: null })
                }}
            >
              Kayıtları Sıfırla
              <FontAwesomeIcon icon={faTimes} className="ml-2"/>
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
          <tr>
            {COLS.map(col => <th key={col.key}>{col.value}</th>)}
          </tr>
          </thead>
          <tbody>
          {(calculatedData || data || []).map((row: any, rowIndex: number) => (
              <tr key={rowIndex}>
                {COLS.map(col => <td key={col.key}>{row[col.key] || ''}</td>)}
              </tr>
          ))}
          </tbody>
        </Table>
      </>)}
    </div>
  }
}

export default RWTextFile