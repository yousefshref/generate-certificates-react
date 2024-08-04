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
  isUpdate,
  underTableFontSize,
  setUnderTableFontSize,
}) => {
  const host = window.location.host;
  return (
    <div
      ref={refrence}
      className="w-[8.27in] h-[11.69in] mt-20 scale-105 relative mx-auto"
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
                <p className="font-bold me-7">الختم الرسمي</p>
              </div>
              <p className="text-[13px] font-bold">Official Stamp</p>
            </div>
            <div className={`w-[90%] text-[9pt] ms-auto mt-3`}>
              <table className="min-w-full border-collapse text-center">
                <thead>
                  <tr>
                    <th className="bg-[#e6e7e8] border-b-0 w-[28%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                      <p className="font-normal">مكان الاصدار</p>
                      <p className="-mt-1  font-normal">Place of Issue</p>
                    </th>
                    <th className="bg-[#e6e7e8] border-b-0 w-[15%] border-l-0  border md:border-[#8e8f90] border-[#8e8f90]/40">
                      <p className="font-normal">تاريخ الاصدار</p>
                      <p className="-mt-1  font-normal">Date of Issue</p>
                    </th>
                    <th className="bg-[#e6e7e8] border-b-0 w-[19.5%] border-l-0  border md:border-[#8e8f90] border-[#8e8f90]/40">
                      <p className="font-normal">تاريخ الفحص</p>
                      <p className="-mt-1  font-normal">Date of Inspection</p>
                    </th>
                    <th className="bg-[#e6e7e8] border-b-0 w-[40%] border-l-0  border md:border-[#8e8f90] border-[#8e8f90]/40">
                      <p className="font-normal">اسم وتوقيع الموظف المختص</p>
                      <p className="-mt-1  font-normal">
                        Name & Signature of Authorized Officer
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className=" border border-t-0 md:border-[#8e8f90] border-[#8e8f90]/40 ">
                      {certificate?.id && !isUpdate ? (
                        <p
                          // style={{
                          //   fontSize: `${underTableFontSize}px`,
                          // }}
                          className="px-2"
                        >
                          {certificate?.place_of_issue}
                        </p>
                      ) : (
                        <input
                          type="text"
                          className="w-[100%] border-0 "
                          placeholder="Enter here..."
                          value={place}
                          onChange={(e) => setPlace(e.target.value)}
                        />
                      )}
                    </td>
                    <td className=" border border-t-0 border-l-0 md:border-[#8e8f90] border-[#8e8f90]/40 ">
                      {certificate?.id && !isUpdate ? (
                        <p className="text-[10pt]">
                          {certificate?.date_of_issue}
                        </p>
                      ) : (
                        <input
                          type="text"
                          className="w-[100%] border-0 "
                          placeholder="Enter here..."
                          value={dateOfIssue}
                          onChange={(e) => setDateOfIssue(e.target.value)}
                        />
                      )}
                    </td>
                    <td className=" border border-t-0 border-l-0 md:border-[#8e8f90] border-[#8e8f90]/40 ">
                      {certificate?.id && !isUpdate ? (
                        <p className="text-[10pt]">
                          {certificate?.date_of_inspection}
                        </p>
                      ) : (
                        <input
                          type="text"
                          className="w-[100%] border-0 "
                          placeholder="Enter here..."
                          value={dateOfInspection}
                          onChange={(e) => setDateOfInspection(e.target.value)}
                        />
                      )}
                    </td>
                    <td className=" border border-t-0 border-l-0 md:border-[#8e8f90] border-[#8e8f90]/40 ">
                      {certificate?.id && !isUpdate ? (
                        <p className=" ">
                          {
                            certificate?.name_and_signature_of_authorized_officer
                          }
                        </p>
                      ) : (
                        <input
                          type="text"
                          className="w-[100%] border-0 "
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
            {/* <img src={"/certificateFooter.png"} className=" " /> */}
            <img src={"/Screenshot_2-8-2024_17131_.jpeg"} className=" " />
            <div className="absolute items-center text-center left-[28px] h-[126px] flex flex-col justify-center w-[126px] bottom-[25px]">
              {/* <p className="text-[1.3vw]">الباركود هنا بعد الانشاء</p> */}
              {/* <QRCode
                style={{
                  width: "100%",
                  height: "100%",
                }}
                value={`https://www.eservice-guv.ae/view-certificate/${certificate?.id}/digitalcertificates/certificateverification-aspx/`}
              /> */}
              <QRCode
                style={{
                  width: "100%",
                  height: "100%",
                }}
                value={`https://www.eservice-guv.ae/view-certificate/${certificate?.id}/digitalcertificates/certificateverification-aspx/?CN=${certificate?.number}`}
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
