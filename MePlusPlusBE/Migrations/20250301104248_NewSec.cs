using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MePlusPlusBE.Migrations
{
    /// <inheritdoc />
    public partial class NewSec : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IconName",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IconName",
                table: "Categories");
        }
    }
}
