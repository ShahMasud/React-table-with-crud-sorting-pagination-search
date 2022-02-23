import React, { useState } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { TiDelete} from "react-icons/ti";

const Home = () => {
    let navigate = useNavigate();

    // states //

    const [items, setItems]=useState([]);
    const [data, setData]=useState({
        fname:"",
        lname:"",
        uname:""
    });

    const [isEditItem, setIsEditItem]= useState(null);

    // code for input fields //

    const inputEvent = (event) =>{
        const {value, name}= event.target;
        console.log(value);
        console.log(name);

        setData((preVal)=>{
            if(name==="fName"){
                return{
                    fname: value,
                    lname:preVal.lname,
                    uname:preVal.uname
                }
            } else if(name==="lName"){
                return{
                    fname: preVal.fname,
                    lname:value,
                    uname:preVal.uname
                }
            } else if(name==="uName"){
                return{
                    fname: preVal.fname,
                    lname: preVal.lname,
                    uname:value,
                }
            }
        } )
        }

    // code for adding row dynamically in a table   //  

    const addEmployee = () =>{
        setItems((olditems)=>{
            return [...olditems, data];
        });
        setData({
            fname:"",
            lname:'',
            uname:""
        });
    };

    // code for delete row in a table //

    const deleteItem= (uname) =>{
       console.log("deleted", uname);
       const arr=items.filter((arrElem, index)=>{
        return arrElem.uname !== uname;

    });
       setItems(arr);
    }

    // code for edit row in a table //
    
    const updateRow =(uname)=>{
        let newEditItem=items.find((arrElem)=>{
            return arrElem.uname === uname;
        })
        console.log(newEditItem);
        setData({
            fname: newEditItem.fname,
            lname: newEditItem.lname,
            uname: newEditItem.uname
        });

        
        
    }

    // code to update row in a table //

    const updatItem =(uname)=>{
        setIsEditItem(uname);
        setItems(
           items.map((elem)=>{
               if(elem.uname===isEditItem){
                   return {...elem, fname:setData.fname, lname:setData.lname, uname:setData.uname }
               }
           })
       )
       
    }
   

  return (
    <Container className='mt-4'>
     
     <h5>Put the below details for employee</h5>
     <Form className='mb-4'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                
                <Form.Control type="text" name="fName" value={data.fname} onChange={inputEvent} placeholder="enter first name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               
                <Form.Control type="text" name="lName" value={data.lname} onChange={inputEvent} placeholder="enter last name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               
                <Form.Control type="text" name="uName" value={data.uname} onChange={inputEvent} placeholder="enter username" />
            </Form.Group>
            <Button className='me-4' onClick={addEmployee} variant="primary">Add</Button>
            <Button onClick={updatItem} variant="primary">update</Button>
        </Form>

        <div className='bg-info' style={{height:"400px"}}>
        <Table>
            <thead>
                <tr> 
                    <th>fname</th>
                    <th>lname</th>
                    <th>uname</th>
                </tr>
            </thead>
        </Table>
           {items.map((itemval, index)=>{
               return (
                <div key={index}>
                <table className="table">
               <tbody>
                   <tr key={itemval.uname}>
                   <td>{itemval.fname}</td>
                   <td>{itemval.lname}</td>
                   <td>{itemval.uname}</td>
                   <td> 
                        <div className='gap-4 text-center' style={{color:"red", width:"50%"}}>
                        <TiDelete onClick={()=> {deleteItem(itemval.uname)}}/>
                        <Button onClick={()=>updateRow(itemval.uname)} className='bg-transparent text-black'>edit</Button>
                        </div>
                   </td>
                   </tr>    
                </tbody>
                </table>
                </div>
             )       
           })}
           
        </div>

    


    </Container>
  )
}

export default Home