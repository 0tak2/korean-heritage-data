/**
 * YYYY-MM-DD HH:mm:ss 형식의 KST 시간 문자열을 Date 객체로 변환한다.
 * @param original YYYY-MM-DD HH:mm:ss 형식의 문자열
 * @returns Date 객체
 */
function parseKSTDate(original: string): Date {
  const [datePart, timePart] = original.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);

  // KST(UTC+9) 기준으로 Date 객체 생성
  return new Date(Date.UTC(year, month - 1, day, hour - 9, minute, second));
}

export { parseKSTDate }