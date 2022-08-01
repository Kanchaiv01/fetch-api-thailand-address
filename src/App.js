import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [loading, setLoading] = useState(true)//เช็คการโหลดข้อมูล
  const [data, setData] = useState([]);//เก็บข้อมูลใน API
  
  const [amphure, setAmphure] = useState([])//เก็บอำเภอ
  const [tambon, setTambon] = useState([])//เก็นตำบล
  const [zipCode, setZipCode] = useState(0)//เก็บรหัสไปรษณี
  
  const [switchAmphure, setSwitchAmphure] = useState(true)//เปิด/ปิด disabled ของ select ใน อำเภอ
  const [switchTambon, setSwitchTambon] = useState(true)//เปิด/ปิด disabled ของ select ใน ตำบล


  
  const [defaultSelectedAmphure, setDefaultSelectedAmphure] = useState(true)//กำหนดเงื่อนไขการใช้ default ของ Select อำเภอ
  const [defaultSelectedTambon, setDefaultSelectedTambon] = useState(true)//กำหนดเงื่อนไขการใช้ default ของ Select ตำบล
  const [selectedAmphure, setSelectedAmphure] = useState("default");//เก็บ value ของ Select อำเภอ เพื่อเป็นเงื่อนไขที่ 2 เมื่อไม่ต้องการใช้ "default" แล้ว
  const [selectedTambon, setSelectedTambon] = useState("default");//เก็บ value ของ Select ตำบล เพื่อเป็นเงื่อนไขที่ 2 เมื่อไม่ต้องการใช้ "default" แล้ว
  

  useEffect(() => {
    const DataFunction = async () => {
      try {
        await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json')
          .then(res => res.json())
          .then(res => setData(res))
          setLoading(false)
      }
      catch (e) {
        console.log(e)
      }
    }
    DataFunction()

  }, [])
  const defaultOption = ["โปรดเลือกจังหวัด", "โปรดเลือกเขต/อำเภอ", "โปรดเลือกตำบล"]

  const handleIndexProvinceChange = (event) => { // select ของจังหวัด onChange ทำฟังก์ชั่นนี้
    try {
        const indexAmphure = event.target.value // value ของ option แต่ละตัวที่เลือก
        setAmphure(data[indexAmphure].amphure || []) 
        setSwitchAmphure(false) //เมื่อมีการ onChang ใน select ของจังหวัด จะเปิด disabled ของ select ของอำเภอ
        setSwitchTambon(true)//เมื่อมีการ onChang ใน select ของจังหวัด จะปิด disabled ของ select ของตำบล
        setDefaultSelectedAmphure(true) // เมื่อมีการ onChang ใน select ของจังหวัด จะให้ value ของ select ของอำเภอเป็นค่า "default"
        setDefaultSelectedTambon(true)// เมื่อมีการ onChang ใน select ของจังหวัด จะให้ value ของ select ของตำบลเป็นค่า "default"
      }
      catch (e) { //เมื่อมี error นั้นหมายความว่า value ใน select ของจังหวัด เป็นค่าที่ไม่สามารถนำมาใช้ในการ ดึงข้อมูลใน json ได้(value = "default") data["default"].amphure = error
        setSwitchAmphure(true) //ในเมื่อดึงค่าไม่ได้ ให้เซ็ต disabled ของ select ของอำเภอให้ปิดไว้ด้วย true
        setSwitchTambon(true) ////ในเมื่อดึงค่าไม่ได้ ให้เซ็ต disabled ของ select ของตำบลให้ปิดไว้ด้วย true
        setDefaultSelectedAmphure(true)// เมื่อมีการ onChang ใน select ของจังหวัด จะให้ value ของ select ของอำเภอเป็นค่า "default"
        setDefaultSelectedTambon(true)// เมื่อมีการ onChang ใน select ของจังหวัด จะให้ value ของ select ของตำบลเป็นค่า "default"
      }
  }
  

  const handleIndexAmphureChange = (event) => { //// select ของอำเภอ onChange ทำฟังก์ชั่นนี้
    try {
        const indexAmphure = event.target.value // value ของ option แต่ละตัวที่เลือกในอำเภอ
        setTambon(amphure[indexAmphure].tambon)//ดึงตำบล
        setSelectedAmphure(indexAmphure) //เก็บ indexAmphure ไว้ใน SelectedAmphure เพื่อนำไปใช้ในเงื่อนไขของ value ใน select ของอำเภอ
        setSwitchTambon(false) //ให้ค่าใน disabled ของตำบลเป็น false เป็นเปิดใช้งาน option ของตำบล หลังจากเลือกตำบล
        setDefaultSelectedAmphure(false) //ให้ value ของ select ในอำเภอเป็น false เพื่อปลดค่าที่จากเปิด เป็น "default" ให้เป็นค่าตามที่เลือก option ใน อำเภอ
        setDefaultSelectedTambon(true)// เมื่อมีการ onChang ใน select ของอำเภอ จะให้ value ของ select ของตำบลเป็นค่า "default"
        setZipCode(0)//เมื่อมีการ onChang ใน select ของอำเภอ ให้ค่า รหัสไปรษณี เป็น 0 เพื่อให้แสดงคำว่า "รหัสไปรษณีย์" เป็นค่าเริ่มต้นของ label ในรหัสไปรษณีย์
      }
      catch (e) {//data[indexAmphure].amphure["default"] == error
        const indexAmphure = event.target.value
        setSelectedAmphure(indexAmphure) //เก็บ indexAmphure ไว้ใน SelectedAmphure เพื่อนำไปใช้ในเงื่อนไขของ value ใน select ของอำเภอ
        setSwitchTambon(true) //ในเมื่อดึงค่าไม่ได้ ให้เซ็ต disabled ของ select ในตำบลให้ปิดไว้ด้วย true
        setDefaultSelectedTambon(true)// เมื่อมีการ onChang ใน select ของอำเภอ จะให้ value ของ select ของตำบลเป็นค่า "default"
        setZipCode(0) //เมื่อมีการ onChang ใน select ของอำเภอ ให้ค่า รหัสไปรษณี เป็น 0 เพื่อให้แสดงคำว่า "รหัสไปรษณีย์" เป็นค่าเริ่มต้นของ label ในรหัสไปรษณีย์
      }
  }

  const handleIndexTombonChange = (event) => { //// select ของอำเภอ onChange ทำฟังก์ชั่นนี้
    try {
        const indexTombon = event.target.value // value ของ option แต่ละตัวที่เลือกในอำเภอ
        setZipCode(tambon[indexTombon].zip_code)//ดึง zip_code
        setSelectedTambon(indexTombon)// setSelectedAmphure(indexAmphure) //เก็บ indexAmphure ไว้ใน SelectedAmphure เพื่อนำไปใช้ในเงื่อนไขของ value ใน select ของอำเภอ
        setDefaultSelectedTambon(false) //ให้ value ของ select ในอำเภอเป็น false เพื่อปลดค่าที่จากเปิด เป็น "default" ให้เป็นค่าตามที่เลือก option ใน อำเภอ
      }
      catch (e) {//data[indexAmphure].amphure["default"] == error
        console.log(e)
        const indexTombon = event.target.value
        setSelectedTambon(indexTombon)
        setZipCode(0)//เมื่อมีการ onChang ใน select ของ ให้ค่า รหัสไปรษณี เป็น 0 เพื่อให้แสดงคำว่า "รหัสไปรษณีย์" เป็นค่าเริ่มต้นของ label ในรหัสไปรษณีย์
      }
  }



  

  loading? console.log("loading to show data"):console.log(data)
  // loading? console.log("loading to show amphure"):console.log(amphure)
  
  return (
    <>
      <Container className="border rounded d-flex justify-content-center mt-3" style={{width:'600px'}}>
        <Form className="p-4" style={{width:'500px'}}>
          <Form.Group className="form-group">
            <Form.Label htmlFor="exampleInputEmail1">จังหวัด</Form.Label>
            <Form.Select onChange={handleIndexProvinceChange}>
              <option className="text-black-50" value={"default"} name={"default"} key={77}>{defaultOption[0]}</option>
              {loading?<option>loading</option> : data.map((data, index) => {
                return <option value={index} key={index}>{data.name_th}</option>
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="form-group mt-2">
            <Form.Label htmlFor="exampleInputEmail1">เขต/อำเภอ</Form.Label>
            <Form.Select disabled={switchAmphure} onChange={handleIndexAmphureChange} value={defaultSelectedAmphure?"default" : selectedAmphure}>
              <option className="text-black-50" value={"default"}>{defaultOption[1]}</option>
              {loading?<option>loading</option> : amphure.map((data, index) => {
                return <option value={index} key={index}>{data.name_th}</option>
              })}
            </Form.Select>
          </Form.Group> 
          <Form.Group className="form-group mt-2">
            <Form.Label htmlFor="exampleInputEmail1">แขวง/ตำบล</Form.Label>
            <Form.Select disabled={switchTambon} onChange={handleIndexTombonChange} value={defaultSelectedTambon?"default" : selectedTambon}>
              {loading?<option className="text-black-50" >loading</option> : <option>{defaultOption[2]}</option>}
              {loading?<option>loading</option> : tambon.map((data, index) => {
                return <option value={index} key={index}>{data.name_th}</option>
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="form-group mt-2">
            <Form.Label>รหัสไปรษณีย์</Form.Label>
            <Form.Control type="text" placeholder={zipCode===0?"รหัสไปรษณีย์":zipCode} disabled/>
          </Form.Group>
        </Form>
      </Container>
    </>
  )
}