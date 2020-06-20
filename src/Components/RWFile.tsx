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
  { key: 'final', value: 'Final Notu' },
  { key: 'succGrade', value: 'Başarı Notu' },
  { key: 'succChar', value: 'Harf Notu' },
]

interface IState {
  data: any,
  calculatedData: any,
}

interface IProps {
  uploadData: any,
  downloadData: any,
  renderExportBtn: any,
}

const INIT_STATE = {
  data: null,
  calculatedData: null,
}

class RWFile extends Component<IProps, IState> {
  constructor({ props }: { props: any }) {
    super(props)
    this.state = INIT_STATE
    this.calcGrades = this.calcGrades.bind(this)
  }

  uploadFile = (e: any) => {
    e.preventDefault()
    this.props.uploadData(
        e.target.files[0],
        (data: []) => this.setState({ data })
    )
  }

  downloadCalculatedDataFile = (e: any) => {
    e.preventDefault()
    this.props.downloadData(this.state.calculatedData)
  }

  calcGrades() {
    let { data } = this.state
    const calculatedData = data.map((row: Student) => {
      let succGrade = 0.4 * row.visa + 0.6 * row.final
      succGrade = parseFloat(succGrade.toFixed(2))
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

  render() {
    const { data, calculatedData } = this.state
    const { renderExportBtn } = this.props
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
            {!calculatedData && (
                <Button variant="primary" onClick={this.calcGrades}>
                  Başarı Notlarını Hesapla
                </Button>
            )}
            {calculatedData && (
                <div className="d-flex flex-row">
                  {renderExportBtn ? renderExportBtn(calculatedData) : (
                      <Button
                          variant="secondary"
                          onClick={this.downloadCalculatedDataFile}
                      >
                        Dışarı Aktar
                      </Button>
                  )}
                  <Button
                      className="ml-2"
                      variant="outline-danger"
                      onClick={() => this.setState({ calculatedData: null })}
                  >
                    Notları Sıfırla
                  </Button>
                </div>
            )}
          </Col>
          <Col>
            <Button
                className="float-right"
                variant="danger"
                onClick={() => this.setState(INIT_STATE)}
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
          {(calculatedData || data).map((row: any, rowIndex: number) => (
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

export default RWFile