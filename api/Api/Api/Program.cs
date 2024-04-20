using Api.Hubs;
using Api.Models;
using Microsoft.AspNetCore.HttpsPolicy;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddSingleton<IDictionary<string, UserConnection>>(
    opt => new Dictionary<string, UserConnection>());
// add cors
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(buil =>
    {
        buil.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
}); 


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.MapHub<ChatHub>("/chatHub");

app.UseHttpsRedirection();
app.UseCors();
app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
