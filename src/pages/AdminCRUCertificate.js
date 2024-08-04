import React, { useEffect, useRef, useState } from "react";
import CertificateLayout from "../components/CertificateLayout";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { server } from "../utlits/Variables";
import { useLocation, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { BiTrash } from "react-icons/bi";

const AdminCRUCertificate = ({
  view,
  div1Ref,
  div2Ref,
  div3Ref,
  noPadding,
}) => {
  const [firstTableFontSize, setFirstTableFontSize] = useState(12);
  const [underTableFontSize, setUnderTableFontSize] = useState(12);

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
  const [declaredMeansOfConveyanceLeft, setDeclaredMeansOfConveyanceLeft] =
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
      declared_means_of_conveyance_left: declaredMeansOfConveyanceLeft,
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
      //
      font_size_1: firstTableFontSize,
      font_size_2: underTableFontSize,

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

  const location = useLocation();
  const isUpdate = location.search === "?update=true";

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
    return data;
  };

  useEffect(() => {
    if (view || isUpdate) {
      getCertificate().then((data) => {
        setNumber(data.number);
        setVerificationCode(data.verification_code);
        setFrm(data.frm);
        setTo(data.to);
        setNameAddressOfExporter(data.name_address_of_exporter);
        setNameAddressOfImporter(data.name_address_of_importer);
        setDistinguishingMarks(data.distinguishing_marks);
        setDeclaredPointOfEntry(data.declared_point_of_entry);
        setTotalNmOfPackages(data.total_nm_of_packages);
        setTotalQuantity(data.total_quantity);
        setImportPermitNo(data.import_permit_no);
        setDeclaredMeansOfConveyance(data.declared_means_of_conveyance);
        setDeclaredMeansOfConveyanceLeft(
          data.declared_means_of_conveyance_left
        );
        setEndUsePurpose(data.end_use_purpose);
        setAdditionalDeclaration(data.additional_declaration);
        setNameAndSignatureOfAuthorizedOfficer(
          data.name_and_signature_of_authorized_officer
        );
        setDateOfInspection(data.date_of_inspection);
        setDateOfIssue(data.date_of_issue);
        setPlaceOfIssue(data.place_of_issue);
        setConcentrationRate(data.concentration_rate);
        setTreatment(data.treatment);
        setTreatmentDate(data.treatment_date);
        setDurationAndTemperature(data.duration_and_temperature);
        setChemicals(data.chemicals);
        setFirstTableFontSize(data.font_size_1);
        setUnderTableFontSize(data.font_size_2);
        setData(JSON.parse(data.data));
      });
    }
  }, [view, isUpdate]);

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
      const canvas = await html2canvas(divRef.current);
      return canvas.toDataURL("image/png");
    };
    try {
      const images = [
        await captureScreenshot(div1Ref_),
        await captureScreenshot(div2Ref_),
        await captureScreenshot(div3Ref_),
      ];

      const pdf = new jsPDF({
        unit: "in", // or 'pt', 'in', 'cm', 'mm'
        format: "a4",
        orientation: "portrait",
      });

      const loadImage = (imageSrc) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = imageSrc;

          img.onload = () => {
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;
            resolve({ img, imgWidth, imgHeight });
          };

          img.onerror = (error) => reject(error);
        });
      };

      for (let i = 0; i < images.length; i++) {
        const { img, imgWidth, imgHeight } = await loadImage(images[i]);

        // Calculate the aspect ratio
        const aspectRatio = imgWidth / imgHeight;

        // Define PDF page dimensions
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Calculate dimensions to fit the image within the PDF page
        let renderWidth, renderHeight;
        if (aspectRatio > 1) {
          // Landscape images
          renderWidth = pageWidth;
          renderHeight = renderWidth / aspectRatio;
          if (renderHeight > pageHeight) {
            renderHeight = pageHeight;
            renderWidth = renderHeight * aspectRatio;
          }
        } else {
          // Portrait images
          renderHeight = pageHeight;
          renderWidth = renderHeight * aspectRatio;
          if (renderWidth > pageWidth) {
            renderWidth = pageWidth;
            renderHeight = renderWidth / aspectRatio;
          }
        }

        // Add a new page if not the first image
        if (i > 0) {
          pdf.addPage();
        }

        // Center image horizontally and vertically
        const x = (pageWidth - renderWidth) / 2;
        // const y = (pageHeight - renderHeight) / 2;
        const y = 0;

        // pdf.addImage(images[i], "PNG", x, y, 210, 300);
        pdf.addImage(images[i], "PNG", 0, 0, 8.27, 11.69);
      }

      // Save the PDF
      pdf.save("شهادة زراعية صحية للتصدير_إعادة تصدير.pdf");
    } catch (error) {
      console.error("Error capturing screenshots or creating PDF:", error);
    }
  };

  const updateCertificate = async () => {
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
      declared_means_of_conveyance_left: declaredMeansOfConveyanceLeft,
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
      //
      font_size_1: firstTableFontSize,
      font_size_2: underTableFontSize,
      data: JSON.stringify(data),
    };
    await axios
      .put(`${server}api/certificates/${params.ID}/`, d, {
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

  return (
    <div
      className={`flex ${noPadding ? "gap-1" : ""} ${
        noPadding ? "p-0" : "p-0"
      } flex-col bg-zinc-200 roboto-medium`}
    >
      {/* first page */}
      <div
        style={{ direction: "rtl" }}
        className="mx-auto w-[8.27in] mt-10  flex gap-3"
      >
        <div className="flex w-1/2 flex-col gap-1">
          <p>حجم خط (اسم جهة التصدير وعنوانها):</p>
          <input
            value={firstTableFontSize}
            onChange={(e) => setFirstTableFontSize(e.target.value)}
            type="numbrt"
          />
        </div>
      </div>
      <CertificateLayout
        underTableFontSize={underTableFontSize}
        setUnderTableFontSize={setUnderTableFontSize}
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
        isUpdate={isUpdate}
      >
        {/* number and verification */}
        <div className="w-[87%] mb-2.5 -mt-0.5 tex-[10px] items-center mx-auto flex text-[12px] justify-between">
          <div className="flex flex-col gap-1.5 text-start">
            <p>No.</p>
            <p>Verification Code</p>
          </div>
          <div className="flex flex-col gap-1.5 text-center">
            {certificate?.id && !isUpdate ? (
              <p>{certificate?.number}</p>
            ) : (
              <input
                type="text"
                placeholder="Number..."
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            )}
            {certificate?.id && !isUpdate ? (
              <p className="">{certificate?.verification_code}</p>
            ) : (
              <input
                type="text"
                placeholder="Verification Code..."
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            )}
          </div>
          <div className="flex flex-col gap-0.5 text-end">
            <p>الرقم</p>
            <p>رمز التحقق</p>
          </div>
        </div>
        {/* number and verification */}

        {/* first table */}
        <div
          style={{
            fontSize: `${"12"}px`,
          }}
          className="w-[87%] mx-auto"
        >
          <table className="min-w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="bg-[#e6e7e8] pb-1 w-[50%] border-b-0  border border-[#8e8f90]/100">
                  <p className="font-normal">من / منظمة وقاية النباتات في</p>
                  <p className="-mt-1  font-normal">
                    From / Plant Protection Organization(s) of
                  </p>
                </th>
                <th className="bg-[#e6e7e8] pb-1 border-l-0 w-[50%] border-b-0  border border-[#8e8f90]/100">
                  <p className="font-normal">إلي / منظمة وقاية النباتات في</p>
                  <p className="-mt-1  font-normal">
                    To / Plant Protection Organization(s) of
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-t-0 border-[#8e8f90]/100 ">
                  {certificate?.id && !isUpdate ? (
                    <p className="font-normal pb-0.5">{certificate?.frm}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={frm}
                      onChange={(e) => setFrm(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-t-0 border-l-0 border-[#8e8f90]/100">
                  {certificate?.id && !isUpdate ? (
                    <p className="font-normal pb-0.5">{certificate?.to}</p>
                  ) : (
                    <input
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
          style={{
            fontSize: `${"12"}px`,
          }}
          className="w-[87%] px-3.5 bg-[#8e8f90] text-white py-[4px] mt-[7px] flex mx-auto  justify-between"
        >
          <p>I. Description of Consignment</p>
          <p className="font-normal arabic">أولا: وصف الإرساليـــــــــة</p>
        </div>
        <div
          style={{
            fontSize: `${"12"}px`,
          }}
          className="w-[87%] mx-auto "
        >
          <table className="min-w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="bg-[#e6e7e8] pb-1 border-b-0 border-t-0 w-[50%]  border border-[#8e8f90]/100">
                  <p className="font-normal">اسم جهة التصدير وعنوانها</p>
                  <p className="-mt-1  font-normal">
                    Name & Address of Exporter
                  </p>
                </th>
                <th
                  style={{
                    fontSize: `${"12"}px`,
                  }}
                  className="bg-[#e6e7e8] pb-1 border-l-0 border-b-0 border-t-0 w-[50%]  border border-[#8e8f90]/100"
                >
                  <p className="font-normal">
                    اسم المستورد وعنوانه حسب البيانات
                  </p>
                  <p className="-mt-1  font-normal">
                    Declared Name & Address of Importer
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{ fontSize: `${firstTableFontSize}px` }}
                  className="border border-t-0 border-[#8e8f90]/100 pb-0.5 "
                >
                  {certificate?.id && !isUpdate ? (
                    <p
                      style={{
                        lineHeight: `1.1em`,
                      }}
                      className="font-normal mt-[1px] px-5"
                    >
                      {certificate?.name_address_of_exporter}
                    </p>
                  ) : (
                    <input
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={nameAddressOfExporter}
                      onChange={(e) => setNameAddressOfExporter(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-l-0 border-t-0 border-[#8e8f90]/100 pb-0.5">
                  {certificate?.id && !isUpdate ? (
                    <p>{certificate?.name_address_of_importer}</p>
                  ) : (
                    <input
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
        <div
          style={{
            fontSize: `${"12"}px`,
          }}
          className="w-[87%] mx-auto "
        >
          <table className="min-w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="bg-[#e6e7e8] w-[50%] border-b-0 px-3 border-t-0 border border-[#8e8f90]/100 pb-1">
                  <p className="font-normal">العلامات المميزة</p>
                  <p className="-mt-1  font-normal">Distinguishing Marks</p>
                </th>
                <th className="bg-[#e6e7e8] borderb w-[50%] border-b-0 border-l-0 px-3 border-t-0 border border-[#8e8f90]/100 pb-1">
                  <p className="font-normal">
                    نقطة الدخول وعنوانه حسب البيانات في
                  </p>
                  <p className="-mt-1  font-normal">Declared Point of Entry</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-t-0 border-[#8e8f90]/100 pb-0.5">
                  {certificate?.id && !isUpdate ? (
                    <p className="pb-0.5">
                      {certificate?.distinguishing_marks}
                    </p>
                  ) : (
                    <input
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={distinguishingMarks}
                      onChange={(e) => setDistinguishingMarks(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-t-0 border-l-0 border-[#8e8f90]/100 pb-0.5 ">
                  {certificate?.id && !isUpdate ? (
                    <p className="pb-0.5">
                      {certificate?.declared_point_of_entry}
                    </p>
                  ) : (
                    <input
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

        {/* Secound table */}
        <div
          style={{
            fontSize: `${"12"}px`,
          }}
          className="w-[87%] mx-auto mt-[17px]"
        >
          <table className="min-w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="bg-[#e6e7e8]  border-b-0 w-[20%] border border-[#8e8f90]/100 pb-1">
                  <p className="font-normal">غرض الاستعمال النهائي</p>
                  <p className="-mt-1  font-normal">End-use Purpose</p>
                </th>
                <th className="bg-[#e6e7e8] border-l-0 border-r-0 border-b-0  w-[30%] border border-[#8e8f90]/100 pb-1">
                  <p className="font-normal">وسيلة النقل حسب البيانات</p>
                  <p className="-mt-1  font-normal">
                    Declared Means of Conveyance
                  </p>
                </th>
                <th className="bg-[#e6e7e8]   border-b-0 w-[18%] border border-[#8e8f90]/100 pb-1">
                  <p className="font-normal">رقم إذن الاستيراد</p>
                  <p className="-mt-1  font-normal">Import Permit No.</p>
                </th>
                <th className="bg-[#e6e7e8] border-l-0 border-b-0  w-[14%] border border-[#8e8f90]/100 pb-1">
                  <p className="font-normal">الكمية الكلية</p>
                  <p className="-mt-1  font-normal">Total Quantity</p>
                </th>
                <th className="bg-[#e6e7e8] border-l-0 border-b-0  w-[28%] border border-[#8e8f90]/100 pb-1">
                  <p className="font-normal">العدد الكلي للطرود</p>
                  <p className="-mt-1  font-normal">Total No. of Packages</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-b-0 border-t-0 border-[#8e8f90]/100 pb-0.5 ">
                  {certificate?.id && !isUpdate ? (
                    <p>{certificate?.end_use_purpose}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={endUsePurpose}
                      onChange={(e) => setEndUsePurpose(e.target.value)}
                    />
                  )}
                </td>
                <td className=" border-l-0 border-t-0 pb-0.5">
                  {certificate?.id && !isUpdate ? (
                    <div className="flex text-center ">
                      <p className="w-[40%] text-center">
                        {certificate?.declared_means_of_conveyance_left}
                      </p>
                      <div className="h-[25px] -mt-[0.8px] w-[0.5px] bg-[#8e8f90]"></div>
                      <p className="w-[60%] text-center">
                        {certificate?.declared_means_of_conveyance}
                      </p>
                    </div>
                  ) : (
                    <div className="flex text-center">
                      <input
                        type="text"
                        className="w-[100%] border-0"
                        placeholder="Enter here..."
                        value={declaredMeansOfConveyanceLeft}
                        onChange={(e) =>
                          setDeclaredMeansOfConveyanceLeft(e.target.value)
                        }
                      />
                      <input
                        type="text"
                        className="w-[100%] border-0"
                        placeholder="Enter here..."
                        value={declaredMeansOfConveyance}
                        onChange={(e) =>
                          setDeclaredMeansOfConveyance(e.target.value)
                        }
                      />
                    </div>
                  )}
                </td>
                <td className="border border-b-0 border-t-0 pb-0.5 md:border-[#8e8f90] border-[#8e8f90]/100">
                  {certificate?.id && !isUpdate ? (
                    <p>{certificate?.import_permit_no}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={importPermitNo}
                      onChange={(e) => setImportPermitNo(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-l-0 border-b-0  pb-0.5 border-t-0 md:border-[#8e8f90] border-[#8e8f90]/100">
                  {certificate?.id && !isUpdate ? (
                    <p>{certificate?.total_quantity}</p>
                  ) : (
                    <input
                      type="text"
                      className="w-[100%] border-0"
                      placeholder="Enter here..."
                      value={totalQuantity}
                      onChange={(e) => setTotalQuantity(e.target.value)}
                    />
                  )}
                </td>
                <td className="border  border-l-0 border-b-0 pb-0.5 border-t-0 md:border-[#8e8f90] border-[#8e8f90]/100">
                  {certificate?.id && !isUpdate ? (
                    <p>{certificate?.total_nm_of_packages}</p>
                  ) : (
                    <input
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
        <div
          style={{
            fontSize: `${"12"}px`,
          }}
          className="w-[87%] mx-auto -mt-1.5"
        >
          <table className="min-w-full border-collapse text-center border-t-0 border border-[#8e8f90]/100">
            <thead>
              <tr>
                <th className="bg-[#e6e7e8] border-b-0 pb-1  w-[20%] border borderr md:border-[#8e8f90] border-[#8e8f90]/100 ">
                  <p className="font-normal">الاسم العلمي</p>
                  <p className="-mt-1  font-normal">Scientific Name</p>
                </th>
                <th className="bg-[#e6e7e8] border-b-0 pb-1 border-l-0  w-[15%] border border-[#8e8f90]/100 ">
                  <p className="font-normal">الاسم العام</p>
                  <p className="-mt-1  font-normal">Common Name</p>
                </th>
                <th className="bg-[#e6e7e8] border-b-0 pb-1 border-l-0  w-[15%] border border-[#8e8f90]/100 ">
                  <p className="font-normal">جهة المنشأ</p>
                  <p className="-mt-1  font-normal">Origin</p>
                </th>
                <th className="bg-[#e6e7e8] border-b-0 pb-1 border-l-0  w-[10%] border border-[#8e8f90]/100 ">
                  <p className="font-normal">رقم الشهادة</p>
                  <p className="-mt-1  font-normal">PC No.</p>
                </th>
                <th className="bg-[#e6e7e8] border-b-0 pb-1 border-l-0  w-[8%] border border-[#8e8f90]/100 ">
                  <p className="font-normal">الكمية</p>
                  <p className="-mt-1  font-normal">Quantity</p>
                </th>
                <th className="bg-[#e6e7e8] border-b-0 pb-1 border-l-0  w-[14%] border border-[#8e8f90]/100 ">
                  <p className="font-normal">عدد الطرود</p>
                  <p className="-mt-1 font-normal">No. of Packages</p>
                </th>
                <th className="bg-[#e6e7e8] border-b-0 pb-1 border-l-0  w-[22%] border border-[#8e8f90]/100 ">
                  <p className="font-normal">الصنف</p>
                  <p className="-mt-1  font-normal">Commodity Class</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-t-0 font-normal pb-1">
                  See Annex of Certificate.
                </td>
                <td className=" border-t-0 pb-1"></td>
                <td className=" border-t-0 pb-1"></td>
                <td className=" border-t-0 pb-1"></td>
                <td className=" border-t-0 pb-1"></td>
                <td className=" border-t-0 pb-1"></td>
                <td dir="rtl" className=" border-t-0 pb-1">
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
        <div className="w-[87%] text-[12px] border border-[#8e8f90]/100 flex flex-col mx-auto">
          <div className="flex text-white justify-between bg-[#8e8f90] py-[3px] px-[5px]">
            <p className="font-normal">II. Additional Declaration</p>
            <p>ثانيـــا: إقــــرار إضـــافى</p>
          </div>
          <div className=" pb-1.5 text-[12px]  flex flex-col items-center justify-center">
            <p>NIL</p>
          </div>
        </div>
        {/* secound */}
      </CertificateLayout>
      <br />
      <div
        style={{ direction: "rtl" }}
        className="flex mx-auto mt-3 w-1/2 flex-col gap-1"
      >
        <p>حجم خط الجدول في الاسفل عند الqr code:</p>
        <input
          value={underTableFontSize}
          onChange={(e) => setUnderTableFontSize(e.target.value)}
          type="numbrt"
        />
      </div>

      <br />
      <br />
      <br />
      <br />

      {/* second page */}
      <CertificateLayout
        underTableFontSize={underTableFontSize}
        setUnderTableFontSize={setUnderTableFontSize}
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
        <div className="w-[87%] mt-[-1.1vh] bg-[#8e8f90] text-white py-0.5 px-3 flex mx-auto text-[12px] justify-between">
          <p>III. Disinfestation & / or Disinfection Treatment</p>
          <p className="font-normal arabic">
            ثالثا: المعاملة للتطهير من التلوث و / او الإصابة
          </p>
        </div>
        {/*  */}
        <div className="w-[87%] mx-auto text-[12px]">
          <table className="min-w-full border-collapse text-center border-t-0 border border-[#8e8f90]/100">
            <thead>
              <tr>
                <th className="bg-[#e6e7e8] pb-2 border-b-0 w-[25%] border border-[#8e8f90]/100">
                  <p className="truncate font-normal">
                    الكيماويات - المادة الفعالة
                  </p>
                  <p className="truncate font-normal -mt-1">
                    Chemicals (Active Ingredients)
                  </p>
                </th>
                <th className="bg-[#e6e7e8] pb-2 border-l-0 border-b-0  w-[20%] border border-[#8e8f90]/100">
                  <p className="truncate font-normal">
                    مدة العرض ودرجة الحرارة
                  </p>
                  <p className="truncate font-normal -mt-1">
                    Duration & Temperature
                  </p>
                </th>
                <th className="bg-[#e6e7e8] pb-2 border-l-0 border-b-0  w-[15%] border border-[#8e8f90]/100">
                  <p className="truncate font-normal">تاريخ المعاملة</p>
                  <p className="truncate font-normal -mt-1">Treatment Date</p>
                </th>
                <th className="bg-[#e6e7e8] pb-2 border-l-0 border-b-0  w-[15%] border border-[#8e8f90]/100">
                  <p className="truncate font-normal">المعاملة</p>
                  <p className="truncate font-normal -mt-1">Treatmen</p>
                </th>
                <th className="bg-[#e6e7e8] pb-2 border-l-0 border-b-0  w-[22%] border border-[#8e8f90]/100">
                  <p className="truncate font-normal">نسبة التركيز</p>
                  <p className="truncate font-normal -mt-1">
                    Concentration Rate
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#8e8f90]/100 border-t-0">
                  {certificate?.id && !isUpdate ? (
                    <p className="pb-0.5">{certificate?.chemicals}</p>
                  ) : (
                    <input
                      className="w-[100%]"
                      type="text"
                      placeholder="Enter here..."
                      value={chemicals}
                      onChange={(e) => setChemicals(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-[#8e8f90]/100 border-t-0 border-l-0">
                  {certificate?.id && !isUpdate ? (
                    <p className="pb-0.5">
                      {certificate?.duration_and_temperature}
                    </p>
                  ) : (
                    <input
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
                <td className="border border-[#8e8f90]/100 border-t-0 border-l-0">
                  {certificate?.id && !isUpdate ? (
                    <p className="pb-0.5">{certificate?.treatment_date}</p>
                  ) : (
                    <input
                      className="w-[100%]"
                      type="text"
                      placeholder="Enter here..."
                      value={treatmentDate}
                      onChange={(e) => setTreatmentDate(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-[#8e8f90]/100 border-t-0 border-l-0">
                  {certificate?.id && !isUpdate ? (
                    <p className="pb-0.5">{certificate?.treatment}</p>
                  ) : (
                    <input
                      className="w-[100%]"
                      type="text"
                      placeholder="Enter here..."
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                    />
                  )}
                </td>
                <td className="border border-[#8e8f90]/100 border-t-0 border-l-0  px-3">
                  {certificate?.id && !isUpdate ? (
                    <p className="pb-0.5">{certificate?.concentration_rate}</p>
                  ) : (
                    <input
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
        <img className="w-[100%] -ms-0.5" src="/a.png" />
      </CertificateLayout>

      <br />
      <br />
      <br />
      <br />

      {/* third page */}
      <CertificateLayout
        underTableFontSize={underTableFontSize}
        setUnderTableFontSize={setUnderTableFontSize}
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
        <div className="w-[87%] mb-[2.5px] mt-2 mx-auto text-[9pt] flex justify-between">
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
        <div className="w-[87%] mt-3 mx-auto text-[9pt]">
          <table className="min-w-full border-collapse text-center border border-[#8e8f90]/100">
            <thead>
              <tr>
                <th className="bg-[#e6e7e8] pb-1 font-normal border-t-0 border-b-0 w-[15%] border border-l-0 border-[#8e8f90]/100 ">
                  <p>الاسم العلمي</p>
                  <p className="-mt-1">Scientific Name</p>
                </th>
                <th className="bg-[#e6e7e8] pb-1 border-t-0 font-normal border-b-0 w-[15%] border border-l-0 border-[#8e8f90]/100 ">
                  <p>الاسم العام</p>
                  <p className="-mt-1">Common Name</p>
                </th>
                <th className="bg-[#e6e7e8] pb-1 border-t-0 font-normal border-b-0 w-[10%] border border-l-0 border-[#8e8f90]/100 ">
                  <p>جهة المنشأ</p>
                  <p className="-mt-1">Origin</p>
                </th>
                <th className="bg-[#e6e7e8] pb-1 border-t-0 font-normal border-b-0 w-[10%] border border-l-0 border-[#8e8f90]/100 ">
                  <p>رقم الشهادة</p>
                  <p className="-mt-1">PC No.</p>
                </th>
                <th className="bg-[#e6e7e8] pb-1 border-t-0 font-normal border-b-0 w-[10%] border border-l-0 border-[#8e8f90]/100 ">
                  <p>الكمية</p>
                  <p className="-mt-1">Quantity</p>
                </th>
                <th className="bg-[#e6e7e8] pb-1 border-t-0 font-normal border-b-0 w-[15%] border border-l-0 border-[#8e8f90]/100 ">
                  <p>عدد الطرود</p>
                  <p className="-mt-1">No. of Packages</p>
                </th>
                <th className="bg-[#e6e7e8] pb-1 border-t-0 font-normal border-b-0 w-[17%] border border-l-0 border-r-0 border-[#8e8f90]/100 ">
                  <p>الصنف</p>
                  <p className="-mt-1">Commodity Class</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {certificate?.id && !isUpdate
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
                      <td className="border border-l-0 items-start pb-2 text-[9pt] border-[#8e8f90]/100 border-t-0">
                        {d?.scientificName}
                      </td>
                      <td className="border border-l-0 items-start pb-2 text-[9pt] border-[#8e8f90]/100 border-t-0">
                        {d?.commonName}
                      </td>
                      <td className="border border-l-0 items-start pb-2 text-[9pt] border-[#8e8f90]/100 border-t-0">
                        {d?.origin}
                      </td>
                      <td
                        style={{ lineHeight: "1.2em" }}
                        className="border border-l-0 items-start pb-2 text-[9pt] border-[#8e8f90]/100 border-t-0"
                      >
                        {d?.pcNo}
                      </td>
                      <td className="border border-l-0 items-start pb-2 text-[9pt] border-[#8e8f90]/100 border-t-0">
                        {d?.quantity}
                      </td>
                      <td className="border border-l-0 items-start pb-2 text-[9pt] border-[#8e8f90]/100 border-t-0">
                        {d?.noOfPackages}
                      </td>
                      <td className="border border-l-0 items-start pb-2 text-[9pt] border-[#8e8f90]/100 border-t-0">
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
                      <td className="border border-[#8e8f90]/100 border-t-0 ">
                        <input
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
                      <td className="border border-l-0 border-[#8e8f90]/100 border-t-0 ">
                        <input
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
                      <td className="border border-l-0 border-[#8e8f90]/100 border-t-0 ">
                        <input
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
                      <td className="border border-l-0 border-[#8e8f90]/100 border-t-0 ">
                        <input
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
                      <td className="border border-l-0 border-[#8e8f90]/100 border-t-0 ">
                        <input
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
                      <td className="border border-l-0 border-[#8e8f90]/100 border-t-0 ">
                        <input
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
                      <td className="border border-l-0 border-[#8e8f90]/100 border-t-0 ">
                        <input
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
                      {isUpdate || !view ? (
                        <td
                          onClick={() => {
                            setData((data) => {
                              data.splice(index, 1);
                              return [...data];
                            });
                          }}
                          className="border border-[#8e8f90]/100 border-t-0 "
                        >
                          <BiTrash />
                        </td>
                      ) : null}
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
              className="text-[12px] cursor-pointer text-green-600"
            >
              <FaPlus />
            </span>
          </div>
        )}

        {/*  */}
      </CertificateLayout>

      <br />
      <br />
      <br />
      <br />

      {!view && !isUpdate ? (
        <>
          <br />
          <br />
          <br />
          <button
            onClick={createCertificate}
            className="w-[8.3in] mx-auto bg-[#4fc045] text-white font-normal py-2 px-4 rounded"
          >
            Create
          </button>
        </>
      ) : null}
      {isUpdate && (
        <>
          <br />
          <br />
          <br />
          <button
            onClick={updateCertificate}
            className="w-[8.3in] mx-auto bg-[#4fc045] text-white font-normal py-2 px-4 rounded"
          >
            Update
          </button>
          <br />
          <br />
        </>
      )}
      {view && user?.id ? (
        <button
          className="w-[8.3in] mx-auto bg-[#3375ac] text-white font-normal py-2 px-4 rounded"
          onClick={downloadCertificate}
        >
          Download
        </button>
      ) : null}

      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default AdminCRUCertificate;
