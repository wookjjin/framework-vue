// 숫자 천단위 (,) 표시 util 함수수
export function formatNumber(value: number | string): string {
  return Number(value).toLocaleString();
}

// 전화번호 (-) 하이픈 처리 util 함수수
export function formatTellNumber(phone: string | number) {
  const cleaned = phone.toString().replace(/\D/g, "");

  if (/^01\d{8,9}$/.test(cleaned)) {
    return cleaned.replace(/^(01\d)(\d{3,4})(\d{4})$/, "$1-$2-$3");
  } else if (/^02\d{7,8}$/.test(cleaned)) {
    return cleaned.replace(/^(02)(\d{3,4})(\d{4})$/, "$1-$2-$3");
  } else if (/^0\d{9,10}$/.test(cleaned)) {
    return cleaned.replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
  } else if (/^1\d{7}$/.test(cleaned)) {
    return cleaned.replace(/^(\d{4})(\d{4})$/, "$1-$2");
  }
  return cleaned;
}

// 개인정보 보안 전화번호 Masking 처리 util 함수
export function maskPhoneNumber(phone: string | number) {
  const formatted = formatTellNumber(phone);

  if (/^01\d-\d{3,4}-\d{4}$/.test(formatted)) {
    return formatted.replace(/(\d{2,3}-\d{3,4})-\d{4}$/, "$1-****");
  } else if (
    /^02-\d{3,4}-\d{4}$/.test(formatted) ||
    /^\d{3}-\d{3,4}-\d{4}$/.test(formatted)
  ) {
    return formatted.replace(/^(\d{2,3})-(\d{1,2})\d+-(\d{4})$/, "$1-**$3");
  } else if (/^1\d{3}-\d{4}$/.test(formatted)) {
    return formatted.replace(/(\d{4})-\d{4}$/, "$1-****");
  }

  return formatted;
}
