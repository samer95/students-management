import React, { Component } from 'react';
import { Tab, Tabs } from "react-bootstrap";
import './App.css';

const TABS = [
  { key: 'text', title: 'Metin Dosyası Bazlı', component: null },
  { key: 'excel', title: 'Excel Dosyası Bazlı', component: null },
  { key: 'database', title: 'Veritabanı Dosyası Bazlı', component: null },
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
