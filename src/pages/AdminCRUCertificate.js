import React, { useEffect, useRef, useState } from "react";
import CertificateLayout from "../components/CertificateLayout";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { server } from "../utlits/Variables";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const AdminCRUCertificate = ({
  view,
  div1Ref,
  div2Ref,
  div3Ref,
  noPadding,
}) => {
  const [number, setNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [frm, setFrm] = useState("");
  const [to, setTo] = useState("");

  const [nameAddressOfExporter, setNameAddressOfExporter] = useState("");
  const [nameAddressOfImporter, setNameAddressOfImporter] = useState("");
  const [distinguishingMarks, setDistinguishingMarks] = useState("");
  const [declaredPointOfEntry, setDeclaredPointOfEntry] = useState("");

  const [totalNmOfPackages, setTotalNmOfPackages] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [importPermitNo, setImportPermitNo] = useState("");
  const [declaredMeansOfConveyance, setDeclaredMeansOfConveyance] =
    useState("");
  const [endUsePurpose, setEndUsePurpose] = useState("");

  const [additionalDeclaration, setAdditionalDeclaration] = useState("");

  const [
    nameAndSignatureOfAuthorizedOfficer,
    setNameAndSignatureOfAuthorizedOfficer,
  ] = useState("");
  const [dateOfInspection, setDateOfInspection] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [placeOfIssue, setPlaceOfIssue] = useState("");

  const [concentrationRate, setConcentrationRate] = useState("");
  const [treatment, setTreatment] = useState("");
  const [treatmentDate, setTreatmentDate] = useState("");
  const [durationAndTemperature, setDurationAndTemperature] = useState("");
  const [chemicals, setChemicals] = useState("");

  const [data, setData] = useState([]);

  const createCertificate = async () => {
    const d = {
      number,
      verification_code: verificationCode,
      frm,
      to,
      name_address_of_exporter: nameAddressOfExporter,
      name_address_of_importer: nameAddressOfImporter,
      distinguishing_marks: distinguishingMarks,
      declared_point_of_entry: declaredPointOfEntry,
      total_nm_of_packages: totalNmOfPackages,
      total_quantity: totalQuantity,
      import_permit_no: importPermitNo,
      declared_means_of_conveyance: declaredMeansOfConveyance,
      end_use_purpose: endUsePurpose,
      additional_declaration: additionalDeclaration,
      name_and_signature_of_authorized_officer:
        nameAndSignatureOfAuthorizedOfficer,
      date_of_inspection: dateOfInspection,
      date_of_issue: dateOfIssue,
      place_of_issue: placeOfIssue,
      concentration_rate: concentrationRate,
      treatment: treatment,
      treatment_date: treatmentDate,
      duration_and_temperature: durationAndTemperature,
      chemicals: chemicals,
      data: JSON.stringify(data),
    };
    await axios
      .post(`${server}api/certificates/`, d, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.id) {
          window.location.href = `/dashboard/`;
        }
      });
  };

  const [certificate, setCertificate] = useState({});

  const params = useParams();

  const getCertificate = async () => {
    const response = await fetch(`${server}api/certificates/${params.ID}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setCertificate(data);
  };

  useEffect(() => {
    if (view) {
      getCertificate();
    }
  }, []);

  const [user, setUser] = useState({});

  const getUser = async () => {
    await axios
      .get(`${server}api/user/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((e) => {
        if (e.data.id) {
          setUser(e.data);
        }
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const div1Ref_ = useRef();
  const div2Ref_ = useRef();
  const div3Ref_ = useRef();

  const downloadCertificate = async () => {
    const captureScreenshot = async (divRef) => {
      const canvas = await html2canvas(divRef.current, {
        scale: 2, // Adjust the scale value to increase the quality
        useCORS: true, // This ensures that images from other domains are rendered correctly
      });
      return canvas.toDataURL("image/png");
    };
    try {
      const images = [
        await captureScreenshot(div1Ref_),
        await captureScreenshot(div2Ref_),
        await captureScreenshot(div3Ref_),
      ];

      const pdf = new jsPDF();

      const dimensions = [
        { x: 10, y: 0, width: 190, height: 280 },
        { x: 10, y: 0, width: 190, height: 280 },
        { x: 10, y: 0, width: 190, height: 0 },
      ];

      images.forEach((image, index) => {
        const { x, y, width, height } = dimensions[index];

        if (index > 0) {
          pdf.addPage();
        }

        // Add image with dynamic dimensions
        pdf.addImage(image, "PNG", x, y, width, height);
      });

      // Save the PDF
      pdf.save("شهادة زراعية صحية للتصدير_إعادة تصدير.pdf");
    } catch (error) {}
  };

  return (
    <div
      className={`flex ${noPadding ? "gap-1" : "gap-52"} ${
        noPadding ? "p-0" : "p-4"
      } flex-col bg-zinc-200 roboto-medium`}
    >
      {/* first page */}
      <CertificateLayout
        certificate={certificate}
        name={nameAndSignatureOfAuthorizedOfficer}
        setName={setNameAndSignatureOfAuthorizedOfficer}
        dateOfInspection={dateOfInspection}
        setDateOfInspection={setDateOfInspection}
        dateOfIssue={dateOfIssue}
        setDateOfIssue={setDateOfIssue}
        place={placeOfIssue}
        setPlace={setPlaceOfIssue}
        refrence={div1Ref ? div1Ref : div1Ref_}
      >
        {/* number and verification */}
        <div
          style={{ fontWeight: "400" }}
          className="w-[87%] md:mt-[1.5vw] mt-[1vw] items-center mx-auto flex text-[1.5vw] justify-between"
        >
          <div className="flex flex-col text-start">
            <p>No.</p>
            <p>Verification Code</p>
          </div>
          <div className="flex flex-col text-center">
            {certificate?.id ? (
              <p className="py-[0.4vw]">{certificate?.number}</p>
            ) : (
              <input
                type="text"
                placeholder="Number..."
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            )}
            {certificate?.id ? (
              <p className="py-[0.4vw]">{certificate?.verification_code}</p>
            ) : (
              <input
                type="text"
                placeholder="Verification Code..."
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            )}
          </div>
          <div className="flex flex-col text-end">
            <p>الرقم</p>
            <p>رمز التحقق</p>
          </div>
        </div>
        {/* number and verification */}

        {/* first table */}
        <div className="w-[87%] mx-auto text-[1.3vw] mt-[1.2vw]">
          <table className="min-w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="bg-[#e6e7e8] w-[50%] py-[0.4vw] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>من / منظمة وقاية النباتات في</p>
                  <p>From / Plant Protection Organization(s) of</p>
                </th>
                <th className="bg-[#e6e7e8] w-[50%] py-[0.4vw] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>إلي / منظمة وقاية النباتات في</p>
                  <p>To / Plant Protection Organization(s) of</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">{certificate?.frm}</p>
                  ) : (
                    <textarea
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={frm}
                      onChange={(e) => setFrm(e.target.value)}
                    />
                  )}
                </td>
                <td className="border md:border-[#8e8f90] border-[#8e8f90]/40">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">{certificate?.to}</p>
                  ) : (
                    <textarea
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* first table */}

        {/* first thing first */}
        <div
          style={{ fontWeight: "500" }}
          className="w-[87%] bg-[#8e8f90] text-white py-[0.4vw] px-2 mt-[1.2vw] flex mx-auto text-[1.6vw] justify-between"
        >
          <p>I. Description of Consignment</p>
          <p className="font-medium arabic">أولا: وصف الإرساليـــــــــة</p>
        </div>
        <div className="w-[87%] mx-auto text-[1.3vw]">
          <table className="min-w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="bg-[#e6e7e8] w-[50%] py-[0.4vw] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>اسم جهة التصدير وعنوانها</p>
                  <p>Name & Address of Exporter</p>
                </th>
                <th className="bg-[#e6e7e8] w-[50%] py-[0.4vw] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>اسم المستورد وعنوانه حسب البيانات</p>
                  <p>Declared Name & Address of Importer</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">
                      {certificate?.name_address_of_exporter}
                    </p>
                  ) : (
                    <textarea
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={nameAddressOfExporter}
                      onChange={(e) => setNameAddressOfExporter(e.target.value)}
                    />
                  )}
                </td>
                <td className="border md:border-[#8e8f90] border-[#8e8f90]/40">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">
                      {certificate?.name_address_of_importer}
                    </p>
                  ) : (
                    <textarea
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={nameAddressOfImporter}
                      onChange={(e) => setNameAddressOfImporter(e.target.value)}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-[87%] mx-auto text-[1.3vw]">
          <table className="min-w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="bg-[#e6e7e8] w-[50%] py-[0.4vw].5 px-3 border-t-0 border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>العلامات المميزة</p>
                  <p>Distinguishing Marks</p>
                </th>
                <th className="bg-[#e6e7e8] w-[50%] py-[0.4vw].5 px-3 border-t-0 border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>نقطة الدخول وعنوانه حسب البيانات في</p>
                  <p>Declared Point of Entry</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw] px-3">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">
                      {certificate?.distinguishing_marks}
                    </p>
                  ) : (
                    <textarea
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={distinguishingMarks}
                      onChange={(e) => setDistinguishingMarks(e.target.value)}
                    />
                  )}
                </td>
                <td className="border md:border-[#8e8f90] border-[#8e8f90]/40">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">
                      {certificate?.declared_point_of_entry}
                    </p>
                  ) : (
                    <textarea
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={declaredPointOfEntry}
                      onChange={(e) => setDeclaredPointOfEntry(e.target.value)}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* first thing first */}

        {/* Secound table */}
        <div className="w-[87%] mt-[2vw] mx-auto text-[1.3vw]">
          <table className="min-w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[20%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>غرض الاستعمال النهائي</p>
                  <p>End-use Purpose</p>
                </th>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[30%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>وسيلة النقل حسب البيانات</p>
                  <p>Declared Means of Conveyance</p>
                </th>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[15%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>رقم إذن الاستيراد</p>
                  <p>Import Permit No.</p>
                </th>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[15%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>الكمية الكلية</p>
                  <p>Total Quantity</p>
                </th>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[25%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>العدد الكلي للطرود</p>
                  <p>Total No. of Packages</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border md:border-[#8e8f90] border-b-0 border-[#8e8f90]/40 py-[0.4vw] px-3">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">{certificate?.end_use_purpose}</p>
                  ) : (
                    <textarea
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={endUsePurpose}
                      onChange={(e) => setEndUsePurpose(e.target.value)}
                    />
                  )}
                </td>
                <td className="">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">
                      {certificate?.declared_means_of_conveyance}
                    </p>
                  ) : (
                    <textarea
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={declaredMeansOfConveyance}
                      onChange={(e) =>
                        setDeclaredMeansOfConveyance(e.target.value)
                      }
                    />
                  )}
                </td>
                <td className="border border-b-0 md:border-[#8e8f90] border-[#8e8f90]/40">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">
                      {certificate?.import_permit_no}
                    </p>
                  ) : (
                    <textarea
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={importPermitNo}
                      onChange={(e) => setImportPermitNo(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-b-0  md:border-[#8e8f90] border-[#8e8f90]/40">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">{certificate?.total_quantity}</p>
                  ) : (
                    <textarea
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={totalQuantity}
                      onChange={(e) => setTotalQuantity(e.target.value)}
                    />
                  )}
                </td>
                <td className="border  border-b-0 md:border-[#8e8f90] border-[#8e8f90]/40">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">
                      {certificate?.total_nm_of_packages}
                    </p>
                  ) : (
                    <textarea
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={totalNmOfPackages}
                      onChange={(e) => setTotalNmOfPackages(e.target.value)}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/*  */}
        <div className="w-[87%] mx-auto text-[1.3vw]">
          <table className="min-w-full border-collapse text-center border-t-0 border md:border-[#8e8f90] border-[#8e8f90]/40">
            <thead>
              <tr>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[20%] border borderr md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>الاسم العلمي</p>
                  <p>Scientific Name</p>
                </th>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[15%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>الاسم العام</p>
                  <p>Common Name</p>
                </th>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[15%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>جهة المنشأ</p>
                  <p>Origin</p>
                </th>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[10%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>رقم الشهادة</p>
                  <p>PC No.</p>
                </th>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[10%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>الكمية</p>
                  <p>Quantity</p>
                </th>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[15%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>عدد الطرود</p>
                  <p>No. of Packages</p>
                </th>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[20%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p>الصنف</p>
                  <p>Commodity Class</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="">See Annex of Certificate.</td>
                <td className=""></td>
                <td className=""></td>
                <td className=""></td>
                <td className=""></td>
                <td className=""></td>
                <td dir="rtl" className="">
                  انظر ملحق الشهادة.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/*  */}

        {/* Secound table */}

        {/* text */}
        <div className="mt-1">
          <img src={"/text.png"} />
        </div>
        {/* text */}

        {/* secound */}
        <div className="w-[87%] text-[1.5vw] border md:border-[#8e8f90] border-[#8e8f90]/40 mt-[0.5vw] flex flex-col mx-auto">
          <div className="flex text-white justify-between bg-[#8e8f90] py-0.5 px-[2vw]">
            <p className="font-medium">II. Additional Declaration</p>
            <p>ثانيـــا: إقــــرار إضـــافى</p>
          </div>
          <div className="text-[1.5vw] py-[0.4vw] flex flex-col items-center justify-center">
            <p>NIL</p>
          </div>
        </div>
        {/* secound */}
      </CertificateLayout>

      {/* second page */}
      <CertificateLayout
        certificate={certificate}
        name={nameAndSignatureOfAuthorizedOfficer}
        setName={setNameAndSignatureOfAuthorizedOfficer}
        dateOfInspection={dateOfInspection}
        setDateOfInspection={setDateOfInspection}
        dateOfIssue={dateOfIssue}
        setDateOfIssue={setDateOfIssue}
        place={placeOfIssue}
        setPlace={setPlaceOfIssue}
        refrence={div2Ref ? div2Ref : div2Ref_}
      >
        <div
          style={{ fontWeight: "500" }}
          className="w-[87%] mt-[-1.1vh] bg-[#8e8f90] text-white py-0.5 px-3 flex mx-auto text-[1.6vw] justify-between"
        >
          <p>III. Disinfestation & / or Disinfection Treatment</p>
          <p className="font-medium arabic">
            ثالثا: المعاملة للتطهير من التلوث و / او الإصابة
          </p>
        </div>
        {/*  */}
        <div className="w-[87%] mx-auto text-[1.3vw]">
          <table className="min-w-full border-collapse text-center border md:border-[#8e8f90] border-[#8e8f90]/40">
            <thead>
              <tr>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[25%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p className="truncate">الكيماويات - المادة الفعالة</p>
                  <p className="truncate">Chemicals (Active Ingredients)</p>
                </th>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[20%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p className="truncate">مدة العرض ودرجة الحرارة</p>
                  <p className="truncate">Duration & Temperature</p>
                </th>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[15%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p className="truncate">تاريخ المعاملة</p>
                  <p className="truncate">Treatment Date</p>
                </th>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[20%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p className="truncate">المعاملة</p>
                  <p className="truncate">Treatmen</p>
                </th>
                <th className="bg-[#e6e7e8] py-[0.4vw] w-[20%] border md:border-[#8e8f90] border-[#8e8f90]/40">
                  <p className="truncate">نسبة التركيز</p>
                  <p className="truncate">Concentration Rate</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border md:border-[#8e8f90] border-[#8e8f90]/40">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">{certificate?.chemicals}</p>
                  ) : (
                    <textarea
                      className="w-[100%]"
                      type="text"
                      placeholder="Enter here..."
                      value={chemicals}
                      onChange={(e) => setChemicals(e.target.value)}
                    />
                  )}
                </td>
                <td className="border md:border-[#8e8f90] border-[#8e8f90]/40">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">
                      {certificate?.duration_and_temperature}
                    </p>
                  ) : (
                    <textarea
                      className="w-[100%]"
                      type="text"
                      placeholder="Enter here..."
                      value={durationAndTemperature}
                      onChange={(e) =>
                        setDurationAndTemperature(e.target.value)
                      }
                    />
                  )}
                </td>
                <td className="border md:border-[#8e8f90] border-[#8e8f90]/40">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">{certificate?.treatment_date}</p>
                  ) : (
                    <textarea
                      className="w-[100%]"
                      type="text"
                      placeholder="Enter here..."
                      value={treatmentDate}
                      onChange={(e) => setTreatmentDate(e.target.value)}
                    />
                  )}
                </td>
                <td className="border md:border-[#8e8f90] border-[#8e8f90]/40">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">{certificate?.treatment}</p>
                  ) : (
                    <textarea
                      className="w-[100%]"
                      type="text"
                      placeholder="Enter here..."
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                    />
                  )}
                </td>
                <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw] px-3">
                  {certificate?.id ? (
                    <p className="py-[0.4vw]">
                      {certificate?.concentration_rate}
                    </p>
                  ) : (
                    <textarea
                      className="w-[100%]"
                      type="text"
                      placeholder="Enter here..."
                      value={concentrationRate}
                      onChange={(e) => setConcentrationRate(e.target.value)}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/*  */}
        <img src="/a.png" />
        <div className="flex flex-col">
          <img className="w-[90%]" src="/blank.jpeg" />
        </div>
      </CertificateLayout>

      {/* third page */}
      <CertificateLayout
        certificate={certificate}
        name={nameAndSignatureOfAuthorizedOfficer}
        setName={setNameAndSignatureOfAuthorizedOfficer}
        dateOfInspection={dateOfInspection}
        setDateOfInspection={setDateOfInspection}
        dateOfIssue={dateOfIssue}
        setDateOfIssue={setDateOfIssue}
        place={placeOfIssue}
        setPlace={setPlaceOfIssue}
        refrence={div3Ref ? div3Ref : div3Ref_}
      >
        <div
          style={{ fontWeight: "400" }}
          className="w-[87%] mb-[1.2vw] mx-auto flex justify-between text-[1.3vw]"
        >
          <div className="flex flex-col text-start w-[30%]">
            <p>Annex of Phytosanitary Certificate No.:</p>
          </div>
          <div className="flex flex-col text-center w-[40%]">
            <p>{certificate?.number ? certificate?.number : number}</p>
          </div>
          <div dir="rtl" className="flex flex-col text-start w-[30%]">
            <p>ملحق الشهادة الصحية رقم:</p>
          </div>
        </div>

        {/* table */}
        <div className="w-[87%] mx-auto text-[1.3vw]">
          <table className="min-w-full border-collapse text-center border md:border-[#8e8f90] border-[#8e8f90]/40">
            <thead>
              <tr>
                <th className="bg-[#e6e7e8] w-[15%] border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                  <p>الاسم العلمي</p>
                  <p>Scientific Name</p>
                </th>
                <th className="bg-[#e6e7e8] w-[15%] border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                  <p>الاسم العام</p>
                  <p>Common Name</p>
                </th>
                <th className="bg-[#e6e7e8] w-[10%] border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                  <p>جهة المنشأ</p>
                  <p>Origin</p>
                </th>
                <th className="bg-[#e6e7e8] w-[10%] border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                  <p>رقم الشهادة</p>
                  <p>PC No.</p>
                </th>
                <th className="bg-[#e6e7e8] w-[10%] border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                  <p>الكمية</p>
                  <p>Quantity</p>
                </th>
                <th className="bg-[#e6e7e8] w-[15%] border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                  <p>عدد الطرود</p>
                  <p>No. of Packages</p>
                </th>
                <th className="bg-[#e6e7e8] w-[15%] border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                  <p>الصنف</p>
                  <p>Commodity Class</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {certificate?.id
                ? JSON.parse(certificate?.data)?.map((d, index) => (
                    <tr
                      onDoubleClick={() => {
                        setData((data) => {
                          data.splice(index, 1);
                          return [...data];
                        });
                      }}
                      className="w-fit"
                      key={index}
                    >
                      <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                        {d?.scientificName}
                      </td>
                      <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                        {d?.commonName}
                      </td>
                      <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                        {d?.origin}
                      </td>
                      <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                        {d?.pcNo}
                      </td>
                      <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                        {d?.quantity}
                      </td>
                      <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                        {d?.noOfPackages}
                      </td>
                      <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                        {d?.commodityClass}
                      </td>
                    </tr>
                  ))
                : data?.map((d, index) => (
                    <tr
                      onDoubleClick={() => {
                        setData((data) => {
                          data.splice(index, 1);
                          return [...data];
                        });
                      }}
                      className="w-fit"
                      key={index}
                    >
                      <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                        <textarea
                          type="text"
                          placeholder="Enter here..."
                          className="w-[100%]"
                          value={d?.scientificName}
                          onChange={(e) => {
                            setData((data) => {
                              data[index].scientificName = e.target.value;
                              return [...data];
                            });
                          }}
                        />
                      </td>
                      <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                        <textarea
                          type="text"
                          placeholder="Enter here..."
                          className="w-[100%]"
                          value={d?.commonName}
                          onChange={(e) => {
                            setData((data) => {
                              data[index].commonName = e.target.value;
                              return [...data];
                            });
                          }}
                        />
                      </td>
                      <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                        <textarea
                          type="text"
                          placeholder="Enter here..."
                          className="w-[100%]"
                          value={d?.origin}
                          onChange={(e) => {
                            setData((data) => {
                              data[index].origin = e.target.value;
                              return [...data];
                            });
                          }}
                        />
                      </td>
                      <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                        <textarea
                          type="text"
                          placeholder="Enter here..."
                          className="w-[100%]"
                          value={d?.pcNo}
                          onChange={(e) => {
                            setData((data) => {
                              data[index].pcNo = e.target.value;
                              return [...data];
                            });
                          }}
                        />
                      </td>
                      <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                        <textarea
                          type="text"
                          placeholder="Enter here..."
                          className="w-[100%]"
                          value={d?.quantity}
                          onChange={(e) => {
                            setData((data) => {
                              data[index].quantity = e.target.value;
                              return [...data];
                            });
                          }}
                        />
                      </td>
                      <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                        <textarea
                          type="text"
                          placeholder="Enter here..."
                          className="w-[100%]"
                          value={d?.noOfPackages}
                          onChange={(e) => {
                            setData((data) => {
                              data[index].noOfPackages = e.target.value;
                              return [...data];
                            });
                          }}
                        />
                      </td>
                      <td className="border md:border-[#8e8f90] border-[#8e8f90]/40 py-[0.4vw]">
                        <textarea
                          type="text"
                          placeholder="Enter here..."
                          className="w-[100%]"
                          value={d?.commodityClass}
                          onChange={(e) => {
                            setData((data) => {
                              data[index].commodityClass = e.target.value;
                              return [...data];
                            });
                          }}
                        />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        {!view && (
          <div className="w-[87%] mt-[0.5vw] flex gap-2 justify-between mx-auto">
            <span
              onClick={() => {
                setData((data) => [...data, {}]);
              }}
              className="text-[1.6vw] cursor-pointer text-green-600"
            >
              <FaPlus />
            </span>
          </div>
        )}

        {/*  */}
      </CertificateLayout>

      {!view && (
        <>
          <br />
          <br />
          <br />
          <button
            onClick={createCertificate}
            className="w-[100%] bg-[#4fc045] text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </>
      )}
      {view && user?.id ? (
        <button
          className="w-[100%] bg-[#3375ac] text-white font-bold py-2 px-4 rounded"
          onClick={downloadCertificate}
        >
          Download
        </button>
      ) : null}
    </div>
  );
};

export default AdminCRUCertificate;
