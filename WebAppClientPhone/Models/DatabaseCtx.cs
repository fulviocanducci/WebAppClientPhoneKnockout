using Microsoft.EntityFrameworkCore;

namespace WebAppClientPhone.Models
{
    public class DatabaseCtx(DbContextOptions<DatabaseCtx> options) : DbContext(options)
    {
        public DbSet<Client> Clients { get; set; }
        public DbSet<Phone> Phones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ClientConfiguration());
            modelBuilder.ApplyConfiguration(new PhoneConfiguration());
        }
    }
}
