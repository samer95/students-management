import React from 'react'
import ReactExport, { ExcelColumn } from 'react-export-excel'
import { Button } from 'react-bootstrap'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet

class ExportToExcelButton extends React.Component {
  render() {
    return (
        <ExcelFile
            filename={this.props.fileName}
            element={
              <Button variant="secondary">
                Dışarı Aktar
              </Button>
            }
        >
          <ExcelSheet data={this.props.printData} name="Organization">
            <ExcelColumn label="Öğrenci Numarası" value="id"/>
            <ExcelColumn label="Adı" value="fName"/>
            <ExcelColumn label="Soyadı" value="lName"/>
            <ExcelColumn label="Vize Notu" value="visa"/>
            <ExcelColumn label="Final Notu" value="final"/>
            <ExcelColumn label="Başarı Notu" value="succGrade"/>
            <ExcelColumn label="Harf Notu" value="succChar"/>
          </ExcelSheet>
        </ExcelFile>
    )
  }
}

export default ExportToExcelButton