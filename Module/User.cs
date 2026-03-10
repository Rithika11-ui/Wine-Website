using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]  
    public string Id { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public  string UserName { get; set; } = string.Empty;

    [Required]
    public UserRole Role { get; set; }

    [Required, EmailAddress, MaxLength(256)]
    public  string Email { get; set; } = string.Empty;
    [Required]
    public  string Password { get; set; } = string.Empty;

    [Phone, MaxLength(20)]
    public string PhoneNumber { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Address { get; set; } = string.Empty;

    [MaxLength(255)]
    public string Image { get; set; } = string.Empty;  
}

public enum UserRole  
{
    Admin,             
    Customer,          
}