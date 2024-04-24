import { useEffect, useState } from "react";
import { DashboardCard } from "./components/DashboardCard";
import { EmptyDashboard } from "./components/EmptyDashboard";
import { getUserOrders } from "../../utils/dataService";
import { useTitle } from "../../hooks/useTitle";
import { toast } from "react-toastify";

export function DashboardPage() {
  const [orders, setOrders] = useState([]);
  useTitle("Dashboard");
  useEffect(() => {
    async function getOrderData() {
      try {
        const resData = await getUserOrders();
        setOrders(resData);
      } catch (error) {
        toast.error(error.message, {
          closeButton: true,
          position: "bottom-center",
          autoClose: 4000,
          closeOnClick: true,
        });
      }
    }
    getOrderData();
  }, []);

  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
          My Dashboard
        </p>
      </section>
      <section>
        {orders.length &&
          orders.map((od) => <DashboardCard key={od.id} order={od} />)}
      </section>
      <section>{!orders.length && <EmptyDashboard />}</section>
    </main>
  );
}
