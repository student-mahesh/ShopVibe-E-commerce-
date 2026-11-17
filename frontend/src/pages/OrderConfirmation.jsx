import { useSelector } from "react-redux";
import { Link } from "react-router";
import { formatPrice } from "../utils/formatPrice";
function OrderConfirmation() {
  const orders = useSelector((state) => state.order.orders);
  const latestOrder = orders[orders.length - 1];
  /* ================= NO ORDER ================= */ if (!latestOrder) {
    return (
      <div className="transaction-page bg-light min-vh-100">
        {" "}
        <div className="container py-5">
          {" "}
          <div className="card border-0 shadow-sm text-center">
            {" "}
            <div className="card-body py-5">
              {" "}
              <div className="display-3 mb-3"> 📦 </div>{" "}
              <h2 className="fw-bold"> No Order Found </h2>{" "}
              <p className="text-muted mb-4">
                {" "}
                We couldn't find a recent order.{" "}
              </p>{" "}
              <Link to="/products" className="btn btn-primary">
                {" "}
                Continue Shopping{" "}
              </Link>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
  return (
    <div className="transaction-page bg-light min-vh-100">
      {" "}
      <div className="container py-5">
        {" "}
        {/* ================= SUCCESS ================= */}{" "}
        <div className="card border-0 shadow-sm">
          {" "}
          <div className="card-body p-4 p-md-5">
            {" "}
            {/* Success Message */}{" "}
            <div className="text-center mb-5">
              {" "}
              <div
                className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: "80px", height: "80px", fontSize: "40px" }}
              >
                {" "}
                ✓{" "}
              </div>{" "}
              <h1 className="fw-bold text-success">
                {" "}
                Order Placed Successfully!{" "}
              </h1>{" "}
              <p className="text-muted">
                {" "}
                Thank you for your purchase. Your order has been confirmed.{" "}
              </p>{" "}
            </div>{" "}
            {/* ================= ORDER INFORMATION ================= */}{" "}
            <div className="row g-4">
              {" "}
              <div className="col-md-4">
                {" "}
                <div className="bg-light rounded p-3 h-100">
                  {" "}
                  <small className="text-muted d-block"> Order ID </small>{" "}
                  <strong> {latestOrder.orderId} </strong>{" "}
                </div>{" "}
              </div>{" "}
              <div className="col-md-4">
                {" "}
                <div className="bg-light rounded p-3 h-100">
                  {" "}
                  <small className="text-muted d-block">
                    {" "}
                    Order Date{" "}
                  </small>{" "}
                  <strong>
                    {" "}
                    {new Date(latestOrder.orderDate).toLocaleString()}{" "}
                  </strong>{" "}
                </div>{" "}
              </div>{" "}
              <div className="col-md-4">
                {" "}
                <div className="bg-light rounded p-3 h-100">
                  {" "}
                  <small className="text-muted d-block">
                    {" "}
                    Order Status{" "}
                  </small>{" "}
                  <span className="badge bg-success">
                    {" "}
                    {latestOrder.status}{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <hr className="my-4" />{" "}
            {/* ================= PRODUCTS ================= */}{" "}
            <h4 className="fw-bold mb-3"> 🛍 Order Summary </h4>{" "}
            <div className="card border">
              {" "}
              <div className="card-body">
                {" "}
                {latestOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center border-bottom py-3"
                  >
                    {" "}
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="bg-light rounded"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "contain",
                      }}
                    />{" "}
                    <div className="ms-3 flex-grow-1">
                      {" "}
                      <h6 className="fw-bold mb-1"> {item.title} </h6>{" "}
                      <small className="text-muted">
                        {" "}
                        {formatPrice(item.price)} × {item.quantity}{" "}
                      </small>{" "}
                    </div>{" "}
                    <strong> {formatPrice(item.price * item.quantity)} </strong>{" "}
                  </div>
                ))}{" "}
                {/* Total */}{" "}
                <div className="d-flex justify-content-between pt-4">
                  {" "}
                  <span className="fw-bold fs-5"> Total Amount </span>{" "}
                  <span className="fw-bold fs-5 text-primary">
                    {" "}
                    {formatPrice(latestOrder.totalPrice)}{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* ================= PAYMENT ================= */}{" "}
            <div className="row mt-4 g-3">
              {" "}
              <div className="col-md-6">
                {" "}
                <div className="card border-0 bg-light">
                  {" "}
                  <div className="card-body">
                    {" "}
                    <small className="text-muted d-block">
                      {" "}
                      Payment Method{" "}
                    </small>{" "}
                    <strong>
                      {" "}
                      {latestOrder.paymentMethod === "COD"
                        ? "💵 Cash on Delivery"
                        : "💳 Demo Online Option (No payment processed)"}{" "}
                    </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="col-md-6">
                {" "}
                <div className="card border-0 bg-light">
                  {" "}
                  <div className="card-body">
                    {" "}
                    <small className="text-muted d-block">
                      {" "}
                      Delivery Status{" "}
                    </small>{" "}
                    <strong className="text-success">
                      {" "}
                      ✓ Order Confirmed{" "}
                    </strong>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* ================= BUTTONS ================= */}{" "}
            <div className="text-center mt-5">
              {" "}
              <Link to="/orders" className="btn btn-outline-primary me-2">
                {" "}
                View My Orders{" "}
              </Link>{" "}
              <Link to="/products" className="btn btn-primary">
                {" "}
                Continue Shopping →{" "}
              </Link>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default OrderConfirmation;
