import { useState, useEffect } from 'react'  
import React from 'react'
import {
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CButton
  } from '@coreui/react'
import {db} from 'src/firebase.js'
import {collection, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc
} from 'firebase/firestore'

export const Index = () => {
    const [namaBaru, setNamaBaru] = useState("");
    const [npmBaru, setNPMBaru] = useState(1806000000);
    const [mahasiswa, setMahasiswa] = useState([]);
    const mahasiwaCollectionRef = collection(db,"Mahasiswa");

    const addData = async () => {
        await addDoc(mahasiwaCollectionRef, {Nama: namaBaru, NPM: npmBaru});
    }

    const updateData = async (id,updatedNPM) => {
        const docMahasiswa = doc(db, "Mahasiwa", id);
        const newNPM = {updatedNPM: updatedNPM + 1};
        await updateDoc(docMahasiswa, newNPM);
    }

    const deleteData = async (id) => {
        //console.log(id);
        const docMahasiswa = doc(db, "Mahasiwa", id);
        await deleteDoc(docMahasiswa);
    }

    useEffect(() => {
        const getMahasiswa = async () => {
            const dataMahasiwa = await getDocs(mahasiwaCollectionRef);
            setMahasiswa(dataMahasiwa.docs.map((doc) => ({...doc.data(), id: doc.id}))) 
        };
        getMahasiswa();
    })
    return (
      <div>
        <CForm>
          <CFormGroup>
            <CLabel>Nama</CLabel>
            <CInput 
            type="text" 
            placeholder="Masukkan Nama Mahasiswa" 
            onChange={(event) => {
                setNamaBaru(event.target.value);
            }} 
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>NPM</CLabel>
            <CInput 
            type="number" 
            placeholder="Masukkan NPM Mahasiswa"
            onChange={(event) => {
                setNPMBaru(event.target.value);
            }} 
            />
          </CFormGroup>
        </CForm>
        <CButton color="primary" onClick={addData}>Add Data</CButton>
        {mahasiswa.map((orang) => {
          return (
            <div>
              <h2>Nama: {orang.Nama}</h2>
              <h2>NPM: {orang.NPM}</h2>
              <CButton
                color="success"
                onClick={() => {
                  updateData(orang.id,orang.NPM);
                }}
              >
                Update NPM
              </CButton>
              <CButton
                color="danger"
                onClick={() => {
                  deleteData(orang.id);
                }}
              >
                Delete Mahasiswa
              </CButton>
            </div>
          );
        })}
      </div>
    );
}
export default Index