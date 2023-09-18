
class Utils {
    static getImageStyle(imgPath) {
        if (imgPath === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg")
            return {objectFit: "unset"}
        return {objectFit: "cover"};
    }
}

export default Utils;