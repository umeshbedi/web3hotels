import { db } from '@/firebase'
import { Tabs, Button, Input, Space, Table } from 'antd'
import React, { useEffect, useState, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export default function HotelList() {

  const [published, setPublished] = useState([])
  const [draft, setDraft] = useState([])
  const [trash, setTrash] = useState([])

  const type = [
    { name: "Published", content: published },
    { name: "Draft", content: draft },
    { name: "Trash", content: trash },
  ]


  useEffect(() => {
    db.collection("hotels").onSnapshot((snap) => {
      const publishTemp = []
      const draftTemp = []
      const trashTemp = []
      snap.forEach((d) => {
        const data = d.data()
        if (data.status == "Published") {
          publishTemp.push({ id: d.id, ...data })
        }
        else if (data.status == "Draft") {
          draftTemp.push({ id: d.id, ...data })
        }
        else if (data.status == "Trash") {
          trashTemp.push({ id: d.id, ...data })
        }
      })

      setPublished(publishTemp)
      setDraft(draftTemp)
      setTrash(trashTemp)
    })
  }, [])

  function moveToTrash({ id }) {
    db.doc(`hotels/${id}`).update({ status: "Trash" })
  }
  function deletePermanently({ id }) {
    db.doc(`hotels/${id}`).delete()
  }

  function onTabChange() {

  }

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Hotel Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: '20%',
      ...getColumnSearchProps('city'),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: '20%',
      sorter: (a, b) => a.rating - b.rating,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a target='blank' href={`/admin/${record.id}`} style={{ color: 'blue' }}>Edit</a>
          {record.status != "Trash"
            ?
            (< a onClick={() => moveToTrash({ id: record.id })} style={{ color: 'red' }}>Move to Trash</a>)
            :
            (< a onClick={() => deletePermanently({ id: record.id })} style={{ color: 'red' }}>Delete Permanently</a>)
          }
        </Space >
      ),
    },

  ];

  return (
    <div>
      <Tabs
        onChange={onTabChange}
        type="card"
        items={type.map((t, i) => {
          return {
            label: t.name,
            key: i,
            children: <>
              <Table columns={columns} dataSource={t.content.map((item, k) => {
                return ({
                  key: k,
                  name: item.title,
                  rating: item.star,
                  city: item.city,
                  id: item.id,
                  status: item.status
                })
              })} />

            </>,
          };
        })}
      />
    </div>
  )
}
