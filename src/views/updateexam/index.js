import { query } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "src/firebase.js";
import { CForm, CFormGroup, CLabel, CInput } from "@coreui/react";
import { collection, getDocs, where, doc } from "firebase/firestore";

export const UpdateExam = () => {
  const [quizzes, setQuiz] = useState([]);
  const [matkul, setMatkul] = useState("");
  const ujianCollectionRef = collection(db, "quizes");

  useEffect(() => {
    const getQuiz = async () => {
      const dataQuiz = await getDocs(
        query(ujianCollectionRef, where("subjectName", "==", { matkul }))
      );
      setQuiz(dataQuiz.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(String(doc.id));
    };
    getQuiz();
  }, [matkul, ujianCollectionRef]);

  return (
    <div>
      <CForm>
        <CFormGroup>
          <CLabel>Nama Ujian Yang Ingin Diupdate</CLabel>
          <CInput
            type="text"
            placeholder="Masukkan Nama Kuliah Yang ingin diupdate"
            onChange={(event) => {
              setMatkul(event.target.value);
            }}
          />
        </CFormGroup>
      </CForm>
      {quizzes.map((quiz) => {
        return (
          <div>
            <h2>Nama Ujian: {quiz.quizName}</h2>
            <h2>Mata Kuliah: {quiz.subjectName}</h2>
            <h2>Durasi Ujian: {quiz.timeLimit} menit</h2>
            <h2>Jumlah Pertanyaan: {quiz.numOfQuestions}</h2>
            <h2>Waktu Ujian Dimulai: {quiz.startDate.toDate().toString()}</h2>
            <h2>Waktu Ujian Berakhir: {quiz.endDate.toDate().toString()}</h2>
            <h2>Rules:</h2>
            <ul>
              <li>Open Book: {quiz.rules.openBook.toString()}</li>
              <li>Plagiarism: {quiz.rules.plagiarism.toString()}</li>
              <li>Scrap Paper: {quiz.rules.scrapPaper.toString()}</li>
              <li>
                Search The Internet: {quiz.rules.searchInternet.toString()}
              </li>
              <li>Team Work: {quiz.rules.teamwork.toString()}</li>
              <li>Use Calculator: {quiz.rules.useCalculator.toString()}</li>
            </ul>
            <div>Students: {quiz.students.toString()}</div>
          </div>
        );
      })}
    </div>
  );
};

export default UpdateExam;
