# ⛽ Petrol Pump Shift Entry - Google Sheets App

This Google Apps Script project allows pump operators or managers to:
- 📋 Enter **shift readings** (with automatic date and time).
- 💲 Update **product prices** (Petrol, Diesel, XP95).
- ✅ Enforce basic validations (e.g., start reading must be less than end reading).
- 🔒 Lock sheets to prevent manual edits.

---

## 📦 Setup Instructions

### 1. Prepare Your Google Sheet
- Create a **new Google Sheet**.
- Create two sheets inside it:
    - `Sheet1`: For **Shift Entries** (Main data).
    - `Sheet2`: For **Product Prices** (Maintain latest prices).

### 2. Add Initial Data to Sheet2
In `Sheet2`, fill as below:

| Product | Price |
|:--------|:------|
| Petrol  | 105   |
| Diesel  | 96    |
| XP95    | 110   |

> (You can update prices later from the Update Price Form.)

### Sample Data Structure

#### Sheet1 (Shift Entries) Sample:

| Date       | Time     | Person Name | Meter No        | Product | Start Reading | End Reading | Testing Fuel | Price | Gross Liters | Net Liters | Total   |
|:-----------|:---------|:------------|:----------------|:--------|:--------------|:------------|:-------------|:------|:-------------|:-----------|:--------|
| 2023-10-15 | 08:00:00 | John Doe    | Machine1-Nozzle1| Petrol  | 10500.50      | 11000.50    | 2.5          | 105   | 500.00       | 497.50     | 52237.50|
| 2023-10-15 | 16:00:00 | Jane Smith  | Machine2-Nozzle2| Diesel  | 8200.75       | 8500.25     | 1.0          | 96    | 299.50       | 298.50     | 28656.00|
| 2023-10-16 | 08:00:00 | Mike Johnson| Machine3-Nozzle3| XP95    | 5000.00       | 5200.00     | 0.5          | 110   | 200.00       | 199.50     | 21945.00|

#### Sheet2 (Product Prices) Sample:

| Product | Price |
|:--------|:------|
| Petrol  | 105   |
| Diesel  | 96    |
| XP95    | 110   |

> (You can update prices later from the Update Price Form.)

---

### 3. Open Apps Script
- Go to **Extensions → Apps Script**.
- Delete any default code.

---

### 4. Create the Following Files

#### a. `Code.gs`
Paste the complete backend JavaScript (Google Apps Script) provided earlier.

#### b. `ShiftForm.html`
Paste the latest **Shift Form HTML** (with hidden date/time).

#### c. `UpdatePriceForm.html`
Create another file for **Update Price Form** to update product prices.

---

### 5. Set Triggers

In Apps Script:
- Click on **Triggers** (Alarm Clock icon on left).
- Add a trigger:
    - Choose function: `onOpen`
    - Event source: `From spreadsheet`
    - Event type: `On open`

✅ This ensures that custom menu "Pump Shift Change" appears every time the sheet is opened.

---

### 6. How It Works

| Task | Action |
|:-----|:-------|
| Enter Shift Data | Open Sheet → Menu → **Pump Shift Change → Enter Shift** |
| Update Product Price | Open Sheet → Menu → **Pump Shift Change → Update Product Price** |

---

### 7. Lock Sheet for Manual Editing (Optional)

To lock sheets programmatically:
- Use the locking logic provided (`protect()`).
- Only allow script to edit the data.
- Editors will **not** be able to manually edit `Sheet1` or `Sheet2` unless given permission.

---

## 📸 Screenshots

| Form | View |
|:-----|:-----|
| Shift Entry Form | ![Shift Form Screenshot](#) |
| Update Product Price | ![Update Price Form Screenshot](#) |

*(You can add screenshots later.)*

---

## 🔥 Bonus Features (Optional Enhancements)
- Add **loading spinner** while submitting forms.
- Send **email notification** to manager after every shift entry.
- Keep **audit trail** of price changes.
- Protect only specific **columns** if needed.

---

## 🛠️ Requirements
- Google Account
- Basic familiarity with Google Sheets & Apps Script
