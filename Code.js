function protectShiftSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

  // Remove existing protection if any (optional, to avoid duplicates)
  const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  protections.forEach(p => p.remove());

  // Protect the entire sheet
  const protection = sheet.protect().setDescription('Protect Shift Sheet');

  // Only allow the owner (you) to edit
  const me = Session.getEffectiveUser();
  protection.addEditor(me); // Only you can edit
  protection.removeEditors(protection.getEditors().filter(user => user.getEmail() !== me.getEmail()));

  // Make sure that even domain users cannot edit
  if (protection.canDomainEdit()) {
    protection.setDomainEdit(false);
  }

  Logger.log('Sheet1 is now locked down properly!');
}


function showShiftDialog() {
  const html = HtmlService.createHtmlOutputFromFile('ShiftForm')
    .setWidth(400)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Petrol Pump Shift Entry');
}

function saveShiftData(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const liters = parseFloat(data.endReading) - parseFloat(data.startReading);
  const total = liters * parseFloat(data.price);
  sheet.appendRow([
    data.shiftDate,    // First column
    data.shiftTime,    // Second column
    data.personName,   // Third column (Person name)
    data.meterNo,
    data.product,
    data.startReading,
    data.endReading,
    data.price,
    liters,
    total
  ]);
}


function getProductPrice(product) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2");
  const data = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === product) {
      return data[i][1]; // returns the price
    }
  }
  return 0;
}



function showUpdatePriceDialog() {
  const html = HtmlService.createHtmlOutputFromFile('UpdatePriceForm')
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Update Product Price');
}

function updateProductPrice(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2");

  // Find the product row in the sheet
  const rows = sheet.getDataRange().getValues();
  let productRow = -1;

  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] === data.product) {
      productRow = i + 1; // Sheet rows are 1-indexed
      break;
    }
  }

  if (productRow !== -1) {
    // Update the price in the corresponding row
    sheet.getRange(productRow, 2).setValue(data.newPrice);
  } else {
    // If product is not found
    SpreadsheetApp.getUi().alert('Product not found!');
  }
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Pump Shift Change")
    .addItem("Enter Shift", "showShiftDialog")        // First menu item
    .addItem("Update Product Price", "showUpdatePriceDialog") // Add menu item for updating prices
    .addToUi();
}
