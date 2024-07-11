import React, { useEffect } from "react";
import {
  BiInfoCircle,
  BiRefresh,
  BiSearch,
  BiSolidMicrophone,
} from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { MdOutlineTextDecrease, MdOutlineTextIncrease } from "react-icons/md";
import { PiPrinterLight } from "react-icons/pi";
import { RiChat3Line } from "react-icons/ri";
import { RxHome } from "react-icons/rx";
import { server } from "../utlits/Variables";
import { useParams } from "react-router-dom";
import AdminCRUCertificate from "./AdminCRUCertificate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CertificateDownload = () => {
  const [captcha, setCaptcha] = React.useState("");
  const generateCaptcha = () => {
    const images = [
      {
        text: "7JLBE6",
        image: "/captcha/c1.jpeg",
      },
      {
        text: "99J5IE",
        image: "/captcha/c2.jpeg",
      },
      {
        text: "65ML9J",
        image: "/captcha/c3.jpeg",
      },
      {
        text: "E788L6",
        image: "/captcha/c4.jpeg",
      },
      {
        text: "BEGDG6",
        image: "/captcha/c5.jpeg",
      },
      {
        text: "J6B579",
        image: "/captcha/c6.jpeg",
      },
      {
        text: "9H57F6",
        image: "/captcha/c7.jpeg",
      },
      {
        text: "89HJD5",
        image: "/captcha/c8.jpeg",
      },
      {
        text: "76C9CL",
        image: "/captcha/c9.jpeg",
      },
      {
        text: "9AB9GH",
        image: "/captcha/c10.jpeg",
      },
      {
        text: "5H68B8",
        image: "/captcha/c12.jpeg",
      },
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setCaptcha(randomImage);
  };
  useEffect(() => {
    generateCaptcha();
  }, []);

  const [certificateNumber, setCertificateNumber] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [captchaCode, setCaptchaCode] = React.useState("");

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const params = useParams();

  const [certificate, setCertificate] = React.useState({});
  const getCertificate = async () => {
    setLoading(true);
    const response = await fetch(`${server}api/certificates/${params.ID}/`, {
      method: "GET",
    });
    const data = await response.json();
    setCertificateNumber(data.number);
    setVerificationCode(data.verification_code);
    setCertificate(data);
    setLoading(false);
  };

  useEffect(() => {
    getCertificate();
  }, []);

  const [downloading, setDownloading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const parent = React.useRef(null);

  const div1Ref = React.useRef(null);
  const div2Ref = React.useRef(null);
  const div3Ref = React.useRef(null);

  const downloadCertificate = async () => {
    setDownloading(true);

    if (
      certificate?.number == certificateNumber &&
      certificate?.verification_code == verificationCode &&
      captchaCode == captcha?.text
    ) {
      const captureScreenshot = async (divRef) => {
        const canvas = await html2canvas(divRef.current);
        return canvas.toDataURL("image/png");
      };
      try {
        // Show the divs before capturing
        parent.current.classList.remove("hidden");

        const images = [
          await captureScreenshot(div1Ref),
          await captureScreenshot(div2Ref),
          await captureScreenshot(div3Ref),
        ];

        // Hide the divs after capturing
        parent.current.classList.add("hidden");

        const pdf = new jsPDF();

        images.forEach((image, index) => {
          if (index > 0) {
            pdf.addPage();
          }
          pdf.addImage(image, "PNG", 10, 10, 190, 0); // Adjust dimensions as needed
        });

        // Save the PDF
        pdf.save("certificate.pdf");
      } catch (error) {
        console.error("Error capturing screenshots or creating PDF:", error);
      }
    } else {
      setError(true);
    }

    setDownloading(false);
  };

  return (
    <div
      style={{ direction: "rtl" }}
      className="flex flex-col md:px-16 md:py-4 p-0 md:bg-white bg-gray-100"
    >
      {/* {loading && } */}
      {loading && (
        <div className="fixed top-0 left-0 bg-white flex bg-opacity-85 flex-col justify-center items-center z-[100] w-full h-full">
          <img
            src="/moccae-loader-faster.gif"
            className="w-[200px] opacity-85"
          />
        </div>
      )}

      {downloading && (
        <div className="fixed top-0 left-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-[100] w-full h-full">
          <div
            style={{ direction: "rtl" }}
            className="p-2 cairo font-bold bg-white w-full max-w-[230px] py-6 text-center text-gray-500"
          >
            <p>الرجاء الانتظار...</p>
          </div>
        </div>
      )}

      {/* header */}
      <div className="flex md:pt-0 pt-5 md:justify-end justify-end md:gap-0 gap-3 p-3 items-center bg-white">
        <span className="md:hidden text-xl flex flex-col justify-center cursor-pointer p-2 bg-[#b68a35] text-white h-fit">
          {/* <RxHamburgerMenu className="font-bold" /> */}
          <img src="/burger-bar.png" className="w-[24px]" />
        </span>

        <div className="flex gap-5">
          <span className="mr-5 w-full md:max-w-[70px] max-w-[50px]">
            <img className="w-full" src="/4-starts-2024.aspx" alt="logo" />
          </span>
          <span className="mr-3 w-full md:max-w-[280px] max-w-[200px]">
            <img className="w-full" src="/logo-moccae.png" alt="logo" />
          </span>
        </div>
      </div>
      <div className="flex md:hidden -mt-4 items-center gap-5 text-sm text-zinc-600 p-3 bg-white">
        <select className="rounded-full font-bold bg-zinc-100 border outline-none w-full max-w-[100px]">
          <option>عربي</option>
          <option>english</option>
          <option>اردو</option>
        </select>
        <span className="w-[18px]">
          <img src="/wheelchair.png" />
        </span>
        <span className="w-[18px]">
          <img src="/settings.png" />
        </span>
        <span className="w-[18px]">
          <img src="/home.png" />
        </span>
      </div>

      {/* navigate */}
      <div className="md:flex cairo hidden min-w-full border-b border-b-[#b68a35] pb-5 text-zinc-600 items-center justify-between p-2 px-5">
        <div className="flex items-center">
          <span className="text-xl me-7">
            <RxHome />
          </span>
          <p className="me-7">عن الوزارة</p>
          <p className="me-7">التشريعات</p>
          <p className="me-7">خدماتنا</p>
          <p className="me-7">المعرفة</p>
          <p className="me-7">المشاركة الالكترونية</p>
          <p className="me-7">المركز الإعلامي</p>
          <p className="me-7">البيانات المفتوحة</p>
        </div>
        <div className="flex items-center">
          <span className="text-xl my-auto mx-4 text-[#b68a35]">
            <BiSearch />
          </span>
          <span className="text-xl my-auto mx-4 text-[#b68a35]">
            <BsPerson />
          </span>
          <span className="text-xl my-auto mx-4 text-[#b68a35]">
            <CiSettings />
          </span>
          <div className="flex gap-2 ms-3 items-center">
            <p>Language</p>
            <span>
              <IoIosArrowDown />
            </span>
          </div>
        </div>
      </div>
      <div className="flex md:justify-between justify-end gap-3 mt-3 items-center md:px-7 px-2">
        <div className="md:flex hidden gap-3 text-xs">
          <div className="flex gap-1">
            <p>الصفحة الرئيسية</p>
            <span className="text-[#b68a35] font-bold">
              <GoDotFill />
            </span>
          </div>
          <div className="flex gap-1">
            <p>مساحة العمل</p>
            <span className="text-[#b68a35] font-bold">
              <GoDotFill />
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="p-2 rounded-full bg-gray-100 flex flex-col justify-center transition-all duration-300 hover:bg-gray-400 cursor-pointer md:text-zinc-700 text-zinc-500 text-xl hover:text-white">
            <PiPrinterLight />
          </span>
          <span className="p-2 rounded-full bg-gray-100 flex flex-col justify-center transition-all duration-300 hover:bg-gray-400 cursor-pointer md:text-zinc-700 text-zinc-500 text-xl hover:text-white">
            <MdOutlineTextDecrease />
          </span>
          <span className="p-2 rounded-full bg-gray-100 flex flex-col justify-center transition-all duration-300 hover:bg-gray-400 cursor-pointer md:text-zinc-700 text-zinc-500 text-xl hover:text-white">
            <MdOutlineTextIncrease />
          </span>
        </div>
      </div>

      {/* download section */}
      <div className="flex gap-14 md:mt-9 mt-2 text-zinc-500 p-2 bg-white">
        {/* important links */}
        <div className="w-[260px] cairo md:flex h-fit pb-3 min-w-[260px] rounded-xl p-1 border border-gray-300 hidden flex-col">
          <h3 className="text-xl font-bold mt-4">روابط هامة</h3>
          <hr className="h-[1.5px] bg-zinc-400 my-2" />
          <div className="flex flex-col font-bold text-neutral-700 text-sm">
            <div className="flex justify-between items-center p-2 border-b mb-2 px-3 hover:px-1 cursor-pointer hover:bg-zinc-100">
              <p>تسجيل الدخول</p>
              <span className="text-[#b68a35]">
                <IoIosArrowBack />
              </span>
            </div>
            <div className="flex justify-between items-center p-2 border-b mb-2 px-3 hover:px-1 cursor-pointer hover:bg-zinc-100">
              <p>رد الإيراد الالكتروني</p>
              <span className="text-[#b68a35]">
                <IoIosArrowBack />
              </span>
            </div>
            <div className="flex justify-between items-center p-2 border-b mb-2 px-3 hover:px-1 cursor-pointer hover:bg-zinc-100">
              <p>دليل استخدام الخدمات الرقمية</p>
              <span className="text-[#b68a35]">
                <IoIosArrowBack />
              </span>
            </div>
            <div className="flex justify-between bg-zinc-300 items-center p-2 border-b mb-2 px-3 hover:px-1 cursor-pointer">
              <p>مركز الشهادات والتصاريح الرقمية</p>
              <span className="text-[#b68a35]">
                <IoIosArrowBack />
              </span>
            </div>
          </div>
        </div>
        {/* download verification */}
        <div className="w-full flex flex-col">
          <h3 className="md:text-xl text-base md:font-bold cairo md:bg-white bg-[#b68a35] text-white md:text-[#87888b] p-1 px-2">
            مركز الشهادات والتصاريح الرقمية
          </h3>
          <hr className="h-[1.5px] bg-zinc-400 my-2" />
          <div className="flex flex-col text-black/70">
            <p className="text-[10.5px]">
              يمكنك الان التحقق من الشهادات او التصاريح التي يتم إصدارها من
              وزارة التغير المناخي والبيئة من خلال ادخال رقم المستند (رقم
              الشهادة أو رقم التصريح) ثم ادخال كود التحقق المذكور على المستند
            </p>
            <p className="text-xs">الحقول المشار إليها بعلامة ( * ) إلزامية</p>
          </div>
          <div className="flex mt-2 flex-col gap-3 p-1 w-full md:max-w-[700px]">
            <div className="flex md:flex-row flex-col md:justify-between justify-start gap-2 md:items-center items-start">
              <p className="text-[#b68a35] md:text-sm text-xs flex gap-2">
                رقم الشهادة{" "}
                <span className="text-[#b68a35] block md:hidden">*</span>
              </p>
              <div className="flex gap-1 md:w-2/3 w-full">
                <p className="text-[#b68a35] hidden md:block">*</p>
                <div className="relative w-full">
                  <input
                    value={certificateNumber}
                    onChange={(e) => setCertificateNumber(e.target.value)}
                    type="text"
                    className="w-full p-1 md:py-1 py-2 border outline-none border-gray-300 md:text-xs text-lg"
                  />
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-400">
                    <BiSolidMicrophone />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-dashed border-zinc-300 mt-2"></div>
          <div className="flex mt-2 flex-col gap-3 p-1 w-full md:max-w-[700px]">
            <div className="flex md:flex-row flex-col md:justify-between justify-start gap-2 md:items-center items-start">
              <p className="text-[#b68a35] md:text-sm text-xs flex gap-2">
                رمز التحقق{" "}
                <span className="text-[#b68a35] block md:hidden">*</span>
              </p>
              <div className="flex gap-1 md:w-2/3 w-full">
                <p className="text-[#b68a35] hidden md:block">*</p>
                <div className="relative w-full">
                  <input
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    type="text"
                    className="w-full p-1 md:py-1 py-2 border outline-none border-gray-300 md:text-xs text-lg"
                  />
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-400">
                    <BiSolidMicrophone />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-dashed border-zinc-300 mt-2"></div>
          <div className="flex mt-2 flex-col gap-3 p-1 w-full max-w-[700px]">
            <div className="flex md:flex-row flex-col justify-between gap-2 items-start">
              <p className="text-[#b68a35] text-sm flex gap-2">
                ادخل الأحرف الظاهره
                <span className="text-[#b68a35] block md:hidden">*</span>
              </p>
              <div className="flex flex-col md:w-2/3 w-full">
                <div className="flex gap-1 w-full">
                  <p className="text-[#b68a35] hidden md:block">*</p>
                  <div className="relative w-full">
                    <input
                      value={captchaCode}
                      onChange={(e) => setCaptchaCode(e.target.value)}
                      type="text"
                      className="w-full p-1 md:py-1 py-2 border outline-none border-gray-300 md:text-xs text-lg"
                    />
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-400">
                      <BiSolidMicrophone />
                    </span>
                  </div>
                  <span className="my-auto text-[#b68a35]">
                    <BiInfoCircle />
                  </span>
                </div>
                {/* capcha */}
                <div className="relative">
                  <img
                    className="captcha-container captcha flex flex-col justify-center items-center text-center bg-cover w-[170px] h-[50px] mt-3"
                    src={captcha?.image}
                  />
                  <span
                    onClick={generateCaptcha}
                    className="absolute top-3.5 text-xl text-black cursor-pointer right-1"
                  >
                    <BiRefresh />
                  </span>
                </div>
                {/* capcha */}
                {error && (
                  <p className="text-red-600 text-xs mt-2 cairo font-bold">
                    الأحرف المدخلة خاطئة
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-dashed border-zinc-300 mt-2"></div>
          <div className="flex gap-3 mt-3">
            <button
              onClick={downloadCertificate}
              className="p-1 w-fit md:py-1 py-3 cairo md:rounded-md bg-zinc-400 text-xs text-white px-3"
            >
              ارسال
            </button>
            <button className="p-1 w-fit md:py-0 py-3 cairo md:rounded-md bg-zinc-400 text-xs text-white px-3">
              مسح
            </button>
          </div>
        </div>
      </div>

      {/* absolute */}
      <div className="p-2 md:flex hidden arabic gap-2 items-center text-lg px-5 fixed rounded-full w-fit bottom-4 left-4 bg bg-[#b68a35]">
        <span className="my-auto flex">
          <RiChat3Line />
        </span>
        <p>الدردشة الإكترونية</p>
      </div>
      <div className="w-full flex max-w-[55px] h-fit rounded-full fixed bottom-4 right-4 bg bg-[#b68a35] z-50">
        <img
          src="https://cwp.missouri.edu/wp-content/uploads/sites/2/2023/02/Gold-Bot-768x768.png"
          alt=""
          style={{ filter: "invert(100%) brightness(3000%)", width: "100%" }}
        />
      </div>

      <div ref={parent} dir="ltr" className="hidden">
        <AdminCRUCertificate
          div1Ref={div1Ref}
          div2Ref={div2Ref}
          div3Ref={div3Ref}
          view
        />
      </div>
    </div>
  );
};

export default CertificateDownload;
