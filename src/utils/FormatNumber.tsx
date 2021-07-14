export default function FormatNumber(num: number) {
    return new Intl.NumberFormat('vn', { maximumFractionDigits: 3 }).format(num)
}