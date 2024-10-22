interface IExpense {
    id?: number | null,
    name: String,
    description: String,
    amount: Number,
    date: String | any,
    category: Category,
    currency: String,
    isRecurring: Boolean,
    attachments: String[],
    priority: unknown
}