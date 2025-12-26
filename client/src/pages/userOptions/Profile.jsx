import { useEffect, useState } from "react";
import axios from "axios";
import InputComponent from "../../components/InputProfile";

const URL = import.meta.env.VITE_API_URL;

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(`${URL}/getUserDatas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      }
    };
    fetchUser();
  }, []);

  const datas = [
    { name: "Email", content: user.email, disabled: true },
    { attribute: "address", name: "Address", content: user.address },
    { attribute: "phone", name: "Phone", content: user.phone },
  ];

  const inputs = datas.map((data, i) => {
    return (
      <InputComponent
        key={i}
        attribute={data.attribute || ""}
        label={data.name}
        content={data.content}
        disabled={data.disabled}
        link={data.link}
      />
    );
  });

  return (
    <div className="profile page flex1">
      <section className="flex1 w-full">
        <img
          className="rounded-full w-24 object-cover"
          src={user.picture}
          alt="Image profile"
        />
        <h3>{user.name}</h3>
      </section>
      {inputs}
    </div>
  );
}

export default Profile;
