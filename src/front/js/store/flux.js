const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      currentEmail: "",
      currentPassword: "",
      isActive: "",
      token: "",
      footerMessage: "",
    },
    actions: {
      // Use getActions to call a function within a fuction
      loginHandler: (newEmail, newPassword) => {
        setStore({ currentEmail: newEmail });
        setStore({ currentPassword: newPassword });
        let store = getStore();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          email: store.currentEmail,
          password: store.currentPassword,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(process.env.BACKEND_URL + "/login", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setStore({ token: result.token });
            console.log(store);
            if (!store.token) {
              setStore({ footerMessage: "Nombre y/o contraseña inválidos." });
            } else {
              setStore({ footerMessage: "" });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },

      getUserData: () => {
        const store = getStore();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${store.token}`);

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(process.env.BACKEND_URL + "/privada", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setStore({ isActive: result.usuario.is_active });
          })
          .catch((error) => console.log("error", error));
      },

      registerHandler: (newEmail, newPassword) => {
        setStore({ currentEmail: newEmail });
        setStore({ currentPassword: newPassword });
        let store = getStore();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          email: store.currentEmail,
          password: store.currentPassword,
          is_active: true,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(process.env.BACKEND_URL + "/registro", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setStore({ footerMessage: "" });
          })
          .catch((error) => {
            console.log("error", error);
            setStore({ footerMessage: "Email ya registrado." });
          });
      },

      logOut: () => {
        setStore({ token: "" });
      },

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
