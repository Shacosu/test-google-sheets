import { google } from "googleapis";
import { BookFullDetails } from "./interfaces";
import path from "node:path";

const sheets = google.sheets({ version: "v4" });
const SPREAD_ID = "1puVUuEYnx5Z7BteTStVvGmhNfmO595L6SC8eiQADIwY";
const auth = new google.auth.GoogleAuth({
	keyFile: path.join(process.cwd(), "src", "utils", "credentials.json"),
	scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function AuthGoogleSheet() {
	return await auth.getClient();
}

export async function getDataFromSheet() {
	const authClient = await AuthGoogleSheet();
	const response = await sheets.spreadsheets.values.get({
		auth: authClient as any,
		spreadsheetId: SPREAD_ID,
		range: "A:E"
	});
	if (response.status !== 200) {
		throw new Error("Error fetching data from sheet")
	}
	return response.data.values;
}

export async function updateDataInSheet() {
	const authClient = await AuthGoogleSheet();
	const response = await sheets.spreadsheets.values.append({
		auth: authClient as any,
		spreadsheetId: SPREAD_ID,
		range: "A:E",
		valueInputOption: "RAW",
		requestBody: {
			values: [
				["Hello", "World", "From", "Google"],
				["Hello", "World", "From", "Google"],
			],
		}
	});
	if (response.status !== 200) {
		throw new Error("Error writing data to sheet")
	}
	return "Data updated successfully"
}

export async function clearDataInSheet(cellRange: string) {
	const authClient = await AuthGoogleSheet();
	// Clear the sheet before writing new data
	await sheets.spreadsheets.values.clear({
		auth: authClient as any,
		spreadsheetId: SPREAD_ID,
		range: cellRange
	});
}

export async function writeDataInSheet(data: BookFullDetails[]) {
	const authClient = await AuthGoogleSheet();
	// Clear the sheet before writing new data
	await clearDataInSheet("A:J");
	// Write data to the sheet
	await sheets.spreadsheets.values.append({
		auth: authClient as any,
		spreadsheetId: SPREAD_ID,
		range: "A:J",
		valueInputOption: "RAW",
		requestBody: {
			values: [
				["SKU", "Titulo", "Hora", "Actualizado", "Stock", "Enlace"],
				...data.map((book) => {
					const { sku } = book;
					const { title, link, updatedAt, stock } = book.BookDetail;
					let currentStock = stock === 0 ? "Fuera de stock" : "Disponible";
					let currentTime = new Date(updatedAt).toLocaleTimeString("es-CL");
					let updatedAtDate = new Date(updatedAt).toISOString().split("T")[0].replace(/'/g, "");
					console.log(updatedAtDate)
					return [
						sku,
						title,
						currentTime,
						updatedAtDate,
						currentStock,
						link
					];
				}),
			],
		}
	});
	return "Data written successfully"
}