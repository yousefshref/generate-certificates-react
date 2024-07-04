import React, { useEffect, useRef } from "react";
import {
  BiInfoCircle,
  BiMicrophone,
  BiRefresh,
  BiSearch,
  BiSolidMicrophone,
} from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { CiMenuBurger, CiSettings } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { MdOutlineTextDecrease, MdOutlineTextIncrease } from "react-icons/md";
import { PiPrinterLight } from "react-icons/pi";
import { RiChat3Line } from "react-icons/ri";
import { RxHamburgerMenu, RxHome } from "react-icons/rx";
import { server } from "../utlits/Variables";
import { useNavigate, useParams } from "react-router-dom";
import { TbDisabled } from "react-icons/tb";

const CertificateDownload = () => {
  const [captcha, setCaptcha] = React.useState("");
  const generateCaptcha = () => {
    setCaptcha(
      Array.from(
        { length: 6 },
        () => Math.random().toString(36).toUpperCase()[2]
      ).join("")
    );
  };
  useEffect(() => {
    generateCaptcha();
  }, []);

  const [certificateNumber, setCertificateNumber] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [captchaCode, setCaptchaCode] = React.useState("");

  const params = useParams();

  const [certificate, setCertificate] = React.useState({});
  const getCertificate = async () => {
    const response = await fetch(`${server}api/certificates/${params.ID}/`, {
      method: "GET",
    });
    const data = await response.json();
    setCertificateNumber(data.number);
    setVerificationCode(data.verification_code);
    setCertificate(data);
  };

  useEffect(() => {
    getCertificate();
  }, []);

  const navigate = useNavigate();

  const handleDownloadPdf = async () => {
    if (
      certificate?.number == certificateNumber &&
      captcha == captchaCode &&
      certificate?.verification_code == verificationCode
    ) {
      navigate("/view-certificate/" + params.ID + "/check-download/");
    } else {
      alert("Invalid Captcha Code or Certificate Number");
    }
  };

  return (
    <div
      style={{ direction: "rtl" }}
      className="flex cairo flex-col md:px-16 md:py-4 p-0 md:bg-white bg-gray-100"
    >
      {/* header */}
      <div className="flex md:justify-end justify-between p-3 items-center bg-white">
        <span className="md:hidden text-xl flex flex-col justify-center cursor-pointer p-3 bg-yellow-600 text-white h-fit">
          <RxHamburgerMenu className="font-bold" />
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
      <div className="flex gap-3 text-sm text-zinc-600 p-3 bg-white">
        <select className="rounded-full font-bold bg-zinc-100 border outline-none w-full max-w-[100px]">
          <option>عربي</option>
          <option>english</option>
          <option>اردو</option>
        </select>
        <span className="text-xl">
          <TbDisabled />
        </span>
        <span className="text-xl">
          <CiSettings />
        </span>
        <span className="text-xl">
          <RxHome />
        </span>
      </div>

      {/* navigate */}
      <div className="md:flex hidden min-w-full border-b border-b-yellow-600 pb-5 text-zinc-600 items-center justify-between p-2 px-5">
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
          <span className="text-xl my-auto mx-4 text-yellow-600">
            <BiSearch />
          </span>
          <span className="text-xl my-auto mx-4 text-yellow-600">
            <BsPerson />
          </span>
          <span className="text-xl my-auto mx-4 text-yellow-600">
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
            <span className="text-yellow-600 font-bold">
              <GoDotFill />
            </span>
          </div>
          <div className="flex gap-1">
            <p>مساحة العمل</p>
            <span className="text-yellow-600 font-bold">
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
      <div className="flex gap-14 mt-2 text-zinc-500 p-2 bg-white">
        {/* important links */}
        <div className="w-[260px] md:flex h-fit pb-3 min-w-[260px] rounded-xl p-1 border border-gray-300 hidden flex-col">
          <h3 className="text-xl font-bold mt-4">روابط هامة</h3>
          <hr className="h-[1.5px] bg-zinc-400 my-2" />
          <div className="flex flex-col font-bold text-neutral-700 text-sm">
            <div className="flex justify-between items-center p-2 border-b mb-2 px-3 hover:px-1 cursor-pointer hover:bg-zinc-100">
              <p>تسجيل الدخول</p>
              <span className="text-yellow-600">
                <IoIosArrowBack />
              </span>
            </div>
            <div className="flex justify-between items-center p-2 border-b mb-2 px-3 hover:px-1 cursor-pointer hover:bg-zinc-100">
              <p>رد الإيراد الالكتروني</p>
              <span className="text-yellow-600">
                <IoIosArrowBack />
              </span>
            </div>
            <div className="flex justify-between items-center p-2 border-b mb-2 px-3 hover:px-1 cursor-pointer hover:bg-zinc-100">
              <p>دليل استخدام الخدمات الرقمية</p>
              <span className="text-yellow-600">
                <IoIosArrowBack />
              </span>
            </div>
            <div className="flex justify-between bg-zinc-300 items-center p-2 border-b mb-2 px-3 hover:px-1 cursor-pointer">
              <p>مركز الشهادات والتصاريح الرقمية</p>
              <span className="text-yellow-600">
                <IoIosArrowBack />
              </span>
            </div>
          </div>
        </div>
        {/* download verification */}
        <div className="w-full flex flex-col">
          <h3 className="md:text-xl text-base font-bold md:bg-white bg-yellow-600 text-white p-1 px-2">
            مركز الشهادات والتصاريح الرقمية
          </h3>
          <hr className="h-[1.5px] bg-zinc-400 my-2" />
          <div className="flex flex-col">
            <p className="text-xs">
              يمكنك الان التحقق من الشهادات او التصاريح التي يتم إصدارها من
              وزارة التغير المناخي والبيئة من خلال ادخال رقم المستند (رقم
              الشهادة أو رقم التصريح) ثم ادخال كود التحقق المذكور على المستند
            </p>
            <p className="text-xs">الحقول المشار إليها بعلامة ( * ) إلزامية</p>
          </div>
          <div className="flex mt-2 flex-col gap-3 p-1 w-full md:max-w-[700px]">
            <div className="flex md:flex-row flex-col md:justify-between justify-start gap-2 md:items-center items-start">
              <p className="text-yellow-600 md:text-sm text-xs flex gap-2">
                رقم الشهادة{" "}
                <span className="text-yellow-600 block md:hidden">*</span>
              </p>
              <div className="flex gap-1 md:w-2/3 w-full">
                <p className="text-yellow-600 hidden md:block">*</p>
                <div className="relative w-full">
                  <input
                    value={certificateNumber}
                    onChange={(e) => setCertificateNumber(e.target.value)}
                    type="text"
                    className="w-full p-1 border outline-none border-gray-300 text-xs"
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
              <p className="text-yellow-600 md:text-sm text-xs flex gap-2">
                رمز التحقق{" "}
                <span className="text-yellow-600 block md:hidden">*</span>
              </p>
              <div className="flex gap-1 md:w-2/3 w-full">
                <p className="text-yellow-600 hidden md:block">*</p>
                <div className="relative w-full">
                  <input
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    type="text"
                    className="w-full p-1 border outline-none border-gray-300 text-xs"
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
              <p className="text-yellow-600 text-sm flex gap-2">
                ادخل الأحرف الظاهره
                <span className="text-yellow-600 block md:hidden">*</span>
              </p>
              <div className="flex flex-col md:w-2/3 w-full">
                <div className="flex gap-1 w-full">
                  <p className="text-yellow-600 hidden md:block">*</p>
                  <div className="relative w-full">
                    <input
                      value={captchaCode}
                      onChange={(e) => setCaptchaCode(e.target.value)}
                      type="text"
                      className="w-full p-1 border outline-none border-gray-300 text-xs"
                    />
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-400">
                      <BiSolidMicrophone />
                    </span>
                  </div>
                  <span className="my-auto text-yellow-600">
                    <BiInfoCircle />
                  </span>
                </div>
                {/* capcha */}
                <div
                  className="captcha-container relative captcha flex flex-col justify-center items-center text-center bg-cover w-[170px] h-[50px] mt-3"
                  style={{
                    backgroundImage: `url(/capcha.jpg)`,
                    backgroundSize: "700px",
                  }}
                >
                  <span
                    onClick={generateCaptcha}
                    className="absolute right-1 text-lg top-1 z-50 cursor-pointer text-black"
                  >
                    <BiRefresh />
                  </span>
                  <div className="absolute left-0 top-0 bg-white opacity-50 w-full h-full"></div>
                  <p className="z-50 flex gap-4 text-2xl">{captcha}</p>
                </div>
                {/* capcha */}
              </div>
            </div>
          </div>
          <div className="border-t border-dashed border-zinc-300 mt-2"></div>
          <div className="flex gap-3 mt-3">
            <button
              onClick={handleDownloadPdf}
              className="p-1 w-fit rounded-md bg-zinc-400 text-xs text-white px-3"
            >
              ارسال
            </button>
            <button className="p-1 w-fit rounded-md bg-zinc-400 text-xs text-white px-3">
              مسح
            </button>
          </div>
        </div>
      </div>

      {/* absolute */}
      <div className="p-2 md:flex hidden arabic gap-2 items-center text-lg px-5 fixed rounded-full w-fit bottom-4 left-4 bg bg-yellow-600">
        <span>
          <RiChat3Line />
        </span>
        <p>الدردشة الإكترونية</p>
      </div>
      <div className="w-full max-w-[55px] h-fit rounded-full fixed bottom-4 right-4 bg bg-yellow-600 z-50">
        <img
          src="https://cwp.missouri.edu/wp-content/uploads/sites/2/2023/02/Gold-Bot-768x768.png"
          alt=""
          style={{ filter: "invert(100%) brightness(3000%)", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default CertificateDownload;
