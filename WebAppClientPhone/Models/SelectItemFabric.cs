namespace WebAppClientPhone.Models
{
    public static class SelectItemFabric
    {
        public static SelectItem<int> Create(int id, string text, bool selected = false, bool disabled = false)
        {
            return new SelectItem<int>(id, text, selected, disabled);
        }

        public static SelectItem<long> Create(long id, string text, bool selected = false, bool disabled = false)
        {
            return new SelectItem<long>(id, text, selected, disabled);
        }

        public static SelectItem<short> Create(short id, string text, bool selected = false, bool disabled = false)
        {
            return new SelectItem<short>(id, text, selected, disabled);
        }

        public static SelectItem<Guid> Create(Guid id, string text, bool selected = false, bool disabled = false)
        {
            return new SelectItem<Guid>(id, text, selected, disabled);
        }
    }
}