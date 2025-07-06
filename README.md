# 🥞 Pancake Factory

Welcome to the **Pancake Factory** – a fun web application where users can build their dream pancakes and manage customer orders. Built using HTML, CSS, and JavaScript with localStorage support for persisting data.

---

## 🚀 Features

### 🧾 Pancake Order Page (`index.html`)

- Select pancake base: Classic, Chocolate, or Red Velvet.
- Choose from multiple toppings and extras.
- Select delivery method (delivery or no delivery).
- Displays live price updates with animations.
- Submits order and shows a summary modal.
- Stores order details in `localStorage`.

### 📋 All Orders Page (`tilaukset.html`)

- Displays all saved orders from `localStorage`.
- Search orders by name or ID.
- Update order status: `waiting`, `ready`, `delivered`.
- Delete delivered orders.

---

## 📦 How It Works

1. **User builds an order** by selecting a type, toppings, extras, and delivery option.
2. Total price is automatically calculated and updated.
3. On clicking **"Click to order"**, the app:
   - Validates the name field.
   - Displays an order summary in a modal popup.
   - Saves the order in `localStorage` with a unique ID and `waiting` status.
4. Orders are **retrieved and displayed** in `tilaukset.html`.
5. Admin (or user) can:
   - **Search** orders.
   - **Change status**.
   - **Delete** orders marked as `delivered`.

---

## 🛠️ Setup & Usage

1. Clone/download this repository.
2. Open `index.html` in your browser to place an order.
3. Open `tilaukset.html` in your browser to view/manage orders.

> No backend or database required. All data is saved locally using `localStorage`.

---

## 📸 Screenshot Preview

- **Order Page:** Pancake builder UI with image and price banner.
- **Order List Page:** List of orders with status dropdown and delete buttons.

---

## ✍️ Notes

- Order resets after submission to improve user experience.
- Form is validated to prevent submission without a name.
- Fully responsive and designed with user experience in mind.

---

## 📚 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage API
- Google Fonts (Inter)

---

## ✅ To Do / Ideas

- Add order timestamps
- Enhance form validation
- Add animations or sounds on order submission
- Store history of deleted orders (archive mode)

---

LIVE SITE [https://bean-123.github.io/HTMLCSS_School/05_Week/Pancake_task/](https://bean-123.github.io/Pancake-task/)

## 🧁 Author

Created by Amy Platt – part of the Pannukakku 3 project series.
# Pancake-task
