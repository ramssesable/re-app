import logo from './logo.svg';
import './App.css';
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { AddProperty, ListProperties } from './components';
import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [alert, setAlert] = useState({})

  const getData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/properties`)
      .then(result => {
        setData(result.data)
      })
  }

  const sendAlert = (messageContent = false) => {
    if (messageContent) {
      setAlert({
        type: messageContent.type,
        title: messageContent.title,
        message: messageContent.message
      })
    }

    setShow(true)
    getData()

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

          <Alert variant={alert.type ?? 'success'} onClose={() => setShow(false)} dismissible show={show}>
            <Alert.Heading>{alert.title ?? 'Property added!'}</Alert.Heading>
            <p>{alert.message ?? 'Record was added successfully'}</p>
          </Alert>

          <ListProperties data={data} sendAlert={sendAlert}/>
        </Container>
        
      </header>
    </div>
  );
}

export default App;
