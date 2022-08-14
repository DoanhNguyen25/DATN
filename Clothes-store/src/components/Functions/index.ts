export const formatMoney = (cash:number) => {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cash)
}