import axios from 'axios'
import { useState } from 'react'
import DataTable from 'react-data-table-component'
import FormModal from './FormModal'

export default function ListProperties({ data, sendAlert }) {
  const [show, setShow] = useState(false)
  const [details, setDetails] = useState([])

  const getDetails = ({id}) => {
    axios.get(`${process.env.REACT_APP_API_URL}/properties/${id}`)
      .then(result => {
        if (result.status === 200) {
          console.log('Get Details', result.data)
          setDetails(result.data)

          setShow(true)
        }
        
        // console.log('Name', details.name)
      })
  }

  // const ExpandedComponent = ({ data }) => {
  //   getDetails(data)
  //   return <pre>{JSON.stringify(details ?? {}) }</pre>
  // }
  /* This feature just decide to loop tons of time, I think is a thing from the datatable component i used :c */
  
  // // A super simple expandable component.
  // const ExpandedComponent = ({ data }) => <pre>{ JSON.stringify(data, null, 2) }</pre>

  const handleClose = () => {
      setShow(false)
  }
  
  const handleShow = (data) => {
    // setDetails(data)
    getDetails(data)
  }

  const removeRow = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/properties/${id}`)
      .then(result => {
        if(result.status === 200) {
          sendAlert({title:'Property deleted!', message:`Property #${id} deleted succefully`})
        }
      })
      .catch(result => {
          alert(`Failed to remove the property, errors: ${JSON.stringify(result.response.data.errors, null, 2)}`)
      })
  }
  
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Type',
      selector: row => row.real_state_type,
      sortable: true,
    },
    {
      name: 'City',
      selector: row => row.city,
      sortable: true,
    },
    {
      name: 'Country',
      selector: row => row.country,
      sortable: true,
    },
    {
      cell: row => <>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => handleShow(row)}
        >
          Edit
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => removeRow(row.id)}
        >
          Remove
        </button>
      </>,
    },
  ];

  return (
    <>
      <FormModal initialValues={details} show={show} setShow={setShow} sendAlert={sendAlert} handleClose={handleClose}/>

      <DataTable
          columns={columns}
          data={data}
          title={'Real Estate Properties'}
          responsive
          // expandableRows
          // expandableRowsComponent={() => ExpandedComponent()}
          pagination
      />
    </>
  );
}