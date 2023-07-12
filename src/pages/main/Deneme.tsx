import {
  ReactView,
  UIController,
  UIView,
  VStack,
  useEffect,
  useState,
} from '@tuval/forms'
import React from 'react'
import { Button, Checkbox, Space, Rate, Tag, Input } from 'antd'
import { MdOutlineDownloadForOffline } from 'react-icons/md'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { BiSolidMessageRoundedAdd } from 'react-icons/bi'
import { logo } from '../../assets/logo'
import data from '../../assets/data'
import '../../assets/fonts/Montserrat-Regular.ttf';
import '../../assets/fonts/Poppins-Regular.ttf';
import '../../assets/fonts/Roboto-Regular.ttf';
export class Deneme extends UIController {
  public LoadView(): UIView {
    //-----------------------------------------Main Component
    const { Search } = Input
    const [searchBar, setSearchBar] = useState('')
    const [filteredData, setFilteredData] = useState(data)

    const onSearch = (value) => {
      setSearchBar(value)
    }
    const filterData = () => {
      const filtered = data.filter((item) => {
        return item.baslik.toLowerCase().includes(searchBar.toLowerCase())
      })
      console.log(filtered)
      setFilteredData(filtered)
    }
    useEffect(() => {
      filterData()
    }, [searchBar])

    //----------------------------------------Side Menu
    const [checkAll, setCheckAll] = useState(false)
    const [checkboxStates, setCheckboxStates] = useState({
      Arge: false,
      Bakim: false,
      Bilgi_Teknolojileri: false,
      Finans: false,
      Cevre: false,
      Insan_Kaynaklari: false,
      Is_Sagligi: false,
      Kalite: false,
      Satis: false,
      Tedarik: false,
      Uretim: false,
    })

    useEffect(() => {
      const trueKeys = Object.keys(checkboxStates).filter(
        (key) => checkboxStates[key] === true
      )
      console.log('Seçili Olanlar:', trueKeys)
    }, [checkboxStates])

    const handleSelectAll = (e) => {
      const { checked } = e.target
      const updatedCheckboxStates: any = {}
      Object.keys(checkboxStates).forEach((key) => {
        updatedCheckboxStates[key] = checked
      })
      setCheckAll(checked)
      setCheckboxStates(updatedCheckboxStates)
    }

    const handleCheckboxChange = (e) => {
      const { id, checked } = e.target

      setCheckboxStates((prevStates) => ({ ...prevStates, [id]: checked }))
    }
    return VStack(
      ReactView(
        //-------------------------Side Menu
        <div
          style={{
            height: 'calc(100vh - 50px)',
            display: 'flex',
            width: '100%',
          }}
        >
          <div
            style={{
              height: '100%',
              width: '405px',
              minWidth: '280px',
              maxWidth: '405px',
            }}
          >
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
                  marginLeft: '10%',
                }}
              >
                <span
                  style={{
                    color: '#F3F4FB',
                    fontFamily: 'Montserrat,sans-serif',
                  }}
                >
                  SÜREÇLER
                </span>
                <Checkbox
                  style={{
                    color: '#F3F4FB',
                    fontFamily: 'Montserrat,sans-serif',
                    position: 'relative',
                    right: '35px',
                  }}
                  checked={checkAll}
                  onChange={handleSelectAll}
                >
                  Tümünü Seç
                </Checkbox>
              </div>
              <div style={{ marginLeft: '10%', overflowY: 'auto' }}>
                <Space style={{ marginLeft: '2%' }} direction="vertical">
                  <Checkbox
                    checked={checkboxStates.Arge}
                    onChange={handleCheckboxChange}
                    style={{
                      marginTop: '14px',
                      marginLeft: '4px',
                      color: '#F3F4FB',
                      fontFamily: 'Montserrat,sans-serif',
                      fontSize: '16px',
                    }}
                    name="Arge"
                    id="Arge"
                  >
                    Arge
                  </Checkbox>

                  <Checkbox
                    checked={checkboxStates.Bakim}
                    onChange={handleCheckboxChange}
                    style={{
                      marginTop: '14px',
                      marginLeft: '4px',
                      color: '#F3F4FB',
                      fontFamily: 'Montserrat,sans-serif',
                      fontSize: '16px',
                    }}
                    name="Bakım"
                    id="Bakim"
                  >
                    Bakım
                  </Checkbox>

                  <Checkbox
                    checked={checkboxStates.Bilgi_Teknolojileri}
                    onChange={handleCheckboxChange}
                    style={{
                      marginTop: '14px',
                      marginLeft: '4px',
                      color: '#F3F4FB',
                      fontFamily: 'Montserrat,sans-serif',
                      fontSize: '16px',
                    }}
                    name="Bilgi Teknolojileri"
                    id="Bilgi_Teknolojileri"
                  >
                    Bilgi Teknolojileri
                  </Checkbox>

                  <Checkbox
                    checked={checkboxStates.Finans}
                    onChange={handleCheckboxChange}
                    style={{
                      marginTop: '14px',
                      marginLeft: '4px',
                      color: '#F3F4FB',
                      fontFamily: 'Montserrat,sans-serif',
                      fontSize: '16px',
                    }}
                    name="Finans"
                    id="Finans"
                  >
                    Finans
                  </Checkbox>

                  <Checkbox
                    checked={checkboxStates.Cevre}
                    onChange={handleCheckboxChange}
                    style={{
                      marginTop: '14px',
                      marginLeft: '4px',
                      color: '#F3F4FB',
                      fontFamily: 'Montserrat,sans-serif',
                      fontSize: '16px',
                    }}
                    name="Çevre"
                    id="Cevre"
                  >
                    Çevre
                  </Checkbox>

                  <Checkbox
                    checked={checkboxStates.Insan_Kaynaklari}
                    onChange={handleCheckboxChange}
                    style={{
                      marginTop: '14px',
                      marginLeft: '4px',
                      color: '#F3F4FB',
                      fontFamily: 'Montserrat,sans-serif',
                      fontSize: '16px',
                    }}
                    name="İnsan Kaynakları"
                    id="Insan_Kaynaklari"
                  >
                    İnsan Kaynakları
                  </Checkbox>

                  <Checkbox
                    checked={checkboxStates.Is_Sagligi}
                    onChange={handleCheckboxChange}
                    style={{
                      marginTop: '14px',
                      marginLeft: '4px',
                      color: '#F3F4FB',
                      fontFamily: 'Montserrat,sans-serif',
                      fontSize: '16px',
                    }}
                    name="İş Sağlığı ve Güvenliği"
                    id="Is_Sagligi"
                  >
                    İş Sağlığı ve Güvenliği
                  </Checkbox>

                  <Checkbox
                    checked={checkboxStates.Kalite}
                    onChange={handleCheckboxChange}
                    style={{
                      marginTop: '14px',
                      marginLeft: '4px',
                      color: '#F3F4FB',
                      fontFamily: 'Montserrat,sans-serif',
                      fontSize: '16px',
                    }}
                    name="Kalite"
                    id="Kalite"
                  >
                    Kalite
                  </Checkbox>

                  <Checkbox
                    checked={checkboxStates.Satis}
                    onChange={handleCheckboxChange}
                    style={{
                      marginTop: '14px',
                      marginLeft: '4px',
                      color: '#F3F4FB',
                      fontFamily: 'Montserrat,sans-serif',
                      fontSize: '16px',
                    }}
                    name="Satış ve Pazarlama"
                    id="Satis"
                  >
                    Satış ve Pazarlama
                  </Checkbox>

                  <Checkbox
                    checked={checkboxStates.Tedarik}
                    onChange={handleCheckboxChange}
                    style={{
                      marginTop: '14px',
                      marginLeft: '4px',
                      color: '#F3F4FB',
                      fontFamily: 'Montserrat,sans-serif',
                      fontSize: '16px',
                    }}
                    name="Tedarik Zinciri"
                    id="Tedarik"
                  >
                    Tedarik Zinciri
                  </Checkbox>

                  <Checkbox
                    checked={checkboxStates.Uretim}
                    onChange={handleCheckboxChange}
                    style={{
                      marginTop: '14px',
                      marginLeft: '4px',
                      color: '#F3F4FB',
                      fontFamily: 'Montserrat,sans-serif',
                      fontSize: '16px',
                    }}
                    name="Üretim"
                    id="Uretim"
                  >
                    Üretim
                  </Checkbox>
                </Space>
              </div>
            </div>
          </div>
          {/* Side Menu Bitiş  */}

          {/* Main Component */}
          <div
            style={{
              backgroundColor: 'white',
              display: 'flex',
              width: '100vw',
              margin: '1%',
              flexWrap: 'wrap',
              overflowY:"auto",
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
                  <h3 style={{ fontFamily: 'Montserrat', fontWeight: '500' }}>
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
                      fontFamily: 'Montserrat',
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
        </div>
      )
    )
  }
}
