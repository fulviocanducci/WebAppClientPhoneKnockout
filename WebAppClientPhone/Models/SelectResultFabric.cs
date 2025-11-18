namespace WebAppClientPhone.Models
{
    public static class SelectResultFabric
    {
        public static SelectResult<int> Create(List<SelectItem<int>> results)
        {
            return new SelectResult<int>(results);
        }

        public static SelectResult<long> Create(List<SelectItem<long>> results)
        {
            return new SelectResult<long>(results);
        }
        public static SelectResult<short> Create(List<SelectItem<short>> results)
        {
            return new SelectResult<short>(results);
        }

        public static SelectResult<Guid> Create(List<SelectItem<Guid>> results)
        {
            return new SelectResult<Guid>(results);
        }
    }
}