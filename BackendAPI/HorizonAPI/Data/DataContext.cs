using Microsoft.EntityFrameworkCore;

namespace BankingAPI
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> users { get; set; }
    }
}
