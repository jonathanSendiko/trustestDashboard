import { useState, useEffect } from "react";
import { db } from "src/firebase.js";
import { collection, onSnapshot, doc } from "firebase/firestore";
import "./quizes.scss";
import { CCard, CRow, CCol, CCardBody, CCardTitle, CCardText, CCardImg, CButton } from '@coreui/react';
import logo from "../../assets/icons/Trustest-Logo.jpg";
import { useHistory } from "react-router-dom";

const Quizes = () => {
    const [quizes, setQuizes] = useState([]);
  
    useEffect(
      () =>
        onSnapshot(collection(db, "quizes"), (snapshot) => {
          setQuizes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }),
  
      []
    );

    const quizClicked = (quiz) => {
      routeToQuizDetail(quiz);
    };

    let history = useHistory();
    const routeToQuizDetail = (quiz) => {
      history.push({
        pathname: '/quizdetail',
        state: quiz
      });
    };
  
    return (
      <div className="quiz-container">
        {quizes.map((quiz) => (
          <CCard className="mb-3" style={{ maxWidth: '540px' }}>
            <CRow className="g-0">
              <CCol md={4}>
                <CCardImg src={logo} />
              </CCol>
              <CCol md={8}>
                <CCardBody>
                  <CCardTitle>{quiz.quizName} - {quiz.subjectName}</CCardTitle>
                  <CCardText>{quiz.students.length} mahasiswa terdaftar</CCardText>
                  <CButton color="primary" onClick={() => quizClicked(quiz)}>Check</CButton>
                </CCardBody>
              </CCol>
            </CRow>
          </CCard>
        ))}
      </div>
    );
  };

export default Quizes;