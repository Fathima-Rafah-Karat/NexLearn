const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const CREATE_PROFILE=`${BASE_URL}auth/create-profile`;
export const NUMBER=`${BASE_URL}auth/send-otp`;
export const VERIFY_OTP=`${BASE_URL}auth/verify-otp`;
export const SUBMIT=`${BASE_URL}answers/submit`;
export const LOGOUT=`${BASE_URL}auth/logout`