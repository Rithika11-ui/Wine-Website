using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Product
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]   
    public string Id { get; set; } = string.Empty;

    [Required, MaxLength(200)]
    public required string Name { get; set; } = string.Empty;

    public required float Volume { get; set; }    

    public required float Alcohol { get; set; }

    [MaxLength(1000)]
    public required string Description { get; set; } = string.Empty; 

    [Range(0, double.MaxValue)]
    public required decimal Price { get; set; }  

    [Range(0, 5)]
    public float Rating { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    public string CategoryId { get; set; } = string.Empty; 

    [MaxLength(255)]
    public string Image { get; set; } = string.Empty;     

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 
}