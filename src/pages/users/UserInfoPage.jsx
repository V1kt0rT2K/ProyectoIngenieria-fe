import { useEffect, useRef, useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import Configuration from "../../Configuration";
import AdminService from "../../utils/service/AdminService";
import PublicService from "../../utils/service/PublicService";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

const UserInfoPage = () => {
  const location = useLocation();
  const { id } = location.state;

  const fieldsRef = useRef(null);
  const roleRef = useRef(null);
  const enabledRef = useRef(null);

  const [userRoles, setUserRoles] = useState([]);

  const [values, setValues] = useState(null);
  const firstValues = useRef(null);

  const [checked, setChecked] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({});

  const saveUser = async (user) => {
    setSaving(true);

    try {
      const res = await fetch(`${Configuration.API_BASE_URL}/users/update/${values.idUser}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      if (!res.ok) {
        throw new Error();
      }

      const data = await res.json();
      console.log(data);

      setMsg({ show: true, color: "text-green-700", msg: "Usuario guardado." });
    } catch (err) {
      setMsg({ show: true, color: "text-red-600", msg: "No se pudo realizar la operacion." })
    } finally {
      setSaving(false);
    }
  }

  const handleMode = async (save) => {
    console.log(values);
    setMsg({});
    setEditMode(!editMode);

    let obj = {};

    roleRef.current.disabled = editMode;
    fieldsRef.current.querySelectorAll("input").forEach(input => {
      input.disabled = editMode;

      obj[input.name] = input.value;

      if (input.name === "date") input.disabled = true;
    });

    obj["enabled"] = checked;
    obj["role"] = roleRef.current.value;

    console.log(obj);

    if (!save) {
      setValues(firstValues.current);
      return;
    }

    await saveUser(obj);
  }

  useEffect(() => {
    AdminService.getAllRoles().then(response => {
      if (!response.hasError)
        setUserRoles(response.data);
    });

    AdminService.getUserById(id).then(response => {
      if (!response.hasError) {
        const data = response.data;

        const obj = {
          idUser: data.idUser,
          firstName: data.Person.firstName,
          secondName: data.Person.secondName,
          lastName: data.Person.lastName,
          secondLastName: data.Person.secondLastName,
          idRole: data.idRole,
          userName: data.UserRequests[0].userName,
          identityNumber: data.Person.identityNumber,
          date: data.UserRequests[0].generationDate,
          email: data.email,
          isEnabled: data.isEnabled,
        };

        setChecked(obj.isEnabled);
        setValues(obj);
        firstValues.current = { ...obj };

        enabledRef.current.checked = obj.isEnabled;
      }
    });
  }, []);

  return (
    <>
      <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
        <BackButton />
        <div className="flex justify-between">
          {
            !editMode
              ? <p className="mb-2 text-lg text-orange-800 font-semibold underline">Informacion de usuario</p>
              : <p className="mb-2 text-lg text-orange-800 font-semibold underline">Editar la informacion del usuario</p>
          }
          {
            saving
            && (
              <>
                <div className="flex justify-center items-center space-x-2">
                  <Spinner loading={true} size={15} margin={2} />
                  <p className="text-orange-800 text-lg font-semibold">Guardando usuario...</p>
                </div>
              </>
            )
          }
          {
            msg.show
            && (
              <>
                <p className={`${msg.color} font-semibold px-3 rounded text-lg`}>{msg.msg}</p>
              </>
            )
          }
        </div>

        <div className="bg-orange-200 rounded overflow-y-auto">
          <div ref={fieldsRef} className="pb-4 px-2 pr-6 ml-2 flex flex-col justify-center mt-2">
            <label className="text-md text-orange-900">Primer nombre</label>
            <input
              value={values ? values.firstName : ""}
              onChange={e => setValues({ ...values, ...{ firstName: e.target.value } })}
              disabled
              className="focus:outline-none flex-grow rounded py-1 px-3 text-md"
              name="firstName"
            />

            <label className="mt-2 text-md text-orange-900">Segundo nombre</label>
            <input
              value={values ? values.secondName : ""}
              onChange={e => setValues({ ...values, ...{ secondName: e.target.value } })}
              disabled
              className="focus:outline-none flex-grow rounded py-1 px-3 text-md"
              name="secondName"
            />

            <label className="mt-2 text-md text-orange-900">Primer apellido</label>
            <input
              value={values ? values.lastName : ""}
              onChange={e => setValues({ ...values, ...{ lastName: e.target.value } })}
              disabled
              className="focus:outline-none flex-grow rounded py-1 px-3 text-md"
              name="lastName"
            />

            <label className="mt-2 text-md text-orange-900">Segundo apellido</label>
            <input
              value={values ? values.secondLastName : ""}
              onChange={e => setValues({ ...values, ...{ secondLastName: e.target.value } })}
              disabled
              className="focus:outline-none flex-grow rounded py-1 px-3 text-md"
              name="secondLastName"
            />

            <label className="mt-2 text-md text-orange-900">Nombre de usuario</label>
            <input
              value={values ? values.userName : ""}
              onChange={e => setValues({ ...values, ...{ userName: e.target.value } })}
              disabled
              className="focus:outline-none flex-grow rounded py-1 px-3 text-md"
              name="username"
            />

            <label className="mt-2 text-md text-orange-900">Numero de identidad</label>
            <input
              value={values ? values.identityNumber : ""}
              onChange={e => setValues({ ...values, ...{ identityNumber: e.target.value } })}
              disabled
              className="focus:outline-none flex-grow rounded py-1 px-3 text-md"
              name="identityNumber"
              type="text"
            />

            <label className="mt-2 text-md text-orange-900">Rol asignado</label>
            <select onChange={(e) => setValues({ ...values, idRole: parseInt(e.target.value) })} value={values ? values.idRole : ""} disabled ref={roleRef} className="focus:outline-none flex-grow rounded py-1 px-3 text-md">
              <option key={0} value={0}>Seleccionar rol</option>
              {
                userRoles.map(role => <option value={role.idRole} key={role.idRole}>{ role.roleName }</option>)
              }
            </select>

            <label className="mt-2 text-md text-orange-900">Fecha de creacion de usuario</label>
            <input
              value={dayjs(values ? values.generationDate : "").format('YYYY-MM-DD HH:mm:ss') ?? ""}
              onChange={e => setValues({ ...values, ...{ date: e.target.value } })}
              disabled
              className="focus:outline-none flex-grow rounded py-1 px-3 text-md"
              type="text"
              name="date"
            />

            <label className="mt-2 text-md text-orange-900">Email</label>
            <input
              value={values ? values.email : ""}
              onChange={e => setValues({ ...values, ...{ email: e.target.value } })}
              disabled
              className="focus:outline-none flex-grow rounded py-1 px-3 text-md"
              type="email"
              name="email"
            />

            <div className="mt-2 flex justify-between">
              <p className="text-md text-orange-900">Usuario habilitado</p>
              <input
                onChange={() => setChecked(checked => !checked)}
                ref={ enabledRef }
                disabled
                className="w-4 checked:bg-blue-100 checked:border-transparent"
                type="checkbox"
                name="enabled"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-2 mt-3 mb-1">
          {
            editMode
              ? (
                <>
                  <button
                    onClick={() => handleMode(true)}
                    className="hover:cursor-pointer rounded text-md text-white font-semibold px-3 py-1 bg-green-700"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => handleMode(false)}
                    className="hover:cursor-pointer rounded text-md text-white font-semibold px-3 py-1 bg-red-700"
                  >
                    Cancelar
                  </button>
                </>
              )
              : (
                <>
                  <button
                    onClick={() => handleMode(false)}
                    className="hover:cursor-pointer rounded text-md text-white font-semibold px-3 py-1 bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button className="hover:cursor-pointer rounded text-md text-white font-semibold px-3 py-1 bg-red-700">
                    Eliminar
                  </button>
                </>
              )
          }
        </div>
      </div>
    </>
  );
}

export default UserInfoPage;
