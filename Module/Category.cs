using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

public class Category
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;  

    [Required, MaxLength(100)]
    public required string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Region { get; set; } = string.Empty; 
}