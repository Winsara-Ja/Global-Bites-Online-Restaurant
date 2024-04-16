import React, { useEffect, useState } from "react";
import axios from "axios";
import "./orderdashboard.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ManagerHeader from "./ManagerHeader";

const OrderDashboard = () => {
  const userID = "65fbed61c95e1f3dcf41d084";
  const [orderItems, setOrderItems] = useState([]);
  const [search, setSearch] = useState([]);
  const [status, setStatus] = useState([]);
  const [day, setDay] = useState([]);
  const [id, setId] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/orderItems/" + userID)
      .then((orderItems) => {
        setOrderItems(orderItems.data);
        setSearch(orderItems.data);
      })
      .catch((err) => console.log(err));
    status;
  }, [status]);
  let DailyTotal = 0;
  let WeeklyTotal = 0;
  let MonthlyTotal = 0;
  const currentDate = new Date();
  const TodayDate = new Date().toLocaleDateString();
  const LastWeekDate = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  ).toLocaleDateString();
  const LastMonthDate = new Date(
    currentDate.getTime() - 30 * 24 * 60 * 60 * 1000
  ).toLocaleDateString();

  const GenarateDailyReport = () => {
    orderItems.map((orderItem) => {
      if (TodayDate == new Date(orderItem.createdAt).toLocaleDateString()) {
        DailyTotal = DailyTotal + orderItem.TotalPrice;
      }
    });
  };

  const GenarateWeeklyReport = () => {
    orderItems.map((orderItem) => {
      if (LastWeekDate > new Date(orderItem.createdAt).toLocaleDateString()) {
        WeeklyTotal = WeeklyTotal + orderItem.TotalPrice;
      }
    });
  };

  const GenarateMonthlyReport = () => {
    orderItems.map((orderItem) => {
      if (LastMonthDate < new Date(orderItem.createdAt).toLocaleDateString()) {
        MonthlyTotal = MonthlyTotal + orderItem.TotalPrice;
      }
    });
  };

  const ChangeOrderStatus = async (OrderItem, e) => {
    const _id = OrderItem._id;
    let status = e.target.textContent;
    setStatus(e.target.textContent);
    try {
      await axios.put("http://localhost:5000/order/status", {
        _id,
        status,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelect = (date) => {
    let selectedDate = new Date(date).toLocaleDateString();
    setSearch(
      orderItems.filter((f) => {
        let d = new Date(f.createdAt).toLocaleDateString();
        setDay(d);
        return d == selectedDate;
      })
    );
  };

  const setActive = (id) => {
    setIsActive(!isActive);
    setId(id);
  };

  const filter = (e) => {
    setSearch(
      orderItems.filter((f) =>
        f.PaymetStatus.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const data = {
    labels: orderItems.map((data) => {
      let date = new Date(data.createdAt).toLocaleDateString();
      return date;
    }),
    datasets: [
      {
        label: "Sales",
        data: orderItems.map((data) => data.TotalPrice),
        backgroundColor: ["rgba(255,215,0,1)"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <ManagerHeader></ManagerHeader>
      <div className="searchbox">
        <p className="search-orders">Search</p>
        <input
          type="text"
          className="search"
          onChange={filter}
          placeholder="Filter"
        ></input>
      </div>
      <div className="order-wrap">
        <Calendar date={new Date()} onChange={handleSelect} />
        <div className="report">
          <button onClick={GenarateDailyReport()} className="report-btn">
            Daily Sales Income
          </button>
          <p>Rs.{DailyTotal}</p>
          <button onClick={GenarateWeeklyReport()} className="report-btn">
            Weekly sales Income
          </button>
          <p>Rs.{WeeklyTotal}</p>
          <button onClick={GenarateMonthlyReport()} className="report-btn">
            Monthly Sales Income
          </button>
          <p>Rs.{MonthlyTotal}</p>
        </div>
        <div style={{ width: 600 }}>
          <Line data={data}></Line>
        </div>
      </div>
      <div
        className={`hr-bar ${showOrders ? "active-bar" : "notactivr-bar"}`}
        onClick={(e) => setShowOrders(!showOrders)}
      >
        <p className="show-orders">
          {showOrders ? "Hide Orders" : "Show Orders"}
        </p>
        <span>
          <img src="/upload2.png" className="expand-img"></img>
        </span>
      </div>

      {showOrders && (
        <>
          <div className="order-header">
            <div className="flex-item">OrderID</div>
            <div className="flex-item">Items</div>
            <div className="flex-item">Order Date</div>
            <div className="flex-item">Price</div>
            <div className="flex-item">Order Status</div>
          </div>
          <div>
            {search.map((orderItem) => {
              return (
                <>
                  <div className="order-summary">
                    <div className="itemid">{orderItem._id}</div>
                    <div className="item-row">
                      {orderItem.ItemData.map((item) => {
                        return (
                          <div className="order-summary">
                            <div className="itemname">{item.ItemName}</div>
                            <div className="itemquantity">{item.Quantity}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="itemdate">
                      {new Date(orderItem.createdAt).toLocaleString()}
                    </div>
                    <div className="itemquantity">
                      Rs.{orderItem.TotalPrice}
                    </div>
                    <div className="dropdown">
                      <div
                        className={`itemsprice1 ${
                          orderItem.PaymetStatus == "Ready"
                            ? "itemprice1-green"
                            : orderItem.PaymetStatus == "Deleted"
                            ? "itemprice1-red"
                            : "itemprice1-yellow"
                        }
                    
                  `}
                        onClick={() => setActive(orderItem._id)}
                      >
                        {orderItem.PaymetStatus}
                      </div>
                      {isActive && orderItem._id == id && (
                        <div className="dropdown-content">
                          <div
                            className="dropdown-item"
                            onClick={(e) => ChangeOrderStatus(orderItem, e)}
                          >
                            Processing
                          </div>
                          <div
                            className="dropdown-item"
                            onClick={(e) => ChangeOrderStatus(orderItem, e)}
                          >
                            Ready
                          </div>
                          <div
                            className="dropdown-item"
                            onClick={(e) => ChangeOrderStatus(orderItem, e)}
                          >
                            Deleted
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <hr className="separator"></hr>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default OrderDashboard;
