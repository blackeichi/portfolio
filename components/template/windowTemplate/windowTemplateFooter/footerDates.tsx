import Image from "next/image";
import { memo, useEffect, useState } from "react";

function padTwoDigits(num: number) {
  return num.toString().padStart(2, "0");
}

function getFormattedDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTwoDigits(date.getMonth() + 1),
      padTwoDigits(date.getDate()),
    ].join(".") +
    " " +
    [padTwoDigits(date.getHours()), padTwoDigits(date.getMinutes())].join(":")
  );
}

function FooterDates() {
  const [time, setTime] = useState<Date>(new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 10000);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className={`flex h-full items-center justify-center gap-2.5 border-3 border-gray-500 border-r-gray-300 border-b-gray-300 px-1.5`}
    >
      <div className="flex items-center gap-1">
        <Image
          width={15}
          height={15}
          alt="calendar"
          src="/images/calendar.png"
        />
        <Image width={15} height={15} alt="clock" src="/images/clock.png" />
      </div>
      {getFormattedDate(time)}
    </div>
  );
}

export default memo(FooterDates);
