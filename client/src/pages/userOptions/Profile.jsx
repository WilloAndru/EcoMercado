import InputComponent from "../../components/InputProfile";
import { useUser } from "../../hooks/useUser";

function Profile() {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;

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
