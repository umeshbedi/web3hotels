export const cityName = [
    "Port Blair",
    "Havelock Island",
    "Neil Island",
    "Baratang Island",
    "Rangat",
    "Mayabunder",
    "Diglipur"
]

export const starHotels = [
    "2 Star Hotels",
    "3 Star Hotels",
    "4 Star Hotels",
    "5 Star Hotels"
]

export function mobile() {
    if (typeof window !== "undefined") {
        const { innerWidth: width, innerHeight: height } = window;
        if (width < 991) {
            return true
        } else {
            return false
        }
    }

}