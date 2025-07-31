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
        //Refrescar token
        const newToken = response.headers.get("authorization");
        if (newToken) {
          localStorage.setItem("jwt", newToken);
        }

        // Mostrar errores con toastr
        // if (response.status == 400 || response.status == 500) {
        //   try {
        //     console.log("response", response);
            
        //     console.log("response status", response.status);
        //     const clonedResponse = response.clone();
        //     response.json().then(json =>{
        //       const errorMessage = json.meta?.message || "Error desconocido";
        //       toast.error(errorMessage);
        //     });
            
        //   } catch (err) {
        //     toast.error("Error al procesar la respuesta del servidor");
        //   }
        // }

        return response;
      }
    });

    return unregister;
  };

  export default registerInterceptor;