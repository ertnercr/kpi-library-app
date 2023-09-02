import {
  Color,
  ForEach,
  HStack,
  Icon,
  ReactView,
  Spacer,
  State,
  Text,
  TextAlignment,
  UIContextMenu,
  UIController,
  UIView,
  VStack,
  cLeading,
  cTopLeading,
} from '@tuval/forms'
import React, { useState, useEffect, Fragment } from 'react'
import { logo } from '../../assets/logo'
import { categories } from '../../assets/KPIData/Categories'
import {
  MdOutlineDownloadForOffline,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
} from 'react-icons/md'
import { Space, Rate, Tag, Input } from 'antd'
import Button from '@mui/material/Button'

import { BiSolidMessageRoundedAdd } from 'react-icons/bi'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { SenseiBrokerClient } from '../../api/KPILibaryBrokerClient'
import { DownloadOutlined } from '@ant-design/icons'
import Gosterge from '../../components/Gosterge'
import { utils, writeFile } from 'xlsx';
import {useSessionService} from "@realmocean/services"
import {useOrgProvider } from "@realmocean/common";

export class MainViewController extends UIController {
  @State()
  private is_real_admin: boolean

  @State()
  private realm_id: string

  protected BindRouterParams(routerParams?: any): void {
    this.is_real_admin=false
    this.realm_id=""
  }

