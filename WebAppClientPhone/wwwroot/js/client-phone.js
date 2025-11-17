function createPhone(id = 0, number = '', clientId = 0) {
   return {
      id: ko.observable(id),
      number: ko.observable(number),
      clientId: ko.observable(clientId)
   }
}
function viewModel() {
   var self = this;

   self.id = ko.observable(0);
   self.id.subscribe(function (value) {
      if (value && value > 0) {
         self.loadPhones();
      }
   });
   self.setId = function (newId) {
      self.id(newId);
   }

   self.phones = ko.observableArray([]);
   //self.phones.subscribe(function (changes) {
   //   changes.forEach(function (change) {
   //      if (change.status === 'added') {
   //         const index = self.phones.indexOf(change.value);
   //         const id = "#Phones" + index + "Number";
   //         console.log(id);
   //         console.log($(id).length);
   //         if ($(id).length > 0) {
   //            $(id).focus();
   //         }
   //      }
   //      if (change.status === 'deleted') {
   //         //console.log("Telefone removido:", change.value);
   //      }
   //   });
   //}, null, "arrayChange");
   self.onPhoneRendered = function (elements, item) {
      const index = self.phones.indexOf(item);
      const id = "#Phones" + index + "Number";
      console.log(id);
      console.log($(id).length);
      if ($(id).length > 0) {
         window.setTimeout(function () {
            $(id).focus();
         }, 100);
      }
   };
   self.addPhone = function () {
      self.phones.push(createPhone(0, '', self.id()));
      self.validateAndMask();
   }
   self.removePhone = function (phone) {
      if (phone) {
         if (phone.id() === 0) {
            self.phones.remove(phone);
         } else {
            $.post("/clients/phones/remove-" + phone.id() + "-" + phone.clientId(), function (data) {
               self.setPhones(data);
            });
         }
      }
   }
   self.loadPhones = function () {
      if (self.id() > 0) {
         $.getJSON('/clients/phones/client-' + self.id(), function (data) {
            self.setPhones(data);
         });
      }
   }
   self.setPhones = function (data) {
      if (data) {
         self.phones.removeAll();
         data.forEach(function (p) {
            self.phones.push(createPhone(p.id, p.number, p.clientId));
         });
         self.validateAndMask();
      }
   };

   self.labels = {
      header: ko.computed(function () {
         return self.phones().length === 0
            ? 'Telefones (Nenhum telefone cadastrado.)'
            : 'Telefones (Quantidade: ' + self.phones().length + ')'
      })
   }

   self.validateAndMask = function () {
      revalidateForm("#form1");
      maskPhoneInput("input[name$='.Number']");
   }
}
const vm = new viewModel();
ko.observableArray.fn.trackArrayChanges = true;
ko.applyBindings(vm);

$(function () {
   if ($("#form1 #Id").length > 0) {
      vm.setId(+$("#form1 #Id").val());
   }
});