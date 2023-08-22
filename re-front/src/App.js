import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap'
import { AddProperty, ListProperties } from './components';
import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [data, setData] = useState([])

  const getData = () => {
    axios.get('http://localhost/re-app/public/api/properties')
      .then(result => {
        setData(result.data)
        console.log(result.data)
      })
  }
  
  useEffect(() => {
    getData()
  }, [])
  // const foundProperties = filter

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Container className="p-3">
          <ListProperties data={data}/>
        </Container>
        
        <AddProperty />
      </header>
    </div>
  );
}

// import { useState } from 'react';

// function SearchableVideoList({ videos }) {
//   const [searchText, setSearchText] = useState('');
//   const foundVideos = filterVideos(videos, searchText);
//   return (
//     <>
//       <SearchInput
//         value={searchText}
//         onChange={newText => setSearchText(newText)} />
//       <VideoList
//         videos={foundVideos}
//         emptyHeading={`No matches for “${searchText}”`} />
//     </>
//   );
// }

export default App;
