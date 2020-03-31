using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CovidRussia.Migrations
{
    public partial class AddDailyStats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DailyStats",
                columns: table => new
                {
                    RegionId = table.Column<int>(nullable: false),
                    StatsId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    NewCases = table.Column<int>(nullable: false),
                    NewDeaths = table.Column<int>(nullable: false),
                    NewRecovered = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyStats", x => new { x.RegionId, x.StatsId });
                    table.ForeignKey(
                        name: "FK_DailyStats_Regions_RegionId",
                        column: x => x.RegionId,
                        principalTable: "Regions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DailyStats");
        }
    }
}
