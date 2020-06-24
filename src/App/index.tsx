import React, { Component } from 'react';
import { Tab, Tabs } from "react-bootstrap";
import './App.css';
import RWTextFile from "../Components/RWTextFile";
import RWExcelFile from "../Components/RWExcelFile";
import RWDBFile from "../Components/RWDBFile";

const TABS = [
  { key: 'text', title: 'Metin Dosyası Bazlı', component: <RWTextFile/> },
  { key: 'excel', title: 'Excel Dosyası Bazlı', component: <RWExcelFile/> },
  { key: 'database', title: 'Veritabanı Dosyası Bazlı', component: <RWDBFile/> },
]

class Index extends Component {
  render = () => {
    return <div className="container mt-3">
      <Tabs id="main-tabs" defaultActiveKey={TABS[0].key}>
        {TABS.map(tab =>
            <Tab eventKey={tab.key} title={tab.title} key={tab.key}>
              {tab.component}
            </Tab>
        )}
      </Tabs>
    </div>
  }
}

export default Index;