  public LoadView(): UIView {
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [selectAll, setSelectAll] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [data, setData] = useState([])
    const [searchBar, setSearchBar] = useState('')
    const [gosterge,setGosterge]=useState(false)
    const [admin,setAdmin]=useState(false)
    const { Search } = Input

    const handleSelectIndex = (index) => {
      setSelectedIndex(index)
    }

    const onSearch = (value) => {
      setSearchBar(value)
    }

    const actionSelectAll=()=>{

      if(selectAll===false &&selectedIndex!=-1){
        const category=categories[selectedIndex].category_name
        const value=data.filter(item=>item.related_process===category)
        setFilteredData(value)
      } else{
        setFilteredData(data)
      }
      
      setSelectAll(!selectAll)
    }
    const action_download_excel=()=> {
      var excel_data: any[] = [];
      
      filteredData.forEach((obj) => {
          excel_data.push({
              "indicator_name": obj.indicator_name,
              "direction": obj.direction,
              "measurement": obj.measurement,
              "related_process": obj.related_process,
              "related_other_process": obj.related_other_process,
              "indicator_definition": obj.indicator_definition,
              "indicator_tag": obj.indicator_tag,
              "indicator_related_management_system": obj.indicator_related_management_system
          })
      })
      
      setTimeout(() => {
          var worksheet = utils.json_to_sheet(excel_data);
          var workbook = utils.book_new();
          utils.book_append_sheet(workbook, worksheet, "KPIData");
          const indicator_name = excel_data.reduce((w, r) => Math.max(w, r.indicator_name.length), 10);
          const direction = excel_data.reduce((w, r) => Math.max(w, r.direction.length), 10);
          const measurement = excel_data.reduce((w, r) => Math.max(w, r.measurement.length), 10);
          const related_process = excel_data.reduce((w, r) => Math.max(w, r.related_process.length), 10);
          const related_other_process = excel_data.reduce((w, r) => Math.max(w, r.related_other_process.length), 10);
          const indicator_definition = excel_data.reduce((w, r) => Math.max(w, r.indicator_definition.length), 10);
          const indicator_tag = excel_data.reduce((w, r) => Math.max(w, r.indicator_tag.length), 10);
          const indicator_related_management_system = excel_data.reduce((w, r) => Math.max(w, r.indicator_related_management_system.length), 10);
          worksheet["!cols"] = [{ wch: indicator_name }, { wch: direction }, { wch: measurement }, { wch: related_process }, { wch: related_other_process }, { wch: indicator_definition / 10 }, { wch: indicator_tag }, { wch: indicator_related_management_system }];
          utils.sheet_add_aoa(worksheet, [["Gösterge Adı", "Yönü", "Ölçüm Birimi", "İlgili Süreç", "İlgili Diğer Süreçler", "Tanımı", "Etiket", "İlgili Yönetim Sistemi"]], { origin: "A1" });
          writeFile(workbook, "KPILibraryByPedasoft.xlsx", { compression: true })
      }, 100)
  }


    const selectCategoryName=(category_name:string)=>{

      const category_data=data.filter(item=>
        item.related_process==category_name
      )
        console.log(category_data,category_name)
      setFilteredData(category_data)
    }


    const searchAction =(key:string,filteredText:string)=>{
      let searchFilteredData=[]
      setTimeout(()=>{
          searchFilteredData=data.filter(item=>
          item[key].toLowerCase().indexOf(filteredText.toLowerCase())>-1
          )
          setFilteredData(searchFilteredData)
      },1500)
    }

    useEffect(() => {
      SenseiBrokerClient.GetShowingKPIList().then((res) => {
        setFilteredData(res)
        setData(res)

      })
     
    }, [])

    return VStack(
      ReactView(
        <div
          style={{
            height: 'calc(100vh - 50px)',
            display: 'flex',
            width: '100%',
            backgroundColor:gosterge? "rgba(0, 0, 0, 0.5)":" "
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
                    fontFamily: 'Poppins',
                  }}
                >
                  SÜREÇLER
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: selectAll ? '#F3F4FB' : 'white',
                    position: 'relative',
                    right: '35px',
                  }}
                  onClick={() => {
                    actionSelectAll()
                  }}
                >
                  {selectAll ? (
                    <MdRadioButtonChecked
                      style={{
                        color: '#000000',
                        fontSize: '20px',
                        marginRight: '10px',
                      }}
                    />
                  ) : (
                    <MdRadioButtonUnchecked
                      style={{
                        color: 'white',
                        fontSize: '20px',
                        marginRight: '10px',
                      }}
                    />
                  )}
                  Tümünü Seç
                </span>
              </div>
              <div style={{ marginLeft: '10%', overflowY: 'auto' }}>
                <Space style={{ marginLeft: '2%' }} direction="vertical">
                  {categories.map((category, index) => (
                    <div
                      onClick={() => {handleSelectIndex(index),
                      selectCategoryName(category.category_name)}}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        cursor: 'pointer',
                        marginTop: '15px',
                      }}
                    >
                      {selectedIndex == index || selectAll ? (
                        <MdRadioButtonChecked
                          style={{
                            color: '#000000',
                            fontSize: '20px',
                            marginRight: '10px',
                          }}
                        />
                      ) : (
                        <MdRadioButtonUnchecked
                          style={{
                            color: 'white',
                            fontSize: '20px',
                            marginRight: '10px',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#006400'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'white'
                          }}
                        />
                      )}
                      <div
                        style={{
                          fontSize: '15px',
                          color:
                            selectedIndex == index || selectAll
                              ? '#000000'
                              : 'white',
                          transition: 'all 0.2s ease-in-out',
                        }}
                        onMouseEnter={(e) => {
                          if (selectedIndex != index) {
                            e.currentTarget.style.color = '#006400'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedIndex != index) {
                            e.currentTarget.style.color = 'white'
                          }
                        }}
                      >
                        {category.category_name}
                      </div>
                    </div>
                  ))}
                </Space>
              </div>
                    {/* Admin Button */}  
                      {useSessionService().IsTenantAdmin &&                              
              <div style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-end",width:"100%",height:"250px"}}>
                <Button variant='contained'  style={{marginLeft:"15px",width:"140px",height:"37px",backgroundColor:"#F5C12E",textTransform:"none",boxShadow: "0 10px 12px rgba(0, 0, 0, 0.4)"}}>Admin Dashboard</Button>
              </div>}
              
            </div>
          </div>

          {/*  {
                apiData.length > 0 ?
                  <div>
                    {JSON.stringify(apiData)}

                  </div>
                  :
                  <div>Yükleniyor</div>
              } */}
          {/* Main Component */}
          <div
            style={{
              backgroundColor: 'white',
              display: 'flex',
              width: '100vw',
              margin: '1%',
              flexWrap: 'wrap',
              overflowY: 'auto',
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
                onSearch={(e)=>{
                  searchAction("indicator_name",e)
                }}
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
                      borderRadius: '8px',
                      fontFamily: 'Roboto',
                      marginLeft: '10px',
                      fontWeight: '600',
                    }}
                    onClick={()=>action_download_excel()}
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
                      borderRadius: '8px',
                      fontFamily: 'Roboto',
                      marginLeft: '10px',
                      fontWeight: '600',
                      cursor:"pointer"
                    }}
                    onClick={()=>{setGosterge(!gosterge)}}
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
<div style={{display:"flex",width:"100%" ,flexDirection:"column" ,gap:"15px"}}>  {filteredData.map((item, index) => (
              /*  <div
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
                          marginTop:"15px",
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <h3 style={{ fontFamily: 'Poppins', fontWeight: '500' }}>
                          {item.indicator_name}
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
                        {item.indicator_definition}
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
                    </div> */
              <Fragment>
                {VStack({ alignment: cTopLeading })(
                  HStack(
                    Text(item.indicator_name)
                      .foregroundColor('#333')
                      .fontSize(19)
                      .marginBottom('9px')
                      .fontFamily('Montserrat'),
                    Spacer(),
                    item.direction == 'Azalması İyi'
                      ? VStack(
                        Icon('\\e88b')
                            .size(30)
                            .foregroundColor(Color.green)
                            .paddingRight('14px')
                        )
                          .height()
                          .width()
                          .tooltip(item.direction)
                      : VStack(
                        Icon('\\e88b')
                            .size(30)
                            .foregroundColor(Color.green)
                            .paddingRight('14px')
                        )
                          .height()
                          .width()
                          .tooltip(item.direction)
                  ).height(),
                  Text(item.indicator_definition)
                    .foregroundColor('#333')
                    .fontSize(14)
                    .marginBottom('9px')
                    .multilineTextAlignment(TextAlignment.leading)
                    .marginBottom('20px')
                    .fontFamily('Montserrat'),
                  HStack({ alignment: cLeading })(
                    item.related_other_process != ''
                      ? Text(
                          item.related_process +
                            ', ' +
                            item.related_other_process
                        )
                          .foregroundColor('#001f5b')
                          .fontSize(14)
                          .fontWeight('700')
                          .fontFamily('Montserrat')
                      : Text(item.related_process)
                          .foregroundColor('#001f5b')
                          .fontSize(14)
                          .fontWeight('700')
                  )
                    .marginBottom('5px')
                    .cursor('pointer')
                    /* .onClick(() => {
                      this.filterByRelatedProcess(item.related_process),
                        setSelectedIndex(
                          this.categoryItems
                            .map((item) => item.category_name)
                            .indexOf(item.related_process)
                        )
                    }) */,
                  HStack({ alignment: cLeading })(
                    Text(item.indicator_tag)
                      .foregroundColor('#039')
                      .fontSize(12)
                      .fontWeight('600')
                      .fontFamily('Montserrat')
                  ).marginBottom('20px'),
                  VStack({ spacing: 10 })(
                    HStack(
                      Text(item.indicator_related_management_system)
                        .foregroundColor('#039')
                        .fontSize(12)
                        .fontWeight('600'),
                      Spacer(),
                      HStack(
                        item.indicator_likes != null &&
                          item.indicator_likes.length > 0
                          ? this.is_real_admin && this.realm_id == 'pedasoft'
                            ? //    this.is_real_admin != null ?
                              UIContextMenu(
                                ...ForEach(item.indicator_likes)((liker: any) =>
                                  VStack({ alignment: cLeading })(
                                    Text(
                                      liker.liker_account_name
                                    ).multilineTextAlignment(
                                      TextAlignment.leading
                                    )
                                  ).padding(5)
                                )
                              )(
                                Text(
                                  `${item.indicator_likes.length}`
                                ).paddingRight('10px')
                              )
                            : Text(
                                `${item.indicator_likes.length}`
                              ).paddingRight('10px')
                          : Text(' ')
                        /*  this.searchLikes(item.indicator_likes) ?
                                          UIButton(UIImage(likeBtn).width(20))
                                              .onClick(() => { this.likeIndicator(item.indicator_id), setSelectedIndex(-1) })
                                          :
                                          UIButton(UIImage(unlikeBtn).width(20))
                                              .onClick(() => { this.likeIndicator(item.indicator_id), setSelectedIndex(-1) }) */
                      ).width()
                    ),
                    HStack(
                      HStack(
                        item.measurement == 'Zaman'
                          ? Icon('\\e88b')
                              .size(25)
                              .foregroundColor('rgb(105, 155, 247)')
                              .tooltip('Ölçüm Birimi: ' + item.measurement)
                          : item.measurement == 'Yüzde'
                          ? Icon('\\eb58')
                              .size(25)
                              .foregroundColor('rgb(105, 155, 247)')
                              .tooltip('Ölçüm Birimi: ' + item.measurement)
                          : item.measurement == 'Sayı'
                          ? Icon('\\eb8d')
                              .size(40)
                              .foregroundColor('rgb(105, 155, 247)')
                              .tooltip('Ölçüm Birimi: ' + item.measurement)
                          : item.measurement == 'Ton'
                          ? Text('tone').width(20)
                          : item.measurement == 'Para'
                          ? Icon('\\ef63')
                              .size(25)
                              .foregroundColor('rgb(105, 155, 247)')
                              .tooltip('Ölçüm Birimi: ' + item.measurement)
                          : item.measurement == 'Ses'
                          ? Icon('\\e050')
                              .size(25)
                              .foregroundColor('rgb(105, 155, 247)')
                              .tooltip('Ölçüm Birimi: ' + item.measurement)
                          : item.measurement == 'Puan'
                          ? Icon('\\ebd0')
                              .size(25)
                              .foregroundColor('rgb(105, 155, 247)')
                              .tooltip('Ölçüm Birimi: ' + item.measurement)
                          : Text(item.measurement)
                      )
                        .width()
                        .tooltip(item.measurement),
                      Spacer(),
                      item.organization_name == null
                        ? Text('Ekleyen: ' + item.constituent_name)
                            .fontSize(12)
                            .fontWeight('600')
                        : Text(
                            'Ekleyen: ' +
                              item.constituent_name +
                              ' ' +
                              '(' +
                              item.organization_name +
                              ')'
                          )
                            .fontSize(12)
                            .fontWeight('600')
                    )
                  )
                    .height(70)
                    .backgroundColor('#f9f9f9')
                    .padding('10px 5px')
                )
                  .border('1px solid #eee')
                  .height()
                  .width('100%')
                  .cornerRadius(8)
                  .padding()
                  .render()}
              </Fragment>
            ))}</div>
          
          </div>
          {gosterge &&
          <Gosterge setGosterge={setGosterge}/>
        }
        </div>
      )
    )
  }
}
