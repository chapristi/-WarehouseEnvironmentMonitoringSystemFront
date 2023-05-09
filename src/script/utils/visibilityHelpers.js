export const makeVisible = (element) => {
    element.classList.remove("hidden")
    element.classList.add("visible")
}
export const makeInvisible = (element) => {
    element.classList.add("hidden")
}