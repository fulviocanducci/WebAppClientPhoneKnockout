using System.ComponentModel.DataAnnotations;
namespace WebAppClientPhone.Models
{
    public class Client
    {
        public Client()
        {
            Phones = new HashSet<Phone>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Digite o nome")]
        [MinLength(1, ErrorMessage = "O nome deve ter no mínimo 1 caractere")]
        [Display(Name = "Nome Completo")]
        public string Name { get; set; } = string.Empty;
        public virtual ICollection<Phone> Phones { get; set; }
    }
}