// Binding customizado KO + Select2
ko.bindingHandlers.select2 = {
   init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      const options = ko.unwrap(valueAccessor());
      select2($(element), options.label, options.url, options.width || '100%', options.dropdownParent || '', options.minimumInputLength || 1);
      if (ko.isObservable(options.value) && options.value() == null) {
         options.value($(element).val());
      }
      $(element).on('change', function () {
         if (ko.isObservable(options.value)) {
            options.value($(element).val());
         }
      });      
      if (options.onSelect) {
         $(element).on('select2:select', options.onSelect);
      }
      if (options.onUnselect) {
         $(element).on('select2:unselect', options.onUnselect);
      }
      if (options.onOpening) {
         $(element).on('select2:opening', options.onOpening);
      }
      if (options.onClosing) {
         $(element).on('select2:closing', options.onClosing);
      }
      ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
         $(element).select2('destroy');
      });
   },
   update: function (element, valueAccessor) {
      const options = ko.unwrap(valueAccessor());
      if (ko.isObservable(options.value)) {
         $(element).val(ko.unwrap(options.value)).trigger('change.select2');
      }
   }
};