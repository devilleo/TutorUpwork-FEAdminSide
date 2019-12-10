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
};

export default API;
