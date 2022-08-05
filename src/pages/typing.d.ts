declare namespace API {
    type color = 'green' | 'yellow' | 'red'
    interface IColor {
        color: color,
        isActive: boolean,
    }
}