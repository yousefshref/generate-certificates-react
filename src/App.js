import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCRUCertificate from "./pages/AdminCRUCertificate";
import CertificateDownload from "./pages/CertificateDownload";
import ProtectRoute from "./components/ProtectRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectRoute />}>
        <Route path="/dashboard/" element={<AdminDashboard />} />
        <Route path="/create-certificate/" element={<AdminCRUCertificate />} />
        <Route
          path="/view-certificate/:ID/update/"
          element={<AdminCRUCertificate />}
        />
      </Route>

      <Route
        path="/view-certificate/:ID/"
        element={<AdminCRUCertificate view />}
      />

      <Route
        path="/view-certificate/:ID/digitalcertificates/certificateverification-aspx/"
        element={<CertificateDownload />}
      />
      {/* <Route
        path="/view-certificate/:ID/download/"
        element={<CertificateDownload />}
      /> */}
    </Routes>
  );
}

export default App;
