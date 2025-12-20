import { FaUserCircle } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineInventory2 } from "react-icons/md";
import BtnAdmin from "../../components/BtnAdmin";

function Admin() {
  const datas = [
    {
      title: "User Management",
      icon: <FaUserCircle className="icon" />,
      link: "users",
    },
    {
      title: "Product Management",
      icon: <MdOutlineInventory2 className="icon" />,
      link: "products",
    },
    {
      title: "Transaction Management",
      icon: <TbTruckDelivery className="icon" />,
      link: "transactions",
    },
    {
      title: "Relevant Data",
      icon: <FaMoneyBillTrendUp className="icon" />,
      link: "datas",
    },
  ];

  const buttons = datas.map((data, i) => {
    return (
      <BtnAdmin key={i} title={data.title} icon={data.icon} link={data.link} />
    );
  });

  return (
    <div className="admin flex1">
      <div className="flex1 div">{buttons}</div>
    </div>
  );
}

export default Admin;
