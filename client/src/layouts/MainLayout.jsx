import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

function MainLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${URL}/getUserDatas`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          localStorage.setItem("saveEmail", response.data.email);
        } catch (error) {
          localStorage.removeItem("token");
        }
      }
      if (!modeStatus.admin) {
        const response = await axios.get(`${URL}/productsIdNames`);
        if (response.status === 200) {
          setProductsIdNames(response.data);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="principal flex">
      <Header />
      <Outlet />
      {(!user || user.role === "client") && <Footer />}
    </div>
  );
}

export default MainLayout;
