import URL from './URL';

const API = {
  REGISTER: `${URL}/admins/register`,
  LOGIN: `${URL}/admins/login`,
  GET_ADMIN_LIST: `${URL}/admins/list`,
  REMOVE_ADMIN: `${URL}/admins/remove`,
  CHANGE_PASSWORD: `${URL}/admins/changepassword`,
  UPDATE_INFO: `${URL}/admins/updateinfo`,

  // skills API
  REGISTER_SKILL: `${URL}/skills/register`,
  GET_SKILL_LIST: `${URL}/skills/list`,
  REMOVE_SKILL: `${URL}/skills/remove`,
  UPDATE_SKILL_INFO: `${URL}/skills/updateinfo`,

  // users API
  GET_TUTOR_LIST: `${URL}/users/tutorslist`,
  GET_TUTOR_DETAIL: `${URL}/users/tutordetail`,

  GET_CONTRACTS: `${URL}/users/contracts`,
  GET_MESSAGES_CONVERSATION: `${URL}/conversations/messages`,

  GET_STUDENT_LIST: `${URL}/users/studentslist`,
  GET_STUDENT_DETAIL: `${URL}/users/studentdetail`,
  BLOCK_USER: `${URL}/users/block`,
  UNBLOCK_USER: `${URL}/users/unblock`,

  // contracts Api
  GET_CONTRACT_LIST: `${URL}/contracts/list`,
  UPDATE_CONTRACT_INFO: `${URL}/contracts/update`,
};

export default API;
