﻿// <auto-generated />
using System;
using MePlusPlusBE.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace MePlusPlusBE.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("MePlusPlusBE.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("IconName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.CheckQuest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Mesure")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RecomendedActivity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("CheckQuests");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.FlipCard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AnswerOne")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AnswerTwo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CorrectAnswer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FlipCardCategoryId")
                        .HasColumnType("int");

                    b.Property<int>("FlipCardLevelId")
                        .HasColumnType("int");

                    b.Property<string>("Question")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FlipCardCategoryId");

                    b.HasIndex("FlipCardLevelId");

                    b.ToTable("FlipCards");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.FlipCardCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("FlipCardCategories");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.FlipCardLevel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("FlipCardLevels");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.FlipCardQuiz", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool?>("AnsweredCorrectly")
                        .HasColumnType("bit");

                    b.Property<int>("FlipCardId")
                        .HasColumnType("int");

                    b.Property<int>("QuestId")
                        .HasColumnType("int");

                    b.Property<string>("UserAnswer")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FlipCardId");

                    b.HasIndex("QuestId");

                    b.ToTable("FlipCardQuizzes");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.Level", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Levels");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.Plan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<DateOnly>("Duration")
                        .HasColumnType("date");

                    b.Property<bool>("IsDone")
                        .HasColumnType("bit");

                    b.Property<bool>("IsFreezed")
                        .HasColumnType("bit");

                    b.Property<DateOnly>("LastDateCompleted")
                        .HasColumnType("date");

                    b.Property<int>("LevelId")
                        .HasColumnType("int");

                    b.Property<int>("Progressed")
                        .HasColumnType("int");

                    b.Property<DateOnly>("StartDate")
                        .HasColumnType("date");

                    b.Property<TimeSpan>("TimePerDay")
                        .HasColumnType("time");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("LevelId");

                    b.HasIndex("UserId");

                    b.ToTable("Plans");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.Quest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("CheckQuestId")
                        .HasColumnType("int");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<bool>("IsDone")
                        .HasColumnType("bit");

                    b.Property<int>("PlanId")
                        .HasColumnType("int");

                    b.Property<int>("XpLevel")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CheckQuestId");

                    b.HasIndex("PlanId");

                    b.ToTable("Quests");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirtName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("XpLevel")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.FlipCard", b =>
                {
                    b.HasOne("MePlusPlusBE.Models.FlipCardCategory", "FlipCardCategory")
                        .WithMany("FlipCards")
                        .HasForeignKey("FlipCardCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MePlusPlusBE.Models.FlipCardLevel", "FlipCardLevel")
                        .WithMany("FlipCards")
                        .HasForeignKey("FlipCardLevelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FlipCardCategory");

                    b.Navigation("FlipCardLevel");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.FlipCardQuiz", b =>
                {
                    b.HasOne("MePlusPlusBE.Models.FlipCard", "FlipCard")
                        .WithMany("FlipCardQuizzes")
                        .HasForeignKey("FlipCardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MePlusPlusBE.Models.Quest", "Quest")
                        .WithMany("FlipCardQuizzes")
                        .HasForeignKey("QuestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FlipCard");

                    b.Navigation("Quest");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.Plan", b =>
                {
                    b.HasOne("MePlusPlusBE.Models.Category", "Category")
                        .WithMany("Plans")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MePlusPlusBE.Models.Level", "Level")
                        .WithMany("Plans")
                        .HasForeignKey("LevelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MePlusPlusBE.Models.User", "User")
                        .WithMany("Plans")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Level");

                    b.Navigation("User");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.Quest", b =>
                {
                    b.HasOne("MePlusPlusBE.Models.CheckQuest", "CheckQuest")
                        .WithMany("Quests")
                        .HasForeignKey("CheckQuestId");

                    b.HasOne("MePlusPlusBE.Models.Plan", "Plan")
                        .WithMany()
                        .HasForeignKey("PlanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CheckQuest");

                    b.Navigation("Plan");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.Category", b =>
                {
                    b.Navigation("Plans");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.CheckQuest", b =>
                {
                    b.Navigation("Quests");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.FlipCard", b =>
                {
                    b.Navigation("FlipCardQuizzes");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.FlipCardCategory", b =>
                {
                    b.Navigation("FlipCards");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.FlipCardLevel", b =>
                {
                    b.Navigation("FlipCards");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.Level", b =>
                {
                    b.Navigation("Plans");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.Quest", b =>
                {
                    b.Navigation("FlipCardQuizzes");
                });

            modelBuilder.Entity("MePlusPlusBE.Models.User", b =>
                {
                    b.Navigation("Plans");
                });
#pragma warning restore 612, 618
        }
    }
}
