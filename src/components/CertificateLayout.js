import { QRCodeSVG } from "qrcode.react";
import React from "react";

const CertificateLayout = ({ children, table, reference }) => {
  const currentUrl = window.location.href;

  return (
    <div
      ref={reference}
      className="bg-white p-1 w-full max-w-[1000px] flex flex-col"
    >
      <div>
        <img src="/logo.jpg" alt="logo" />
      </div>
      <div className="w-full flex flex-col justify-center">
        <div className="flex gap-3 justify-around items-center bg-lime-600 text-white">
          <p className="font-medium text-[1.9vw]">
            Phytosanitary Certificate for Re-export
          </p>
          <p className="font-medium arabic text-[1.9vw]">
            شهادة الصحة النباتية لإعادة التصدير
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full max-w-[900px] mx-auto">
        {/*  */}

        <div className="children flex flex-col">{children}</div>

        {/*  */}
        <div className="flex flex-col">
          <div className="flex w-full mt-9 text-[1vw]">
            <div className="flex w-1/3 flex-col h-fit text-[1.3vw] text-start">
              <p className="arabic font-bold">الختم الرسمي</p>
              <p className="font-bold">Official Stamp</p>
            </div>
            {table}
          </div>
          <div className="flex gap-3 mt-7">
            <div className="qrHere w-fit items-start flex flex-col justify-start">
              <div className="w-full text-[1vw] mt-0 items-start h-fit">
                <QRCodeSVG
                  className="w-full flex flex-col justify-start"
                  size={Math.min(window.innerWidth, window.innerHeight) / 3}
                  value={currentUrl + "download/"}
                  width={Math.min(window.innerWidth, window.innerHeight) / 3}
                  height={Math.min(window.innerWidth, window.innerHeight) / 4.2}
                />
              </div>
            </div>
            <div className="flex text-[1.5vw] text-neutral-800 w-1/3 flex-col gap-3">
              <p className="arabic">
                للتحقق من صحة بيانات هذا المستند يرجي مسح الشيفرة أو زيارة موقع
                الوزارة
              </p>
              <p>
                To verify this document please scan the QR code or visit the
                ministry's website
              </p>
            </div>
            <div className="flex flex-col text-end w-4/5">
              <p className="arabic text-center text-[1vw]">
                لا تتحمل وزارة التغير المناخي والبيئة في دولة الإمارات العربية
                المتحدة أو أي من موظفيها المختصين أي مسؤولية قانونية أو مالية قد
                تنجم عن هذه الشهادة.
              </p>
              <p className="mt-2 text-[1vw] text-center">
                No financial or legal liability with respect to this certificate
                shall attach to the Ministry Of Climate Change And Environment -
                UAE or to any of its officials in the United Arab Emirates.
              </p>
              <p className="mt-2 arabic text-[1.2vw] text-center text-yellow-700">
                هذا المستند معتمد إلكترونيا ولا يحتاج إلي توقيع أو ختم
              </p>
              <p className="mt-2 text-[1.2vw] text-center text-yellow-700">
                This document is electronically approved and does not require
                signature or stamp
              </p>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default CertificateLayout;
