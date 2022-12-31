import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import {useNavigate} from "react-router-dom"
import "./Form.css"
import Button from '@mui/material/Button';
import { useEffect,useState } from 'react';
import axios from "axios"

const Form = () => {

    const navigate = useNavigate()

    const [alldata,setAlldata] = useState([])
    const [getname,setGetname] = useState("")
    const [getemail,setGetemail] = useState("")
    const [getphone,setGetphone] = useState("")
    const [getpassword,setGetpassword] = useState("") 
    const [getconfirmpassword,setGetconfirmpassword] = useState("") 
    const [check,setCheck] = useState(Boolean) 
    const [getfile,setgetfile] = useState("") 

    


    useEffect(()=>{
        axios.get("http://localhost:8001").then((res)=>{
            setAlldata(res.data)
            // console.log(res.data);
        })
    },[alldata])

    const postData = (e) => {
        e.preventDefault()
        if(getname.length === 0){
            alert("name is required")
        }
        else if(getemail.length===0){
            alert("email is required")
        }
        else if (getphone.length===0){
            alert("phoneNumber is required")
        }
        else if (getpassword.length===0){
            alert("password is required")
        }
        else if (getconfirmpassword !== getpassword ){
            if(getconfirmpassword.length===0){
                alert("confirm password is required")
            }
           
                alert("password should be same")
            }
        else{
            if(getfile.length===0){
                alert("file should not be empty")
            }
        else if(check === false){
            alert("accept the terms and conditions")
}
        

            else{
                const formdata = new FormData()
                formdata.append("Files",getfile)
                formdata.append("name",getname)
                formdata.append("email",getemail)
                formdata.append("phoneNumber",getphone)
                formdata.append("password",getpassword)
                formdata.append("confirmPassword",getconfirmpassword)
                formdata.append("checkbox",check)
        
                axios.post("http://localhost:8001",formdata).then((res)=>{
                alert(res.data)
              })
    

            }
        

        }

      
}

const handleChange = (e)=>{
    let file=e.target.files[0]
    if(file.size > 2000000){
        
        alert("file size should be less than 2MB")
        setgetfile(false)
        
        
    }
    else if (file.type !== "image/jpeg" && file.type !== "image/jpg" ){
       
        alert("only image can upload")
     
      }
    else{
        setgetfile(file)
    }

}
// console.log(check)
const checkChange = (e)=>{
    setCheck(e.target.checked)
    // console.log(check);
}

function del(id){
if(window.confirm("are you sure to delete")){
    axios.delete(`http://localhost:8001/${id}`)
}

}

const EditData=(id)=>{

    navigate(`/update/${id}`)
}

const serverPath = "http://localhost:8001/"

    return ( 
<div>
        <form className='form' onSubmit={postData}>
    <TextField id="standard-basic" type="text" onChange={(e)=>setGetname(e.target.value)}  label="Enter Name" variant="outlined" /><br></br><br></br>
    <TextField id="standard-basic" type="text" onChange={(e)=>setGetemail(e.target.value)} label="Enter Email" variant="outlined" /><br></br><br></br>
    <TextField id="standard-basic" type="number" onChange={(e)=>setGetphone(e.target.value)} label="Enter phoneNumber" variant="outlined" /><br></br><br></br>
    <TextField id="standard-basic" type="text" onChange={(e)=>setGetpassword(e.target.value)} label=" password" variant="outlined" /><br></br><br></br>
    <TextField id="standard-basic" type="text" onChange={(e)=>setGetconfirmpassword(e.target.value)} label=" confirmPassword" variant="outlined" /><br></br><br></br>
    <Button variant="outlined">Upload PDF <input type="file" onChange={handleChange}  /></Button><br></br><br></br>   
    <input type="checkbox" onChange={checkChange}></input>
    <label >I accept the terms and conditions</label><br></br><br></br>
   
    <Button className='submit-btn' type="submit" variant="contained">submit</Button>
    <Button className='reset-btn' type="reset" variant="contained">clear</Button>
    

        </form>
    <Table sx={{width:'600px',margin:"50px 90px "}}>
    <TableHead>
        <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >PhoneNumber</TableCell>
            <TableCell >password</TableCell>
            <TableCell >confirmPassword</TableCell>
            <TableCell >Document</TableCell>
            <TableCell >Checked</TableCell>
            <TableCell >Edit</TableCell>
            <TableCell >Delete</TableCell>
    </TableRow>
    </TableHead>

    
    <TableBody  className="form-data" >
    {
    alldata.map((data,index)=>(

    <TableRow key={index}>
        <TableCell><p>{data.name}</p></TableCell>
        <TableCell><p>{data.email}</p></TableCell>
        <TableCell><p>{data.phoneNumber}</p></TableCell>
        <TableCell><p>{data.password}</p></TableCell>
        <TableCell><p>{data.confirmPassword}</p></TableCell>
     {/* <TableCell><img src={data.filename}  alt="....."></img></TableCell> */}
        <TableCell> <a href={serverPath + data.filename}>document</a></TableCell>
        <TableCell> <p>{data.checkbox}</p></TableCell>

        <TableCell><Button className='edit-btn' onClick={()=>EditData(data._id)}  variant="contained">Edit</Button></TableCell>
        <TableCell> <Button className='delete-btn' onClick={()=>del(data._id)}  variant="contained">Delete</Button></TableCell>
  </TableRow>
 
 ))
}
</TableBody>
</Table>


  {/* </TableBody>
  <TableBody>
    <TableRow>
        <TableCell colSpan="9"><h1 style={{textAlign:"center"}}>No data Found</h1></TableCell>
    </TableRow>
</TableBody>  */}

</div> 
);
}
 
export default Form;