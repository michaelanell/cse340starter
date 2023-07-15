const form = document.querySelector("#updateForm")
    form.addEventListener("change", function () {
      const updateBtn = document.querySelector("#submit")
      updateBtn.removeAttribute("disabled")
    })

   
const form2 = document.querySelector("#updateForm2")
form.addEventListener("change", function () {
  const updateBtn = document.querySelector("#submit")
  updateBtn.removeAttribute("disabled")
})