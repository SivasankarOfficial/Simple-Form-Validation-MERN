import TextField from '@mui/material/TextField';
import "./Form.css"
import Button from '@mui/material/Button';
import {useParams,useNavigate} from "react-router-dom"
import { useEffect,useState } from 'react';
import axios from "axios"

const Edit = () => {

    
const navigate=useNavigate()
    const {id} = useParams()
    const [edit,setEdit]=useState([])
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phonenumber,setPhoneNumber]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmPassword]=useState("")
    const [check,setCheck]=useState(Boolean)
    const [file,setFile]=useState("")

useEffect(()=>{

    axios.get(`http://localhost:8001/${id}`).then((res)=>{
        setEdit(res.data)
    })
},[id])

function update(e){
    e.preventDefault()
    if(name.length === 0){
        alert("name is required")
    }
    else if(email.length===0){
        alert("email is required")
    }
    else if (phonenumber.length===0){
        alert("phoneNumber is required")
    }
    else if (password.length===0){
        alert("password is required")
    }
    else if (confirmpassword !== password ){
        if(confirmpassword.length===0){
            alert("confirm password is required")
        }
       
            alert("password should be same")
        }
    else{
        if(file.length===0){
            alert("file should not be empty")
        }
    else if(check === false){
        alert("accept the terms and conditions")
}
else{
    const formData = new FormData()
    formData.append("name",name)
    formData.append("email",email)   
    formData.append("phoneNumber",phonenumber)
    formData.append("password",password)
    formData.append("confirmPassword",confirmpassword)
    formData.append("checkbox",check)
    formData.append("Files",file)


    axios.post(`http://localhost:8001/update/${id}`,formData).then(()=>{
        navigate("/")
    })
}

}}

const handleEdit = (e)=>{
    let file=e.target.files[0]
    if(file.size > 2000000){
        
        alert("file size should be less than 2MB")
        setFile(false)
        
        
    }
    else if (file.type !== "image/jpeg" && file.type !== "image/jpg" ){
       
        alert("only image can upload")
     
      }
    else{
        setFile(file)
    }

}


    return ( 
<div>
        <form className='form' onSubmit={update}>
    <TextField id="standard-basic" placeholder={edit.name} onChange={(e)=>setName(e.target.value)} label="Enter Name" variant="outlined" /><br></br><br></br>
    <TextField id="standard-basic" placeholder={edit.email} onChange={(e)=>setEmail(e.target.value)} label="Enter Email" variant="outlined" /><br></br><br></br>
    <TextField id="standard-basic" placeholder={edit.phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} label="Enter phoneNumber" variant="outlined" /><br></br><br></br>
    <TextField id="standard-basic" placeholder={edit.password} onChange={(e)=>setPassword(e.target.value)} label=" password" variant="outlined" /><br></br><br></br>
    <TextField id="standard-basic" placeholder={edit.confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} label=" confirmPassword" variant="outlined" /><br></br><br></br>
    <Button variant="outlined">Upload PDF <input type="file"  onChange={handleEdit} /></Button><br></br><br></br>   
    <input type="checkbox" onChange={(e)=>setCheck(e.target.checked)} ></input>
    <label >I accept the terms and conditions</label><br></br><br></br>
   
    <Button className='submit-btn' type="submit"  variant="contained">submit</Button>
    <Button className='reset-btn' type="reset" variant="contained">clear</Button>
    

        </form>
    

</div> 
);
}
 
export default Edit;