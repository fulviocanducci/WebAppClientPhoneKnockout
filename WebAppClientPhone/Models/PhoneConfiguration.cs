using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WebAppClientPhone.Models
{
    public class PhoneConfiguration : IEntityTypeConfiguration<Phone>
    {
        public void Configure(EntityTypeBuilder<Phone> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Number).IsRequired().HasMaxLength(14);
            builder.HasOne(p => p.Client)
                   .WithMany(c => c.Phones)
                   .HasForeignKey(p => p.ClientId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
