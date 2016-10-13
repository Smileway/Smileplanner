using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Smileplanner.DAL
{
    public partial class ProjectContext : DbContext
    {
        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
        //     optionsBuilder.UseSqlServer(@"Data Source=.\SQLExpress;Initial Catalog=Smileplanner;User Id=sa;Password=P@ssw0rd;Integrated Security=true;");
        // }
        public ProjectContext(DbContextOptions<ProjectContext> options) : base(options){ }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasColumnType("varchar(6)");

                entity.Property(e => e.Title).HasMaxLength(500);
            });

            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.ActualFinish).HasColumnType("datetime");

                entity.Property(e => e.ActualStart).HasColumnType("datetime");

                entity.Property(e => e.Description).HasColumnType("text");

                entity.Property(e => e.PlanFinish).HasColumnType("datetime");

                entity.Property(e => e.PlanStart).HasColumnType("datetime");

                entity.Property(e => e.Priority).HasColumnType("char(1)");

                entity.Property(e => e.ProjectName).HasColumnType("varchar(6)");

                entity.Property(e => e.Status).HasColumnType("varchar(2)");

                entity.Property(e => e.Title).HasMaxLength(500);

                entity.Property(e => e.Type).HasColumnType("varchar(2)");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Ticket)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK_Ticket_Project");
            });
        }

        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<Ticket> Ticket { get; set; }
    }
}