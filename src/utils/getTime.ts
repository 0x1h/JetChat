// export const convertTZ = (dateString: string): Date => {
//   const date: Date = new Date(dateString);

//   const timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   const currentDate: string = date.toISOString().split("T")[0].split("-").join("/");
//   const HHMMSS: string = date.toTimeString().split(" ")[0];
//   const GMT: string = date
//     .toString()
//     .split(" ")
//     .find((e) => e.includes("+"))
//     ?.split("+")[1] as string

//   const supportedFormat = `${currentDate} ${HHMMSS} +${GMT}`;

//   const result = new Date(
//     (typeof supportedFormat === "string" ? new Date(supportedFormat) : supportedFormat).toLocaleString("en-US", {
//       timeZone: timeZone,
//     })
//   );

//   return result;
// };

// console.log(
//   convertTZ(
//     "Sat Mar 05 2022 19:45:52 GMT+0400 (Georgia Standard Time)"
//   ).toString()
// );

export const getTime = (date: Date) => {
  let hours:number = date.getHours();
  let minutes: number | string = date.getMinutes();

  const ampm: string = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  
  minutes = (minutes) < 10 ? '0'+minutes : minutes
  
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}