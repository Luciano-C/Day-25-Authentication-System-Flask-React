const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      currentEmail: "",
      currentPassword: "",
      token: "",
    },
    actions: {
      // Use getActions to call a function within a fuction
      loginHandler: (newEmail, newPassword) => {
        setStore({ currentEmail: newEmail });
        setStore({ currentPassword: newPassword });
        let store = getStore();
        console.log(store, "holahola");

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
          })
          .catch((error) => console.log(error));
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
