import React from 'react';
import './App.css';
import axios from 'axios';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';

function App() {

  const [count, setCount] = React.useState(0);
  const [data, setData] = React.useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  React.useEffect(() => {
    const apiUrl = 'http://localhost:8080/api/products';
    axios.get(apiUrl).then((repos) => {
      let dummyData = repos.data;
      console.log(repos);
      setData(dummyData);
    });
  }, []);
  const onGridReady = (api) => {
    const gridApi = api;
    console.log(gridApi);
  }
  const columnDefs = [
    {
      headerName: "prod_id", field: "prod_id", sortable: true, filter: true, editable:true
    },
    {
      headerName: "name", field: "name", sortable: true, filter: true
    },
    {
      headerName: "delivery", field: "delivery", sortable: true, filter: true
    }, 
    {
      headerName: "format", field: "format", sortable: true, filter: true
    },
    {
      headerName: "frequency", field: "frequency", sortable: true, filter: true
    },

    {
      headerName: "rating", field: "rating", sortable: true, filter: true
    },
    {
      headerName: "relevancyPercentage", field: "relevancyPercentage", sortable: true, filter: true
    },
    {
      headerName: "source", field: "source", sortable: true, filter: true
    },
    {
      headerName: "description", field: "description", sortable: true, filter: true
    }
  ];
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
           <p>
            Basic React Server side Redering App! Using Express js And Babel js.
        </p>
          {data && data.message && <p>{data.message}</p>}
          <p>{count}</p>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <table>
            <tbody>
              <tr>
                <td>{data.object}</td>
              </tr>
            </tbody>
          </table>
          <div className="ag-theme-alpine"
            style={{
              height: '450px',
              width: '1000px'
            }}
          >
            <AgGridReact
              columnDefs={columnDefs}
              onGridReady={onGridReady}
              groupDefaultExpanded={1}
              animateRows={true}
              rowData={data.data}>
            </AgGridReact>
          </div>
        </header>

      </div>
    </React.Fragment>
  );
}

export default App;
