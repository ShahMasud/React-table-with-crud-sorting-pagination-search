import React, { useState } from 'react'
import { Button, Container, Form, Table, Modal } from 'react-bootstrap'
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

    const [isEditItem, setIsEditItem]= useState("");

    //======================================//
    // states for modal

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //============================================//


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

    const addEmployee = (uname) =>{
        setItems((olditems)=>{
            return [...olditems, data];
        });
        setData({
            fname:"",
            lname:'',
            uname:""
        });
        setShow(false);
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
    
    const editRow =(uname)=>{
        let newEditItem=items.find((arrElem)=>{
            return arrElem.uname === uname;
        })
        let INDEX = items.indexOf(newEditItem);
        console.log(INDEX);

        setData({
            fname: newEditItem.fname,
            lname: newEditItem.lname,
            uname: newEditItem.uname
        });  

        setIsEditItem(INDEX);
        handleShow();
    }

    // code to update row in a table //

    const updatItem =()=>{
        let a = items[isEditItem]=data;
        // console.log(isEditItem);
        console.log(a);
        setData({
            fname:a.fname,
            lname:a.lname,
            uname: a.uname
        });

        setData({
            fname:"",
            lname:'',
            uname:""
        });
        setShow(false);
       
    }
   

  return (
    <Container className='mt-4'>

            {/* //============================= */}
            <div className='text-center'><Button className='mb-4 justify-content-center bg-info text-black' onClick={handleShow} variant="primary">add row</Button></div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Put the below details for employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form className='mb-4'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                
                <Form.Control type="text" name="fName" value={data?.fname} onChange={inputEvent} placeholder="enter first name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               
                <Form.Control type="text" name="lName" value={data?.lname} onChange={inputEvent} placeholder="enter last name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               
                <Form.Control type="text" name="uName" value={data?.uname} onChange={inputEvent} placeholder="enter username" />
            </Form.Group>
            
        </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button onClick={updatItem} variant="primary">update</Button>
                <Button variant="primary" onClick={addEmployee}>add row</Button>
                </Modal.Footer>
            </Modal>
            {/* ========================================== */}
            

        <div className='bg-info' style={{height:"100vh"}}>
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
                   <tr key={itemval?.uname}>
                   <td>{itemval?.fname}</td>
                   <td>{itemval?.lname}</td>
                   <td>{itemval?.uname}</td>
                   <td> 
                        <div className='d-flex gap-4 text-center' style={{color:"red", width:"50%"}}>
                        <div className='d-flex rounded-circle bg-white' style={{width:"35px", height:"35px", fontSize:"35px"}}><TiDelete onClick={()=> {deleteItem(itemval.uname)}}/></div>
                        <Button onClick={()=>editRow(itemval.uname, index)} className='bg-white text-black'>edit</Button>
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