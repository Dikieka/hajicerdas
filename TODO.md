# TODO: Sistem Pemesanan & Dashboard Akun

## Steps

### 1. Backend - Code.gs ✅

- [x] Add "Pesanan" sheet headers constant
- [x] Add "Pesanan" to MANAGED_SHEETS
- [x] Add doPost action handlers: pesanan_list, pesanan_create, pesanan_update

### 2. Frontend - API (api.js) ✅

- [x] Add HCApi.getOrders, getMyOrders, createOrder, updateOrder methods

### 3. Admin Panel - admin.js ✅

- [x] Add "Pesanan" schema to ADMIN_SCHEMA in "Layanan" group

### 4. Auth - auth.js ✅

- [x] Add HCAuth.setSession() method

### 5. Dashboard - akun.html ✅

- [x] Tab-based dashboard (Profil, Pesan, Status, Bantuan)
- [x] Edit profile modal (nama, whatsapp, password)
- [x] 3 service order forms with dynamic extra fields
- [x] Order status tracking table with filter
- [x] Order summary cards (pending/diproses/selesai/ditolak)
- [x] "Tanya Admin" WhatsApp button
- [x] FAQ accordion in bantuan panel

### 6. Styling - style.css ✅

- [x] Dashboard tab pills styling
- [x] Order summary cards
- [x] Profile section styling
- [x] Dark mode overrides
