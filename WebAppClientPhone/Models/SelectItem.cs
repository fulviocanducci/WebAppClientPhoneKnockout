namespace WebAppClientPhone.Models
{
    public record SelectItem<T>
    {
        public SelectItem()
        {
        }

        public SelectItem(T id, string text)
        {
            Id = id;
            Text = text;
        }

        public SelectItem(T id, string text, bool selected = false, bool disabled = false)
        {
            Id = id;
            Text = text;
            Selected = selected;
            Disabled = disabled;
        }
        public T Id { get; init; } = default!;
        public string Text { get; init; } = default!;
        public bool Disabled { get; init; } = false;
        public bool Selected { get; init; } = false;
    }
}