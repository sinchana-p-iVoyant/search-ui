import React, { useEffect, useState } from 'react'
import { Table, Input, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ShipmentDataItem, ResultObject } from '../App'
import MonacoEditor from 'react-monaco-editor';
import './SearchUI.css'

const { Search } = Input;

interface DataType {
  key: string;
  name: string;
  phone?: string;
  addressLn1: string;
  city: string;
  country: string;
  partyType: string;
  rlCd: string;
  state: string;
  zip: string;
  trackingId: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'No.',
    dataIndex: 'key',
    key: 'name',
    sorter: (a, b) => a.key.length - b.key.length,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Shipping User Id',
    dataIndex: 'trackingId',
    key: 'trackingId',
    sorter: (a, b) => a.trackingId.length - b.trackingId.length,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    render: (phone) => (phone ? phone : <p style={{color: 'rgba(147, 146, 146, 0.438)'}}>Not Available</p>)
  },
  {
    title: 'Address',
    dataIndex: 'addressLn1',
    key: 'addressLn1',
    sorter: (a, b) => a.addressLn1.length - b.addressLn1.length,
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
    sorter: (a, b) => a.city.length - b.city.length,
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    sorter: (a, b) => a.country.length - b.country.length,
  },
  {
    title: 'Party Type',
    dataIndex: 'partyType',
    key: 'partyType',
    sorter: (a, b) => a.partyType.length - b.partyType.length,
  },
  {
    title: 'rlCd',
    dataIndex: 'rlCd',
    key: 'rlCd',
    sorter: (a, b) => a.rlCd.length - b.rlCd.length,
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    sorter: (a, b) => a.state.length - b.state.length,
  },
  {
    title: 'Pin Code',
    dataIndex: 'zip',
    key: 'zip',
    sorter: (a, b) => a.zip.length - b.zip.length,
  }
];

interface ResultViewProps {
  receiverOfItemArray: ResultObject[];
}

export const SearchUI: React.FC<ResultViewProps> = ({ receiverOfItemArray }) => {
  const [originalData, setOriginalData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [table, setTable] = useState('table');

  const [searchOne, setSearchOne] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  // const [isSearchedOne, setIsSearchedOne] = useState(false);

  const firstSearchOptions = [
    {
      value: 'name',
      label: 'Name',
    },
    {
      value: 'shipperUserId',
      label: 'Shipper User Id',
    },
    {
      value: 'addressLn1',
      label: 'Address',
    }
  ]
  
  const namesArray = originalData.map((data, i) => {
    return {
      key: data.name + i,
      value: data.name,
      label: data.name
    }
  })

  const shipperUserIdArrays = originalData.map((data, i) => {
    return {
      key: data.trackingId + i,
      value: data.trackingId,
      label: data.trackingId
    }
  })

  const addressArray = originalData.map((data, i) => {
    return {
      key: data.addressLn1 + i,
      value: data.addressLn1,
      label: data.addressLn1
    }
  })

  let firstOptions = firstSearchOptions;

  searchOne.map(option => {
    switch (option) {
    case 'name':
      firstOptions = namesArray;
      break;
    case 'shipperUserId':
      firstOptions = shipperUserIdArrays;
      break;
    case 'addressLn1':
      firstOptions = addressArray;
      break;
    default:
      firstOptions = firstSearchOptions;
      break;
  }
  })
  
  const onChangeOne = (value: string[]) => {
    console.log(`selected ${value}`);

    setSearchOne(value);
    // setIsSearchedOne(true)

    
    if (searchOne) {
      let searchedResultsOne = [];
      searchedResultsOne = originalData.filter(item => {
        return searchOne.some(value => Object.values(item).includes(value));
        
      });
    setFilteredData(searchedResultsOne)
    }

  };



  // ---- Start: To get initial filtered data (to table) ---------
  useEffect(() => {
    try {
      let count = 0;
      if (receiverOfItemArray) {
        const fData:ShipmentDataItem[] = [];
        receiverOfItemArray.forEach((item, i) => {
          const trackingId = item.receiverOfItem.trackingId;
          // console.log(item.receiverOfItem.trackingId)
          item.receiverOfItem.shipmentData.forEach((sd, j) => {
            count++
            fData.push({...sd, key: count, trackingId});
          });
        });
        setOriginalData(fData);
        setFilteredData(fData);  

        // -----------------

        // if (searchOne) {
        //   let searchedResultsOne = [];
        //   searchedResultsOne = originalData.filter(item => {
        //     return searchOne.some(value => Object.values(item).includes(value));
            
        //   });
        // setFilteredData(searchedResultsOne)
        // }
      }
    } catch (error) {
      console.log(error);
    }
  }, [receiverOfItemArray, searchQuery]);


  // ---- End: To get initial filtered data (to table) ---------

  const handleSearch = () => {
    const searchedResultsTwo = filteredData.filter((item) => {
      return Object.values(item).some((value) => {
        const includesSearchQuery = value ? value.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false;
        return includesSearchQuery;
      });
    });
    setFilteredData(searchedResultsTwo);
  };

  // const handleSearchOne = () => {
  //   console.log("clicked")
  //     let searchedResultsOne = [];
  //     searchedResultsOne = originalData.filter(item => {
  //       return searchOne.some(value => Object.values(item).includes(value));
        
  //     });
  //   console.log(searchedResultsOne)
  //     setFilteredData(searchedResultsOne)
    
  // }

  let result;

  switch (table) {
    case 'table':
      result = <Table columns={columns} dataSource={filteredData} pagination={false} scroll={{ y: 510 }}/>;
      break;
    case 'json':
      result = (
        <MonacoEditor
          height="650"
          language="javascript"
          theme="vs-light"
          value={JSON.stringify(originalData, null, 2)}
          options={{
            selectOnLineNumbers: true,
            lineHeight: 22,
          }}
        />
      );
      break;
    default:
     
      break;
  }
  const hasShipperUserId = searchOne.includes('shipperUserId')

  // console.log("--searchOne--");
  // console.log(searchOne);

  // console.log("--originalData--");
  // console.log(originalData);

  // console.log("--filteredData--");
  // console.log(filteredData);
  
  
  return (
    <div>
      <div className='inputs-container'>
          <Select
            className='select-box'
            showSearch
            mode='tags'
            placeholder="Search by:"
            optionFilterProp="children"
            onChange={onChangeOne}
            options={firstOptions}
            // onSearch={handleSearchOne}
          />

          <Search
            disabled= {hasShipperUserId}
            className='search-input'
            placeholder="Search Address by street name, city, pincode"
            onSearch={handleSearch}
            style={{ height: '9px' }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />  
        
      </div>

      <div className='result-container'>
        <div className='text-btn-container'>
          <div className='text-container'>
            <h4>Customer Match </h4>
            <div></div>
            <p>Total Records found {filteredData.length}</p>
          </div>
          <div className='toggle-container'>
            <div className={table === 'table' ? `active` : ``} onClick={() => setTable('table')}>Table View</div>
            <div className={table === 'json' ? `active` : ``} onClick={() => setTable('json')}>JSON View</div>
          </div>
        </div>
        {result}
      </div>
    </div>
  );
};

//  * !isSearchedOne ? filteredData : originalData
//  value={ !isSearchedOne ? (JSON.stringify(filteredData, null, 2)) : (JSON.stringify(originalData, null, 2))}
