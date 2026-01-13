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
      />
    );
  });

  return (
    <div className="flex flex-col items-center gap-8 w-100 md:w-180">
      {/* Seccion de img y nombre */}
      <section className="flex gap-6 items-center">
        <img
          className="rounded-full w-20 object-cover"
          src={user.picture}
          alt="Image profile"
        />
        <h2>{user.name}</h2>
      </section>
      {inputs}
    </div>
  );
}

export default Profile;
