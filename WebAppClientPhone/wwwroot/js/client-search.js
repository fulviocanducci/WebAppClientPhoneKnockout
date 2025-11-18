function viewModel() {
   var self = this;
   self.selectedClientId = ko.observable(null);
   self.selectedClientId.subscribe(function (value) {
      self.phones.removeAll();
      if (value && value > 0) {
         $.getJSON('/clients/phones/client-' + value, function (data) {
            if (data.length > 0) {
               data.forEach(function (item) {
                  self.phones.push({ number: ko.observable(item.number) });
               });
            }
         });
      }
   });
   self.phones = ko.observableArray([]);
   self.phonesIsEmpty = ko.computed(function () {
      return self.phones().length === 0;
   });
   self.selectedClientIdIsEmpty = ko.computed(function () {
      return self.selectedClientId() === null || !self.selectedClientId();
   });
   self.phonesCountLabel = ko.computed(function () {
      return self.phones().length === 0
         ? "Nenhum telefone encontrado."
         : "Quantidade de telefone(s): "  + self.phones().length + "."; 
   });
   self.onSetSelectedClientIdToNull = function () {
      self.selectedClientId(null);
   }
}
const vm = new viewModel();
ko.observableArray.fn.trackArrayChanges = true;
ko.applyBindings(vm);