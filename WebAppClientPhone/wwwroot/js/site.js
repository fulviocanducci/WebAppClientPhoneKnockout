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
function getVerificationToken() {
   return $('input[name ="__RequestVerificationToken"]').val();
}

function select2(name, label, url = null, width = '100%', dropdownParent = null, minimumInputLength = 2) {
   let base = {
      placeholder: label,
      allowClear: true,
      width: width,
      minimumInputLength: minimumInputLength,
      language: "pt-BR",
      theme: "bootstrap-5",
      containerCssClass: "select2--small",
      dropdownCssClass: "select2--small",
      selectionCssClass: "select2--small",
      //templateResult: formatRepo,
      //templateSelection: formatRepoSelection
   };
   if (dropdownParent) {
      Object.assign(base, {
         dropdownParent
      });
   }
   if (url) {
      Object.assign(base, {
         ajax: {
            url: url,
            crossDomain: true,
            dataType: 'json',
            method: 'POST',
            data: function (params) {
               var query = {
                  term: params.term,
                  q: params.term,
                  type: params._type,
                  __RequestVerificationToken: getVerificationToken()
               }
               return query;
            }
         }
      });
   }
   $(name).select2(base);
}