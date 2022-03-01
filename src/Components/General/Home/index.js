import React, { useState } from 'react'
import './style.scss'
import { Button, Container, Form, Table, Modal,Row, Col, Toast, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { TiDelete} from "react-icons/ti";
import { MdModeEditOutline, MdOutlineNavigateNext} from "react-icons/md";
import { GrFormPrevious} from "react-icons/gr";

import ReactPaginate from 'react-paginate';



const Home = () => {

    // below are allt the states 👎

    const [data, setData]=useState({
        fname:"",
        lname:"",
        uname:""
    });
    const [items, setItems]=useState([]);

    const [isEditItem, setIsEditItem]= useState("");
    const [showw, setShoww] = useState(false);

    const [show, setShow] = useState(false);
    const [aBtn, setABtn]= useState("");
    const [uBtn, setUBtn]= useState("");

    // const [users, setUsers]= useState(items.slice(0, 11));
    const [page, setPage]= useState(0);
    const [search, setSearch] = React.useState('');

    const usersPerpage = 2; 
    const pageVisited = page * usersPerpage;

    const totalPages = Math.ceil(items.length / usersPerpage);
    const changePage =({selected})=>{
        setPage(selected);
        console.log(selected);
    };
    console.log(items);


    const handleSearch = (event) => {
        setSearch(event.target.value);
      };


    // Now you are to functions world 🥰

    // Modal ftns 👎
    const handleClose = () => setShow(false);
    const handleShow = () =>{
         setShow(true);
         setABtn("add user");
         setUBtn("");
    }

    // you are here to input function 👎 

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

     
    // function on "add user" button 👎
    
    const addUser = () =>{
        setItems((olditems)=>{
            return [...olditems, data];
        });
        setData({
            fname:"",
            lname:'',
            uname:""
        });
        setShow(false);
        setShoww(true); 
    };
      
    

    // function on delete user 👎

    const deleteItem= (uname) =>{
       alert("are u sure to delete the user")
       console.log("deleted", uname);
       const arr=items.filter((arrElem, index)=>{
        return arrElem.uname !== uname;
    });
       setItems(arr);
    }

    // function on edit user 👎
    
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

    // function on update user 👎

    const updatItem = () =>{
        let a = items[isEditItem]=data;
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
        setShow(false)
    }

    // function to sort data on "first name" click 👇 :down

     const SortData= ()=>{
       const a = items.sort(function(a, b) {
            var nameA = a.fname.toUpperCase(); // ignore upper and lowercase
            var nameB = b.fname.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
            
          });
        //   setItems([a])
          setItems(a);
          console.log(items);
       }

  return (
      <>
      {/* Let's create a successfull toast after adding user 👎 */}

          <div className='Toast'>
              <Row className='row'>
                <Col xs={6}>
                    <Toast onClose={() => setShoww(false)} show={showw} delay={3000} autohide>
                    <Toast.Header>
                       
                        <strong className="me-auto">Hello!</strong>
                        <small>recently</small>
                    </Toast.Header>
                    <Toast.Body>New user added successfully</Toast.Body>
                    </Toast>
                </Col>
                </Row>
             </div>


        
    {/* Main container 👎 */}

    <Container className='p-3 shadow-sm main_Container mt-4'>
             
           <div className='p-2'>
           <div className="headingDiv">
            <div><Button className='addUBtn' onClick={handleShow}>add user</Button></div>
            <div>
            <Form >
                <FormControl onChange={handleSearch}
                id="search"
                className="a"
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
            </Form>
            </div>
            </div>
           
           
            {/* Let's create a modal when we click on the above "add user" button 👎 */}

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
                {(aBtn)?<Button variant="primary" onClick={addUser}>{aBtn}</Button>:null}
    
                </Modal.Footer>
            </Modal>


            {/* Let's create a Table 👎 */}

            <Table className='theTable' striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Sort</Tooltip>}>
                        <span onClick={ ()=>SortData()} className='Name'>First Name</span>
                    </OverlayTrigger> 
                    </th>
                    
                    <th>Last Name</th>
                    <th>Username</th>
                    <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
               { items.slice(pageVisited, pageVisited + usersPerpage).filter((itemval)=> {
                   if(search==""){
                       return itemval
                   } else if(itemval.fname.toLowerCase().includes(search.toLocaleLowerCase())){
                       return itemval
                   }
               }).map((itemval, index)=>{
                
                return( 
                    <tr key={itemval?.uname}> 
                    <td>{index+1}</td>
                    <td >{itemval?.fname}</td>
                    <td>{itemval?.lname}</td>
                    <td>{itemval?.uname}</td>
                    <td>

                    <div className='d-flex justify-content-center gap-4' style={{color:"red", width:"100%"}}>
                        <div className='d-flex align-items-center justify-content-center' style={{width:"30px", height:"30px", fontSize:"25px"}}>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
                                <span className="">
                                    <TiDelete className='d-flex delete' onClick={()=> {deleteItem(itemval.uname)}}/>
                                </span>
                            </OverlayTrigger>
                        </div>
                        <div>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                                <span className="">
                                <MdModeEditOutline className='text-warning edit' onClick={()=>editRow(itemval.uname, index)}/>
                                </span>
                            </OverlayTrigger> 
                                </div>
                            </div>

                            </td>
                            </tr>  
                        )
                    })}
                </tbody>
                </Table>


                {/* Let's start coding for Pagination 👎 */}

                   <div className='footer'>
                   <p>Showing 4 out of {items.length} entries</p>
                   
                   <ReactPaginate
                        previousLabel= {<GrFormPrevious/>}
                        nextLabel= {<MdOutlineNavigateNext/>}
                        pageCount={totalPages}
                        onPageChange= {changePage}
                        containerClassName={"navigationButtons"}
                        previousLinkClassName={"previousButton"}
                        nextLinkClassName={"nextButton"}
                        disabledClassName={"navigationDisabled"}
                        activeClassName={"navigationActive"}
                   />
            
                   </div>
           </div>
    </Container>
    </>
  )
}

export default Home