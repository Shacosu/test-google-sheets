import { PrismaClient } from "@prisma/client";
import { writeDataInSheet } from "./lib/functions";
import { BookFullDetails } from "./lib/interfaces";

const prisma = new PrismaClient()

const getDataFromDB = async () => {
	try {
		const data = await prisma.book.findMany({
			include: {
				BookDetail: true
			}
		})
		return data
	} catch (error) {
		console.log("Error fetching data from database")
	}
}


(async () => {
	console.log("obteniendo datos de la base de datos")
	const data = await getDataFromDB() as BookFullDetails[]
	console.log("escribiendo datos en la hoja de google")
	await writeDataInSheet(data)
	console.log("datos escritos en la hoja de google")
	process.exit()
})();

