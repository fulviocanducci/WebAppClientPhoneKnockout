using System.ComponentModel.DataAnnotations;
namespace WebAppClientPhone.Models
{
    public class Phone
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Digite o número de telefone")]
        [Display(Name = "Número de Telefone")]
        public string Number { get; set; } = string.Empty;

        [Required(ErrorMessage = "Escolha o Cliente")]
        [Display(Name = "Cliente")]
        public int ClientId { get; set; }
        public virtual Client? Client { get; set; }
    }
}