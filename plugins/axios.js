export default function ({ $axios }) {
  $axios.onRequest((config) => {
    const token = localStorage.getItem('token');
    config.headers.common.Authorization = `Bearer ${token}`;
  });
}
