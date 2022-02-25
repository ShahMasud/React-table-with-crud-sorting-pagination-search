import React, { useState } from 'react'
// import './style.css'
import { Button, Container, Form, Table, Modal,Row, Col, Toast, FormControl } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom';
import { TiDelete} from "react-icons/ti";
import { MdModeEditOutline} from "react-icons/md";
import { useRef } from 'react';

const Home = () => {
    // states //

    const [items, setItems]=useState([]);
    const [data, setData]=useState({
        fname:"",
        lname:"",
        uname:""
    });

    const [isEditItem, setIsEditItem]= useState("");
//============================//
// toast

    const [showw, setShoww] = useState(false);

    //======================================//
    // states and functions for modal

    const [show, setShow] = useState(false);
    const [aBtn, setABtn]= useState("");
    const [uBtn, setUBtn]= useState("");

    const handleClose = () => setShow(false);
    
    const handleShow = () =>{
         setShow(true);
         setABtn("add user");
         setUBtn("");
    }

   
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

        setShoww(true)
        
        
    };
    

    // code for delete row in a table //

    const deleteItem= (uname) =>{

       alert("are u sure to delete the user")
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
        setABtn("");
        setUBtn("update");
        
        
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
    <Container className='p-0 shadow-sm main_Container mt-4'>
             
             <div className='Toast'>
              <Row className='row'>
                <Col xs={6}>
                    <Toast onClose={() => setShoww(false)} show={showw} delay={3000} autohide>
                    <Toast.Header>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                        />
                        <strong className="me-auto">Bootstrap</strong>
                        <small>recently</small>
                    </Toast.Header>
                    <Toast.Body>user added successfully</Toast.Body>
                    </Toast>
                </Col>
                </Row>
             </div>
             

            {/* //============================= */}
            <div className="d-flex align-items-center mb-2" style={{ margin:"0 auto"}}>
            <Button className='bg-transparent text-black' onClick={handleShow}>add user</Button>
            <Form className=''>
                <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                {/* <Button variant="outline-success">Search</Button> */}
            </Form>
            </div>
           
           

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Put the below details for user</Modal.Title>
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
                {(uBtn)?<Button onClick={updatItem}>{uBtn}</Button>:null}
                {(aBtn)?<Button variant="primary" onClick={addEmployee}>{aBtn}</Button>:null}
    
                </Modal.Footer>
            </Modal>
            {/* ========================================== */}



            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Actions</th>
                    </tr>
                </thead>

                {items.map((itemval, index)=>{
                    return(
                            <tbody>
                            <tr key={itemval?.uname}>
                            <td>{index}</td>
                            <td>{itemval?.fname}</td>
                            <td>{itemval?.lname}</td>
                            <td>{itemval?.uname}</td>
                            <td> 
                            <div className='d-flex  justify-content-end gap-4' style={{color:"red", width:"100%"}}>
                            <div className='d-flex rounded-circle bg-white' style={{width:"35px", height:"35px", fontSize:"35px"}}>
                            <TiDelete className='delete' onClick={()=> {deleteItem(itemval.uname)}}/>
                            </div>
                            <MdModeEditOutline className='text-warning edit' onClick={()=>editRow(itemval.uname, index)}/>
                            </div>
                            </td>
                            </tr>
                            </tbody>
                        )
                    })}
                </Table>
    </Container>
  )
}

export default Home