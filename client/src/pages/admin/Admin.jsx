import { FaUserCircle } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineInventory2 } from "react-icons/md";
import { Link } from "react-router-dom";

function Admin() {
  const iconStyle = "text-6xl";

  const datas = [
    {
      title: "User Management",
      icon: <FaUserCircle className={iconStyle} />,
      link: "users",
    },
    {
      title: "Product Management",
      icon: <MdOutlineInventory2 className={iconStyle} />,
      link: "products",
    },
    {
      title: "Transaction Management",
      icon: <TbTruckDelivery className={iconStyle} />,
      link: "transactions",
    },
    {
      title: "Relevant Data",
      icon: <FaMoneyBillTrendUp className={iconStyle} />,
      link: "datas",
    },
  ];

  return (
    <div className="grid grid-cols-2 items-center justify-center gap-4">
      {datas.map((data, i) => (
        <Link
          className="flex gap-4 text-center items-center justify-center flex-col btn-1 h-full"
          to={`/admin/${data.link}`}
        >
          <h2>{data.title}</h2>
          {data.icon}
        </Link>
      ))}
    </div>
  );
}

export default Admin;
