namespace WebAppClientPhone.Models
{
    public class SelectResult<T>(List<SelectItem<T>> results)
    {
        public List<SelectItem<T>> Results { get; } = results;
    }
}