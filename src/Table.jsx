import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
const Table = () => {
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        city: '',
        salary: '',
        phone: '',
        designation: ''
    });
    const [record, setRecord] = useState([]);
    const [editId, setEditId] = useState("");
    const [showForm, setShowForm] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    };

    const handleSubmit = () => {
   
        const { name, email, password, city, salary, phone, designation } = input;

        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        const isValidPhone = (phone) => {
            const phoneRegex = /^[0-9]{10}$/;
            return phoneRegex.test(phone);
        };

        const isValidName = (name) => {
            const nameRegex = /^[A-Za-z\s]+$/;
            return nameRegex.test(name);
        };

        const isValidPassword = (password) => {
            if (password.length < 8) {
                return "Password should be at least 8 characters long.";
            }

            const numberCount = password.replace(/[^0-9]/g, "").length;
            if (numberCount < 2) {
                return "Password should include at least 2 numbers.";
            }

            const alphabetCount = password.replace(/[^a-zA-Z]/g, "").length;
            if (alphabetCount < 4) {
                return "Password should include at least 4 alphabetic characters.";
            }

            const symbolCount = password.replace(/[0-9a-zA-Z]/g, "").length;
            if (symbolCount < 2) {
                return "Password should include at least 2 symbols.";
            }
            return null;
        };


        const validDesignations = ["HR", "Team Leader", "Manager", "Fresher", "Project Leader"];
        const isValidDesignation = (designation) => {
            const alphabeticRegex = /^[A-Za-z\s]+$/;

            return alphabeticRegex.test(designation) && validDesignations.includes(designation);
        };


        let isValid = true;

        if (!name && !email && !password && !city && !salary && !phone && !designation) {
            alert('Please Enter Your Details..');
            isValid = false;
        }

        else if (!isValidEmail(email)) {
            alert("Please enter a valid email.");
            isValid = false;
        }
        else if (!isValidPhone(phone)) {
            alert("Please enter a valid phone number.");
            isValid = false;
        }
        else if (!isValidName(name)) {
            alert("Please enter a valid name.");
            isValid = false;
        }
        else if (!isValidDesignation(designation)) {
            alert("Please enter a valid designation (e.g., HR, Team Leader, Manager, Fresher, Project Leader ).");
            isValid = false;
        }

        else if (!name) {
            alert('plaese Enter Your Name')
            isValid = false;
        }
        else if (!email) {
            alert('plaese Enter Your Email')
            isValid = false;
        }
        else if (!password) {
            alert('plaese Enter Your Password')
            isValid = false;
        }
        else if (!city) {
            alert('plaese Enter Your City')
            isValid = false;
        }
        else if (!salary) {
            alert('plaese Enter Your Salary')
            isValid = false;
        }
        else if (!phone) {
            alert('plaese Enter Your Phone Number')
            isValid = false;
        }
        else if (!designation) {
            alert('plaese Enter Your Designation')
            isValid = false;
        }
        else {
            const passwordError = isValidPassword(password);
            if (passwordError) {
                alert(passwordError);
                isValid = false;
            }
        }

        if (isValid) {
            if (editId) {
                let updatedRecords = record.map((item) => {
                    if (item.id === editId) {
                        return {
                            ...item,
                            name: input.name,
                            email: input.email,
                            password: input.password,
                            city: input.city,
                            salary: input.salary,
                            phone: input.phone,
                            designation: input.designation
                        };
                    }
                    return item;
                });
                setRecord(updatedRecords);
                setEditId("");
            } else {

                let obj = {
                    id: Math.floor(Math.random() * 10000),
                    name: name,
                    email: email,
                    password: password,
                    city: city,
                    salary: salary,
                    phone: phone,
                    designation: designation
                };
                let updatedData = [...record, obj];
                setRecord(updatedData);
                localStorage.setItem('crud', JSON.stringify(updatedData));
                alert("Your record has been successfully Added..");
            }

            setInput({
                name: '',
                email: '',
                password: '',
                city: '',
                salary: '',
                phone: '',
                designation: '',
            });


        }
        document.getElementById("detailtable").style.display = "block";
    };

    const deletedata = (id) => {
        let ans = record.filter((item) => {
            return item.id !== id;
        })
        setRecord(ans);
        localStorage.setItem('crud', JSON.stringify(ans));
        alert('your record has been succesfully Delete..')
    }

    const editdata = (id) => {
        let ans = record.filter((item) => {
            return item.id === id;
        });
        setInput(ans[0]);
        setEditId(id);
    }

    useEffect(() => {
        let allrecord = JSON.parse(localStorage.getItem('crud'));
        if (allrecord === null) {
            setRecord([]);
        } else {
            setRecord(allrecord);
        }
    }, []);
    const AddTable = () => {
        setShowForm(true);
    };
    return (
        <>
            <body >


                <header style={{ backgroundColor: '#000033' ,marginBottom:'40px' }}>
                    <div className="container">
                        <div className="d-flex py-3 align-items-center justify-content-between">
                          <div className="title">  <h1 className="text-white m-0"> Employee Management App</h1></div>
                            <div className="btn">  <button onClick={AddTable} className="fw-bold btn bg-primary-subtle btn-lg">Add Employee</button></div>
                        </div>

                    </div>
                </header>

                <center>
                    {showForm && (
                      
                        <form  className="rounded-4 pt-0 text-white" style={{ backgroundColor: '#00001a',textTransform:'capitalize',fontSize:'22px',width:'500px' }}>
                            <div className="div">  <h1 className="py-3 text-white" style={{color:'#000033'}}>Form</h1></div>
                            <table className="py-3">

                                <tr>
                                    <td > Name  </td>
                                    <td><input className=" my-3 rounded-3 ms-3"  type="text" name="name" value={input.name} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td> email  </td>
                                    <td><input className=" my-3 rounded-3 ms-3" type="text" name="email" value={input.email} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td> password  </td>
                                    <td><input className=" my-3 rounded-3 ms-3" type="text" name="password" value={input.password} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td> city  </td>
                                    <td><input  className=" my-3 rounded-3 ms-3" type="text" name="city" value={input.city} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td> salary  </td>
                                    <td><input  className=" my-3 rounded-3 ms-3" type="text" name="salary" value={input.salary} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td> phone  </td>
                                    <td><input  className=" my-3 rounded-3 ms-3" type="text" name="phone" value={input.phone} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td > Designation </td>
                                    <td><input  className=" my-3 rounded-3 ms-3" type="text" name="designation" value={input.designation} onChange={handleChange} /></td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td>{
                                        (editId)
                                            ? (<input type="button"  style={{fontSize:"24px"}} className="px-4 fw-bold btn bg-primary-subtle btn-lg my-3  ms-3 " value="edit" onClick={() => handleSubmit()} />)
                                            : (<input type="button"  style={{fontSize:"24px"}} className="px-4 fw-bold btn bg-primary-subtle btn-lg  my-3 ms-3 " value="submit" onClick={() => handleSubmit()} />)
                                    }</td>
                                </tr>
                            </table>
                        </form>
                    )}

                    <br />
                    <br />

                  <div className="col-11  d-flex justify-content-center" >
                  <table cellPadding={8} id="detailtable" className="detailtable" style={{ display: 'none' }} >
                        <thead>
                            <tr >
                                <td>Id</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>password</td>
                                <td>city</td>
                                <td>salary</td>
                                <td>phone</td>
                                <td>Designation</td>

                                <td>Action</td>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                record.map((item) => {
                                    const { id, name, email, password, city, salary, phone, designation } = item;
                                    return (
                                        <tr>

                                            <td style={{ textAlign: 'center' }}>{id}</td>
                                            <td style={{ textAlign: 'center', textTransform: 'capitalize' }}>{name}</td>
                                            <td style={{ textAlign: 'center', textTransform: 'capitalize' }}>{email}</td>
                                            <td style={{ textAlign: 'center', textTransform: 'capitalize' }}>{password}</td>
                                            <td style={{ textAlign: 'center', textTransform: 'capitalize' }}>{city}</td>
                                            <td style={{ textAlign: 'center' }}>{salary}</td>
                                            <td style={{ textAlign: 'center' }}>{phone}</td>
                                            <td style={{ textAlign: 'center', textTransform: 'capitalize' }}>{designation}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className="btn btn-danger" onClick={() => deletedata(id)}><i class="bi bi-trash3-fill"></i></button>   &nbsp;    &nbsp; ||   &nbsp;   &nbsp;
                                                <button className="btn btn-primary" onClick={() => editdata(id)}><i class="bi bi-pencil-square"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                  </div>

                </center>
            </body>
        </>
    );
};

export default Table;
