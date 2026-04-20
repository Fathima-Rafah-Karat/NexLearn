const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://nexlearn.noviindusdemosites.in/";

// Ensure base URL ends with a single slash
const base = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;

export const CREATE_PROFILE = `${base}auth/create-profile`;
export const NUMBER = `${base}auth/send-otp`;
export const VERIFY_OTP = `${base}auth/verify-otp`;
export const SUBMIT = `${base}answers/submit`;
export const LOGOUT = `${base}auth/logout`;
export const LIST = `${base}question/list`;