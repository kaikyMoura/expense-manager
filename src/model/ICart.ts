interface Cart {
    id: number,
    userId: number | string | undefined,
    date: Date | string,
    products: [
        { productId: number, quantity: number }
    ]
}