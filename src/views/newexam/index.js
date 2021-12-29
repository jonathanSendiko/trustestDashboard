import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { CForm, CFormGroup, CLabel, CInput, CButton } from "@coreui/react";
import { db } from "src/firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const NewExam = () => {
  const auth = getAuth();
  //const user = auth.currentUser;

  const [quizzes, setQuiz] = useState([]);
  const [quizName_, setquizName] = useState("");
  const [subjectName_, setsubjectName] = useState("");
  const [timeLimit_, settimeLimit] = useState(0);
  const [startDate_, setstartDate] = useState(Timestamp.fromDate(new Date()));
  const [endDate_, setendDate] = useState(Timestamp.fromDate(new Date()));
  const [numberOfQuestion_, setnumberOfQuestion] = useState("0");
  const [openbook_, setOpenbook] = useState(false);
  const [plagiarism_, setPlagiarism] = useState(false);
  const [scrappaper_, setScrapPaper] = useState(false);
  const [searchinternet_, setSearchInternet] = useState(false);
  const [teamwork_, setTeamwork] = useState(false);
  const [usecalculator_, setUseCalculator] = useState(false);
  const [npm, setNpm] = useState([]);
  const ujianCollectionRef = collection(db, "quizes");

  const addData = async () => {
    try {
      await addDoc(ujianCollectionRef, {
        subjectName: subjectName_,
        quizName: quizName_,
        numOfQuestion: numberOfQuestion_,
        timeLimit: timeLimit_,
        startDate: startDate_,
        endDate: endDate_,
        startDate: startDate_,
        endDate: endDate_,
        rules: {
          openBook: openbook_,
          plagiarism: plagiarism_,
          scrapPaper: scrappaper_,
          searchInternet: searchinternet_,
          teamwork: teamwork_,
          useCalculator: usecalculator_,
        },
        students: npm.split(","),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    console.log(id);
    const docQuiz = doc(db, "quizes", id);
    await deleteDoc(docQuiz);
  };

  useEffect(() => {
    const getQuiz = async () => {
      const dataQuiz = await getDocs(ujianCollectionRef);
      setQuiz(dataQuiz.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getQuiz();
  }, []);

  const str2bool = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };

  return (
    <div>
      <h1>Buat Ujian Baru</h1>
      <div>
        <CForm>
          <CFormGroup>
            <CLabel>Nama Ujian</CLabel>
            <CInput
              type="text"
              placeholder="Masukkan Mata Kuliah"
              onChange={(event) => {
                setsubjectName(event.target.value);
              }}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>Tipe Ujian</CLabel>
            <CInput
              type="text"
              placeholder="Masukkan Tipe Kuliah"
              onChange={(event) => {
                setquizName(event.target.value);
              }}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>Durasi Ujian</CLabel>
            <CInput
              type="number"
              placeholder="Masukkan Durasi Ujian"
              onChange={(event) => {
                settimeLimit(event.target.value);
              }}
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>Jumlah Soal</CLabel>
            <CInput
              type="number"
              placeholder="Masukkan Jumlah Soal"
              onChange={(event) => {
                setnumberOfQuestion(event.target.value);
              }}
            />
          </CFormGroup>
        </CForm>
        <div>
          <form action="#">
            <label for="openbook">Open Book</label>
            <select
              name="openbook"
              id="openbook"
              onChange={(event) => {
                setOpenbook(str2bool(event.target.value));
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </form>
        </div>
        <div>
          <form action="#">
            <label for="plagiarism">Plagiarism</label>
            <select
              name="plagiarism"
              id="plagiarism"
              onChange={(event) => {
                setPlagiarism(str2bool(event.target.value));
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </form>
        </div>
        <div>
          <form action="#">
            <label for="scrappaper">Scrap Paper</label>
            <select
              name="scrappaper"
              id="scrappaper"
              onChange={(event) => {
                setScrapPaper(str2bool(event.target.value));
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </form>
        </div>
        <div>
          <form action="#">
            <label for="searchinternet">Search The Internet</label>
            <select
              name="searchinternet"
              id="searchinternet"
              onChange={(event) => {
                setSearchInternet(str2bool(event.target.value));
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </form>
        </div>
        <div>
          <form action="#">
            <label for="teamwork">Team Work</label>
            <select
              name="teamwork"
              id="teamwork"
              onChange={(event) => {
                setTeamwork(str2bool(event.target.value));
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </form>
        </div>
        <div>
          <form action="#">
            <label for="usecalculator">Use Calculator</label>
            <select
              name="usecalculator"
              id="usecalculator"
              onChange={(event) => {
                setUseCalculator(str2bool(event.target.value));
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </form>
        </div>
        <CFormGroup>
          <CLabel>NPM Peserta Ujian</CLabel>
          <CInput
            type="text"
            placeholder="Masukkan NPM Peserta Ujian"
            onChange={(event) => {
              setNpm(event.target.value);
            }}
          />
        </CFormGroup>
        <CButton color="primary" onClick={addData}>
          Add Ujian
        </CButton>
      </div>
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
            <CButton
              color="danger"
              onClick={() => {
                deleteData(quiz.id);
              }}
            >
              Delete Mahasiswa
            </CButton>
          </div>
        );
      })}
    </div>
  );
};

export default NewExam;
