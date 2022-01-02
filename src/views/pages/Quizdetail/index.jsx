import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "src/firebase.js";
import { collection, onSnapshot } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import {
  CCard,
  CRow,
  CCol,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardImg,
  CButton,
} from "@coreui/react";

const Quizdetail = () => {
  const location = useLocation();
  const [sessions, setSessions] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {}, [location]);

  useEffect(
    () =>
      onSnapshot(collection(db, "sessions"), (snapshot) => {
        setSessions(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }),
    []
  );
  const filteredSessions = sessions.filter(
    (session) => session.quiz.id === location.state.id
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "users"), (snapshot) => {
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }),
    []
  );

  const sessionClicked = (user) => {
    console.log(user);
    routeToUserDetail(user);
  };

  let history = useHistory();
  const routeToUserDetail = (user) => {
    history.push({
      pathname: "/userdetail",
      state: user,
    });
  };

  return (
    <div className="session-container">
      {filteredSessions.map((session) => {
        var theUser = {};

        const filteredUsers = users.filter(
          (user) => user.id === session.user.id
        );
        filteredUsers.forEach((user) => (theUser = user));

        return (
          <CCard className="mb-3" style={{ maxWidth: "540px" }}>
            <CRow className="g-0">
              <CCol md={4}>
                <CCardImg src={session.user_pic} />
              </CCol>
              <CCol md={8}>
                <CCardBody>
                  <CCardTitle>{theUser.displayName}</CCardTitle>
                  <CCardText>{theUser.npm}</CCardText>
                  <CButton
                    color="primary"
                    onClick={() => sessionClicked(theUser)}
                  >
                    Check
                  </CButton>
                </CCardBody>
              </CCol>
            </CRow>
          </CCard>
        );
      })}
    </div>
  );
};

export default Quizdetail;
