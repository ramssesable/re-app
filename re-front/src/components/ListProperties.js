// import axios from 'axios'
// import { useState } from 'react'
import DataTable from 'react-data-table-component'

export default function ListProperties({ data }) {
  // const [details, setDetails] = useState([])

  // const getDetails = (id) => {
  //   axios.get(`${process.env.REACT_APP_API_URL}/properties/${data.id}`)
  //     .then(result => {
  //       setDetails(result.data)
  //     })
  // }
  /* This feature just decide to loop tons of time, I think is a thing from the datatable component i used :c */

  // // A super simple expandable component.
  // const ExpandedComponent = ({ data }) => <pre>{ JSON.stringify(data, null, 2) }</pre>
  
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
    },
    {
      name: 'Type',
      selector: row => row.real_state_type,
    },
    {
      name: 'City',
      selector: row => row.city,
    },
    {
      name: 'Country',
      selector: row => row.country,
    },
  ];

  return (
    <DataTable
        columns={columns}
        data={data}
        title={'Real Estate Properties'}
        // expandableRows
        // expandableRowsComponent={ExpandedComponent}
        pagination
    />
  );
}