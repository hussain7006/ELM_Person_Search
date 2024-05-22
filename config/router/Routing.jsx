import { Routes, Route } from "react-router-dom";

import PersonSearch from "../../pages/personSearch/PersonSearch";
import ErrorPage from "../../pages/Error/ErrorPage"
import Header from "../../components/header/Header";





function Routing() {



  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PersonSearch />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default Routing;
