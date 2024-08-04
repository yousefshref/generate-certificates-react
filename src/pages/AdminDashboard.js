import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { server } from "../utlits/Variables";
import { BsEye } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { BiCopy, BiPencil, BiTrash } from "react-icons/bi";
import axios from "axios";

const AdminDashboard = () => {
  const [certificates, setCertificates] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchCertificates = async () => {
    setLoading(true);
    const response = await fetch(`${server}api/certificates/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setCertificates(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const deleteForm = async (id) => {
    setLoading(true);
    const response = await fetch(`${server}api/certificates/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    fetchCertificates();
    setLoading(false);
  };

  const copyCertificate = async (id) => {
    try {
      const response = await axios.post(
        `${server}api/certificates/${id}/copy/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.data;
      console.log(data);
      if (data.id) {
        fetchCertificates();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex gap-2">
      {loading ? <LoadingScreen /> : null}
      {/* sidebar */}
      <div className="w-64 h-screen max-h-full bg-gray-800 text-white">
        <div className="p-4 text-2xl font-bold">YUSUF</div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link className="block p-2 hover:bg-gray-700 rounded">
                Certificates
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col gap-1 p-2 absolute bottom-0 w-fit">
          <strong>Admin</strong>
          <p>admin@gmail.com</p>
        </div>
      </div>
      {/* content */}
      <div className="flex-1 p-8 bg-gray-100 flex flex-col gap-7">
        <h1 className="text-3xl font-bold">All Certificates</h1>
        {/* search */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button className="p-2 bg-blue-500 text-white rounded">Search</button>
        </div>
        {/* create */}
        <div className="">
          <Link
            to="/create-certificate/"
            className="p-2 bg-green-500 w-full max-w-[170px] text-white rounded"
          >
            Create
          </Link>
        </div>
        {/* certificates */}
        <div className="p-3 rounded-xl bg-white flex gap-4 flex-col justify-center items-center">
          {certificates?.length > 0 ? (
            certificates?.map((certificate) => (
              <div
                key={certificate.id}
                className="p-3 justify-between rounded-xl from-indigo-100 flex-row items-start to-red-100 bg-gradient-to-tr w-full flex text-start"
              >
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <p>Certificate Number:</p>
                    <strong>{certificate.number}</strong>
                  </div>
                  <div className="flex gap-2">
                    <p>Verification Code: </p>
                    <strong>{certificate.verification_code}</strong>
                  </div>
                </div>
                <div className="flex my-auto gap-2 justify-center">
                  <BiCopy
                    onClick={() => copyCertificate(certificate.id)}
                    className="bg-green-500 select-none hover:bg-green-950 hover:text-white flex flex-col justify-center rounded-full  p-2 my-auto w-fit h-fit text-wrap transition-all"
                  />
                  <BiTrash
                    onClick={() => deleteForm(certificate.id)}
                    className="bg-red-400 select-none hover:bg-red-950 hover:text-white flex flex-col justify-center rounded-full  p-2 my-auto w-fit h-fit text-wrap transition-all"
                  />
                  <Link
                    to={`/view-certificate/${certificate.id}/`}
                    className="bg-yellow-500 hover:bg-yellow-950 hover:text-white flex flex-col justify-center rounded-full  p-2 my-auto w-fit h-fit text-wrap transition-all"
                  >
                    <BsEye />
                  </Link>
                  <Link
                    to={{
                      pathname: `/view-certificate/${certificate.id}/update/`,
                      state: { update: true },
                      search: `?update=true`,
                    }}
                    className="bg-blue-500 hover:bg-blue-950 hover:text-white flex flex-col justify-center rounded-full  p-2 my-auto w-fit h-fit text-wrap transition-all"
                  >
                    <BiPencil />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <strong>No Certificates Found...</strong>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
