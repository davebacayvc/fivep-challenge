using Microsoft.EntityFrameworkCore;

namespace UserManagementAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<UserInformation> UserInformations { get; set; }
    }
}
