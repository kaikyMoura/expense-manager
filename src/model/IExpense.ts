interface IExpense {
    id?: string,
    name: String,
    description: String,
    amount: Number,
    date: String | any,
    category: Category,
    currency: String,
    isRecurring: Boolean,
    isPaid: Boolean,
    attachments: String[],
    priority: any,
    status?: any
}