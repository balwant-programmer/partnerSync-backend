# PartnerSync backend
# PartnerSync 🏠💰

PartnerSync is a Node.js + Express.js application designed to help roommates or house partners track shared expenses in a transparent and efficient way.

Whenever someone logs a purchase (like groceries, utilities, etc.), it not only updates the shared record but also **sends an email notification** with **OTP-based verification** via Gmail to maintain security and accountability.

---

## ✨ Features

- 👥 Add and manage room partners
- 🧾 Log purchased items with name and price
- 📬 Automatically send email notifications when new items are added
- 🔐 OTP verification via Gmail for added security
- 🛠 Admin dashboard for managing data and users (e.g., add items, manage users)

---

## 📦 Tech Stack

- **Backend:** Node.js, Express.js
- **Email:** Gmail SMTP (via Nodemailer)
- **Authentication:** OTP system (via email)
- **Database:** MongoDB (or your chosen DB)

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local or Atlas)
- Gmail account for sending emails

