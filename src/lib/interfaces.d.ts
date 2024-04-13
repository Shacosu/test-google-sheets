import type { Book, BookDetail } from "@prisma/client";


export type BookFullDetails = Book & {
	BookDetail: BookDetail
}

// {
// 	id: 63,
// 	sku: '56143818',
// 	BookDetail: {
// 		id: 63,
// 		title: 'Fabricante de lágrimas',
// 		image: 'https://images.cdn2.buscalibre.com/fit-in/150x230/a9/3e/a93e9344ea6eb538f3a58149abbaf47e.jpg',
// 		link: 'https://www.buscalibre.cl/libro-fabricante-de-lagrimas/9788410298507/p/56143818',
// 		createdAt: 2024-04-08T17:00:32.126Z,
// 		updatedAt: 2024-04-11T05:01:03.533Z,
// 		stock: 1,
// 		bookId: 63
// 	}
// },