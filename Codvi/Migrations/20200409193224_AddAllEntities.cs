﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Codvi.Migrations
{
    public partial class AddAllEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Regions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    IsLockedDown = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Regions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DailyStats",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegionId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    NewCases = table.Column<int>(nullable: false),
                    NewDeaths = table.Column<int>(nullable: false),
                    NewRecovered = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyStats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DailyStats_Regions_RegionId",
                        column: x => x.RegionId,
                        principalTable: "Regions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DailyStats_RegionId",
                table: "DailyStats",
                column: "RegionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DailyStats");

            migrationBuilder.DropTable(
                name: "Regions");
        }
    }
}
