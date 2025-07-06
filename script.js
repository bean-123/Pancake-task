document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const typeSelect = document.getElementById("type");
  const totalPriceEl = document.getElementById("totalPrice");
  const priceTag = document.querySelector(".price-banner span"); // The actual price tag element
  const orderSummaryEl = document.getElementById("orderSummary");
  const toppings = [];
  const extras = [];

  // Function to calculate total price
  function calculateTotal() {
    const basePrice = parseFloat(typeSelect.selectedOptions[0].dataset.price);

    // Add toppings cost (1€ each)
    let toppingsTotal = toppings.length * 1;

    // Add extras cost (specific price for each)
    let extrasTotal = 0;
    extras.forEach((extra) => {
      extrasTotal += parseFloat(extra.dataset.price);
    });

    // Add delivery cost if selected
    const deliveryOption = form.querySelector("input[name='delivery']:checked");
    const deliveryCost = deliveryOption
      ? parseFloat(deliveryOption.dataset.price)
      : 0;

    const total = basePrice + toppingsTotal + extrasTotal + deliveryCost;

    // Apply the pop animation to the price tag
    priceTag.classList.add("pop-animation");
    setTimeout(() => {
      priceTag.classList.remove("pop-animation");
    }, 300);

    // Update the price on the page
    totalPriceEl.textContent = `${total.toFixed(2).replace(".", ",")}€`;
    priceTag.textContent = `${total.toFixed(2).replace(".", ",")}€`;
  }

  // Function to show the order summary
  function showOrderSummary() {
    const name = document.getElementById("customerName").value;
    const selectedType = typeSelect.selectedOptions[0].textContent;

    // Get selected toppings and extras
    const selectedToppings = toppings
      .map((topping) => {
        const label = topping.closest("label");
        return label ? label.textContent.trim() : "";
      })
      .filter((topping) => topping !== "") // Removing empty values
      .join(", ");
    const selectedExtras = extras
      .map((extra) => {
        const label = extra.closest("label");
        return label ? label.textContent.trim() : "";
      })
      .filter((extra) => extra !== "") // Removing empty values
      .join(", ");

    const deliveryOption = form.querySelector("input[name='delivery']:checked");
    let deliveryText = "No delivery";
    if (deliveryOption) {
      const deliveryLabel = deliveryOption.closest("label");
      if (deliveryLabel) {
        deliveryText = deliveryLabel.textContent.trim();
      }
    }

    // Final price from the banner
    const totalPrice = totalPriceEl.textContent;

    // PART 3: Create and store the order object
    const order = {
      id: Date.now(),
      customerName: name,
      selectedPancake: selectedType,
      toppings: selectedToppings ? selectedToppings.split(", ") : [],
      extras: selectedExtras ? selectedExtras.split(", ") : [],
      deliveryMethod: deliveryText,
      totalPrice: parseFloat(totalPriceEl.textContent.replace(",", ".")),
      status: "waiting",
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // reset the form for a new order (my own thing, task didnt ask to do this but it looks better)
    form.reset(); // clear all form inputs
    toppings.length = 0; // clear toppings array
    extras.length = 0; // clear extras array

    calculateTotal(); // recalculate price to reset display

    // display order summary in the popup
    orderSummaryEl.innerHTML = `
      <h3>Order Summary</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Pancake:</strong> ${selectedType}</p>
      <p><strong>Toppings:</strong> ${selectedToppings || "No toppings"}</p>
      <p><strong>Extra:</strong> ${selectedExtras || "No extras"}</p>
      <p><strong>Delivery:</strong> ${deliveryText}</p>
      <p><strong>Total price:</strong> ${totalPrice}</p>
    `;

    // open the popup
    document.getElementById("orderSummaryModal").style.display = "block";
  }

  // Event listener for changes in the form
  form.addEventListener("change", function (e) {
    const target = e.target;

    // handle topping changes
    if (target.matches(".topping")) {
      if (target.checked) {
        toppings.push(target);
      } else {
        const index = toppings.indexOf(target);
        if (index > -1) {
          toppings.splice(index, 1);
        }
      }
    }

    // handle extra changes
    if (target.matches(".extra")) {
      if (target.checked) {
        extras.push(target);
      } else {
        const index = extras.indexOf(target);
        if (index > -1) {
          extras.splice(index, 1);
        }
      }
    }

    // recalculate total price
    calculateTotal();
  });

  // show order summary when button is clicked. NAME needed !
  document
    .getElementById("showOrderSummaryButton")
    .addEventListener("click", function () {
      const nameInput = document.getElementById("customerName");
      if (!nameInput.value.trim()) {
        alert("Please enter your name before proceeding.");
        nameInput.focus();
        return;
      }
      showOrderSummary();
    });

  // close the modal when the close button is clicked
  document
    .getElementById("closeModalButton")
    .addEventListener("click", function () {
      document.getElementById("orderSummaryModal").style.display = "none";
    });

  // initial price calculation
  calculateTotal();
});
