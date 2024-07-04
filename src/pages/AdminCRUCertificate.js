import React, { useEffect, useRef } from "react";
import CertificateLayout from "../components/CertificateLayout";
import { BiPlus, BiTrash } from "react-icons/bi";
import LoadingScreen from "../components/LoadingScreen";
import { server } from "../utlits/Variables";
import axios from "axios";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Document, PDFDownloadLink, Page, pdf } from "@react-pdf/renderer";

const AdminCRUCertificate = ({ view, download }) => {
  const [number, setNumber] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [frm, setFrm] = React.useState("");
  const [to, setTo] = React.useState("");
  const [nameAddressOfExporter, setNameAddressOfExporter] = React.useState("");
  const [nameAddressOfImporter, setNameAddressOfImporter] = React.useState("");
  const [distinguishingMarks, setDistinguishingMarks] = React.useState("");
  const [declaredPointOfEntry, setDeclaredPointOfEntry] = React.useState("");
  const [totalNmOfPackages, setTotalNmOfPackages] = React.useState("");
  const [totalQuantity, setTotalQuantity] = React.useState("");
  const [importPermitNo, setImportPermitNo] = React.useState("");
  const [declaredMeansOfConveyance, setDeclaredMeansOfConveyance] =
    React.useState("");
  const [endUsePurpose, setEndUsePurpose] = React.useState("");

  const [additionalDeclaration, setAdditionalDeclaration] = React.useState("");

  const [
    nameAndSignatureOfAuthorizedOfficer,
    setNameAndSignatureOfAuthorizedOfficer,
  ] = React.useState("");
  const [dateOfInspection, setDateOfInspection] = React.useState("");
  const [dateOfIssue, setDateOfIssue] = React.useState("");
  const [placeOfIssue, setPlaceOfIssue] = React.useState("");
  const [concentrationRate, setConcentrationRate] = React.useState("");
  const [treatment, setTreatment] = React.useState("");
  const [treatmentDate, setTreatmentDate] = React.useState("");
  const [durationAndTemperature, setDurationAndTemperature] =
    React.useState("");
  const [chemicals, setChemicals] = React.useState("");
  const [
    nameAndSignatureOfAuthorizedOfficer2,
    setNameAndSignatureOfAuthorizedOfficer2,
  ] = React.useState("");
  const [dateOfInspection2, setDateOfInspection2] = React.useState("");
  const [dateOfIssue2, setDateOfIssue2] = React.useState("");
  const [placeOfIssue2, setPlaceOfIssue2] = React.useState("");

  const [lastTableData, setLastTableData] = React.useState([
    {
      commodityClass: "",
      noOfPackages: "",
      quantity: "",
      pcNo: "",
      origin: "",
      commonName: "",
      sceintificName: "",
    },
  ]);

  const [
    nameAndSignatureOfAuthorizedOfficer3,
    setNameAndSignatureOfAuthorizedOfficer3,
  ] = React.useState("");
  const [dateOfInspection3, setDateOfInspection3] = React.useState("");
  const [dateOfIssue3, setDateOfIssue3] = React.useState("");
  const [placeOfIssue3, setPlaceOfIssue3] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const createCertificate = async () => {
    setLoading(true);
    await axios
      .post(
        `${server}api/certificates/`,
        {
          number: number,
          verification_code: verificationCode,

          frm: frm,
          to: to,

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

          name_and_signature_of_authorized_officer_2:
            nameAndSignatureOfAuthorizedOfficer2,
          date_of_inspection_2: dateOfInspection2,
          date_of_issue_2: dateOfIssue2,
          place_of_issue_2: placeOfIssue2,

          data: JSON.stringify(lastTableData),

          name_and_signature_of_authorized_officer_3:
            nameAndSignatureOfAuthorizedOfficer3,
          date_of_inspection_3: dateOfInspection3,
          date_of_issue_3: dateOfIssue3,
          place_of_issue_3: placeOfIssue3,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.id) {
          navigate(`/dashboard/`);
        } else {
          alert("Something went wrong!");
        }
      })
      .finally(() => setLoading(false));
  };

  // View Certificate
  const [certificate, setCertificate] = React.useState(null);

  const params = useParams();
  const id = params.ID;

  const getCertificate = async () => {
    setLoading(true);
    const response = await fetch(`${server}api/certificates/${id}/`, {
      method: "GET",
    });
    const data = await response.json();
    setCertificate(data);
    setLoading(false);
  };

  // update certificate
  const searchParams = new URLSearchParams(useLocation().search);
  const update = searchParams.get("update");

  useEffect(() => {
    if (view || download || update) getCertificate();
  }, [view, download, update]);

  useEffect(() => {
    if (certificate && update) {
      setNumber(certificate.number);
      setVerificationCode(certificate.verification_code);
      setFrm(certificate.frm);
      setTo(certificate.to);
      setNameAddressOfExporter(certificate.name_address_of_exporter);
      setNameAddressOfImporter(certificate.name_address_of_importer);
      setDistinguishingMarks(certificate.distinguishing_marks);
      setDeclaredPointOfEntry(certificate.declared_point_of_entry);
      setTotalNmOfPackages(certificate.total_nm_of_packages);
      setTotalQuantity(certificate.total_quantity);
      setImportPermitNo(certificate.import_permit_no);
      setDeclaredMeansOfConveyance(certificate.declared_means_of_conveyance);
      setEndUsePurpose(certificate.end_use_purpose);
      setAdditionalDeclaration(certificate.additional_declaration);
      setNameAndSignatureOfAuthorizedOfficer(
        certificate.name_and_signature_of_authorized_officer
      );
      setDateOfInspection(certificate.date_of_inspection);
      setDateOfIssue(certificate.date_of_issue);
      setPlaceOfIssue(certificate.place_of_issue);
      setConcentrationRate(certificate.concentration_rate);
      setTreatment(certificate.treatment);
      setTreatmentDate(certificate.treatment_date);
      setDurationAndTemperature(certificate.duration_and_temperature);
      setChemicals(certificate.chemicals);
      setNameAndSignatureOfAuthorizedOfficer2(
        certificate.name_and_signature_of_authorized_officer_2
      );
      setDateOfInspection2(certificate.date_of_inspection_2);
      setDateOfIssue2(certificate.date_of_issue_2);
      setPlaceOfIssue2(certificate.place_of_issue_2);
      setLastTableData(JSON.parse(certificate.data));
      setNameAndSignatureOfAuthorizedOfficer3(
        certificate.name_and_signature_of_authorized_officer_3
      );
      setDateOfInspection3(certificate.date_of_inspection_3);
      setDateOfIssue3(certificate.date_of_issue_3);
      setPlaceOfIssue3(certificate.place_of_issue_3);
    }
  }, [update, certificate]);

  const updateCertificate = async () => {
    setLoading(true);
    await axios
      .put(
        `${server}api/certificates/${id}/`,
        {
          number: number,
          verification_code: verificationCode,

          frm: frm,
          to: to,

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

          name_and_signature_of_authorized_officer_2:
            nameAndSignatureOfAuthorizedOfficer2,
          date_of_inspection_2: dateOfInspection2,
          date_of_issue_2: dateOfIssue2,
          place_of_issue_2: placeOfIssue2,

          data: JSON.stringify(lastTableData),

          name_and_signature_of_authorized_officer_3:
            nameAndSignatureOfAuthorizedOfficer3,
          date_of_inspection_3: dateOfInspection3,
          date_of_issue_3: dateOfIssue3,
          place_of_issue_3: placeOfIssue3,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.id) {
          navigate(`/dashboard/`);
        } else {
          alert("Something went wrong!");
        }
      })
      .finally(() => setLoading(false));
  };

  // download

  const navigate = useNavigate();

  const pageRef1 = useRef();
  const pageRef2 = useRef();
  const pageRef3 = useRef();

  const downloadPDF = async () => {
    await setLoading(true);
    const input1 = pageRef1.current;
    const input2 = pageRef2.current;
    const input3 = pageRef3.current;
    try {
      const canvas1 = await html2canvas(input1);
      const canvas2 = await html2canvas(input2);
      const canvas3 = await html2canvas(input3);
      const imgData1 = canvas1.toDataURL("image/png");
      const imgData2 = canvas2.toDataURL("image/png");
      const imgData3 = canvas3.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px", // Use pixels as the unit to maintain the actual dimensions
        format: [canvas1.width, canvas1.height], // Use the canvas dimensions
        compress: true,
      });
      pdf.addImage(imgData1, "PNG", 0, 0, canvas1.width, canvas1.height);
      pdf.addPage();
      pdf.addImage(imgData2, "PNG", 0, 0, canvas2.width, canvas2.height);
      pdf.addPage();
      pdf.addImage(imgData3, "PNG", 0, 0, canvas3.width, canvas3.height);
      pdf.save("download.pdf");
      navigate("/view-certificate/" + id + "/download/");
    } catch (err) {
      console.error("Error generating PDF", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (download && certificate?.id) {
      downloadPDF();
    }
  }, [download, certificate]);

  return (
    <div className="flex flex-col justify-center bg-gray-100 p-3 items-center gap-12">
      {loading ? <LoadingScreen /> : null}

      {!view && !download && !update ? (
        <div className="flex ms-0 w-full justify-start flex-col">
          <button
            onClick={createCertificate}
            className="bg-blue-500 hover:bg-blue-700 w-fit ms-0 text-white font-bold py-2 px-4 rounded"
          >
            Create Now
          </button>
        </div>
      ) : null}

      {update && (
        <div className="flex ms-0 w-full justify-start flex-col">
          <button
            onClick={updateCertificate}
            className="bg-green-500 hover:bg-green-700 w-fit ms-0 text-white font-bold py-2 px-4 rounded"
          >
            Update Now
          </button>
        </div>
      )}

      <CertificateLayout
        reference={pageRef1}
        table={
          <table className="w-3/4 border border-gray-200 text-[1.2vw] text-center mt-9">
            <thead className="bg-gray-200">
              <tr className="bg-gray-100">
                <th className="border border-gray-200 text-center">
                  <p className="arabic">مكان الإصدار</p>
                  <p className="font-normal">Place of Issue</p>
                </th>
                <th className="border border-gray-200">
                  <p className="arabic">تاريخ الإصدار</p>
                  <p className="font-normal">Date of Issue</p>
                </th>
                <th className="border border-gray-200">
                  <p className="arabic">تاريخ الفحص</p>
                  <p className="font-normal"> Date of Inspection</p>
                </th>
                <th className="border border-gray-200">
                  <p className="arabic">اسم وتوقيع الموظف المختص</p>
                  <p className="font-normal">
                    {" "}
                    Name & Signature of Authorized Officer
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200">
                  {view || download ? (
                    <p>{certificate?.place_of_issue}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Place of Issue..."
                      value={placeOfIssue}
                      onChange={(e) => setPlaceOfIssue(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-gray-200">
                  {view || download ? (
                    <p>{certificate?.date_of_issue}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Date Of Issue..."
                      value={dateOfIssue}
                      onChange={(e) => setDateOfIssue(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-gray-200">
                  {view || download ? (
                    <p>{certificate?.date_of_inspection}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Date Of Inspection..."
                      value={dateOfInspection}
                      onChange={(e) => setDateOfInspection(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-gray-200">
                  {view || download ? (
                    <p>
                      {certificate?.name_and_signature_of_authorized_officer}
                    </p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Name & Signature of Authorized Officer..."
                      value={nameAndSignatureOfAuthorizedOfficer}
                      onChange={(e) =>
                        setNameAndSignatureOfAuthorizedOfficer(e.target.value)
                      }
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        }
      >
        <div className="flex justify-between text-[1.2vw] mb-2 mt-1 md:text-[1.4vw]">
          <div className="flex flex-col text-start">
            <p>No.</p>
            <p>Verification Code</p>
          </div>
          <div className="flex flex-col text-center">
            <p>
              {view || download ? (
                <p>{certificate?.number}</p>
              ) : (
                <input
                  type="text"
                  className="w-full border-gray-200"
                  placeholder="Place of Issue..."
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              )}
            </p>
            <p>
              {view || download ? (
                <p>{certificate?.verification_code}</p>
              ) : (
                <input
                  type="text"
                  className="w-full border-gray-200"
                  placeholder="Verification Code..."
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              )}
            </p>
          </div>
          <div className="flex flex-col text-end">
            <p className="arabic">الرقم</p>
            <p className="arabic">رمز التحقق</p>
          </div>
        </div>
        {/* from and to */}
        <table className="min-w-full border border-gray-200 md:text-[1.2vw] text-[1.5vw] text-center mt-5">
          <thead className="bg-gray-200">
            <tr className="bg-gray-100">
              <th className="border w-1/2 border-gray-200">
                <p className="arabic">من / منظمة وقاية النباتات في</p>
                <p className="font-normal">
                  {" "}
                  From / Plant Protection Organization(s) of
                </p>
              </th>
              <th className="border w-1/2 border-gray-200">
                <p className="arabic">إلى / منظمة وقاية النباتات في</p>
                <p className="font-normal">
                  To / Plant Protection Organization(s) of
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border w-1/2 border-gray-200">
                {view || download ? (
                  <p>{certificate?.to}</p>
                ) : (
                  <input
                    type="text"
                    className="w-full border-gray-200"
                    placeholder="Place of Issue..."
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                )}
              </td>
              <td className="border w-1/2 border-gray-200">
                {view || download ? (
                  <p>{certificate?.frm}</p>
                ) : (
                  <input
                    type="text"
                    className="w-full border-gray-200"
                    placeholder="Place of Issue..."
                    value={frm}
                    onChange={(e) => setFrm(e.target.value)}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* first thing first */}
        <div className="flex justify-between gap-2 p-1 text-[1.5vw] mt-5 bg-neutral-500 items-center px-3 text-white">
          <p className="font-medium">1. Description of Consignment</p>
          <p className="arabic font-medium">أولا: وصف الارسالية</p>
        </div>
        <table className="min-w-full border border-gray-200 md:text-[1.2vw] text-[1.5vw] text-center">
          <thead className="bg-gray-200">
            <tr className="bg-gray-100">
              <th className="border w-1/2 border-gray-200">
                <p className="arabic">اسم جهة التصدير وعنوانها</p>
                <p className="font-normal"> Name & Address of Exporter</p>
              </th>
              <th className="border w-1/2 border-gray-200">
                <p className="arabic">اسم المستورد وعنوانة حسب البيانات</p>
                <p className="font-normal">
                  {" "}
                  Declared Name & Address of Importe
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border w-1/2 border-gray-200">
                {view || download ? (
                  <p>{certificate?.name_address_of_exporter}</p>
                ) : (
                  <input
                    type="text"
                    className="w-full border-gray-200"
                    placeholder="Here..."
                    value={nameAddressOfExporter}
                    onChange={(e) => setNameAddressOfExporter(e.target.value)}
                  />
                )}
              </td>
              <td className="border w-1/2 border-gray-200">
                {view || download ? (
                  <p>{certificate?.name_address_of_importer}</p>
                ) : (
                  <input
                    type="text"
                    className="w-full border-gray-200"
                    placeholder="Here..."
                    value={nameAddressOfImporter}
                    onChange={(e) => setNameAddressOfImporter(e.target.value)}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="min-w-full border border-gray-200 md:text-[1.2vw] text-[1.5vw] text-center">
          <thead className="bg-gray-200">
            <tr className="bg-gray-100">
              <th className="border w-1/2 border-gray-200">
                <p className="arabic">العلامات المميزة</p>
                <p className="font-normal">Distinguishing Marks</p>
              </th>
              <th className="border w-1/2 border-gray-200">
                <p className="arabic">نقطة الدخول حسب البيانات</p>
                <p className="font-normal">Declared Point of Entry</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border w-1/2 border-gray-200">
                {view || download ? (
                  <p>{certificate?.distinguishing_marks}</p>
                ) : (
                  <input
                    type="text"
                    className="w-full border-gray-200"
                    placeholder="Here..."
                    value={distinguishingMarks}
                    onChange={(e) => setDistinguishingMarks(e.target.value)}
                  />
                )}
              </td>
              <td className="border w-1/2 border-gray-200">
                {view || download ? (
                  <p>{certificate?.declared_point_of_entry}</p>
                ) : (
                  <input
                    type="text"
                    className="w-full border-gray-200"
                    placeholder="Here..."
                    value={declaredPointOfEntry}
                    onChange={(e) => setDeclaredPointOfEntry(e.target.value)}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {/* rest of the things */}

        {/* top */}
        <table className="min-w-full border border-gray-200 md:text-[1.2vw] text-[1.5vw] text-center mt-12">
          <thead className="bg-gray-200">
            <tr className="bg-gray-100">
              <th className="border border-gray-200">
                <p className="arabic">غرض الاستعمال النهائي</p>
                <p className="font-normal"> End-use Purpose</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">وسيلة النقل حسب البيانات</p>
                <p className="font-normal">Declared Means of Conveyance</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">رقم إذن الإستيراد</p>
                <p className="font-normal"> Import Permit No.</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">الكمية الكلية</p>
                <p className="font-normal">Total Quantity</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">عدد الطرود</p>
                <p className="font-normal">No. of Packages</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200">
                {view || download ? (
                  <p>{certificate?.end_use_purpose}</p>
                ) : (
                  <input
                    type="text"
                    className="w-full p-[1.2px]"
                    placeholder="Here..."
                    value={endUsePurpose}
                    onChange={(e) => setEndUsePurpose(e.target.value)}
                  />
                )}
              </td>
              <td className="border border-gray-200">
                {view || download ? (
                  <p>{certificate?.declared_means_of_conveyance}</p>
                ) : (
                  <input
                    type="text"
                    className="w-full p-[1.2px]"
                    placeholder="Here..."
                    value={declaredMeansOfConveyance}
                    onChange={(e) =>
                      setDeclaredMeansOfConveyance(e.target.value)
                    }
                  />
                )}
              </td>
              <td className="border border-gray-200">
                {view || download ? (
                  <p>{certificate?.import_permit_no}</p>
                ) : (
                  <input
                    type="text"
                    className="w-full p-[1.2px]"
                    placeholder="Here..."
                    value={importPermitNo}
                    onChange={(e) => setImportPermitNo(e.target.value)}
                  />
                )}
              </td>
              <td className="border border-gray-200">
                {view || download ? (
                  <p>{certificate?.total_quantity}</p>
                ) : (
                  <input
                    type="text"
                    className="w-full p-[1.2px]"
                    placeholder="Here..."
                    value={totalQuantity}
                    onChange={(e) => setTotalQuantity(e.target.value)}
                  />
                )}
              </td>
              <td className="border border-gray-200">
                {view || download ? (
                  <p>{certificate?.total_nm_of_packages}</p>
                ) : (
                  <input
                    type="text"
                    className="w-full p-[1.2px]"
                    placeholder="Here..."
                    value={totalNmOfPackages}
                    onChange={(e) => setTotalNmOfPackages(e.target.value)}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* top */}

        {/* bottom */}
        <table className="min-w-full border border-gray-200 text-[1vw] text-center">
          <thead className="bg-gray-200">
            <tr className="bg-gray-100">
              <th className="border border-gray-200 text-center">
                <p className="arabic">الاسم العلمي</p>
                <p className="font-normal">Scientific Name</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">الاسم العام</p>
                <p className="font-normal">Common Name</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">جهة المنشأ</p>
                <p className="font-normal">Origin</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">رقم الشهادة</p>
                <p className="font-normal">PC No.</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">الكمية</p>
                <p className="font-normal">Quantity</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">عدد الطرود</p>
                <p className="font-normal">No. of Packages</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">الصنف</p>
                <p className="font-normal">Commodity Class</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>See Annex of certificate?.</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="arabic">انظر ملحق الشهادة</td>
            </tr>
          </tbody>
        </table>
        {/* bottom */}

        {/* notes */}
        <div className="flex flex-col gap-1 mt-8 text-[1vw]">
          <p className="text-end arabic">
            تشهد بأن النباتات أو المنتجات النباتية أو المواد الأخري الخاضعة
            للوائح الصحة النباتية الموضحة بياناتها اعلام قد وردت إلى دولة
            الإمارات العربية المتحدة الطرف المتعاقد القائم بإعادة التصدير) وفقا
            للبيانات اعلام من الطرف المتعاقد ببلد المنشأ) مشمولة بشهادة بشهادات
            الصحة النباتية وفقا للبيانات اعلام المرفق نسخة أصلية ) صورة طبق
            الأصل موثقة ( ) منها مع هذه الشهادة و آنها معاد ( ) اعينت تعبنتها )
            ( في عبواتها الأصلية ) ( في عبوات جديدة . ( ) و إنه استنادا علي
            شهادة الصحة النباتية الأصلية ) ( والفحص الإضافي ( ) وجدت مطابقة
            المتطلبات الصحة النباتية المعمول بها لدي الطرف المتعاقد المستورد،
            وأنه أثناء فترة تخزينها في دولة الإمارات العربية المتحدة الطف
            المتعاقد القائم بإعادة التصدير لم تتعرض لمخاطر التلوث أو الإصابة
          </p>
          <p>
            We certify that the plants, plant products or other regulated
            articles described above were imported in UAE (Country of re-export)
            from see list above (Country of Origin) covered by Phytosani ) in
            original ( ) new () container, that based on the tary Certificate
            No. see list above, Original ( ) certified true copy () of which is
            attached to the Certificate; that they are packed ( 1. they are
            considered to conform with the current phytosanitary requirements of
            the importing country, and that during 1 & additional inspection (
            original Phytosanitary Certificate ( storage in UAE (Country of
            re-export) the consignment has not been subjected to the risk of
            infestation of infection.
          </p>
        </div>
        {/* secound */}
        <div className="flex mt-2 flex-col text-[1.5vw] border-2 border-gray-200">
          <div className="p-2 flex justify-between bg-zinc-500 text-white">
            <p>||. Additional Declaration</p>
            <p className="arabic">ثانيا: اقرار اضافى</p>
          </div>
          <div className="bg-white p-1 text-center">
            {view || download ? (
              <p>{certificate?.additional_declaration}</p>
            ) : (
              <input
                type="text"
                className="w-full"
                placeholder="Additional Declaration..."
                value={additionalDeclaration}
                onChange={(e) => setAdditionalDeclaration(e.target.value)}
              />
            )}
          </div>
        </div>
      </CertificateLayout>

      <br />
      <br />

      <CertificateLayout
        reference={pageRef2}
        table={
          <table className="w-3/4 border border-gray-200 text-[1.2vw] text-center mt-9">
            <thead className="bg-gray-200">
              <tr className="bg-gray-100">
                <th className="border border-gray-200 text-center">
                  <p className="arabic">مكان الإصدار</p>
                  <p className="font-normal">Place of Issue</p>
                </th>
                <th className="border border-gray-200">
                  <p className="arabic">تاريخ الإصدار</p>
                  <p className="font-normal">Date of Issue</p>
                </th>
                <th className="border border-gray-200">
                  <p className="arabic">تاريخ الفحص</p>
                  <p className="font-normal"> Date of Inspection</p>
                </th>
                <th className="border border-gray-200">
                  <p className="arabic">اسم وتوقيع الموظف المختص</p>
                  <p className="font-normal">
                    {" "}
                    Name & Signature of Authorized Officer
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200">
                  {view || download ? (
                    <p>{certificate?.place_of_issue_2}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Place of Issue..."
                      value={placeOfIssue2}
                      onChange={(e) => setPlaceOfIssue2(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-gray-200">
                  {view || download ? (
                    <p>{certificate?.date_of_issue_2}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Date Of Issue..."
                      value={dateOfIssue2}
                      onChange={(e) => setDateOfIssue2(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-gray-200">
                  {view || download ? (
                    <p>{certificate?.date_of_inspection_2}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Date Of Inspection..."
                      value={dateOfInspection2}
                      onChange={(e) => setDateOfInspection2(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-gray-200">
                  {view || download ? (
                    <p>
                      {certificate?.name_and_signature_of_authorized_officer_2}
                    </p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Name & Signature of Authorized Officer..."
                      value={nameAndSignatureOfAuthorizedOfficer2}
                      onChange={(e) =>
                        setNameAndSignatureOfAuthorizedOfficer2(e.target.value)
                      }
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        }
      >
        <div className="overflow-x-auto text-[1.3vw] mt-1">
          <div className="flex p-2 w-full justify-between bg-zinc-500 text-white">
            <p>III. Disinfestation & / or Disinfection Treatment</p>
            <p className="arabic text-[1.5vw]">
              ثالثا: المعاملة للتطهير من التلوث أو الإبادة
            </p>
          </div>
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-200">
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-200">
                  <p className="arabic">الكيميائيات - المادة الفعالة</p>
                  <p className="font-normal">Chemicals (Active Ingredients)</p>
                </th>
                <th className="px-4 py-2 border border-gray-200">
                  <p className="arabic">مدة التعرض و درجة الحرارة</p>
                  <p className="font-normal">Duration & Temperature</p>
                </th>
                <th className="px-4 py-2 border border-gray-200">
                  <p className="arabic">تاريخ المعاملة</p>
                  <p className="font-normal">Treatment Date </p>
                </th>
                <th className="px-4 py-2 border border-gray-200">
                  <p className="arabic">المعاملة</p>
                  <p className="font-normal">Treatment </p>
                </th>
                <th className="px-4 py-2 border border-gray-200">
                  <p className="arabic">نسبة التركيز</p>
                  <p className="font-normal">Concentration Rate </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-200">
                  {view || download ? (
                    <p>{certificate?.chemicals}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Chemicals..."
                      value={chemicals}
                      onChange={(e) => setChemicals(e.target.value)}
                    />
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {view || download ? (
                    <p>{certificate?.duration_and_temperature}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Duration & Temperature..."
                      value={durationAndTemperature}
                      onChange={(e) =>
                        setDurationAndTemperature(e.target.value)
                      }
                    />
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {view || download ? (
                    <p>{certificate?.treatment_date}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Treatment Date..."
                      value={treatmentDate}
                      onChange={(e) => setTreatmentDate(e.target.value)}
                    />
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {view || download ? (
                    <p>{certificate?.treatment}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Treatment..."
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                    />
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {view || download ? (
                    <p>{certificate?.concentration_rate}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Concentration Rate..."
                      value={concentrationRate}
                      onChange={(e) => setConcentrationRate(e.target.value)}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between">
            <p
              className="px-4 py-2 border w-full max-w-[24vw] bg-gray-100 text-center border-gray-200"
              colSpan="6"
            >
              Additional Information
            </p>
            <div className="w-full border"></div>
            <p
              className="px-4 arabic w-full max-w-[24vw] bg-gray-100 text-center py-2 border arabic border-gray-200"
              colSpan="6"
            >
              معلومات إضافية
            </p>
          </div>
        </div>
        {/*  */}
        <div className="lg:h-[85vh] md:h-[75vh] sm:h-[50vh] h-[40vh]"></div>
      </CertificateLayout>

      <br />
      <br />

      <CertificateLayout
        reference={pageRef3}
        table={
          <table className="w-3/4 border border-gray-200 text-[1.2vw] text-center mt-9">
            <thead className="bg-gray-200">
              <tr className="bg-gray-100">
                <th className="border border-gray-200 text-center">
                  <p className="arabic">مكان الإصدار</p>
                  <p className="font-normal">Place of Issue</p>
                </th>
                <th className="border border-gray-200">
                  <p className="arabic">تاريخ الإصدار</p>
                  <p className="font-normal">Date of Issue</p>
                </th>
                <th className="border border-gray-200">
                  <p className="arabic">تاريخ الفحص</p>
                  <p className="font-normal"> Date of Inspection</p>
                </th>
                <th className="border border-gray-200">
                  <p className="arabic">اسم وتوقيع الموظف المختص</p>
                  <p className="font-normal">
                    {" "}
                    Name & Signature of Authorized Officer
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200">
                  {view || download ? (
                    <p>{certificate?.place_of_issue_3}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Place of Issue..."
                      value={placeOfIssue3}
                      onChange={(e) => setPlaceOfIssue3(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-gray-200">
                  {view || download ? (
                    <p>{certificate?.date_of_issue_3}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Date Of Issue..."
                      value={dateOfIssue3}
                      onChange={(e) => setDateOfIssue3(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-gray-200">
                  {view || download ? (
                    <p>{certificate?.date_of_inspection_3}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Date Of Inspection..."
                      value={dateOfInspection3}
                      onChange={(e) => setDateOfInspection3(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-gray-200">
                  {view || download ? (
                    <p>
                      {certificate?.name_and_signature_of_authorized_officer_3}
                    </p>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-[1.2px] border-gray-200"
                      placeholder="Name & Signature of Authorized Officer..."
                      value={nameAndSignatureOfAuthorizedOfficer3}
                      onChange={(e) =>
                        setNameAndSignatureOfAuthorizedOfficer3(e.target.value)
                      }
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        }
      >
        {/* cer no. */}
        <div className="mt-4 flex justify-between text-center text-[1.3vw]">
          <p className="w-1/3 font-medium text-start">
            Annexof Phytosanitary Certificate No:
          </p>
          <p className="w-1/3 font-medium">{number}</p>
          <p className="arabic w-1/3 text-end">:ملحق الشهادة الصحية رقم</p>
        </div>
        {/* cer no. */}

        {/* table */}
        <table className="min-w-full border border-gray-200 text-[1vw] text-center mt-9">
          <thead className="bg-gray-200">
            <tr className="bg-gray-100">
              {!view && !download ? (
                <th className="bg-white border-l-0 border-r-0"></th>
              ) : null}
              <th className="border border-gray-200 text-center">
                <p className="arabic">الاسم العلمي</p>
                <p className="font-normal">Scientific Name</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">الاسم العام</p>
                <p className="font-normal">Common Name</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">جهة المنشأ</p>
                <p className="font-normal">Origin</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">رقم الشهادة</p>
                <p className="font-normal">PC No.</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">الكمية</p>
                <p className="font-normal">Quantity</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">عدد الطرود</p>
                <p className="font-normal">No. of Packages</p>
              </th>
              <th className="border border-gray-200">
                <p className="arabic">الصنف</p>
                <p className="font-normal">Commodity Class</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {(view || download) && certificate?.id
              ? JSON?.parse(certificate?.data)?.map((data, index) => (
                  <tr>
                    <td className="border border-gray-200">
                      <p className="p-2">{data.sceintificName}</p>
                    </td>
                    <td className="border border-gray-200">
                      <p className="p-2">{data.commonName}</p>
                    </td>
                    <td className="border border-gray-200">
                      <p className="p-2">{data.origin}</p>
                    </td>
                    <td className="border border-gray-200">
                      <p className="p-2">{data.pcNo}</p>
                    </td>
                    <td className="border border-gray-200">
                      <p className="p-2">{data.quantity}</p>
                    </td>
                    <td className="border border-gray-200">
                      <p className="p-2">{data.noOfPackages}</p>
                    </td>
                    <td className="border border-gray-200">
                      <p className="p-2">{data.commodityClass}</p>
                    </td>
                  </tr>
                ))
              : lastTableData?.map((data, index) => (
                  <tr>
                    <td
                      onClick={() => {
                        setLastTableData(
                          lastTableData.filter((_, i) => i !== index)
                        );
                      }}
                      className="text-red-400 cursor-pointer hover:text-red-300 transition-all"
                    >
                      <BiTrash />
                    </td>
                    <td className="border border-gray-200">
                      <input
                        type="text"
                        className="w-full p-[1.2px] border-gray-200"
                        placeholder="Scientific Name..."
                        value={data.sceintificName}
                        onChange={(e) => {
                          const newTableData = [...lastTableData];
                          newTableData[index].sceintificName = e.target.value;
                          setLastTableData(newTableData);
                        }}
                      />
                    </td>
                    <td className="border border-gray-200">
                      <input
                        type="text"
                        className="w-full p-[1.2px] border-gray-200"
                        placeholder="Common Name..."
                        value={data.commonName}
                        onChange={(e) => {
                          const newTableData = [...lastTableData];
                          newTableData[index].commonName = e.target.value;
                          setLastTableData(newTableData);
                        }}
                      />
                    </td>
                    <td className="border border-gray-200">
                      <input
                        type="text"
                        className="w-full p-[1.2px] border-gray-200"
                        placeholder="origin..."
                        value={data.origin}
                        onChange={(e) => {
                          const newTableData = [...lastTableData];
                          newTableData[index].origin = e.target.value;
                          setLastTableData(newTableData);
                        }}
                      />
                    </td>
                    <td className="border border-gray-200">
                      <input
                        type="text"
                        className="w-full p-[1.2px] border-gray-200"
                        placeholder="PC No..."
                        value={data.pcNo}
                        onChange={(e) => {
                          const newTableData = [...lastTableData];
                          newTableData[index].pcNo = e.target.value;
                          setLastTableData(newTableData);
                        }}
                      />
                    </td>
                    <td className="border border-gray-200">
                      <input
                        type="text"
                        className="w-full p-[1.2px] border-gray-200"
                        placeholder="Quantity..."
                        value={data.quantity}
                        onChange={(e) => {
                          const newTableData = [...lastTableData];
                          newTableData[index].quantity = e.target.value;
                          setLastTableData(newTableData);
                        }}
                      />
                    </td>
                    <td className="border border-gray-200">
                      <input
                        type="text"
                        className="w-full p-[1.2px] border-gray-200"
                        placeholder="No. of Packages..."
                        value={data.noOfPackages}
                        onChange={(e) => {
                          const newTableData = [...lastTableData];
                          newTableData[index].noOfPackages = e.target.value;
                          setLastTableData(newTableData);
                        }}
                      />
                    </td>
                    <td className="border border-gray-200">
                      <input
                        type="text"
                        className="w-full p-[1.2px] border-gray-200"
                        placeholder="Commodity Class..."
                        value={data.commodityClass}
                        onChange={(e) => {
                          const newTableData = [...lastTableData];
                          newTableData[index].commodityClass = e.target.value;
                          setLastTableData(newTableData);
                        }}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {!view && !download ? (
          <span
            onClick={() =>
              setLastTableData([
                ...lastTableData,
                {
                  sceintificName: "",
                  commonName: "",
                  origin: "",
                  pcNo: "",
                  quantity: "",
                  noOfPackages: "",
                  commodityClass: "",
                },
              ])
            }
            className="mt-2 cursor-pointer text-[1.2vw]"
          >
            <BiPlus />
          </span>
        ) : null}
        {/* table */}
        <br />
        <br />
        <br />
        <br />
      </CertificateLayout>
    </div>
  );
};

export default AdminCRUCertificate;
