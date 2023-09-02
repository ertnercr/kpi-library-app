import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Toast from './Toast';
function Gosterge(props:any) {
  interface Values {
    Gosterge_Adi: string;
    Gosterge_Aciklama: string;
    Gosterge_Birimi: string;
    Gosterge_Surec: string;
    Gosterge_Yon:string;
  }

const [values,setValues]=useState({
  Gosterge_Adi:"",
  Gosterge_Aciklama:"",
  Gosterge_Birim:"",
  Gosterge_Surec:"",
  Gosterge_Yon:"",

})
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value} = e.target; 
   
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
    
  };
  const onCancel=()=>{
   props.setGosterge(false)
  }
  const onClick=()=>{
    Toast.fire({
        title:"Öneriniz Kaydedildi",
        text:"Gösterge Öneriniz Kaydedilmiştir.",
        icon:"success"
    })
    console.log(values)
  }
  return (
    <div style={{justifyContent:"center",alignItems:"center",display:"flex",position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:"10",padding:"20px",borderRadius:"5px",boxShadow:"0px 0px 10px rgba(0,0,0,0.2",backgroundColor:"whitesmoke"}}>
        <div style={{display:"flex",width:"700px",height:"655px",alignItems:"center",flexDirection:"column"}}>
        <div>
          <h2 style={{fontSize:"23px",color:"rgb(39, 58, 181)"}}>Gösterge Öner</h2>
        </div>
        <div style={{display:"flex",width:"360px",height:"500px",margin:"0 auto",flexDirection:"column",marginTop:"40px",}}>
             

             {/* Gösterge Adı */}
            <label style={{fontWeight:"500",fontSize:"16px",color:"rgb(39, 58, 181)",marginBottom:"8px"}}>
                    Gösterge Adı
            </label>
            <input type="text" placeholder='Bir Değer Giriniz...' onChange={onChange} name='Gosterge_Adi' style={{height:"50px",marginBottom:"30px",border:"1px solid  rgb(133, 133, 133)",borderRadius:"8px",paddingLeft:"8px"}} />


             {/* Gösterge Açıklaması */}
            <label style={{fontWeight:"500",fontSize:"16px",color:"rgb(39, 58, 181)",marginBottom:"8px"}}>
                    Gösterge Açıklaması
            </label>
            <input type="text" placeholder='Bir Değer Giriniz...'  name='Gosterge_Aciklama' onChange={onChange}  style={{marginBottom:"30px",height:"50px",
            border:"1px solid  rgb(133, 133, 133)",borderRadius:"8px",paddingLeft:"8px"}} />
            
            
            
            {/* Gösterge Ölçüm Birimi */}
            <label style={{fontWeight:"500",fontSize:"16px",color:"rgb(39, 58, 181)",marginBottom:"8px"}}>
                    Gösterge Ölçüm Birimi
            </label>
            <input type="text" placeholder='Bir Değer Giriniz...' onChange={onChange}  name='Gosterge_Birim' style={{marginBottom:"30px",height:"50px",border:"1px solid  rgb(133, 133, 133)",borderRadius:"8px",paddingLeft:"8px"}} />



            {/* İlgili Süreç */}
            <label style={{fontWeight:"500",fontSize:"16px",color:"rgb(39, 58, 181)",marginBottom:"8px"}}>
            İlgili Süreç
            </label>
            <input type="text" placeholder='Bir Değer Giriniz...' name='Gosterge_Surec' onChange={onChange}  style={{marginBottom:"30px",height:"50px",border:"1px solid  rgb(133, 133, 133)",borderRadius:"8px",paddingLeft:"8px"}} />

            {/* Ölçüm Yönü */}
            <label style={{fontWeight:"500",fontSize:"16px",color:"rgb(39, 58, 181)",marginBottom:"8px"}}>
                Gösterge Ölçüm Yönü
            </label>

            <RadioGroup value={values.Gosterge_Yon} name='Gosterge_Yon' onChange={onChange} row>
            <FormControlLabel value="artan" control={<Radio color="success"/>} label="Artması İyi" />
            <FormControlLabel value="azalan" control={<Radio color="success"/>} label="Azalması İyi" />
            </RadioGroup>
            {/* Buton */}
            <div style={{display:"flex",justifyContent:"space-evenly",marginTop:"30px",width:"360px"}}>
            <Button variant="contained" onClick={onClick} type='submit' style={{width:"175px",height:"37px",color:"white",backgroundColor:"#3C8D40",border:"none",borderRadius:"8px",fontSize:"16px",textTransform:"none"}}>Kaydet</Button>
            <Button variant="contained" onClick={onCancel} type='button' color='error' style={{width:"175px",height:"37px",color:"white",border:"none",borderRadius:"8px",fontSize:"16px",textTransform:"none"}}>İptal</Button>
            </div>
</div>


        </div>

    </div>
  )
}

export default Gosterge
