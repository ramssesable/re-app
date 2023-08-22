import DataTable from 'react-data-table-component'

export default function ListProperties({data}) {
  // A super simple expandable component.
  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
  
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
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        pagination
    />
  );
}