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
    <div
      ref={refrence}
      className="w-[8.27in] h-[11.69in] scale-105 bg-red-200 relative mx-auto"
    >
      <div className="bg-white top-0 h-full w-full text-black">
        {/* header */}
        <img alt="header" src="/header.png" />
        {/* header */}

        <div className="flex flex-col">{children}</div>

        {/* last section */}
        <div className="absolute bottom-0">
          <div className="w-[87%] flex gap-2 mt-5 justify-between mx-auto">
            <div className="flex text-zinc-900 font-normal mt-2 text-[12px] w-[17%] h-fit flex-col">
              <div className="text-center">
                <p className="font-bold">الختم الرسمي</p>
              </div>
              <p className="text-[13px] font-bold">Official Stamp</p>
            </div>
            <div className="w-[87%] ms-auto mt-3">
              <table className="min-w-full border-collapse text-center">
                <thead>
                  <tr>
                    <th className="bg-[#e6e7e8] border-b-0 w-[23%] text-[13px] border md:border-[#8e8f90] border-[#8e8f90]/40">
                      <p className="font-normal">مكان الاصدار</p>
                      <p className="-mt-1 text-[12px] font-normal">
                        Place of Issue
                      </p>
                    </th>
                    <th className="bg-[#e6e7e8] border-b-0 w-[18%] border-l-0 text-[13px] border md:border-[#8e8f90] border-[#8e8f90]/40">
                      <p className="font-normal">تاريخ الاصدار</p>
                      <p className="-mt-1 text-[12px] font-normal">
                        Date of Issue
                      </p>
                    </th>
                    <th className="bg-[#e6e7e8] border-b-0 w-[20%] border-l-0 text-[13px] border md:border-[#8e8f90] border-[#8e8f90]/40">
                      <p className="font-normal">تاريخ الفحص</p>
                      <p className="-mt-1 text-[12px] font-normal">
                        Date of Inspection
                      </p>
                    </th>
                    <th className="bg-[#e6e7e8] border-b-0 w-[62%] border-l-0 text-[13px] border md:border-[#8e8f90] border-[#8e8f90]/40">
                      <p className="font-normal">اسم وتوقيع الموظف المختص</p>
                      <p className="-mt-1 text-[12px] font-normal">
                        Name & Signature of Authorized Officer
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className=" border border-t-0 md:border-[#8e8f90] border-[#8e8f90]/40 ">
                      {certificate?.id ? (
                        <p className=" text-[10px]">
                          {certificate?.place_of_issue}
                        </p>
                      ) : (
                        <textarea
                          type="text"
                          className="w-[100%] border-0 text-[10px]"
                          placeholder="Enter here..."
                          value={place}
                          onChange={(e) => setPlace(e.target.value)}
                        />
                      )}
                    </td>
                    <td className=" border border-t-0 border-l-0 md:border-[#8e8f90] border-[#8e8f90]/40 ">
                      {certificate?.id ? (
                        <p className=" text-[10px]">
                          {certificate?.date_of_issue}
                        </p>
                      ) : (
                        <textarea
                          type="text"
                          className="w-[100%] border-0 text-[10px]"
                          placeholder="Enter here..."
                          value={dateOfIssue}
                          onChange={(e) => setDateOfIssue(e.target.value)}
                        />
                      )}
                    </td>
                    <td className=" border border-t-0 border-l-0 md:border-[#8e8f90] border-[#8e8f90]/40 ">
                      {certificate?.id ? (
                        <p className=" text-[10px]">
                          {certificate?.date_of_inspection}
                        </p>
                      ) : (
                        <textarea
                          type="text"
                          className="w-[100%] border-0 text-[10px]"
                          placeholder="Enter here..."
                          value={dateOfInspection}
                          onChange={(e) => setDateOfInspection(e.target.value)}
                        />
                      )}
                    </td>
                    <td className=" border border-t-0 border-l-0 md:border-[#8e8f90] border-[#8e8f90]/40 ">
                      {certificate?.id ? (
                        <p className=" text-[10px]">
                          {
                            certificate?.name_and_signature_of_authorized_officer
                          }
                        </p>
                      ) : (
                        <textarea
                          type="text"
                          className="w-[100%] border-0 text-[10px]"
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
          <div className="mt-3.5 relative bottom-0">
            <img src={"/certificateFooter.png"} className=" text-[13px]" />
            <div className="absolute items-center text-center left-[23px] h-[126px] flex flex-col justify-center w-[126px] bottom-[22px]">
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
    </div>
  );
};

export default CertificateLayout;
