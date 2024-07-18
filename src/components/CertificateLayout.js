import QRCode from "qrcode.react";
import React from "react";

const CertificateLayout = ({
  children,
  name,
  setName,
  dateOfInspection,
  setDateOfInspection,
  dateOfIssue,
  setDateOfIssue,
  place,
  setPlace,
  certificate,
  refrence,
}) => {
  const host = window.location.host;
  return (
    <div ref={refrence} className="w-full relative">
      <div className="bg-white top-0 h-full w-full text-black">
        {/* header */}
        <img alt="header" src="/header.png" />
        {/* header */}

        <div className="flex flex-col">{children}</div>

        {/* last section */}
        <div className="w-[87%] mt-[6vw] flex gap-2 justify-between mx-auto">
          <div className="flex text-zinc-900 font-bold text-[1.7vw] w-[17%] h-fit flex-col">
            <div className="text-center">
              <p>الختم الرسمي</p>
            </div>
            <p className="text-[1.6vw]">Official Stamp</p>
          </div>
          <div className="w-[87%] mx-auto text-[1.3vw] mt-3">
            <table className="min-w-full border-collapse text-center border border-[#8e8f90]">
              <thead>
                <tr>
                  <th className="bg-[#e6e7e8] w-[25%] border border-[#8e8f90]">
                    <p>مكان الاصدار</p>
                    <p>Place of Issue</p>
                  </th>
                  <th className="bg-[#e6e7e8] w-[18%] border border-[#8e8f90]">
                    <p>تاريخ الاصدار</p>
                    <p>Date of Issue</p>
                  </th>
                  <th className="bg-[#e6e7e8] w-[20%] border border-[#8e8f90]">
                    <p>تاريخ الفحص</p>
                    <p>Date of Inspection</p>
                  </th>
                  <th className="bg-[#e6e7e8] w-[60%] border border-[#8e8f90]">
                    <p>اسم وتوقيع الموظف المختص</p>
                    <p>Name & Signature of Authorized Officer</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className=" border border-[#8e8f90] py-1 px-3">
                    {certificate?.id ? (
                      <p className="py-1">{certificate?.place_of_issue}</p>
                    ) : (
                      <textarea
                        type="text"
                        className="w-[100%] border-0"
                        placeholder="Enter here..."
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                      />
                    )}
                  </td>
                  <td className=" border border-[#8e8f90] py-1 px-3">
                    {certificate?.id ? (
                      <p className="py-1">{certificate?.date_of_issue}</p>
                    ) : (
                      <textarea
                        type="text"
                        className="w-[100%] border-0"
                        placeholder="Enter here..."
                        value={dateOfIssue}
                        onChange={(e) => setDateOfIssue(e.target.value)}
                      />
                    )}
                  </td>
                  <td className=" border border-[#8e8f90] py-1 px-3">
                    {certificate?.id ? (
                      <p className="py-1">{certificate?.date_of_inspection}</p>
                    ) : (
                      <textarea
                        type="text"
                        className="w-[100%] border-0"
                        placeholder="Enter here..."
                        value={dateOfInspection}
                        onChange={(e) => setDateOfInspection(e.target.value)}
                      />
                    )}
                  </td>
                  <td className=" border border-[#8e8f90] py-1 px-3">
                    {certificate?.id ? (
                      <p className="py-1">
                        {certificate?.name_and_signature_of_authorized_officer}
                      </p>
                    ) : (
                      <textarea
                        type="text"
                        className="w-[100%] border-0"
                        placeholder="Enter here..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* last section */}

        {/* footer */}
        <div className="relative">
          <img src={"/certificateFooter.png"} className="" />
          <div className="absolute items-center text-center left-[2.7vw] h-[14.5vw] flex flex-col justify-center w-[15vw] bottom-[3.2vw]">
            {/* <p className="text-[1.3vw]">الباركود هنا بعد الانشاء</p> */}
            <QRCode
              style={{
                width: "100%",
                height: "100%",
              }}
              value={`https://e-services-seven.vercel.app/view-certificate/${certificate?.id}/download/`}
            />
          </div>
        </div>
        {/* footer */}
      </div>
    </div>
  );
};

export default CertificateLayout;
