import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Navbar from "./components/shared/navbar";
import { toast } from "sonner";
import { authStore } from "./store/auth.store";
import { useEffect } from "react";
import RecoveryAccount from "./pages/recovery-account";
import { $axios } from "./http";

function App() {
  const { setIsAuth, setLoading, setUser } = authStore();

  const checkAuth = async () => {
    setLoading(true);
    try {
      const { data } = await $axios.get("/auth/refresh");
      const data1 = await $axios.get("/auth/refresh");
      console.log(data1);

      localStorage.setItem("accessToken", data.accessToken);
      setIsAuth(true);
      setUser(data.user);
    } catch (error) {
      // @ts-ignore
      toast(error.response?.data?.message);
      localStorage.removeItem("accessToken");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      checkAuth();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/recovery-account/:token" element={<RecoveryAccount />} />
      </Routes>
    </>
  );
}

export default App;
