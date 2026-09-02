import { useSelector } from "react-redux";
import { Link } from "react-router";
function Orders() {
  const orders = useSelector((state) => state.order.orders);
  return (
    <div className="bg-light min-vh-100">
      {" "}
      <div className="container py-5">
        {" "}
        {/* ================= HEADER ================= */}{" "}
        <div className="d-flex justify-content-between align-items-center mb-4">
          {" "}
          <div>
            {" "}
            <h1 className="fw-bold mb-1"> My Orders </h1>{" "}
            <p className="text-muted mb-0">
              {" "}
              Track and view your previous orders{" "}
            </p>{" "}
          </div>{" "}
          <Link to="/products" className="btn btn-primary">
            {" "}
            Continue Shopping{" "}
          </Link>{" "}
        </div>{" "}
        {/* ================= EMPTY ORDERS ================= */}{" "}
        {orders.length === 0 ? (
          <div className="card border-0 shadow-sm">
            {" "}
            <div className="card-body text-center py-5">
              {" "}
              <div className="display-3 mb-3"> 📦 </div>{" "}
              <h3 className="fw-bold"> No Orders Yet </h3>{" "}
              <p className="text-muted mb-4">
                {" "}
                You haven't placed any orders yet.{" "}
              </p>{" "}
              <Link to="/products" className="btn btn-primary">
                {" "}
                Start Shopping{" "}
              </Link>{" "}
            </div>{" "}
          </div>
        ) : (
          /* ================= ORDERS ================= */ <div>
            {" "}
            {orders
              .slice()
              .reverse()
              .map((order) => (
                <div
                  key={order.orderId}
                  className="card border-0 shadow-sm mb-4"
                >
                  {" "}
                  <div className="card-body p-4">
                    {" "}
                    {/* ORDER HEADER */}{" "}
                    <div className="row align-items-center">
                      {" "}
                      <div className="col-md-4">
                        {" "}
                        <small className="text-muted"> Order ID </small>{" "}
                        <h6 className="fw-bold mb-0"> {order.orderId} </h6>{" "}
                      </div>{" "}
                      <div className="col-md-3 mt-3 mt-md-0">
                        {" "}
                        <small className="text-muted"> Order Date </small>{" "}
                        <p className="mb-0">
                          {" "}
                          {new Date(order.orderDate).toLocaleDateString()}{" "}
                        </p>{" "}
                      </div>{" "}
                      <div className="col-md-2 mt-3 mt-md-0">
                        {" "}
                        <small className="text-muted"> Payment </small>{" "}
                        <p className="mb-0 fw-semibold">
                          {" "}
                          {order.paymentMethod === "COD"
                            ? "💵 COD"
                            : "💳 Online"}{" "}
                        </p>{" "}
                      </div>{" "}
                      <div className="col-md-3 mt-3 mt-md-0 text-md-end">
                        {" "}
                        <span className="badge bg-success px-3 py-2">
                          {" "}
                          ✓ {order.status}{" "}
                        </span>{" "}
                      </div>{" "}
                    </div>{" "}
                    <hr /> {/* PRODUCTS */}{" "}
                    <h5 className="fw-bold mb-3"> Order Items </h5>{" "}
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="d-flex align-items-center border-bottom py-3"
                      >
                        {" "}
                        {/* PRODUCT IMAGE */}{" "}
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="rounded bg-light"
                          style={{
                            width: "75px",
                            height: "75px",
                            objectFit: "contain",
                          }}
                        />{" "}
                        {/* PRODUCT INFORMATION */}{" "}
                        <div className="ms-3 flex-grow-1">
                          {" "}
                          <h6 className="fw-bold mb-1"> {item.title} </h6>{" "}
                          <small className="text-muted">
                            {" "}
                            ₹ {item.price} × {item.quantity}{" "}
                          </small>{" "}
                        </div>{" "}
                        {/* SUBTOTAL */}{" "}
                        <strong> ₹ {item.price * item.quantity} </strong>{" "}
                      </div>
                    ))}{" "}
                    {/* ORDER FOOTER */}{" "}
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      {" "}
                      <div>
                        {" "}
                        <small className="text-muted"> Total Items </small>{" "}
                        <div className="fw-semibold">
                          {" "}
                          {order.items.reduce(
                            (total, item) => total + item.quantity,
                            0,
                          )}{" "}
                        </div>{" "}
                      </div>{" "}
                      <div className="text-end">
                        {" "}
                        <small className="text-muted">
                          {" "}
                          Total Amount{" "}
                        </small>{" "}
                        <h4 className="fw-bold text-primary mb-0">
                          {" "}
                          ₹ {order.totalPrice}{" "}
                        </h4>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>
              ))}{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
export default Orders;
