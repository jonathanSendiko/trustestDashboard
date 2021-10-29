import React from 'react'
import { useState, useEffect } from 'react'  
import './style.css'
import {
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CButton
  } from '@coreui/react'
import {db} from 'src/firebase.js'
import {
    collection, 
    addDoc, 
} from 'firebase/firestore'
import { getAuth } from "firebase/auth";

export const NewExam = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [ujianBaru, setUjianBaru] = useState("");
    const [durasiBaru, setDurasiBaru] = useState("");
    const [mulaiBaru, setMulaiBaru] = useState("");
    const [stopBaru, setStopBaru] = useState(0);
    const ujianCollectionRef = collection(db,"Ujian");

    const addData = async () => {
        try {
          await addDoc(ujianCollectionRef, {MataKuliah: ujianBaru, Durasi: durasiBaru, startDate: mulaiBaru, endDate: stopBaru, Email: user.email});
        } catch (error) {
          console.log(error)  
        }
        
    }

    return (
        <div>
            <h1>
                Buat Ujian Baru
            </h1>
            <div>
            <CForm>
          <CFormGroup>
            <CLabel>Nama Ujian</CLabel>
            <CInput 
            type="text" 
            placeholder="Masukkan Mata Kuliah"
            onChange={(event) => {
                setUjianBaru(event.target.value);
            }}  
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>Durasi Ujian</CLabel>
            <CInput 
            type="number" 
            placeholder="Masukkan Durasi Ujian"
            onChange={(event) => {
                setDurasiBaru(event.target.value);
            }}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>Tanggal Mulai Ujian</CLabel>
            <CInput 
            type="text" 
            placeholder="Masukkan Tanggal Mulai Ujian"
            onChange={(event) => {
                setMulaiBaru(event.target.value);
            }}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>Tanggal Akhir Ujian</CLabel>
            <CInput 
            type="text" 
            placeholder="Masukkan Tanggal Akhir Ujian"
            onChange={(event) => {
                setStopBaru(event.target.value);
            }}
            />
          </CFormGroup>
        </CForm>
        <CButton color="primary" onClick={addData}>Add Ujian</CButton>
            </div>
        </div>
    )
}

export default NewExam