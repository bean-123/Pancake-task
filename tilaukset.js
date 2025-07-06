document.addEventListener("DOMContentLoaded", function () {
  const ordersContainer = document.getElementById("ordersContainer");
  const searchBox = document.getElementById("searchBox");

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  function renderOrders(filter = "") {
    ordersContainer.innerHTML = "";

    // can search w name or ID
    const filteredOrders = orders.filter(
      (order) =>
        order.customerName.toLowerCase().includes(filter.toLowerCase()) ||
        order.id.toString().includes(filter)
    );

    // If theres no orders
    if (filteredOrders.length === 0) {
      ordersContainer.innerHTML = "<p>No orders found.</p>";
      return;
    }

    //Here we create the div for each order
    filteredOrders.forEach((order) => {
      const orderEl = document.createElement("div");
      orderEl.className = `order ${order.status}`;
      orderEl.innerHTML = `
          <h3>Order #${order.id}</h3>
          <p><strong>Name:</strong> ${order.customerName}</p>
          <p><strong>Pancake:</strong> ${order.selectedPancake}</p>
          <p><strong>Toppings:</strong> ${
            order.toppings.join(", ") || "None"
          }</p>
          <p><strong>Extras:</strong> ${order.extras.join(", ") || "None"}</p>
          <p><strong>Delivery:</strong> ${order.deliveryMethod}</p>
          <p><strong>Total:</strong> ${order.totalPrice
            .toFixed(2)
            .replace(".", ",")}€</p>
          <label class="status-select">
            <strong>Status:</strong>
            <select data-id="${order.id}">
              <option value="waiting" ${
                order.status === "waiting" ? "selected" : ""
              }>Waiting</option>
              <option value="ready" ${
                order.status === "ready" ? "selected" : ""
              }>Ready</option>
              <option value="delivered" ${
                order.status === "delivered" ? "selected" : ""
              }>Delivered</option>
            </select>
          </label>
          ${
            order.status === "delivered"
              ? `<button data-id="${order.id}" class="delete-btn">Delete</button>`
              : ""
          }
        `;

      //makes the divs visible on the page
      ordersContainer.appendChild(orderEl);
    });

    //event listeners for status change
    document.querySelectorAll("select[data-id]").forEach((select) => {
      select.addEventListener("change", function () {
        const id = parseInt(this.dataset.id);
        const newStatus = this.value;
        const order = orders.find((o) => o.id === id);
        if (order) {
          order.status = newStatus;
          localStorage.setItem("orders", JSON.stringify(orders));
          renderOrders(searchBox.value); // Refresh to update styling and possibly show delete button
        }
      });
    });

    //event listeners for delete buttons
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const id = parseInt(this.dataset.id);
        orders = orders.filter((o) => o.id !== id);
        localStorage.setItem("orders", JSON.stringify(orders));
        renderOrders(searchBox.value);
      });
    });
  }

  // initial render
  renderOrders();

  // search filter
  searchBox.addEventListener("input", function () {
    renderOrders(this.value);
  });
});
