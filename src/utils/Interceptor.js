  import * as fetchIntercept from 'fetch-intercept';
  import toast, { Toaster } from 'react-hot-toast';

  const registerInterceptor = () => {
    const unregister = fetchIntercept.register({
      request: function (url, config) {

        const token = localStorage.getItem('jwt');
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `${token}`;
        }
        return [url, config];
      },

      response: async function (response) {

        //Acceso a una ruta no autorizada
        if(response.status === 405){
          toast.error("Acceso No Autorizado.");
          window.location.href ="/";
        }
        //Refrescar token
        const newToken = response.headers.get("authorization");
        if (newToken) {
          localStorage.setItem("jwt", newToken);
        }

        return response;
      }
    });

    return unregister;
  };

  export default registerInterceptor;