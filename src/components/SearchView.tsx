import React, { useState } from 'react'
import { Select, Switch, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import './Search.css'

export const SearchView = ({ onSearch }) => {
    const [searchOne, setSearchOne] = useState('')
    const [searchTwo, setSearchTwo] = useState('')

    const onChangeOne = (value: string) => {
        console.log(`selected ${value}`);
        setSearchOne(value)
    };

    const onChangeTwo = (value: string) => {
        console.log(`selected ${value}`);
        setSearchTwo(value)
        console.log(searchTwo)
    };

    const handleSearch = () => {
        onSearch(searchOne, searchTwo);
    };

    const firstSearchOptions = [
        {
            value: 'name',
            label: 'Name',
        },
        {
            value: 'shipperUserId',
            label: 'Shipper User Id',
        }
    ]

    const secondSearchOptions = [
        {
            value: 'phone',
            label: 'Phone',
        },
        {
            value: 'email',
            label: 'Email',
        },
        {
            value: 'address',
            label: 'Address',
        },
        {
            value: 'accountNumber',
            label: 'Account Number',
        },
    ]
    

  return (
    <div className='inputs-container'>
          <Select
            className='select-box'
            showSearch
            placeholder="Search by:"
            optionFilterProp="children"
            onChange={onChangeOne}
            onSearch={onSearch}
            // filterOption={filterOption}
            options={firstSearchOptions}
          />

          {
              searchOne === 'shipperUserId' ? (
                <Input disabled className='input' placeholder="Search by email, phone number, address, account number" prefix={<SearchOutlined />} />
              ) : (
                <Input className='input' placeholder="Search by email, phone number, address, account number" prefix={<SearchOutlined />} />
     
              )
          }
    
    </div>
  )
}


//    {/* <Select
//             showSearch={searchOne !== 'shipperUserId'}
//             disabled={searchOne === 'shipperUserId'}
//             placeholder="Select..."
//             // icon={}
//             optionFilterProp="children"
//             onChange={onChangeTwo}
//               onSearch={onSearch}
//             // filterOption={filterOption}
//             options={secondSearchOptions}
//           /> */}