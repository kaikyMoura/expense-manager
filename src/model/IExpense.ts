interface IExpense {
    id?: number | null,
    name: String,
    description: String,
    amount: Number,
    date: String | any,
    category: String,
    currency: String,
    isRecurring: Boolean,
    attachments: String[],
    priority: "Very high" | "High" | "Medium" | "Very low" |"Low" | undefined
}