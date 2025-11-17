function revalidateForm(formSelector) {
   const form = $(formSelector)
      .removeData("validator")
      .removeData("unobtrusiveValidation");
   $.validator.unobtrusive.parse(form);
   form.validate();
   $(formSelector).valid();
}

function maskPhoneInput(selector) {
   if ($(selector).length) {
      $(selector).mask("(99)99999-9999");
   }
}