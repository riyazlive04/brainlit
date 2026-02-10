// Google Apps Script - Deploy this as a Web App
// Instructions:
// 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1b-VG6zw9XpmiJFwWElyDvf0sY7HJvbZHA13QaMzZgSA/edit
// 2. Go to Extensions > Apps Script
// 3. Delete any existing code and paste this entire script
// 4. Click Deploy > New deployment
// 5. Select "Web app" as deployment type
// 6. Set "Execute as" to "Me"
// 7. Set "Who has access" to "Anyone"
// 8. Click Deploy
// 9. Copy the Web App URL and paste it in RegistrationForm.tsx (replace YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE)

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Parent Name', 'WhatsApp', 'Email', 'Location']);
    }
    
    // Format the timestamp
    const timestamp = new Date(data.registeredAt);
    
    // Append the new row with data
    sheet.appendRow([
      timestamp,
      data.parentName,
      data.whatsapp,
      data.email,
      data.location
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Handle GET requests for testing
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'GET request received. Use POST to submit data.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
