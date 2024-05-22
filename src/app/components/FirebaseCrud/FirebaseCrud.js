'use client'
import FirebaseConfig from "../FirebaseConfig/FirebaseConfig";
import { ref, set, get, update, remove, child } from "firebase/database";
import { useState } from "react";
import './FirebaseCrud.css'

const database = FirebaseConfig();

function FirebaseCrud() {
    let [username, setUsername] = useState('');
    let [fullname, setFullname] = useState('');
    let [phone, setPhone] = useState('');
    let [dob, setDob] = useState('');

    let isNullOrWhiteSpaces = value =>{
        value = value.toString();
        return (value == null || value.replaceAll(' ', '').length < 1);
    }
    
    let InsertData = () => {
        const dbref = ref(database);
        if (isNullOrWhiteSpaces(username)
            ||isNullOrWhiteSpaces(fullname)
            ||isNullOrWhiteSpaces(phone)
            ||isNullOrWhiteSpaces(dob)) {
            alert("Fill all the fields");
            return;
        }

        get(child(dbref, 'Customer/' + username)).then(snapshot=> {
            if(snapshot.exists()){
                alert("The user already exists, try a different name.")
            }

            else{
                set(ref(database, 'Customer/' + username), {
                    fullname: fullname,
                    phonenumber: phone,
                    dateofbirth: dob
                }).then(()=>{
                    alert("User inserted succesfully.")
                })
                .catch(error =>{
                    alert("There was an error adding a user.");
                });;
            }
        })
        .catch((error)=>{
            console.log(error);
            alert("Error data retrieval was unsuccessful.");
        })
    }

    let UpdateData = () => {
        const dbref = ref(database);
        if (isNullOrWhiteSpaces(username)) {
            alert("Username is empty, try to select a user first, with the select button.");
            return;
        }

        get(child(dbref, 'Customer/' + username)).then(snapshot=> {
            if(snapshot.exists()){
                update(ref(database, 'Customer/' + username), {
                    fullname: fullname,
                    phonenumber: phone,
                    dateofbirth: dob
                }).then(()=>{
                    alert("User Updated succesfully.")
                })
                .catch(error =>{
                    alert("There was an error updating a user.");
                });;
            }

            else{
                alert("Error: the user does not exixt.");
            }
        })
        .catch((error)=>{
            console.log(error);
            alert("Error data retrieval was unsuccessful.");
        })
    }

    let DeleteData = () => {
        const dbref = ref(database);
        if (isNullOrWhiteSpaces(username)) {
            alert("Username is required to delete a user.");
            return;
        }

        get(child(dbref, 'Customer/' + username)).then(snapshot=> {
            if(snapshot.exists()){
                remove(ref(database, 'Customer/' + username))
                .then(()=>{
                    alert("User deleted succesfully.")
                })
                .catch(error =>{
                    alert("There was an error deleting a user.");
                });
            }

            else{
                alert("Error: the user does not exixt.");
            }
        })
        .catch((error)=>{
            console.log(error);
            alert("Error data retrieval was unsuccessful.");
        })
    }

    let SelectData = () =>{
        const dbref = ref(database);

        if (isNullOrWhiteSpaces(username)) {
            alert("Username is required to retrieve the data.");
            return;
        }

        get(child(dbref, 'Customer/' + username)).then(snapshot=> {
            if(snapshot.exists()){
                setFullname(snapshot.val().fullname);
                setPhone(snapshot.val().phonenumber);
                setDob(snapshot.val().dateofbirth);
            }

            else{
                alert('No data available.')
            }
        })
        .catch((error)=>{
            console.log(error);
            alert("Error data retrieval was unsuccessful.");
        })
    }

    return (
        <div className="crud-container">
            <div className="crud-content">
            <label style={{ fontFamily: 'Roboto', fontSize: '1.2em' }}>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} style={{ fontFamily: 'Roboto', fontSize: '1.2em' }} />
            <br />

            <label style={{ fontFamily: 'Roboto', fontSize: '1.2em' }}>Full Name</label>
            <input type="text" value={fullname} onChange={e => setFullname(e.target.value)} style={{ fontFamily: 'Roboto', fontSize: '1.2em' }} />
            <br />

            <label style={{ fontFamily: 'Roboto', fontSize: '1.2em' }}>Phone Number</label>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} style={{ fontFamily: 'Roboto', fontSize: '1.2em' }} />
            <br />

            <label style={{ fontFamily: 'Roboto', fontSize: '1.2em' }}>Date of Birth</label>
            <input type="date" value={dob} onChange={e => setDob(e.target.value)} style={{ fontFamily: 'Roboto', fontSize: '1.2em' }} />
            <br />

            <button className="custom-button" onClick={InsertData}>Save User</button>
            <button className="custom-button" onClick={UpdateData}>Update User</button>
            <button className="custom-button" onClick={DeleteData}>Delete User</button>
            <button className="custom-button" onClick={SelectData}>Find User</button>

            <div className="bottom-left-container">
                    <p style={{fontWeight: 'bold', marginLeft: '20px', fontFamily: 'Roboto', fontSize: '1.5em', marginBottom: '-10px'}}>
                        <span style={{ transform: 'rotate(10deg)' }}>Members:</span><br />
                    </p>
                    <p style={{ fontFamily: 'Roboto', marginLeft: '20px', fontSize: '1.2em' }}>
                        <span style={{ transform: 'rotate(10deg)' }}>Khyrene Mae Utanes</span><br />
                        <span style={{ transform: 'rotate(15deg)' }}>Francelyn Estorpe</span><br />
                        <span style={{ transform: 'rotate(20deg)' }}>Mary Grace Villagonzalo</span><br />
                        <span style={{ transform: 'rotate(25deg)' }}>John Paul Sevilla</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FirebaseCrud;

