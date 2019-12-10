import URL from './URL';

const API = {
  REGISTER: `${URL}/admins/register`,
  LOGIN: `${URL}/admins/login`,
  GET_ADMIN_LIST: `${URL}/admins/list`,
  REMOVE_ADMIN: `${URL}/admins/remove`,
  CHANGE_PASSWORD: `${URL}/admins/changepassword`,
  UPDATE_INFO: `${URL}/admins/updateinfo`,
};

export default API;
