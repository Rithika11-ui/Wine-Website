using System.Text;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Microsoft.AspNetCore.Authentication.JwtBearer; 
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:3000");
        policy.AllowAnyMethod();
        policy.AllowAnyHeader();
    });
});

builder.Services.Configure<MongoDbSettings>
(
    builder.Configuration.GetSection("MongoDB")
);

try
{
    var mongoSettings = builder.Configuration.GetSection("MongoDB").Get<MongoDbSettings>();
    var client = new MongoClient(mongoSettings!.ConnectionString);
    client.GetDatabase(mongoSettings.DatabaseName)
          .RunCommand<MongoDB.Bson.BsonDocument>(new MongoDB.Bson.BsonDocument("ping", 1));
    Console.WriteLine(" MongoDB Connected Successfully!");
}
catch (Exception ex)
{
    Console.WriteLine($" MongoDB Connection Failed: {ex.Message}");
}

builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("JwtSettings")
);

builder.Services.AddSingleton<JwtTokenGenerator>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(Options =>
{
    Options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Secret"] ?? throw new InvalidOperationException("JWT Secret is missing"))  
        )
    };
});
// App Services
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<IProductService, ProductService>();
builder.Services.AddSingleton<IOrderService, OrderService>();
builder.Services.AddSingleton<IPaymentService, PaymentService>();
builder.Services.AddSingleton<ICategoryService, CategoryService>();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();             
}
app.Use(async (context, next) =>
{
    Console.WriteLine($">>> Incoming: {context.Request.Method} {context.Request.Path}");
    await next();
    Console.WriteLine($">>> Response: {context.Response.StatusCode}");
});
//Middleware 
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowReact");
app.UseAuthentication();   
app.UseAuthorization();  
app.MapControllers();
app.Run();