import {
  ReactView,
  UIController,
  UIView,
  VStack,
} from '@tuval/forms'
import React, { useState, useEffect } from 'react';
import { logo } from '../../assets/logo'
import { categories } from '../../assets/KPIData/Categories';
import { MdOutlineDownloadForOffline, MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { data as filteredData } from '../../assets/data';
import { Button, Checkbox, Space, Rate, Tag, Input } from 'antd'
import { BiSolidMessageRoundedAdd } from 'react-icons/bi';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { SenseiBrokerClient } from '../../api/KPILibaryBrokerClient';
export class MainViewController extends UIController {
  public LoadView(): UIView {

    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [selectAll, setSelectAll] = useState(false)
    const [apiData, setApiData] = useState([])

    const [searchBar, setSearchBar] = useState('')

    const { Search } = Input


    const handleSelectIndex = (index) => {
      setSelectedIndex(index)
    }

    const onSearch = (value) => {
      setSearchBar(value)
    }

    useEffect(() => {
      SenseiBrokerClient.GetShowingKPIList().then((res) => {
        setApiData(res)
      })
    }, [])

    return (
      VStack(
        ReactView(
          <div style={{ height: "calc(100vh - 50px)", display: "flex", width: "100%" }}>
            <div style={{ height: '100%', width: "405px", minWidth: "280px", maxWidth: "405px" }}>

              {' '}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#273AB5',
                  height: '100%',
                }}
              >
                <img
                  style={{
                    width: '45%',
                    margin: '0 auto',
                    marginTop: '25px',
                    marginBottom: '15px',
                  }}
                  src={`${logo}`}
                  alt=""
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                    marginBottom: '25px',
                    marginLeft: "10%",
                  }}
                >
                  <span
                    style={{
                      color: '#F3F4FB',
                      fontFamily: 'Poppins',
                    }}
                  >
                    SÜREÇLER
                  </span>
                  <span style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: selectAll ? "#F3F4FB" : "white",
                  }}
                    onClick={() => { setSelectAll(!selectAll) }}
                  >
                    {
                      selectAll ?
                        <MdRadioButtonChecked style={{ color: "#000000", fontSize: "20px", marginRight: "10px" }} />
                        :
                        <MdRadioButtonUnchecked style={{ color: "white", fontSize: "20px", marginRight: "10px" }} />
                    }
                    Tümünü Seç
                  </span>
                </div>
                <div style={{ marginLeft: '10%', overflowY: 'auto', display: "flex", flexDirection: "column", gap: "15px" }}>
                  {
                    categories.map((category, index) => (
                      <div onClick={() => handleSelectIndex(index)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          cursor: "pointer",
                        }}
                      >
                        {
                          selectedIndex == index || selectAll ?
                            <MdRadioButtonChecked style={{ color: "#000000", fontSize: "20px", marginRight: "10px" }} />
                            :
                            <MdRadioButtonUnchecked style={{ color: "white", fontSize: "20px", marginRight: "10px" }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#006400"
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = "white"
                              }}
                            />
                        }
                        <div style={{
                          fontSize: "15px", color: selectedIndex == index || selectAll ? "#000000" : "white",
                          transition: "all 0.2s ease-in-out"
                        }}
                          onMouseEnter={(e) => {
                            if (selectedIndex != index) {
                              e.currentTarget.style.color = "#006400"
                            }

                          }}
                          onMouseLeave={(e) => {
                            if (selectedIndex != index) {
                              e.currentTarget.style.color = "white"
                            }
                          }}
                        >{category.category_name}</div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              {
                apiData.length > 0 ?
                  <div>
                    {JSON.stringify(apiData)}

                  </div>
                  :
                  <div>Yükleniyor</div>
              }
              {/* Main Component
              <div
                style={{
                  backgroundColor: 'white',
                  display: 'flex',
                  width: '100%',
                  margin: '1%',
                  flexWrap: 'wrap',
                  alignContent: 'flex-start',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: '98%',
                    marginBottom: '15px',
                    marginLeft: '10px',
                  }}
                >
                  <Search
                    style={{ fontSize: '5px' }}
                    placeholder="Hızlı Arama"
                    onSearch={onSearch}
                    enterButton
                    allowClear
                    showCount={true}
                    size="large"
                  />
                  <div
                    style={{
                      width: '12%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#C4DAA9',
                      color: '#2C7930',
                      borderRadius: '16px',
                      fontFamily: 'Roboto',
                      marginLeft: '10px',
                      fontWeight: '600',
                    }}
                  >
                    <RiFileExcel2Fill
                      style={{ fontSize: '20px', marginRight: '3px' }}
                    />
                    Excele Aktar
                  </div>
                  <div
                    style={{
                      width: '13%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#DDE1FB',
                      color: '#273AB5',
                      borderRadius: '16px',
                      fontFamily: 'Roboto',
                      marginLeft: '10px',
                      fontWeight: '600',
                    }}
                  >
                    <BiSolidMessageRoundedAdd
                      style={{
                        fontSize: '22px',
                        marginRight: '3px',
                        color: '#1C4B95',
                      }}
                    />
                    Gösterge Öner
                  </div>
                </div>
                <div style={{ width: "100%", height: "calc(100vh-80px)", display: 'flex', overflowY: "auto", overflowX: "hidden" }}>
                  {filteredData.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        width: '48%',
                        height: '25%',
                        border: '1px solid rgba(93, 93, 94, 0.1)',
                        borderRadius: '5px',
                        backgroundColor: 'rgba(225, 225, 226, 0.08)',
                        marginLeft: '10px',
                        paddingLeft: '10px',
                        marginBottom: '2%',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <h3 style={{ fontFamily: 'Poppins', fontWeight: '500' }}>
                          {item.baslik}
                        </h3>
                        <MdOutlineDownloadForOffline
                          style={{
                            fontSize: '32px',
                            color: '#428545',
                            position: 'relative',
                            right: '30px',
                          }}
                        />
                      </div>

                      <div
                        style={{
                          width: '90%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontFamily: 'Poppins',
                          fontSize: '15px',
                        }}
                      >
                        {item.aciklama}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <h4
                          style={{
                            fontFamily: 'Poppins',
                            color: '#242F7F',
                            fontWeight: 'bold',
                            margin: '25px 0px 7px 0px',
                          }}
                        >
                          {item.kategori}
                        </h4>

                        <a style={{ textDecoration: 'none', color: 'blue' }} href="">
                          {item.etiketler.split(' ').map((etiket, etiketIndex) => (
                            <Tag
                              key={etiketIndex}
                              style={{ backgroundColor: '#273AB5', color: 'white' }}
                              bordered={false}
                            >
                              {etiket}
                            </Tag>
                          ))}
                        </a>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          marginRight: '15px',
                        }}
                      >
                        <Rate
                          style={{
                            fontSize: '17px',
                            marginRight: '0',
                            color: '#273AB5',
                          }}
                          allowHalf
                          defaultValue={item.puan}
                        />
                        <span
                          style={{
                            fontFamily: 'Poppins',
                            fontWeight: '600',
                            fontSize: '15px',
                            marginTop: '9px',
                            color: '#5D5D5E',
                          }}
                        >
                          Ekleyen: {item.ekleyen}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div> */}

            </div>
          </div>
        )
      )
    )
  }
}
