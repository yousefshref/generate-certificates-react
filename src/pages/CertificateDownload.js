import React, { useEffect, useState } from "react";
import {
  BiInfoCircle,
  BiRefresh,
  BiSearch,
  BiSolidMicrophone,
} from "react-icons/bi";
import { BsFillInfoCircleFill, BsPerson } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowDown, IoLogoAndroid } from "react-icons/io";
import { MdOutlineTextDecrease, MdOutlineTextIncrease } from "react-icons/md";
import { PiPrinterLight } from "react-icons/pi";
import { RiChat3Line } from "react-icons/ri";
import { RxHome } from "react-icons/rx";
import { server } from "../utlits/Variables";
import { useParams } from "react-router-dom";
import AdminCRUCertificate from "./AdminCRUCertificate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  FaApple,
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

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
      {
        text: "869M79",
        image: "/captcha/c13.jpg",
      },
      {
        text: "786LE7",
        image: "/captcha/c14.jpg",
      },
      {
        text: "869C9A",
        image: "/captcha/c16.jpg",
      },
      {
        text: "KCHBM5",
        image: "/captcha/c17.jpg",
      },
      {
        text: "85HK5D",
        image: "/captcha/c18.jpg",
      },
      {
        text: "BD9696",
        image: "/captcha/c19.jpg",
      },
      {
        text: "H9MAJ7",
        image: "/captcha/c20.jpg",
      },
      {
        text: "C9819K",
        image: "/captcha/c21.jpg",
      },
      {
        text: "EH8867",
        image: "/captcha/c22.jpg",
      },
      {
        text: "J6K6C9",
        image: "/captcha/c23.jpg",
      },
      {
        text: "B96855",
        image: "/captcha/c24.jpg",
      },
      {
        text: "H8D8KG",
        image: "/captcha/c25.jpg",
      },
      {
        text: "9796G8",
        image: "/captcha/c26.jpg",
      },
      {
        text: "95D576",
        image: "/captcha/c27.jpg",
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

        // const pdf = new jsPDF();
        const pdf = new jsPDF({
          unit: "in", // or 'pt', 'in', 'cm', 'mm'
          format: "a4",
          orientation: "portrait",
        });

        // Function to load an image and return its dimensions
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
    } else {
      setError(true);
    }

    setDownloading(false);
  };

  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
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

        {/* hidden header */}
        <div
          className={`py-3 md:pb-7 z-[200] transition-all cairo fixed w-full md:max-w-full max-w-[200px] bg-white text-gray-600 ${
            scrollY > 190 ? "top-0" : "-top-28"
          } shadow-md text-center flex-row justify-center md:justify-normal shadow-black/20 flex items-center bg-white md:right-0 left-1/2 -translate-x-1/2`}
        >
          <p className="md:hidden font-bold block">عد إلي الأعلي</p>
          <span className="me-14 hidden ms-3 text-lg my-auto md:flex flex-col justify-center">
            <RxHome />
          </span>{" "}
          <p className="me-12 hidden md:block">عن الوزارة</p>
          <p className="me-12 hidden md:block">التشريعات</p>
          <p className="me-12 hidden md:block">خدماتنا</p>
          <p className="me-12 hidden md:block">المعرفة</p>
          <p className="me-12 hidden md:block">المشاركة الالكترونية</p>
          <p className="me-12 hidden md:block">المركز الإعلامي</p>
          <p className="me-12 hidden md:block">البيانات المفتوحة</p>
          <p className="block md:hidden"></p>
        </div>

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
          <div className="md:flex cairo hidden gap-3 text-xs">
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
              <MdOutlineTextIncrease />
            </span>
            <span className="p-2 rounded-full bg-gray-100 flex flex-col justify-center transition-all duration-300 hover:bg-gray-400 cursor-pointer md:text-zinc-700 text-zinc-500 text-xl hover:text-white">
              <MdOutlineTextDecrease />
            </span>
          </div>
        </div>

        {/* download section */}
        <div className="flex gap-14 md:mt-9 mt-4 text-zinc-500 p-2 bg-white">
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
            <hr className="h-[1.5px] md:block hidden bg-zinc-400 my-2" />
            <div className="flex md:mt-0 mt-2 flex-col text-black/70">
              <p className="text-[10.5px]">
                يمكنك الان التحقق من الشهادات او التصاريح التي يتم إصدارها من
                وزارة التغير المناخي والبيئة من خلال ادخال رقم المستند (رقم
                الشهادة أو رقم التصريح) ثم ادخال كود التحقق المذكور على المستند
              </p>
              <p className="text-xs">
                الحقول المشار إليها بعلامة ( * ) إلزامية
              </p>
            </div>
            <div className="flex md:mt-2 mt-0 flex-col gap-3 p-1 w-full md:max-w-[700px]">
              <div className="flex md:flex-row flex-col md:justify-between justify-start gap-2 md:items-center items-start">
                <p className="text-[#b68a35] md:text-sm text-xs flex gap-2">
                  رقم الشهادة{" "}
                  <span className="text-[#b68a35] block md:hidden">*</span>
                </p>
                <div className="flex gap-1 md:w-2/3 w-full">
                  <p className="text-[#b68a35] hidden md:block">*</p>
                  <div className="relative flex w-full">
                    <input
                      value={certificateNumber}
                      onChange={(e) => setCertificateNumber(e.target.value)}
                      type="text"
                      className="w-full p-1 md:py-1 py-2 border outline-none border-gray-300 md:text-xs text-lg"
                    />
                    <span className="md:absolute my-auto md:-ms-0 -ms-1.5 md:text-base text-xl md:mt-0 mt-5 left-1 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-400">
                      <BiSolidMicrophone />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-dashed border-zinc-300 mt-0.5 md:mt-2"></div>
            <div className="flex md:mt-2 mt-0 flex-col gap-3 p-1 w-full md:max-w-[700px]">
              <div className="flex md:flex-row flex-col md:justify-between justify-start gap-2 md:items-center items-start">
                <p className="text-[#b68a35] md:text-sm text-xs flex gap-2">
                  رمز التحقق{" "}
                  <span className="text-[#b68a35] block md:hidden">*</span>
                </p>
                <div className="flex gap-1 md:w-2/3 w-full">
                  <p className="text-[#b68a35] hidden md:block">*</p>
                  <div className="relative flex w-full">
                    <input
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      type="text"
                      className="w-full p-1 md:py-1 py-2 border outline-none border-gray-300 md:text-xs text-lg"
                    />
                    <span className="md:absolute my-auto md:-ms-0 -ms-1.5 md:text-base text-xl md:mt-0 mt-5 left-1 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-400">
                      <BiSolidMicrophone />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-dashed zinc-0.500 md:mt-2"></div>
            <div className="flex md:mt-2 mt-1 flex-col gap-3 p-1 w-full max-w-[700px]">
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
                      <span className="absolute md:hidden block left-3 top-[65%] -translate-y-1/2 my-auto text-[#b68a35]">
                        <BsFillInfoCircleFill />
                      </span>
                    </div>
                    <span className="md:block hidden my-auto text-[#b68a35]">
                      <BsFillInfoCircleFill />
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
        <div className="md:p-2 z-[200] p-3 m-0 cairo flex arabic gap-2 items-center my-auto text-lg md:px-5 fixed rounded-full w-fit bottom-4 left-4 bg bg-[#b68a35]">
          <span className="my-auto flex">
            <RiChat3Line />
          </span>
          <p className="md:block hidden">الدردشة الإكترونية</p>
        </div>
        <div className="w-full flex max-w-[55px] h-fit rounded-full fixed bottom-4 right-4 bg bg-[#b68a35] z-50">
          <img
            src="https://cwp.missouri.edu/wp-content/uploads/sites/2/2023/02/Gold-Bot-768x768.png"
            alt=""
            style={{ filter: "invert(100%) brightness(3000%)", width: "100%" }}
          />
        </div>

        {/* under */}
        <div className="hidden mt-20 md:flex gap-3">
          <div className="bg-[#f7f7f7] p-4 px-16 transition-all hover:scale-105 duration-300 cursor-pointer">
            <img src="/img1.png" />
          </div>
          <div className="bg-[#f7f7f7] p-4 px-16 transition-all hover:scale-105 duration-300 cursor-pointer">
            <img src="/img2.png" />
          </div>
          <div className="bg-[#f7f7f7] p-4 px-16 transition-all hover:scale-105 duration-300 cursor-pointer">
            <img src="/img3.png" />
          </div>
        </div>
        <div className="md:hidden block bg-white">
          <Swiper
            spaceBetween={100}
            slidesPerView={1}
            className="bg-[#f7f7f7] mt-14"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
          >
            <SwiperSlide>
              <img src="/img1.png" className="w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img2.png" className="w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img3.png" className="w-full" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="md:mt-14 mt-0 md:pt-0 pt-14 md:pb-0 pb-3 bg-white flex gap-3">
          <p className="text-xs cairo text-zinc-500">
            آخر تحديث للصفحة تم في : اﻷربعاء، 01 فبراير 2023 12:35م
          </p>
        </div>
      </div>
      {/* footer */}
      <div
        dir="rtl"
        className="mt-5 p-5 bg-[#fafafa] border-b flex flex-col md:px-16 px-0"
      >
        <div className="flex md:flex-row flex-col gap-3 justify-between md:border-b border-b-0 cairo text-sm">
          <div className="flex md:flex-row flex-col md:w-[78%] w-full gap-6 py-8 h-full md:border-l border-l-0">
            <div className="flex md:text-start text-center justify-center md:justify-start gap-4 md:w-[30%] w-full">
              <p className="text-[#cd9835]">عدد الزوار</p>
              <p className="text-[#a7a7a7] font-bold">4323</p>
            </div>
            <div className="flex flex-row justify-center md:justify-start gap-4 items-center">
              <p className="text-[#cd9835]">تحميل تطبيق الهاتف المحمول</p>
              <span className="text-xl text-[#a7a7a7] flex flex-col justify-center">
                <IoLogoAndroid />
              </span>
              <span className="text-lg text-[#a7a7a7] flex flex-col justify-center">
                <FaApple />
              </span>
            </div>
            <hr className="h-[1px] w-full bg-[#a7a7a7] md:hidden block" />
          </div>
          <div className="md:w-[22%] w-full my-auto ps-3">
            <div className="flex flex-row w-full justify-around md:justify-start gap-3">
              <p>اشترك في السيرة الإخبارية</p>
              <p className="text-[#cd9835]">اشتراك</p>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:mt-0 gap-16 cairo text-sm mt-8">
          <div className="flex flex-col md:items-start items-center">
            <img
              className="w-[240px]"
              src="https://eservices.moccae.gov.ae/Images/partners/logo-new-en.png?123"
            />
            <img
              className="w-[130px] mt-3"
              src="https://eservices.moccae.gov.ae/Images/partners/government-ae-logo-english.png?1234"
            />
            <img
              src="https://eservices.moccae.gov.ae/Images/partners/beeatna-en.png"
              className="w-[230px]"
            />
          </div>
          <div className="flex md:gap-16 md:flex-row gap-4">
            <div className="flex flex-col text-xs gap-2">
              <p className="text-[#cd9835] text-sm">عن الموقع</p>
              <p className="text-[#a7a7a7]">حقوق النسخ</p>
              <p className="text-[#a7a7a7]">سياسة الخصوصية</p>
              <p className="text-[#a7a7a7]">الشروط والأحكام</p>
              <p className="text-[#a7a7a7]">إخلاء المسؤولية</p>
            </div>
            <div className="flex flex-col text-xs gap-2">
              <p className="text-[#cd9835] text-sm">روابط سريعة</p>
              <p className="text-[#a7a7a7]">النشره الإخبارية</p>
              <p className="text-[#a7a7a7]">الصفحة الرئيسية</p>
              <p className="text-[#a7a7a7]">بريد الموظفين</p>
              <p className="text-[#a7a7a7]">بوابتي</p>
              <p className="text-[#a7a7a7]">الوظائف</p>
              <p className="text-[#a7a7a7]">ميثاق سعادة المتعاملين</p>
            </div>
            <div className="flex flex-col mt-7 text-xs gap-2">
              <p className="text-[#a7a7a7]">الأرشيف</p>
              <p className="text-[#a7a7a7]">اسئلة شائعة</p>
              <p className="text-[#a7a7a7]">مساعدة</p>
              <p className="text-[#a7a7a7]">اتصل بنا</p>
              <p className="text-[#a7a7a7]">البحث المتقدم</p>
              <p className="text-[#a7a7a7]">خريطة الموقع</p>
              <p className="text-[#a7a7a7]">مراكز سعادة المتعاملين</p>
            </div>
            <div className="hidden md:flex gap-3 flex-col mt-14 w-[23%] ms-auto text-xs">
              <p className="font-bold text-[#a7a7a7]">
                تم الاختبار بواسطة aeCert
              </p>
              <p className="text-[#a7a7a7]">
                هذا الموقع يمكن تصفحه بالشكل المناسب من خلال شاشة 1024x768
              </p>
              <div className="flex flex-col">
                <div className="flex gap-5 justify-between w-[80%]">
                  <p className="text-[#cd9835]">تدعم</p>
                  <p className="text-[#cd9835]">تقنيات التلعب</p>
                </div>
                <div className="flex mt-2 cairo flex-col ms-5 text-[#a7a7a7]">
                  <div className="flex gap-7">
                    <p>10.0+</p>
                    <p>48+</p>
                  </div>
                  <div className="flex gap-7">
                    <p>1.2+</p>
                    <p>39.0+</p>
                  </div>
                  <div className="flex gap-7">
                    <p>43.0+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer of the footer hahaha, jk */}
      <div
        dir="rtl"
        className="flex md:flex-row flex-col cairo text-xs text-[#a7a7a7] py-5 justify-between px-10 bg-[#fafafa]  items-center"
      >
        <div className="flex md:text-start text-center md:flex-row flex-col gap-5 items-center justify-between w-full md:w-[50%]">
          <p>
            حقوق الطبع © 2023 جميع الحقوق محفوظة. وزارة التغير المناخي والبيئة.
          </p>
          <div className="flex text-lg text-[#828181] gap-5 md:m-0 md:mt-0 mt-4 me-auto">
            <span>
              <FaFacebookF />
            </span>
            <span>
              <FaTwitter />
            </span>
            <span>
              <FaYoutube />
            </span>
            <span>
              <FaInstagramSquare />
            </span>
            <span>
              <FaLinkedinIn />
            </span>
          </div>
        </div>
        <div className="flex md:mt-0 mt-12 md:m-0 ms-auto gap-2 text-base items-center">
          <p className="font-bold">800 30 50</p>
          <span className="text-[#cd9835]">
            <FaPhoneAlt />
          </span>
        </div>
      </div>
      {/*  */}
      <div className="md:hidden block text-center bg-[#cd9835] text-white font-bold py-2 px-4">
        <p>الموقع الرئيسي</p>
      </div>

      <div ref={parent} dir="ltr" className="hidden">
        <AdminCRUCertificate
          noPadding
          div1Ref={div1Ref}
          div2Ref={div2Ref}
          div3Ref={div3Ref}
          view
        />
      </div>
    </>
  );
};

export default CertificateDownload;
