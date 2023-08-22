import logo from './logo.svg';
import './App.css';
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { AddProperty, ListProperties } from './components';
import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)

  const getData = () => {
    axios.get('http://localhost/re-app/public/api/properties')
      .then(result => {
        setData(result.data)
      })
  }

  const sendAlert = () => {
    setShow(true)

    setTimeout(() => {
      setShow(false)
    },5000)
  }
  
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Container className="p-3">
          <Row>
            <Col></Col>
            <Col md={9}>
              <img src={logo} className="App-logo" alt="logo" />
            </Col>
            <Col>
              <AddProperty sendAlert={sendAlert}/>
            </Col>
          </Row>

          <Alert variant="primary" onClose={() => setShow(false)} dismissible show={show}>
            <Alert.Heading>Property Added!</Alert.Heading>
            <p>Record was successfully added</p>
          </Alert>

          <ListProperties data={data}/>
        </Container>
        
      </header>
    </div>
  );
}

export default App;
