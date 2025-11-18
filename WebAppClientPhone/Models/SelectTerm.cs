namespace WebAppClientPhone.Models
{
    public class SelectTerm
    {
        public string Term { get; set; } = null!;
        public string Type { get; set; } = null!;
        public string Q { get; set; } = null!;
    }

    public record ClientDto(int Id, string Name, int PhoneCount);
}