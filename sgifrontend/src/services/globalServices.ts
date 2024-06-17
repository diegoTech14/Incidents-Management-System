export class GlobalResources { 
    private static colorsStatus = [
        "bg-danger",
        "bg-success",
        "bg-secondary",
        "bg-primary",
        "bg-warning",
        "bg-info",
        "bg-dark",
        "bg-",
        "bg-",
        "bg-"
    ]

    public static getControlColorsStatus(){
        return this.colorsStatus
    }
}