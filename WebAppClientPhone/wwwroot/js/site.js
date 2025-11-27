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

function debounce(fn, delay) {
   let timer = null;
   return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
   };
}

function tomSelect2(name, url, valueField = 'id', labelField = 'text', searchField = 'text', loadThrottle = 400) {
   function queryAjax(url, query, callback) {
      const params = "?q=" + query + "&term=" + query + "&__RequestVerificationToken=" + getVerificationToken();
      fetch(url + params, {         
         method: 'POST'
      })
         .then(res => res.json())
         .then(callback)
         .catch(() => callback());
   }
   new TomSelect(name, {
      valueField: valueField,
      labelField: labelField,
      searchField: searchField,
      loadThrottle: loadThrottle,
      persist: true,
      load: function (query, callback) {
         queryAjax(url, query, callback);
      },
      onItemAdd: function (value, data) {
         console.log('onItemAdd', value, data);
      }
   });
}

function selectize(name, url, valueField = 'id', labelField = 'text', searchField = 'text', loadThrottle = 400) {
   $(name).selectize({
      valueField: valueField,
      labelField: labelField,
      searchField: searchField,
      preload: false,
      loadThrottle: loadThrottle,
      load: function (query, callback) {
         if (!query.length) {
            return callback();
         }
         $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: {
               q: query,
               term: query,
               __RequestVerificationToken: getVerificationToken()
            },
            error: function () {
               callback();
            },
            success: function (res) {
               callback(res.results);
            }
         });
      }
   });
}

function select2(name, label, url = null, width = '100%', dropdownParent = null, minimumInputLength = 1) {
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

function getJSONPhoneByClientId(value, fn) {
   $.getJSON('/clients/phones/client-' + value, fn);
}